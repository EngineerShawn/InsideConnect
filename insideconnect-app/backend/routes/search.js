// insideconnect-app/backend/routes/search.js

const express = require('express');
const router = express.Router();
const axios = require('axios');

// --- POST /api/search/inmate ---
router.post('/inmate', async (req, res) => {
    try {
        const searchCriteria = req.body;

        // Construct the query parameters for the BOP API
        const params = new URLSearchParams({
            todo: 'query',
            output: 'json',
            inmateNum: searchCriteria.inmateNum || '',
            nameFirst: searchCriteria.nameFirst || '',
            nameMiddle: searchCriteria.nameMiddle || '',
            nameLast: searchCriteria.nameLast || '',
            race: searchCriteria.race || '',
            age: searchCriteria.age || '',
            sex: searchCriteria.sex || '',
        });

        const bopApiUrl = `https://www.bop.gov/PublicInfo/execute/inmateloc?${params.toString()}`;

        console.log(`[DEBUG] Making request to BOP API: ${bopApiUrl}`);

        // Make the request to the external BOP API
        const response = await axios.get(bopApiUrl);

        // Forward the data from the BOP API back to our frontend
        res.status(200).json(response.data);

    } catch (error) {
        console.error("Inmate Search Error:", error);
        res.status(500).json({ message: "An error occurred while searching for the inmate." });
    }
});

// --- ROUTE 1: For the typeahead search functionality ---
router.get('/facility', async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(200).json([]);
        }

        const params = new URLSearchParams({
            todo: 'query',
            output: 'json',
            name: name,
        });

        const bopApiUrl = `https://www.bop.gov/PublicInfo/execute/locations?${params.toString()}`;

        console.log(`[DEBUG] Making request to BOP Facility API: ${bopApiUrl}`);

        const response = await axios.get(bopApiUrl);

        // After inspecting the correct API response, the data is in "Locations"
        res.status(200).json(response.data.Locations || []);

    } catch (error) {
        console.error("Facility Search Error:", error);
        res.status(500).json({ message: "An error occurred while searching for facilities." });
    }
});


// --- ROUTE 2: For the facility details page (this one correctly uses /phyloc) ---
router.get('/facility/:code', async (req, res) => {
    // ... This route remains unchanged as it correctly uses /phyloc for detail lookups ...
    try {
        const { code } = req.params;
        const params = new URLSearchParams({ todo: 'query', output: 'json', code: code });
        const bopApiUrl = `https://www.bop.gov/PublicInfo/execute/phyloc?${params.toString()}`;
        // ... rest of the function
        const response = await axios.get(bopApiUrl, {
            headers: {
                'Referer': `https://www.bop.gov/locations/institutions/${code.toLowerCase()}/`
            }
        });

        const data = response.data;
        
        if (!data.Locations || data.Locations.length === 0) { throw new Error("Facility not found."); }
        const locationInfo = data.Locations[0];
        const physicalAddress = data.Addresses.find(addr => addr.addressType === "1") || {};
        const visitingInfo = data.Visiting[0] || {};
        const populationInfo = data.Popreport?.BOP.find(p => p.indentationIndicator === "N") || {};
        const facilityDetails = {
            code: locationInfo.code,
            name: locationInfo.nameTitle,
            description: locationInfo.faclTypeDescription,
            imageUrl: `https://www.bop.gov${locationInfo.imageNormal}`,
            address: `${physicalAddress.street}, ${physicalAddress.city}, ${physicalAddress.state} ${physicalAddress.zipCode}`,
            email: locationInfo.contactEmail,
            phone: locationInfo.phoneNumber,
            fax: physicalAddress.faxNumber ? `${physicalAddress.faxAreaCode}-${physicalAddress.faxNumber}` : 'N/A',
            inmateSex: locationInfo.gender === 'male' ? 'Male Offenders' : 'Female Offenders',
            population: populationInfo.popCount,
            county: physicalAddress.county,
            region: locationInfo.region,
        };
        res.status(200).json(facilityDetails);
    } catch (error) {
        console.error("Facility Details Error:", error);
        res.status(500).json({ message: "An error occurred while fetching facility details." });
    }
});

module.exports = router;
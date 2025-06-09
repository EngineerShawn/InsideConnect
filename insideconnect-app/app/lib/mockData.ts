/* eslint-disable prettier/prettier */
// c:/Users/Owner/Desktop/Shawn/InsideConnect - HeroUI/insideconnect-app/lib/mockData.ts
export const mockInmates = [
    {
        id: 1, // Note: Changed to number to match usage in InmateSearchPage
        name: "John D. Samuelson",
        docId: "A789-456123",
        photoUrl: "https://placehold.co/100x100/EFEFEF/333333?text=J.S.",
        facility: "Greenwood Federal Penitentiary",
        state: "Illinois",
        offense: "Racketeering",
        sentence: "25 Years",
        lastUpdate: "2024-05-15",
        race: "Caucasian",
        age: 45,
        gender: "Male",
    },
    {
        id: 2,
        name: "Maria Garcia",
        docId: "B123-987654",
        photoUrl: "https://placehold.co/100x100/EFEFEF/333333?text=M.G.",
        facility: "Oakdale Women's Correctional",
        state: "California",
        offense: "Drug Trafficking",
        sentence: "10 Years",
        lastUpdate: "2024-04-22",
        race: "Hispanic",
        age: 32,
        gender: "Female",
    },
    {
        id: 3,
        name: "Robert Smith",
        docId: "C456-112233",
        photoUrl: "https://placehold.co/100x100/EFEFEF/333333?text=R.S.",
        facility: "Riverside County Jail",
        state: "California",
        offense: "Aggravated Assault",
        sentence: "5 Years",
        lastUpdate: "2024-06-01",
        race: "African American",
        age: 28,
        gender: "Male",
    },
    {
        id: 4,
        name: "Chen Wei",
        docId: "D789-445566",
        photoUrl: "https://placehold.co/100x100/EFEFEF/333333?text=C.W.",
        facility: "North Lake Correctional Facility",
        state: "Michigan",
        offense: "Fraud",
        sentence: "15 Years",
        lastUpdate: "2024-03-10",
        race: "Asian",
        age: 51,
        gender: "Male",
    },
    {
        id: 5,
        name: "Samantha Miller",
        docId: "E111-223344",
        photoUrl: "https://placehold.co/100x100/EFEFEF/333333?text=S.M.",
        facility: "Florida State Prison",
        state: "Florida",
        offense: "Burglary",
        sentence: "7 Years",
        lastUpdate: "2024-05-28",
        race: "Caucasian",
        age: 24,
        gender: "Female",
    },
    {
        id: 6,
        name: "Michael Johnson",
        docId: "F987-654321",
        photoUrl: "https://placehold.co/100x100/EFEFEF/333333?text=M.J.",
        facility: "Cook County Jail",
        state: "Illinois",
        offense: "Robbery",
        sentence: "12 Years",
        lastUpdate: "2024-05-18",
        race: "African American",
        age: 35,
        gender: "Male",
    },
        {
        id: 7,
        photoUrl: "../lib/images/inmate_profile.png",
        name: "Tiffany Skiles",
        docId: "73307-509",
        age: 39,
        race: "White",
        sex: "Female",
        facility: "FCI Aliceville",
        state: "Alabama",
        releaseDate: "04/02/2027",
        lastUpdate: "2024-05-18"
    },
];

export const mockFacilities = [
    {
        id: "1", // Or number, ensure consistency with Facility type
        name: "Greenwood Federal Penitentiary",
        state: "Illinois",
        security: "Maximum",
        type: "Federal Prison", // Corrected from "Prison" to match filter options
        population: "Male",
        mailRules:
            "No staples, paper clips, or glitter. Photos must be 4x6 or smaller.",
        visitation: "Tues, Thurs, Sat: 8am - 3pm. Appointment required.",
    },
    {
        id: "2",
        name: "Oakdale Women's Correctional",
        state: "California",
        security: "Medium",
        type: "State Prison", // Corrected
        population: "Female",
        mailRules: "All mail is scanned. No contraband.",
        visitation: "Weekends only. Must be on approved list.",
    },
    {
        id: "3",
        name: "Riverside County Jail",
        state: "California",
        security: "Varies",
        type: "County Jail", // Corrected
        population: "Mixed",
        mailRules: "Postcards only.",
        visitation: "Video visitation available daily.",
    },
    {
        id: "4",
        name: "North Lake Correctional Facility",
        state: "Michigan",
        security: "Medium",
        type: "State Prison", // Corrected
        population: "Male",
        mailRules: "Standard restrictions apply.",
        visitation: "Contact facility for hours.",
    },
    {
        id: "5",
        name: "Florida State Prison",
        state: "Florida",
        security: "Maximum",
        type: "State Prison", // Corrected
        population: "Male",
        mailRules: "Strictly enforced mail policies.",
        visitation: "Limited, non-contact visits.",
    },
    {
        id: "6",
        name: "Cook County Jail",
        state: "Illinois",
        security: "Varies",
        type: "County Jail", // Corrected
        population: "Mixed",
        mailRules: "Mail must be sent via approved vendor.",
        visitation: "Schedule online.",
    },
        {
        id: "7",
        name: "FCI Aliceville",
        state: "Alabama",
        security: "Low",
        type: "Federal Prison", // Corrected
        population: "Female Offenders",
        mailRules: {
            FCIMail: [
                `INMATE NAME & REGISTER NUMBER
                FCI Aliceville
                Federal Correctional Institution
                P.O. Box 4000
                Aliceville, AL 35442`
            ],
            CampMail: [
                `INMATE NAME & REGISTER NUMBER
                FCI Aliceville
                Federal Correctional Institution
                Satellite Camp
                P.O. Box 487
                Aliceville, AL 35442`
            ]
        },
        Visitation: "You can only visit an inmate if they have placed you on their visiting list and you have been cleared by the BOP."  
    },
    //     {
    //     id: "8",
    //     name: "Cook County Jail",
    //     state: "Illinois",
    //     security: "Varies",
    //     type: "County Jail", // Corrected
    //     population: "Mixed",
    //     mailRules: "Mail must be sent via approved vendor.",
    //     visitation: "Schedule online.",
    // },
];

export const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
];

const { json } = require("stream/consumers")

{
    "http://www.bop.gov/PublicInfo/execute/inmateloc?todo=query&output=json&inmateNum=&nameFirst=&nameMiddle=&nameLast=&race=&age=&sex="
}

//  |-------------------- Endpoint ----------------|
                                                //  |------------------------------- Inmate parameters for call --------------------------------------|


// Gets a response callback like this:

json_response = 
    {
  "Captcha": false,
  "Messages": {

  },
  "FormToken": "pub70298info",
  "InmateLocator": [
    {
      "nameLast": "SKILES",
      "nameFirst": "TIFFANY",
      "nameMiddle": "MICHELLE",
      "sex": "Female",
      "race": "White",
      "age": "39",
      "inmateNum": "73307-509",
      "inmateNumType": "",
      "releaseCode": "",
      "faclCode": "ALI",
      "faclName": "Aliceville",
      "faclType": "FCI",
      "faclURL": "/locations/institutions/ali/",
      "projRelDate": "04/02/2027",
      "actRelDate": "",
      "suffix": ""
    },
  ],
}

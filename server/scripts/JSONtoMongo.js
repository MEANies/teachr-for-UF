'use strict';
// import config from "/config.js";
// import * as Listing from "./ListingSchema.js"
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config.js'),
    listingData = require('./courselisting.json');

/* Connect to your database */
var db = mongoose.connect(config.db.uri, {useMongoClient: true,});

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
*/
for (var i = 0; i < listingData.length; i++) {
  
  // as long as its not at the beginning or the end, and as long as the previous code is the same as the current
  while(i != 0 && listingData[i-1].code == listingData[i].code){
    i++;
    if(i == listingData.length) return;
  }

  var data = listingData[i];

  var code = data.code;

  var name = data.name;

  var description = data.description;

  var section_data = data.sections;
  
  var department_name = section_data[0].deptName;

  var building = "";
  var building_code = "";
  if(section_data[0].meetTimes[0]){
    building = section_data[0].meetTimes[0].meetBuilding;
    building_code = section_data[0].meetTimes[0].meetBldgCode;
  }

  var instructor_names = [];
  for(var k = 0; k < section_data[0].instructors.length; k++){
    instructor_names.push(section_data[0].instructors[k].name);
  }

  // office hours object
  var office_meetNo = 1;
  var office_meetDays = [""];
  var office_meetTimeBegin = "";
  var office_meetTimeEnd = "";
  var office_meetPeriodBegin = 0;
  var office_meetPeriodEnd = 0;
  var office_instructor = "";
  var office_locationABBREV = "";

  // var key = 0;
  // var values = false;

  //announcements object
  var header = "";
  var body = "";

  var listingDocument = new Listing({
    code: code,
    name: name,
    department: department_name,
    description: description,
    instructor_names: instructor_names,
    building: building,
    building_code: building_code,
    // office_hours: [{
    //     periods: {
    //       key: key,
    //       values: [{
    //         days:{
    //           key: key,
    //           values: values
    //         }    
    //       }]
    //     }
    // }],
    office_hours: [{
      office_meetNo: office_meetNo,
      office_meetDays: office_meetDays,
      office_meetTimeBegin: office_meetTimeBegin,
      office_meetTimeEnd: office_meetTimeEnd,
      office_meetPeriodBegin: office_meetPeriodBegin,
      office_meetPeriodEnd: office_meetPeriodEnd,
      office_instructor: office_instructor,
      office_locationABBREV: office_locationABBREV,
    }],
    announcements: [{
      header: header,
      body: body,
    }],
  });

  listingDocument.save(function(err){
    if (err) throw err;
    if(name != listingDocument.name) throw err;
    if(code != listingDocument.code) throw err;

  });
  console.log(listingDocument.code);
    console.log(listingDocument.building);
        console.log(listingDocument.building_code);


  /* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
  */
}



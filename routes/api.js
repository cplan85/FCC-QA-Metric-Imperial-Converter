'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
.get((req, res) => {
  const input = req.query.input;
  
 let initNum = convertHandler.getNum(input);


 const initUnit = convertHandler.getUnit(input);



 if (initUnit == "invalid unit" && initNum == "invalid number") {
  res.status(200)
      .type('text')
      .send('invalid number and unit');
 }

 else if (initUnit == "invalid unit") {
  res.status(200)
  .type('text')
  .send('invalid unit');
 }
  else if (initNum == "invalid number") {
  res.status(200)
  .type('text')
  .send('invalid number');
 }

 else {

  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const returnNum = convertHandler.convert(initNum, initUnit);
 
  const returnString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)


  let responseObj = { 
    initNum: initNum, 
    initUnit: initUnit, 
    returnNum: returnNum, 
    returnUnit: returnUnit, 
    string: returnString }
  
  res.json(responseObj);
 }


})

};

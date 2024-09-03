const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

const possibleUnits = ["gal", "l", "lbs", "kg", "mi", "km"];

suite("Unit Tests", function () {
  // #1
  test("convertHandler should correctly read a whole number input.", function () {
    let extractedNumber = convertHandler.getNum("4gal");
    assert.equal(extractedNumber, 4);
  });

  // #2
  test("convertHandler should correctly read a decimal number input.", function () {
    let extractedNumber = convertHandler.getNum("4.5gal");
    assert.equal(extractedNumber, 4.5);
  });

  // #3
  test("convertHandler should correctly read a fractional input.", function () {
    let extractedNumber = convertHandler.getNum("1/2gal");
    assert.equal(extractedNumber, 0.5);
  });

  // #4
  test("convertHandler should correctly read a fractional input with a decimal.", function () {
    let extractedNumber = convertHandler.getNum("1.5/2gal");

    assert.equal(extractedNumber, 0.75);
  });

  // #5
  test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", function () {
    let extractedNumber = convertHandler.getNum("3/2/3gal");

    assert.equal(extractedNumber, "invalid number");
  });

  // #6
  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function () {
    let extractedNumber = convertHandler.getNum("gal");

    assert.equal(extractedNumber, 1);
  });

  // #7
  test("convertHandler should correctly read each valid input unit.", function () {
    function getRandomUnit(units) {
      const randomIndex = Math.floor(Math.random() * units.length);
      return units[randomIndex];
    }

    const randomUnit = getRandomUnit(possibleUnits);

    let extractedUnit = convertHandler.getUnit("2.2302344/1" + randomUnit);
    console.log(extractedUnit, randomUnit);
    assert.notEqual(extractedUnit, "invalid unit");
  });

  // #8
  test("should correctly return an error for an invalid input unit.", function () {
    //  const possibleUnits = ["gal", "l", "lbs", "kg", "mi", "km" ];

    function getRandomString(length) {
      const characters = "CDEFHIJNOPQRSTUVWXYZacdefghijnopqrstuvwxyz";
      let result = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return result;
    }

    const randomLength = Math.floor(Math.random() * 3) + 1;
    const randomString = getRandomString(randomLength);

    let extractedUnit = convertHandler.getUnit("2.2302344/1" + randomString);
    console.log(randomString, "Invalid String");
    assert.equal(extractedUnit, "invalid unit");
  });

  // #9
  test("should correctly return an error for an invalid input unit.", function () {
    //  const possibleUnits = ["gal", "l", "lbs", "kg", "mi", "km" ];

    function getRandomString(length) {
      const characters = "CDEFHIJNOPQRSTUVWXYZacdefghijnopqrstuvwxyz";
      let result = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return result;
    }

    const randomLength = Math.floor(Math.random() * 3) + 1;
    const randomString = getRandomString(randomLength);

    let extractedUnit = convertHandler.getUnit("2.2302344/1" + randomString);
    assert.equal(extractedUnit, "invalid unit");
  });

  // #10
  test("convertHandler should return the correct return unit for each valid input unit.", function () {
    function getRandomUnit(units) {
      const randomIndex = Math.floor(Math.random() * units.length);
      return units[randomIndex];
    }

    const returnValues = {
      gal: "L",
      l: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi",
    };

    const randomUnit = getRandomUnit(possibleUnits);
    let returnedUnit = convertHandler.getReturnUnit(randomUnit);

    assert.equal(returnedUnit, returnValues[randomUnit]);
  });

  // #11
  test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", function () {
    function getRandomUnit(units) {
      const randomIndex = Math.floor(Math.random() * units.length);
      return units[randomIndex];
    }

    const returnValues = {
      gal: "gallon",
      L: "liter",
      lbs: "pound",
      kg: "kilogram",
      mi: "mile",
      km: "kilometer",
    };

    const randomUnit = getRandomUnit(possibleUnits);
    let spelloutReturnedUnit = convertHandler.spellOutUnit(randomUnit);

    assert.equal(spelloutReturnedUnit, returnValues[randomUnit]);
  });

  // #12
  test("convertHandler should correctly convert gal to L.", function () {
    let randomNumber = Math.floor(Math.random() * 50) + 1;
    let convertedFromGal = convertHandler.convert(randomNumber, "gal");
    const finalValue = randomNumber * 3.78541;

    assert.equal(convertedFromGal, parseFloat(finalValue.toFixed(5)));
  });

  // #13
  test("convertHandler should correctly convert L to gal.", function () {
    let randomNumber = Math.floor(Math.random() * 50) + 1;
    let convertedFromGal = convertHandler.convert(randomNumber, "L");

    const finalValue = randomNumber / 3.78541;

    assert.equal(convertedFromGal, parseFloat(finalValue.toFixed(5)));
  });

  // #14
  test("convertHandler should correctly convert mi to km.", function () {
    let randomNumber = Math.floor(Math.random() * 50) + 1;
    let convertedFromMi = convertHandler.convert(randomNumber, "mi");

    assert.equal(convertedFromMi, randomNumber * 1.60934);
  });

  // #15
  test("convertHandler should correctly convert km to mi.", function () {
    let randomNumber = Math.floor(Math.random() * 50) + 1;
    let convertedFromKm = convertHandler.convert(randomNumber, "km");

    const finalValue = randomNumber / 1.60934;

    assert.equal(convertedFromKm, parseFloat(finalValue.toFixed(5)));
  });

  // #16
  test("convertHandler should correctly convert lbs to kg.", function () {
    let randomNumber = Math.floor(Math.random() * 50) + 1;
    let convertedFromLbs = convertHandler.convert(randomNumber, "lbs");

    const finalValue = randomNumber * 0.453592;

    assert.equal(convertedFromLbs, parseFloat(finalValue.toFixed(5)));
  });

  // #17
  test("convertHandler should correctly convert kg to lbs.", function () {
    let randomNumber = Math.floor(Math.random() * 50) + 1;
    let convertedFromKg = convertHandler.convert(randomNumber, "kg");

    const finalValue = randomNumber / 0.453592;

    assert.equal(convertedFromKg, parseFloat(finalValue.toFixed(5)));
  });
});

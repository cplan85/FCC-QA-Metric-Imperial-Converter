function ConvertHandler() {
  
  this.getNum = function(input) {
    console.log(input, "NUMBER INPUT")
    
    function extractNumber(input) {
        let match = input.match(/[\d.\/]+/);
        return match ? match[0] : null;
    }

    function evaluateFraction(fraction) {
        let parts = fraction.split('/');
        if (parts.length === 2) {
            let numerator = parseFloat(parts[0]);
            let denominator = parseFloat(parts[1]);
            if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
                return numerator / denominator;
            } else {
                return "invalid number";
            }
        }
        return isNaN(parseFloat(fraction)) ? "invalid number" : parseFloat(fraction);
    }

    let numberString = extractNumber(input);
  
    if (numberString === null ) {
      return  1;
  }
  /*
    if ( /\/{2,}/.test(numberString) || /\/$/.test(numberString) ) {
        return "invalid number";
    }
    */

    if ( /\/{2,}/.test(numberString) || /\/$/.test(numberString) || (numberString.match(/\//g) || []).length > 1) {
      return "invalid number";
  }

    


    let result = evaluateFraction(numberString);
    
    return result;
};


  const possibleUnits = ["gal", "l", "lbs", "kg", "mi", "km" ]
  
  this.getUnit = function(input) {

    function extractUnit(input) {
      let match = input.match(/[a-zA-Z]+/);
      let result;

      match ? result = match[0].toLowerCase() : result = "invalid unit";

      if (!possibleUnits.includes(result)) {
        return "invalid unit";
      }

      result == "l" ? result = "L" : result = result;

      return result;
  }

  let result = extractUnit(input)
    
  
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    
    let result;

    let parsedintUnit = initUnit.toLowerCase()


  switch (parsedintUnit) {
      case "gal":
        result = "L";
        break;
      case "l":
        result = "gal";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result =  "mi";
        break;
        default:
          result = "invalid unit"
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    switch (unit) {
      case "gal":
        result = "gallon";
        break;
      case "L":
        result = "liter";
        break;
      case "lbs":
        result = "pound";
        break;
      case "kg":
        result = "kilogram";
        break;
      case "mi":
        result = "mile";
        break;
      case "km":
        result =  "kilometer";
        break;
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "gal":
        result = galToL * initNum;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "lbs":
        result = lbsToKg * initNum;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = miToKm * initNum;
        break;
      case "km":
        result =  initNum / miToKm;
        break;
    }

    result = parseFloat(result.toFixed(5) );

    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    let self = this;

    let spelledOutUnits =  self.spellOutUnit(initUnit);
    let spelledOutReturnUnits =  self.spellOutUnit(returnUnit);

    
    let result = `${initNum} ${spelledOutUnits}s converts to ${returnNum} ${spelledOutReturnUnits}s`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;

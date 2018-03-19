const fs = require("fs");

class Politician {
  constructor(arr) {
    this.name = arr[0];
    this.party = arr[1];
    this.location = arr[2];
    this.grade_current = arr[3];
  }
}

class PoliticianParser {
  static generatePoliticians(file, callback) {
    let stringFile = fs.readFile(file, 'utf8', function(err, data) {
      if(err) {
        console.log(err);
      }
      let rows = data.split('\n');
      let arrPoliticianValues;
      let hasil = [];
      let tmpObj;
      for(let i = 1; i < rows.length; i++) {
        arrPoliticianValues = rows[i].split(",");
        if(arrPoliticianValues != '') {
          tmpObj = new Politician(arrPoliticianValues);
          hasil.push(tmpObj);
        }
      }
      callback(hasil);
    });
  }
}

module.exports = {Politician, PoliticianParser};

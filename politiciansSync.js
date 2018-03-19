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
  constructor(file) {
    this.file = file;
    this.politicians = [];
  }

  generatePoliticians() {
    let stringFile = fs.readFileSync(this.file).toString();
    let rows = stringFile.split('\n');
    let arrPoliticianValues;
    let tmpObj;
    for(let i = 1; i < rows.length; i++) {
      arrPoliticianValues = rows[i].split(",");
      if(arrPoliticianValues != '') {
        tmpObj = new Politician(arrPoliticianValues);
        this.politicians.push(tmpObj);
      }
    }
  }

  addPerson(politician) {
    this.politicians.push(politician);
  }
}

module.exports = {Politician, PoliticianParser};

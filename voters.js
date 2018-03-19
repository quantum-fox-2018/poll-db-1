const fs = require("fs");

class Voters {
  constructor(arr) {
    this.first_name = arr[0];
    this.last_name = arr[1];
    this.gender = arr[2];
    this.age = arr[3];
  }
}

class VotersParser {
  static generateVoters(file, callback) {
    let stringFile = fs.readFile(file, 'utf8', function(err, data) {
      if(err) {
        console.log(err);
      }
      let rows = data.split('\n');
      let arrVotersValues;
      let hasil = [];
      let tmpObj;
      for(let i = 1; i < rows.length; i++) {
        arrVotersValues = rows[i].split(",");
        if(arrVotersValues != '') {
          tmpObj = new Voters(arrVotersValues);
          hasil.push(tmpObj);
        }
      }
      callback(hasil);
    });
  }
}

module.exports = {Voters, VotersParser};

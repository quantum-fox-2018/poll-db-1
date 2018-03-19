const fs = require("fs");

class Votes {
  constructor(arr) {
    this.politicians_id = arr[1];
    this.voters_id = arr[0];
  }
}

class VotesParser {
  static generateVotes(file, callback) {
    let stringFile = fs.readFile(file, 'utf8', function(err, data) {
      if(err) {
        console.log(err);
      }
      let rows = data.split('\n');
      let arrVotesValues;
      let hasil = [];
      let tmpObj;
      for(let i = 1; i < rows.length; i++) {
        arrVotesValues = rows[i].split(",");
        if(arrVotesValues != '') {
          tmpObj = new Votes(arrVotesValues);
          hasil.push(tmpObj);
        }
      }
      callback(hasil);
    });
  }
}

module.exports = {Votes, VotesParser};

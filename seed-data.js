var sqlite3 = require('sqlite3').verbose();
const fs = require('fs')

var db = new sqlite3.Database('./poll.db');

function readFileCSV(file, cb) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    cb(data)
  })
}

function insertSeedData(tableName, file) {
  readFileCSV(file, (data) => {
    data = data.split('\n')

    db.serialize(function () {
      let key = data[0].split(',')
      let text = []
      for (let j = 0; j < key.length; j++) {
        text.push('?')
      }

      var stmt = db.prepare(`INSERT INTO ${tableName} VALUES (null, ${text.join(',')})`);

      for (let i = 1; i < data.length; i++) {
        let arr = data[i].split(',')

        let value = []
        for (let j = 0; j < arr.length; j++) {
          value.push(arr[j])
        }
        stmt.run(value);
      }
      stmt.finalize();
    })
    console.log(`Berhasil memasukan data ${tableName}`);
    db.close();
  })
}

insertSeedData('Politicians', './politicians.csv')
insertSeedData('Voters', './voters.csv')
insertSeedData('Votes', './votes.csv')
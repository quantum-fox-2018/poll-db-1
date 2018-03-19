const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("poll-db1.db");

class DbManipulation{
  static readCSV(file_path, cbData){
    fs.readFile(file_path, 'utf8', (err, data) =>{
      if(err){
          console.log(err);
      }else {
          cbData(data.trim().split('\n'));
      }
    })
  };

  static showCSV(data){
      console.log(JSON.stringify(data));
  }

  static insertToVoters(Votersdata){
      for(let i = 1; i < Votersdata.length; i++){
          let barisData = Votersdata[i].split(',');

          let first_name = barisData[0];
          let last_name = barisData[1];
          let gender = barisData[2];
          let age = parseInt(barisData[3])

          let query = `INSERT INTO voters
                       VALUES (NULL, "${first_name}",
                       "${last_name}", "${gender}", ${age});`;
          db.run(query);

          // db.close();
          // console.log(query);
      }
  }

  static insertToVotes(votesCSV){
      for(let i = 1; i < votesCSV.length; i++){
          let barisData = votesCSV[i].split(',');

          let voterId = parseInt(barisData[0]);
          let politicianId = parseInt(barisData[1]);

          let query = `INSERT INTO votes
                       VALUES (NULL, ${voterId}, ${politicianId});`
          db.run(query);

          // db.close();
      }
  }

  static insertToPoliticians(politiciansCSV){
      for(let i = 1; i < politiciansCSV.length; i++){
          let barisData = politiciansCSV[i].split(',');

          let politicianName = barisData[0];
          let party = barisData[1];
          let location = barisData[2];
          let grade_current = parseFloat(barisData[3]);
          // console.log(grade_current);
          let query = `INSERT INTO politicians
                       VALUES (NULL, "${politicianName}",
                       "${party}", "${location}", ${grade_current});`
          db.run(query);
          // console.log(query);
          // db.close();
      }
  }

  static insertToTable(tableName, tableValues){
    let query = '';

    switch (tableName + '|'+ tableValues.length) {
      case undefined:
          query = '';

      case 'politicians|4':
          let politicianName = tableValues[0];
          let party = tableValues[1];
          let location = tableValues[2];
          let grade_current = tableValues[3];
          query = `INSERT INTO politicians
                   VALUES (NULL, "${politicianName}",
                   "${party}", "${location}", ${grade_current});`
          break;

      case 'votes|2':
          let voterId = tableValues[0];
          let politicianId = tableValues[1];

          query = `INSERT INTO votes
                   VALUES (NULL, ${voterId}, ${politicianId});`
          break;

      case 'voters|4':
          let first_name = tableValues[0];
          let last_name = tableValues[1];
          let gender = tableValues[2];
          let age = tableValues[3];

          query = `INSERT INTO voters
                   VALUES (NULL, "${first_name}",
                   "${last_name}", "${gender}", ${age});`;
          break;

      default:

    }

    if(query.length != 0){
        db.run(query);
        // console.log(query);
    }else{
        console.log('Isi Nama Table');
    }
  }

  //baru bisa satu satu
  static updateTable(tableName, id, columnName, setValues){

    switch (tableName) {
      case undefined:
          return `tabel name belum ada`;

      case 'politicians':
          db.all(`SELECT * FROM ${tableName} WHERE id = ${id}`, (err, result) => {
              if(err){
                console.log(err);
              }else{
                // console.log(result);
                let name = result[0].name;
                let party = result[0].party;
                let location = result[0].location;
                let grade_current = result[0].grade_current;

                if(columnName == 'name'){
                    name = setValues;
                }else if (columnName == 'party') {
                    party = setValues;
                }else if (columnName == 'location') {
                    location = setValues;
                }else if (columnName == 'grade_current') {
                    location = setValues;
                }else{
                    return console.log('Column tidak ada');
                }

                db.run(`UPDATE ${tableName} SET name = "${name}", party = "${party}",
                        location = "${location}", grade_current = ${grade_current}
                        WHERE id = ${id};`);
              }
          });
          break;

      case 'votes':
          db.all(`SELECT * FROM ${tableName} WHERE id = ${id}`, (err, result) => {
              if(err){
                console.log(err);
              }else{
                // console.log(result);
                let voterId = result[0].voterID;
                let politicianId = result[0].politicianId;

                if(columnName == 'voterId'){
                    voterId = setValues;
                }else if (columnName == 'politicianId') {
                    politicianId = setValues;
                }else{
                    return console.log('Column tidak ada');
                }

                db.run(`UPDATE ${tableName} SET voterID = "${voterId}", politicianId = "${politicianId}"
                        WHERE id = ${id};`);
              }
          });
          break;

      case 'voters':
          db.all(`SELECT * FROM ${tableName} WHERE id = ${id}`, (err, result) => {
              if(err){
                console.log(err);
              }else{
                // console.log(result);
                let first_name = result[0].first_name;
                let last_name = result[0].last_name;
                let gender = result[0].gender;
                let age = result[0].age;

                if(columnName == 'first_name'){
                    first_name = setValues;
                }else if (columnName == 'last_name') {
                    last_name = setValues;
                }else if (columnName == 'gender') {
                    gender = setValues;
                }else if (columnName == 'age') {
                    age = setValues;
                }else{
                    return console.log('Column tidak ada');
                }

                db.run(`UPDATE ${tableName} SET first_name = "${first_name}", last_name = "${last_name}",
                        gender = "${gender}", age = ${age}
                        WHERE id = ${id};`);
              }
          });
          break;

      default:

    }

  }

  static deleteTable(tableName, id){
    let sql = `DELETE FROM ${tableName} WHERE id = ${id};`
    db.run(sql, (err, results) =>{
      if(err){
        console.log(err);
      }else{
        console.log(`data ${id} berhasil di hapus dari tabel ${tableName};`);;
      }
    });
  }
}

//baca csv politicians
// DbManipulation.readCSV('./politicians.csv', DbManipulation.insertToPoliticians);

//baca csv votes
// DbManipulation.readCSV('./votes.csv', DbManipulation.insertToVotes);

//baca csv voters
// DbManipulation.readCSV('./voters.csv', DbManipulation.insertToVoters);


//Insert 1 rows ke table
//parameter ke dua harus array
//DbManipulation.insertToTable('votes', [151, 20]);
//DbManipulation.insertToTable('voters', ["Dani", "Damara", "Male", 26]);
//DbManipulation.insertToTable('politicians', ["Trump Donald", "D", "NY", 9.234241334]);

//Update Data
//rules updateTable(tableName, id, columnName, setValues)
// DbManipulation.updateTable('voters', 151, 'gender', 'male');

//delete Data
// DbManipulation.deleteTable('politicians', 41);

class Query{
  static createDatabase(db){
    db.serialize(()=>{
      db.run("CREATE TABLE IF NOT EXISTS politicians (politician_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), party VARCHAR(50), location VARCHAR(50), grade_current REAL)");
      db.run("CREATE TABLE IF NOT EXISTS voters (voter_id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), gender VARCHAR(50), age INTEGER)");
      db.run("CREATE TABLE IF NOT EXISTS votes (voter_politician_id INTEGER PRIMARY KEY AUTOINCREMENT, voter_id INTEGER, politician_id INTEGER)");
    });
  }

  static insertIntoDatabase(data,table_name,db){
    db.serialize(()=>{
      let query;
      switch(table_name){
        case 'politicians':
          query = 'INSERT INTO politicians VALUES';
          break;
        case 'voters':
          query = 'INSERT INTO voters VALUES';
          break;
        case 'votes':
          query = 'INSERT INTO votes VALUES';
          break;
      }

      for(let index in data){
        let currentData = data[index].split(',');
        if(index == data.length-1){
          switch(table_name){
            case 'politicians':
              query = query + ` (null,"${currentData[0]}","${currentData[1]}","${currentData[2]}","${currentData[3]}");`;
              break;
            case 'voters':
              query = query + ` (null,"${currentData[0]}","${currentData[1]}","${currentData[2]}","${currentData[3]}");`;
              break;
            case 'votes':
              query = query + ` (null, "${currentData[0]}","${currentData[1]}");`;
              break;
          }
        } else {
          switch(table_name){
            case 'politicians':
              query = query + ` (null,"${currentData[0]}","${currentData[1]}","${currentData[2]}","${currentData[3]}") ,`;
              break;
            case 'voters':
              query = query + ` (null,"${currentData[0]}","${currentData[1]}","${currentData[2]}","${currentData[3]}") ,`;
              break;
            case 'votes':
              query = query + ` (null, "${currentData[0]}","${currentData[1]}") ,`;
              break;
          }
        }
      }

      db.run(query);
    });
  }

  static insertNewData(data, table_name, db){
    switch(table_name){
      case 'politicians':
        db.run(`INSERT INTO politicians VALUES (null,"${data[4]}","${data[5]}","${data[6]}","${data[7]}")`);
        break;
      case 'voters':
        db.run(`INSERT INTO voters VALUES (null,"${data[4]}","${data[5]}","${data[6]}","${data[7]}")`);
        break;
      case 'votes':
          db.run(`INSERT INTO votes VALUES ("${data[4]}","${data[5]}")`);
        break;
    }

    db.close();
  }


  static updateData(data, table_name, db){
    switch(table_name){
      case 'politicians':
        db.run(`UPDATE politicians SET ${data[5]} = "${data[6]}" WHERE politician_id = ${data[4]}`);
        break;
      case 'voters':
        db.run(`UPDATE voters SET ${data[5]} = "${data[6]}"  WHERE voter_id = ${data[4]}`);
        break;
      case 'votes':
          db.run(`UPDATE votes SET ${data[5]} = "${data[6]}"  WHERE politician_voter_id = ${data[4]}`);
        break;
    }

    db.close();
  }

  static deleteData(data, table_name, db){
    switch(table_name){
      case 'politicians':
        db.run(`DELETE FROM politicians WHERE politician_id = "${data[4]}"`);
        break;
      case 'voters':
        db.run(`DELETE FROM voters WHERE voter_id = "${data[4]}"`);
        break;
      case 'votes':
          db.run(`DELETE FROM votes WHERE politician_voter_id = "${data[4]}"`);
        break;
    }

    db.close();
  }

  static politicianR(db){
    db.each('SELECT name, party, grade_current FROM politicians WHERE party = "R" AND grade_current BETWEEN 9 AND 11', function(err, row) {
      console.log(row);
    });
  }

  static jmlVoteOlympia(db){
    db.each('SELECT COUNT(*) AS totalVote, name FROM politicians LEFT JOIN votes ON politicians.politician_id = votes.politician_id WHERE politicians.name = "Olympia Snowe"', function(err, row) {
      console.log(row);
    });
  }

  static jmlVoteAdam(db){
    db.each('SELECT name, (SELECT COUNT(*) FROM votes WHERE politicians.politician_id = votes.politician_id)  AS totalVote FROM politicians WHERE politicians.name LIKE "Adam%"', function(err, row) {
      console.log(row);
    });
  }

  static politicianMostVotes(db){
    db.each('SELECT name, (SELECT COUNT(*) FROM votes WHERE politicians.politician_id = votes.politician_id)  AS totalVote FROM politicians ORDER BY totalVote DESC LIMIT 3', function(err, row) {
      console.log(row);
    });
  }

  static votingOlympia(db){
    db.each('SELECT first_name, last_name, gender, age FROM voters LEFT JOIN votes ON voters.voter_id = votes.voter_id LEFT JOIN politicians ON votes.politician_id = politicians.politician_id WHERE politicians.name = "Olympia Snowe"', function(err, row) {
      console.log(row);
    });
  }
}


module.exports = Query;

class Model {
  static addDataPolitician(dataPoliticians) {
    db.serialize(function() {
      let stmt = db.prepare("INSERT INTO Politicians (name, party, location, grade_current) VALUES (?, ?, ?, ?)");
      for (var i = 0; i < dataPoliticians.length; i++) {
        stmt.run(dataPoliticians[i].name, dataPoliticians[i].party, dataPoliticians[i].location, dataPoliticians[i].grade_current);
      }
      stmt.finalize();
    });
    db.close();
  }

  static addDataVoters(dataVoters) {
    db.serialize(function() {
      let stmt = db.prepare("INSERT INTO Voters (first_name, last_name, gender, age) VALUES (?, ?, ?, ?)");
      for (var i = 0; i < dataVoters.length; i++) {
        stmt.run(dataVoters[i].first_name, dataVoters[i].last_name, dataVoters[i].gender, dataVoters[i].age);
      }
      stmt.finalize();
    });
    db.close();
  }

  static addDataVotes(dataVotes) {
    db.serialize(function() {
      let stmt = db.prepare("INSERT INTO Votes (politicians_id, voters_id) VALUES (?, ?)");
      for (var i = 0; i < dataVotes.length; i++) {
        stmt.run(dataVotes[i].politicians_id, dataVotes[i].voters_id);
      }
      stmt.finalize();
    });
    db.close();
  }

  static deleteData(database, id) {
    db.serialize(function() {
      db.run(`DELETE ${database} WHERE id = ${id}`);
    });
    db.close();
  }

  static updateData(database, kolom, data, id) {
    db.serialize(function() {
      db.run(`UPDATE ${database} SET ${kolom} = "${data}" WHERE id = ${id}`);
    });
    db.close();
  }
}

module.exports = Model;

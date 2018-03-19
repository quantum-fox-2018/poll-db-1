//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const fs = require('fs');

db.serialize(function(){
  readData('./politicians.csv', function(data){
    let politicians = []
    data = data.split('\n')

    for (var i = 1; i < data.length; i++) {
      let temp = data[i].split(",")
      if (temp[0]) {
        let politician = {name: temp[0], party:temp[1], location:temp[2], grade_current:temp[3]}
        politicians.push(politician)
      }
    }

    let insertPoliticiansQuery = "INSERT INTO politicians VALUES (NULL, ?, ?, ?, ?)"

    for (var i = 0; i < politicians.length; i++) {
          db.run(insertPoliticiansQuery, politicians[i].name, politicians[i].party, politicians[i].location, politicians[i].grade_current)
    }
    db.close()
    })

  readData('./voters.csv', function(data){
    let voters = []
    data = data.split('\n')
    for (let i = 1; i < data.length; i++) {
      let temp = data[i].split(",")
      if (temp[0]) {
        let voter = {firstName: temp[0], lastName: temp[1], gender:temp[2], age: temp[3] }
        voters.push(voter)
      }
    }

    let insertVotersQuery = "INSERT INTO voters VALUES (NULL, ?, ?, ?, ?)"

    for (let i = 0; i < voters.length; i++) {
      db.run(insertVotersQuery, voters[i].firstName, voters[i].lastName, voters[i].gender, voters[i].age )
    }
    db.close()
  })

  readData('./votes.csv', function(data){
    let votes = []
    data = data.split('\n')
    //voterId,politicianId
    for (let i = 1; i < data.length; i++) {
      let temp = data[i].split(",")
      if (temp[0]) {
        let vote = {voterId: temp[0], politicianId: temp[1]}
        votes.push(vote)
      }
    }

    let insertVotesQuery = "INSERT INTO votes VALUES (NULL, ?, ?)"

    for (let i = 0; i < votes.length; i++) {
      db.run(insertVotesQuery, votes[i].voterId, votes[i].politicianId)
    }
    db.close()
  })
})


function readData(path, callback){
  fs.readFile(path, (err, data) => {
    callback(data.toString())
  });
}

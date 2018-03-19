const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db')

let politicians_data = fs.readFileSync('./politicians.csv').toString().trim().split('\n')
let voters_data = fs.readFileSync('./voters.csv').toString().trim().split('\n')
let votes_data = fs.readFileSync('./votes.csv').toString().trim().split('\n')

// console.log(politicians_data[0].split(',')[1])

db.serialize((err) => {
    if(err){
        console.log(err)
    }
    console.log('Successfully connected to poll.db')
    let stmt1 = db.prepare('INSERT INTO Politicians (name, party, location, grade_current) VALUES(?,?,?,?)')
    for(let i=1; i<politicians_data.length; i++){
        let name = politicians_data[i].split(',')[0]
        let party = politicians_data[i].split(',')[1]
        let location = politicians_data[i].split(',')[2]
        let grade_current = politicians_data[i].split(',')[3]

        stmt1.run(name,party,location,grade_current)
    }
    stmt1.finalize((err) => {
        if(err){
            console.log(err)
        }
        console.log('Insert Politicians Data has been Success')
    })


    let stmt2 = db.prepare('INSERT INTO Voters (first_name, last_name, gender, age) VALUES (?,?,?,?)')
    for(let i=1; i<voters_data.length; i++){
        let first_name = voters_data[i].split(',')[0]
        let last_name = voters_data[i].split(',')[1]
        let gender = voters_data[i].split(',')[2]
        let age = voters_data[i].split(',')[3]

        stmt2.run(first_name,last_name,gender,age)
    }
    stmt2.finalize((err) => {
        if(err){
            console.log(err)
        }
        console.log('Insert Voters Data has been Success')
    })

    let stmt3 = db.prepare('INSERT INTO Votes (voter_id, politician_id) VALUES (?,?)')
    for(let i=1; i<votes_data.length; i++){
        let voter_id = votes_data[i].split(',')[0]
        let pol_id = votes_data[i].split(',')[1]

        stmt3.run(voter_id, pol_id)
    }
    stmt3.finalize((err) => {
        if(err){
            console.log(err)
        }
        console.log('Insert Voting Data has been Success')
    })


})



db.close((err) => {
    if(err){
      console.log(err)
    }
    console.log('Close database poll.db connection')
})
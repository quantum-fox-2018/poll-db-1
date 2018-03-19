// import { log } from 'util';

const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./congress.db')

class Model {

    static getPolitician () {

      fs.readFile('./politicians.csv','utf8',(err, data) => {

        if (err) throw err 
        
        let rawDataPoliticians = data.trim().split('\n')
        for (let i = 1; i < rawDataPoliticians.length; i++) {
            
            let dataPolitician = rawDataPoliticians[i].split(',')
            let politician = new Politicians(dataPolitician[0], dataPolitician[1], dataPolitician[2], dataPolitician[3])
            
            // console.log(politician.name);
            
            db.run(`INSERT INTO politicians (name, party, location, grade_current) VALUES ("${politician.name}", "${politician.party}", "${politician.location}", "${politician.gradeCurrent}")`)
        }
      })
    }

    static getVoters () {

        fs.readFile('./voters.csv','utf8',(err, data) => {

            if (err) throw err

            let rawDataVoters = data.trim().split('\n')

            for (let i = 1; i < rawDataVoters.length; i++) {
                
                let dataVoters = rawDataVoters[i].split(',')
                let voter = new Voters(dataVoters[0], dataVoters[1], dataVoters[2], dataVoters[3])

                // console.log(voter[0]);
                
                db.run(`INSERT INTO voters (firstName, lastName, gender, age) VALUES ("${voter.firstName}", "${voter.lastName}", "${voter.gender}", "${voter.age}")`)
            }
        })
    }

    static getVotes () {

        fs.readFile('./votes.csv','utf8',(err, data) => {

            if (err) throw err

            let rawDataVotes = data.trim().split('\n')

            for (let i = 1; i < rawDataVotes.length; i++) {
                
                let dataVotes = rawDataVotes[i].split(',')
                let vote = new Votes(dataVotes[0], dataVotes[1])
                db.run(`INSERT INTO votes (id_politician, id_voter) VALUES ("${vote.politicianID}", "${vote.voterID}")`)
            }
        })
    }
}

Model.getPolitician()
Model.getVoters()
Model.getVotes()

class Politicians {

    constructor(name, party, location, gradeCurrent) {

        this.name = name
        this.party = party
        this.location = location
        this.gradeCurrent = gradeCurrent
    }
}

class Voters {

    constructor(firstName, lastName, gender, age) {

        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.age = age
    }
}

class Votes {

    constructor (politicianID, voterID) {

        this.politicianID = politicianID
        this.voterID = voterID
    }
}

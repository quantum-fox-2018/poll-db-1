const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./pemilu.db')
var Table = require('cli-table');

var table1 = new Table({
    head: ['NAME', 'PARTY', 'GRADE CURRENT']
  , colWidths: [30,30,30]
});

var table2 = new Table({
    head: ['TOTAL VOTE', 'POLITICIAN NAME']
  , colWidths: [30,30]
});

var table3 = new Table({
    head: ['POLITICIAN NAME','TOTAL VOTE']
  , colWidths: [30,30]
});

var table4 = new Table({
    head: ['TOTAL VOTE','POLITICIAN NAME','PARTY','LOCATION']
  , colWidths: [30,30,30,30]
});

var table5 = new Table({
    head: ['FIRST NAME','LAST NAME','GENDER','AGE']
  , colWidths: [30,30,30,30]
});

db.serialize(()=>{
  db.all(`SELECT name,party,grade_current FROM politicians WHERE party='R'
          AND grade_current between 9 AND 11`,((err,data)=>{
            if(err) console.log(err)
            else
            console.log('EXERCISE NUMBER 1');
            for (var i = 0; i < data.length; i++) {
              table1.push(
                [data[i].name, data[i].party, data[i].grade_current],
                );
            }

            console.log(table1.toString());
            console.log('\n');
  }))

  db.all(`SELECT COUNT(*) as totalVote,politicians.name from votes JOIN politicians ON votes.politicianId = politicians.politicianId
          WHERE politicians.name='Olympia Snowe'`,((err,data)=>{
            if(err) console.log(err)
            else
            console.log('EXERCISE NUMBER 2');
            for (var i = 0; i < data.length; i++) {
              table2.push(
                [data[i].totalVote, data[i].name],
                );
            }

            console.log(table2.toString());
            console.log('\n');
  }))

  db.all(`SELECT politicians.name,COUNT(*) as totalVote from votes JOIN politicians ON votes.politicianId = politicians.politicianId
          WHERE politicians.name LIKE '%Adam%' GROUP BY politicians.politicianId`,((err,data)=>{
            if(err) console.log(err)
            else
            console.log('EXERCISE NUMBER 3');
            for (var i = 0; i < data.length; i++) {
              table3.push(
                [data[i].name, data[i].totalVote],
                );
            }

            console.log(table3.toString());
            console.log('\n');
  }))

  db.all(`SELECT COUNT(*) as totalVote,P.name,P.party,P.location from votes JOIN politicians AS P ON votes.politicianId = P.politicianId
          GROUP BY P.politicianId ORDER BY totalVote DESC LIMIT 3`,((err,data)=>{
            if(err) console.log(err)
            else
            console.log('EXERCISE NUMBER 4');
            for (var i = 0; i < data.length; i++) {
              table4.push(
                [data[i].totalVote,data[i].name,data[i].party,data[i].location],
                );
            }

            console.log(table4.toString());
            console.log('\n');
  }))

  db.all(`SELECT V.first_name,V.last_name,V.gender,V.age from votes
          JOIN politicians AS P ON votes.politicianId = P.politicianId
          JOIN voters AS V ON votes.voterId = V.voterId
          WHERE P.name='Olympia Snowe'
          GROUP BY V.voterId`,((err,data)=>{
            if(err) console.log(err)
            else
            console.log('EXERCISE NUMBER 5');
            for (var i = 0; i < data.length; i++) {
              table5.push(
                [data[i].first_name,data[i].last_name,data[i].gender,data[i].age],
                );
            }

            console.log(table5.toString());
            console.log('\n');
  }))

})

db.close();

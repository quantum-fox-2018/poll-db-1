const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./pemilu.db')

var pol_csv = fs.readFileSync('politicians.csv','utf8')
  .toString()
  .trim()
  .split("\n")

var voter_csv = fs.readFileSync('voters.csv','utf8')
  .toString()
  .trim()
  .split("\n")

var vote_csv = fs.readFileSync('votes.csv','utf8')
  .toString()
  .trim()
  .split("\n")


var arrPol=[]
for (let i = 0; i < pol_csv.length; i++) {
  var splitPol = pol_csv[i].split(',')
  arrPol.push(splitPol)
}

var arrObjPol=[]
for (let i = 1; i < arrPol.length; i++) {
  objPol={}
  for (let j = 0; j < arrPol[i].length; j++) {
    objPol[arrPol[0][j]] = arrPol[i][j]

  }
  arrObjPol.push(objPol)
}



var arrVoter=[]
for (let i = 0; i < voter_csv.length; i++) {
  var splitVoter = voter_csv[i].split(',')
  arrVoter.push(splitVoter)
}

var arrObjVoter=[]
for (let i = 1; i < arrVoter.length; i++) {
  objVoter={}
  for (let j = 0; j < arrVoter[i].length; j++) {
    objVoter[arrVoter[0][j]] = arrVoter[i][j]

  }
  arrObjVoter.push(objVoter)
}


var arrVote=[]
for (let i = 0; i < vote_csv.length; i++) {
  var splitVote = vote_csv[i].split(',')
  arrVote.push(splitVote)
}

var arrObjVote=[]
for (let i = 1; i < arrVote.length; i++) {
  objVote={}
  for (let j = 0; j < arrVote[i].length; j++) {
    objVote[arrVote[0][j]] = arrVote[i][j]

  }
  arrObjVote.push(objVote)
}


db.serialize(()=>{
  db.run('DELETE from politicians',err=>{
    if(err) console.log(err);
  })
  let stmt = db.prepare('INSERT INTO politicians (name, party, location,grade_current)  VALUES (?,?,?,?)',err=>{
    if(err) console.log(err);
  })
  for (let i = 0; i < arrObjPol.length; i++) {
    stmt.run(arrObjPol[i].name,arrObjPol[i].party,arrObjPol[i].location,arrObjPol[i].grade_current)
  }
  stmt.finalize()
})

db.serialize(()=>{
  db.run('DELETE from voters',err=>{
    if(err) console.log(err);
  })
  let stmt = db.prepare('INSERT INTO voters (first_name, last_name, gender,age)  VALUES (?,?,?,?)',err=>{
    if(err) console.log(err);
  })
  for (let i = 0; i < arrObjVoter.length; i++) {
    stmt.run(arrObjVoter[i].first_name,arrObjVoter[i].last_name,arrObjVoter[i].gender,arrObjVoter[i].age)
  }
  stmt.finalize()
})

db.serialize(()=>{
  db.run('DELETE from votes',err=>{
    if(err) console.log(err);
  })
  let stmt = db.prepare('INSERT INTO votes (voterId,politicianId)  VALUES (?,?)',err=>{
    if(err) console.log(err);
  })
  for (let i = 0; i < arrObjVote.length; i++) {
    stmt.run(arrObjVote[i].voterId,arrObjVote[i].politicianId)
  }
  stmt.finalize()
})


db.close();

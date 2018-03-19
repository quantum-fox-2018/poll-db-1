const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./pemilu.db')

const argv = process.argv


function command(inputCommand,inputTable,inputData1,inputData2,inputData3,inputData4,inputData5){
  if(inputCommand==='insert'){
    insertData(inputTable,inputData1,inputData2,inputData3,inputData4)
  }
  else if(inputCommand==='update'){
    updateData(inputTable,inputData1,inputData2,inputData3,inputData4,inputData5)
  }
  else if(inputCommand==='delete'){
    deleteData(inputTable,inputData1)
  }
}

function insertData(inputTable,inputData1,inputData2,inputData3,inputData4) {
  if(inputTable==='politicians'){
    db.serialize(()=>{
      let stmt = db.prepare('INSERT INTO politicians (name, party, location,grade_current)  VALUES (?,?,?,?)',err=>{
        if(err) console.log(err)
        else console.log('insert data politicians successfully')
      })
      stmt.run(inputData1,inputData2,inputData3,inputData4)
      stmt.finalize()
    })
  }
  else if(inputTable==='voters'){
    db.serialize(()=>{
      let stmt = db.prepare('INSERT INTO voters (first_name,last_name,gender,age)  VALUES (?,?,?,?)',err=>{
        if(err) console.log(err)
        else console.log('insert data voters successfully')
      })
      stmt.run(inputData1,inputData2,inputData3,inputData4)
      stmt.finalize()
    })
  }

  else if(inputTable==='votes'){
    db.serialize(()=>{
      let stmt = db.prepare('INSERT INTO votes (voterId,politicianId)  VALUES (?,?)',err=>{
        if(err) console.log(err)
        else console.log('insert data votes successfully')
      })
      stmt.run(inputData1,inputData2)
      stmt.finalize()
    })
  }
}

function updateData(inputTable,inputData1,inputData2,inputData3,inputData4,inputData5) {
  if(inputTable==='politicians'){
    db.serialize(()=>{
      let stmt = db.prepare('UPDATE politicians SET name=?, party=?, location=?, grade_current=? WHERE politicianId=?',err=>{
        if(err) console.log(err)
        else console.log('update data politicians successfully')
      })
      stmt.run(inputData1,inputData2,inputData3,inputData4,inputData5)
      stmt.finalize()
    })
  }
  else if(inputTable==='voters'){
    db.serialize(()=>{
      let stmt = db.prepare('UPDATE voters SET first_name=?,last_name=?,gender=?,age=? WHERE voterId=?',err=>{
        if(err) console.log(err)
        else console.log('update data voters successfully')
      })
      stmt.run(inputData1,inputData2,inputData3,inputData4,inputData5)
      stmt.finalize()
    })
  }

  else if(inputTable==='votes'){
    db.serialize(()=>{
      let stmt = db.prepare('UPDATE votes SET voterId=?, politicianId=? WHERE voteId=?',err=>{
        if(err) console.log(err)
        else console.log('update data votes successfully')
      })
      stmt.run(inputData1,inputData2,inputData3)
      stmt.finalize()
    })
  }
}

function deleteData(inputTable,inputData1) {
  if(inputTable==='politicians'){
    db.serialize(()=>{
      let stmt = db.prepare('DELETE FROM politicians WHERE politicianId=?',err=>{
        if(err) console.log(err)
        else console.log('delete data politicians successfully')
      })
      stmt.run(inputData1)
      stmt.finalize()
    })
  }
  else if(inputTable==='voters'){
    db.serialize(()=>{
      let stmt = db.prepare('DELETE FROM voters WHERE voterId=?',err=>{
        if(err) console.log(err);
        else console.log('delete data voters successfully')
      })
      stmt.run(inputData1)
      stmt.finalize()
    })
  }

  else if(inputTable==='votes'){
    db.serialize(()=>{
      let stmt = db.prepare('DELETE FROM votes WHERE voteId=?',err=>{
        if(err) console.log(err);
        else console.log('delete data votes successfully')
      })
      stmt.run(inputData1)
      stmt.finalize()
    })
  }
}


command(argv[2],argv[3],argv[4],argv[5],argv[6],argv[7],argv[8])


db.close();

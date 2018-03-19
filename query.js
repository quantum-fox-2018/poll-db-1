const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

function insertData(tableName,dataArray){
  let valueStr = ""
  for (var i = 0; i < dataArray.length; i++) {
    if (i === dataArray.length-1) {
      valueStr += "?"
    }else{
      valueStr += "?,"
    }
  }

  db.serialize(function(){
    let insertQuery = `INSERT INTO ${tableName} VALUES (NULL, ${valueStr})`
    db.run(insertQuery, dataArray)
  })
}

function deleteData(tableName, id){
  db.serialize(function(){
    let deleteQuery = `DELETE FROM ${tableName} WHERE id = ${id}`
    db.run(deleteQuery)
  })
}

function updateData(tableName, id, column, value){
  db.serialize(function(){
    let updateQuery = `UPDATE ${tableName} SET ${column} = '${value}' WHERE id = ${id}`
    db.run(updateQuery)
  })
}

//driver code
// insertData("politicians", ["Andy", "B","JKT", 8.3])
// insertData("votes", [80, 81])
// deleteData("politicians", 21)
// updateData("politicians", 22, "name", "brandon PERINDO")
// updateData("politicians", 22, "grade_current", 600)

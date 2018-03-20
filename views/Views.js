const Table = require('cli-table')

class Views {
  static ifUndefined(){
    console.log(`type 'node app.js help' for help`)
  }

  static help(){
    console.log(`type 'node app.js read <content>'
    to see table of content (politician,voter,vote)`)
    console.log(`type 'node app.js insert <content> <data>'
    to insert data of content`)
    console.log(`type 'node app.js update <content> <content_id>
    <content_column_name> <content_column_data>'
    to replace/update data of content with new data`)
    console.log(`type 'node app.js delete <content> <content_id>'
    to delete data of content with spesific id`)
  }

  static wrongCommand(){
    console.log(`Wrong Command!`)
  }

  static readData(type,input){
    if(type=='politician'){
      let politicianTable = new Table({
        head: ['ID','Name','Party','Location','Grade Current']
      })
      for(let i=0; i<input.length; i++){
        let politician = input[i]
        politicianTable.push(
          [politician.politicianId,politician.name,politician.party,politician.location,politician.gradeCurrent]
        )
      }
      console.log(politicianTable.toString())
    } else if(type=='voter'){
      let voterTable = new Table({
        head: ['ID','First Name','Last Name','Gender','Age']
      })
      for(let i=0; i<input.length; i++){
        let voter = input[i]
        voterTable.push(
          [voter.votersId,voter.firstName,voter.lastName,voter.gender,voter.age]
        )
      }
      console.log(voterTable.toString())
    } else if(type=='vote'){
      let voteTable = new Table({
        head: ['ID','Politician Name','Voter Name']
      })
      for(let i=0; i<input.length; i++){
        let vote = input[i]
        voteTable.push(
          [vote.votesId,vote.name,vote.vName]
        )
      }
      console.log(voteTable.toString())
    }
  }

  static insertData(input){
    console.log(`new Data of ${input} has saved!`)
  }

  static updateData(table,id){
    console.log(`Data of ${table} at ID: ${id} has updated!`)
  }

  static deleteData(table,id){
    console.log(`Data of ${table} at ID: ${id} has deleted!`)
  }
}

module.exports = Views

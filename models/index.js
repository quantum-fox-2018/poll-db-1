const fs = require('fs');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');


class Model {
    static addPolitician(name,party,location,grade_current){
        db.run("INSERT INTO politicians VALUES (?,?,?,?,?)", [null,name,party,location,grade_current], function(err){
            if(err) return console.log(err);
            console.log(`Berhasil menambahkan ${name}`)
        })
        db.close();
    }

    static editPolitician(id,name,party,location,grade_current){
        db.run(`UPDATE politicians SET name=?,party=?,location=?,grade_current=? WHERE id=?`, [name,party,location,grade_current,id], function(err){
            if(err) return console.log(err);
            console.log(`ID ${id} berhasil terupdate`)
        })
        db.close();
    }

    static deletePolitician(id){
        db.run(`DELETE FROM politicians WHERE id=?`,[id],function(err){
            if(err) return console.log(err);
            console.log(`Anda menghapus data ${id}`)
        })
        db.close();
    }

    static addVoter(first_name,last_name,gender,age){
        db.run(`INSERT INTO voters VALUES(?,?,?,?,?)`, [null,first_name,last_name,gender,age], function(err){
            if(err) return console.log(err)
            console.log(`Berhasil menambahkan ${first_name} ${last_name}`)
        })
        db.close();
    }

    static editVoter(id,first_name,last_name,gender,age){
        db.run(`UPDATE voters SET first_name=?,last_name=?,gender=?,age=? WHERE id=?`, [first_name,last_name,gender,age,id], function(err){
            if(err) return console.log(err);
            console.log(`ID ${id} berhasil terupdate`)
        })
        db.close();
    }
    
    static deleteVoter(id){
        db.run(`DELETE FROM voters WHERE id=?`,[id], function(err){
            if(err) return console.log(err)
            console.log(`Anda menghapus data ${id}`)
        })
        db.close();
    }

    static addVote(voterID,politicianID){
        db.run(`INSERT INTO votes VALUES(?,?,?)`,[null,voterID,politicianID], function(err){
            if(err) return console.log(err)
            console.log(`Berhasil voting politisi ke ${politicianID}`)
        })
        db.close();
    }

    static editVote(id,voterID,politicianID){
        db.run(`UPDATE votes SET voterID=?, politicianId=? WHERE id=?`,[voterID,politicianID,id], function(err){
            if(err) return console.log(err)
            console.log(`ID ${id} berhasil terupdate`)
        })
        db.close();
    }

    static deleteVote(id,voterID,politicianID){
        db.run(`DELETE FROM votes WHERE id=?`, [id], function(err){
            if(err) return console.log(err)
            console.log(`Anda menghapus data ke ${id}`)
        })
        db.close();
    }
}

module.exports = Model;

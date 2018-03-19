/*jshint esversion:6*/

let argv = proccess.argv;
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

let request  = argv[2];

if(request === add){

}

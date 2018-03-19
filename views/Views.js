class Views {
  static ifUndefined(){
    console.log(`type 'node app.js help' for help`)
  }

  static help(){
    console.log(`type 'node app.js insert politicians <> '`)
  }
}

module.exports = Views

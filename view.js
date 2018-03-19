const Table = require('cli-table')

class View {
    constructor() {
        
    }

    static viewAllPolitician(politician_data){
        console.log('This is Politicians Data List : ')
        console.log(politician_data)
        let table = new Table({
            head: ['Politician ID', 'Name', 'Party', 'Location', 'Grade Current'],
            colWidths: [18, 30 ,10, 10, 15]
        })

        for(let i=0; i<politician_data.length; i++){
            table.push([politician_data[i].politician_id,
                politician_data[i].name,
                politician_data[i].party,
                politician_data[i].location,
                politician_data[i].grade_current
            ])
        }
        console.log(table.toString())
                
    }

    static viewAllVoter(voter_data){
        console.log('This is Voters Data List : ')
        console.log(voter_data)
        let table = new Table({
            head: ['Voter ID', 'Full Name', 'Gender', 'Age'],
            colWidths: [10, 30 ,10, 10]
        })

        for(let i=0; i<voter_data.length; i++){
            table.push([voter_data[i].voter_id,
                voter_data[i].first_name+' '+voter_data[i].last_name,
                voter_data[i].gender,
                voter_data[i].age
            ])
        }
        console.log(table.toString())
                
    }

}

module.exports = View
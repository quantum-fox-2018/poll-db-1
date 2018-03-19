//1. Tampilkan nama politician, partai dan grade_current politician yang berada di partai 'R'
>> `SELECT politicians.name, politicians.party, politicians.grade_current FROM politicians
    WHERE party = 'R' AND grade_current BETWEEN 9 AND 11 GROUP BY name;`

//2.Hitung jumlah vote untuk politician yang bernama 'Olympia Snowe'
>> `SELECT COUNT(*) AS totalVote, politicians.name
    FROM politicians JOIN votes
    ON politicians.id = votes.politicianid
    WHERE politicians.name = 'Olympia Snowe';`

//3.Hitung jumlah vote untuk politician yang nama-nya mengandung kata 'Adam'
>> `SELECT politicians.name, COUNT(*) AS totalVote FROM politicians JOIN votes
    ON politicians.id = votes.politicianId
    WHERE politicians.name LIKE "Adam %" GROUP BY politicians.name;`

//4.Tampilkan 3 politician beserta nama partai dan lokasi politician tersebut, yang memiliki suara terbanyak.
>> `SELECT COUNT(*) AS totalvote, politicians.name, politicians.party, politicians.location AS totalvote
    FROM politicians JOIN votes ON politicians.id = votes.politicianId
    GROUP BY politicians.id ORDER BY totalvote DESC LIMIT 3`;

//5.Tampilkan siapa saja yang melakukan voting ke politician yang bernama 'Olypia Snowe'
>> `SELECT voters.* FROM votes
    JOIN voters ON voters.id = votes.voterID
    JOIN politicians ON politicians.id = votes.politicianId
    where politicians.name = "Olympia Snowe";`

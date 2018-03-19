1. Tampilkan nama politician, partai dan grade_current politician tersebut yang berada di partai R dan memilii grade_current range 9 s/d 11.
SELECT name, party, grade_current FROM Politicians WHERE party = "R" AND grade_current BETWEEN 9 AND 11;

2. Hitung jumlah vote untuk politician yang bernama Olympia Snowe
SELECT Politicians.name, COUNT(*) AS "totalVote" FROM Votes JOIN Politicians ON Votes.politiciansId = Politici
ans.id WHERE Politicians.id = (SELECT id FROM Politicians WHERE name = "Olympia Snowe");

3. Hitung jumlah vote untuk politician yang nama-nya mengandung kata Adam.
SELECT Politicians.name, COUNT(*) AS "totalVote" FROM Votes JOIN Politicians ON Votes.politiciansId = Politici
ans.id WHERE Politicians.name LIKE "Adam %" GROUP BY Politicians.id;

4. Tampilkan 3 politicianId beserta nama partai dan lokasi Politician tersebut, yang memiliki suara terbanyak.
SELECT Politicians.name, Politicians.party, Politicians.location, count(*) AS "totalVote" FROM Politicians JOIN Votes ON Politicians.id = Votes.politiciansId GROUP BY Politicians.name ORDER BY totalVote DESC LIMIT 3;

5. Tampilkan siapa saja yang melakukan voting ke politician yang bernama Olympia Snowe
SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age FROM Voters JOIN Votes ON Voters.id = Votes.votersId WHERE Votes.politiciansId = (SELECT id FROM Politicians WHERE name = "Olympia Snowe");

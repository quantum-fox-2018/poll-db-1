//1. Tampilkan Politicians party R, grade_current 9-11
SELECT name, party, grade_current
FROM Politicians
WHERE party = 'R'
AND grade_current >= 9 AND grade_current <= 11;

//2. Hitung jumlah vote Politicians Olympia Snow
SELECT COUNT(*) AS TotalVote, Politicians.name
FROM Votes
JOIN Politicians
	ON Politicians.id = Votes.politicianId
WHERE Politicians.name = 'Olympia Snowe';

//3. Hitung jumlah vote untuk politican dengan nama Adam
SELECT Politicians.name, COUNT(*) AS TotalVote
FROM Politicians
JOIN Votes
  ON Politicians.id = Votes.politicianId
WHERE name LIKE 'Adam %'
GROUP BY Politicians.id;

//4. Tampilkan 3 nama, party, location politician with highest votes
SELECT COUNT(*) AS TotalVote, Politicians.name, Politicians.party, Politicians.location
FROM Politicians
JOIN Votes
  ON Politicians.id = Votes.politicianId
GROUP BY Politicians.id
ORDER BY TotalVote DESC
LIMIT 3;

//5. Tampilkan voters Olympia Snowe
SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age
FROM Voters, Politicians
JOIN Votes
	ON Voters.id = Votes.voterId
	AND Votes.politicianId = Politicians.id
WHERE Politicians.name = 'Olympia Snowe';

//5. Sub query
SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age
FROM Voters
JOIN Votes
	ON Voters.id = Votes.voterId
WHERE Votes.politicianId = (
	SELECT Politicians.id
	FROM Politicians
		JOIN Votes
		ON Politicians.id = Votes.politicianId
	WHERE Politicians.name = 'Olympia Snowe'
);

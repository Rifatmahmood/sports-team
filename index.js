const team = []
const row = document.getElementById('row');

function searchPlayer(playerName) {
    return fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`)
        .then(response => response.json())
        .then(data => {
            console.log('Player Data:', data);
            return data.player;
        })
        .catch(error => {
            console.error('Error fetching player data:', error);
            return null;
        });
}
// Function to add player to the team
function addPlayer(player) {
    if (team.length < 12) {
        team.push(player);
        console.log('Player added to team:', player);
    } else {
        console.log('Team is full. Cannot add more players.');
    }
}

function displayPlayers(players) {
    row.innerHTML = '';
    if (players) {
        players.forEach(player => {


            // Create the card HTML
            const cardHTML = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${player.strThumb || 'https://via.placeholder.com/150'}" class="card-img-top" alt="Player Image">
                        <div class="card-body">
                            <h5 class="card-title">${player.strPlayer}</h5>
                            <p class="card-text"><strong>Nationality:</strong> ${player.strNationality}</p>
                            <p class="card-text"><strong>Team:</strong> ${player.strTeam}</p>
                            <p class="card-text"><strong>Wage:</strong> ${player.strWage || 'N/A'}</p>
                            <p class="card-text">${player.strDescriptionEN.split(' ').slice(0, 12).join(' ') || 'No description available.'}</p>
                            <div class="d-flex justify-content-between my-3">
                            <a href="${player.strFacebook || '#'}" class="btn btn-primary"><i class="fab fa-facebook-f"></i></a>
                            <a href="${player.strTwitter || '#'}" class="btn btn-info"><i class="fab fa-twitter"></i></a>
                        </div>
                        
                            <div class="d-flex justify-content-between">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal-${player.idPlayer}">
                            View Details
                        </button>
            
                        <button type="button" class="btn btn-warning" id="addToTeamButton">Add to Team</button>

                            </div>
                        </div>

                        <div class="modal fade" id="exampleModal-${player.idPlayer}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">${player.strPlayer} Details</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <!-- Add player details here -->
                                    <p>Player Name: ${player.strPlayer}</p>
                                    <p>Nationality: ${player.strNationality}</p>
                                    <p>Team: ${player.strTeam}</p>
                                    <p>Description: ${player.strDescriptionEN}<p> 
                                    <!-- Add more player details as needed -->
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            `;

            // Append the card to the row
            row.innerHTML += cardHTML;
        });
    } else {
        row.innerHTML = '<p>No players found.</p>';
    }
}



// Function to handle search
async function handleSearch() {
    let searchValue = document.getElementById('searchInput').value;
    console.log('Search Input Value:', searchValue);
    let players = await searchPlayer(searchValue);
    console.log(players);
    displayPlayers(players);

}

// Event listener for the Enter key
document.getElementById('searchInput').addEventListener('keypress', function (event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === 'Enter') {
        handleSearch();
    }
});



// Event listener for the search button click
document.getElementById('searchButton').addEventListener('click', handleSearch);
document.getElementById('addToTeamButton').addEventListener('click', function () {
    // Call the addPlayer function with the player data
    // Replace 'playerData' with the actual player data variable you want to add to the team
    addPlayer(playerData);
});
// Add this inside the <script> tag in the HTML file
const addGameForm = document.getElementById('addGameForm');
const gameList = document.getElementById('gameList');
const correctPasscode = 'your-secret-passcode'; // Change this to your desired passcode

addGameForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const passcode = document.getElementById('passcode').value;
    if (passcode !== correctPasscode) {
        alert('Incorrect passcode');
        return;
    }

    const gameName = document.getElementById('gameName').value;
    const gameDescription = document.getElementById('gameDescription').value;
    const gameFile = document.getElementById('gameFile').files[0];

    // For simplicity, we're not actually uploading the file in this example
    const game = { name: gameName, description: gameDescription, file: gameFile ? gameFile.name : 'No file uploaded' };

    // Store the game in local storage
    let games = JSON.parse(localStorage.getItem('games')) || [];
    games.push(game);
    localStorage.setItem('games', JSON.stringify(games));

    // Clear the form
    addGameForm.reset();

    // Update the displayed list
    displayGames();
});

function displayGames() {
    const games = JSON.parse(localStorage.getItem('games')) || [];
    gameList.innerHTML = '<h2>Added Games:</h2>';
    games.forEach((game, index) => {
        gameList.innerHTML += `
            <div>
                <h3>${game.name}</h3>
                <p>${game.description}</p>
                <p>File: ${game.file}</p>
            </div>
        `;
    });
}

// Display games on page load
displayGames();

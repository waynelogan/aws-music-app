const axios = require('axios')
const fs = require('fs')
const filepath = 'app/data/music1.json'
const musicURL = 'https://v9fz4mkkfh.execute-api.eu-north-1.amazonaws.com/music'

function generateRandomID() {
    return Math.random().toString(36).substring(2, 9)
}

function createSong(song) {
    axios.put(musicURL, song)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.error(error)
        })
}


// Read JSON data from file
fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err)
        return null
    }

    try {
        // Parse JSON data into array
        const {songs} = JSON.parse(data)
        // Print the array
        const updatedSongs = songs.map( song => ({...song, id: generateRandomID()}))
        updatedSongs.forEach( user => createSong(user))
    } catch (error) {
        console.error('Error parsing JSON:', error)
        return null
    }
})
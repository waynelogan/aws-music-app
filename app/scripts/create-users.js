const axios = require('axios')
const fs = require('fs')
const filepath = 'app/data/users.json'
const authURL = 'https://k310qs8rs3.execute-api.eu-north-1.amazonaws.com/users'

function generateRandomID() {
    return Math.random().toString(36).substring(2, 9)
}

const sampleUser = {
    name: 'Some One',
    email: 'som@example.com',
    password: 'weakPassword',
    id: generateRandomID()
}

function createUser(user, endpoint) {
    axios.put(authURL, user)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.error(error)
        })
}

createUser(sampleUser, 'http://localhost:3000')

// // Read JSON data from file
// fs.readFile(filepath, 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err)
//         return null
//     }

//     try {
//         // Parse JSON data into array
//         const users = JSON.parse(data)
//         // Print the array
//         const updatedUsers = users.map( user => ({...user, id: generateRandomID()}))
//         console.log(updatedUsers)
//     } catch (error) {
//         console.error('Error parsing JSON:', error)
//         return null
//     }
// })
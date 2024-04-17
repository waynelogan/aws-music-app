const axios = require('axios');
const fs = require('fs');
const path = require('path');

const filepath = 'app/data/music.json';

// Read JSON data from file
fs.readFile(filepath, 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        // Parse JSON data into array
        const { songs } = JSON.parse(data);
        const imageURLs = songs.flatMap(song => song.img_url);

        const uploadImages = async () => {
            for (const imageUrl of imageURLs) {
                try {
                    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

                    // Prepare image object for PUT request
                    const imageData = Buffer.from(response.data, 'binary');

                    // Perform PUT request to upload the image object
                    const uploadResponse = await axios.put(`https://o8salt0m50.execute-api.eu-north-1.amazonaws.com/dev/http-crud-music-app-storage/${Math.random().toString(2,9)}`, imageData, {
                        headers: {
                            'Content-Type': `image/${imageUrl.split('.').pop()}`, // Use content-type from the response
                            // You may need to add other headers as required by the API
                        },
                    });

                    console.log(`Image from ${imageUrl} uploaded successfully. Response:`, uploadResponse.data);
                } catch (error) {
                    console.error(`Error uploading image from ${imageUrl}:`, error);
                    // Continue to the next image in case of error
                    continue;
                }
            }
        };

        // Call the function to upload the images
        await uploadImages();
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});

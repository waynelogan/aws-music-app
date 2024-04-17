# AWS MUSIC APP

To install packages run:
```shell
yarn
```

To add users to DynamoDB via a script, run:
```shell
node app/scripts/create-users.js
```

To add songs to DynamoDB via a script, run:
```shell
node app/scripts/create-song.js
```

To fetch song album covers and upload to an S3 bucket via a script, run:
```shell
node app/scripts/upload-images.js
```


To run the development server, run:
```shell
yarn dev
```

To view the web app, visit the url:
`http://localhost:3000/register`
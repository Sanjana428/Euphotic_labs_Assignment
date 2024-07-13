const express = require('express');
const bodyParser = require('body-parser');
const Routes = require('./routes/routes');
const { connectToDatabase } = require('./db/db');

const app = express();
const port = 5000;

app.use(bodyParser.json());


app.use('/', Routes);

app.listen(port, async () => {
    await connectToDatabase();
    console.log(`Server running at http://localhost:${port}`);
});



const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./index');

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`The app is running on port ${port}`);
})

const express = require("express");
const dotenv = require('dotenv');
const port = 3030;
const app = express();
require('./db/dbconnect')
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config({ path: './config.env' });


app.use(cookieParser());


var whitelist = process.env.CLIENT_URL

app.use(cors());
app.use(express.json());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));


app.options(
    "*",
    cors({
        origin: "*",
        optionsSuccessStatus: 200,
        credentials: true,
        methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"]
    })
);

app.use(
    cors({
        origin: "*",
        methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"]
    })
);



app.use(express.json());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

// common error handling middleware 

app.use((err, req, res, next) => {
    // Middleware for all exposed api's which consumes the json , to handle the json proccessing errors / 
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {

        return res.sendStatus(400);
    }
    next();
});




app.use(require('./router/user'))

app.listen(port, () => {
    console.log(`server running at 3030`)
})
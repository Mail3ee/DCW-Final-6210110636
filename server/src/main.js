const express = require('express')
const bodyParser = require('body-parser')
const { Connection, Request } = require("tedious");
const winston = require('winston');
const expressWinston = require('express-winston');
const cors = require('cors')
const port = 8000
const app = express()

const config = {
    authentication: {
      options: {
        userName: "mail3ee", // update me
        password: "Jate_13162929" // update me
      },
      type: "default"
    },
    server: "dcw-web-6210110636.database.windows.net", // update me
    options: {
      database: "dcw-websql", //update me
      encrypt: true
    }
};

const connection = new Connection(config);

connection.on("connect", err => {
    if (err) {
      console.error(err.message);
    }else {
        console.log("connect") 
    }
});
connection.connect();

app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false,
    msg: "HTTP  ",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; }
}));

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) =>{
    res.send('Hello World')
})

app.post('/login', (req, res) =>{
    let access_token = req.body.token
    let _profile = req.body.profile
    res.send({token: access_token, profile: _profile})
})

app.post('/post', (req, res) =>{
    let user_id = req.body.profile.googleId
    let user_name = req.body.profile.name
    let msg = req.body.msg

    // const request = new Request(
    //     `INSERT to 20 pc.Name as CategoryName,
    //                    p.name as ProductName
    //      FROM [SalesLT].[ProductCategory] pc
    //      JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid`,
    //     (err, rowCount) => {
    //       if (err) {
    //         console.error(err.message);
    //       } else {
    //         console.log(`${rowCount} row(s) returned`);
    //       }
    //     }
    //   );

    
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})
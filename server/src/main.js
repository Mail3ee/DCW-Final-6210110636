const express = require('express')
const bodyParser = require('body-parser')
const { Connection, Request } = require("tedious");
const multer = require('multer');
const winston = require('winston');
const {createLogger, format, transports} = require('winston');
const expressWinston = require('express-winston');
const cors = require('cors')
const port = 8080
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
        // console.log("connect") 
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

const logger = createLogger({
  level: 'debug',
  format: format.simple(),
  // You can also comment out the line above and uncomment the line below for JSON format
  // format: format.json(),
  transports: [new transports.Console()]
});


app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) =>{
    logger.info('Hello world');
    res.send('Hello World')
})

app.post('/login', (req, res) =>{
    let access_token = req.body.token
    let _profile = req.body.profile
    logger.info(`${_profile.name} Login to Server`);
    res.send({token: access_token, profile: _profile})
})

app.post('/post', (req, res) =>{
    let user_id = req.body.profile.googleId
    let user_name = req.body.profile.name
    let msg = req.body.msg

    const request = new Request(
        `INSERT INTO [dbo].[users_message] (uid, uname, msg)
        VALUES ('${user_id}', '${user_name}', '${msg}');
        SELECT * FROM [dbo].[users_message] `,
        (err, rowCount) => {
            if (err) {
                // console.error(err.message);
                logger.error(`${err.message}`);
            } else {
                logger.debug(`${rowCount} row(s) returned`);
                // console.log(`${rowCount} row(s) returned`);
            }
        }
    );
    connection.execSql(request);
    res.send({status:"ok"})   
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ".png")
    }
})
let upload = multer({ storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    } 
})

app.post('/upload', upload.single('img'),  (req, res) => { 
    
    console.log({status:"ok"})
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

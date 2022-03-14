const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const port = 8000
const app = express()

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



app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})
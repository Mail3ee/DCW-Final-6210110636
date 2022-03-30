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

app.post('/cal', async (req, res) =>{
    let data = req.body.expr
    let _precision = req.body.pre
    let result = await axios.get('http://api.mathjs.org/v4/?expr=', {  
        params: {
            expr : [
                data
            ],
            precision : _precision || 2
        }
    })
    res.send({result:result.data[1]})
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})
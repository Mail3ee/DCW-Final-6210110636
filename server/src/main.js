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

app.get('/cal', async (req, res) =>{
    // let url = `http://api.mathjs.org/v4/?expr=${expr}`
    let result = await axios.get('http://api.mathjs.org/v4/?expr=', {  
        params: {
            expr : [
                "2+2"
            ]
        }
    })
    console.log(result)
    // res.send({data:result})
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})
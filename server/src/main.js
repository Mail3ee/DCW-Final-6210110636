const express = require('express')
const bodyParser = require('body-parser')
const port = 8080
const app = express()

app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.send('Hello World')
})

app.post('/login', (req, res) =>{
    res.send('Login Now')
})



app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})
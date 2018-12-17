const express = require('express')
const path = require('path')
const request = require('request')

const app = express()
const getShort = () => Math.random().toString(36).replace(/[^a-z1-9]+/g, '').substr(0, 8)

const store = {}


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile('index.html')
})


app.get('/shortener', (req, res) => {
    let url = req.query.url
    if (url.substr(0, 5) !== 'https' && url.substr(0,4) !== 'http' ) {
        url = 'http://'+url
    }

    request(url, (err, resUrl, body) => {
        err && console.log(err)
        resUrl && console.log(resUrl.statusCode)
        if (err) {
            res.send({error: 'Unavailable URL'})
        }
        if (resUrl) {
            const shortUrl = getShort()
            const { port, address } = server.address()
            
            store[shortUrl] = url
            console.log(store);
            res.send({url: `${address}:${port}/${shortUrl}`})
        }
    })
})

app.get('/*', (req, res) => {
    if (req.path) {
        const short = req.path.substr(1)
        console.log(short);
        if (store[short]) {
            res.status(301).redirect(store[short]);
        } else {
            res.redirect('/')
         }
    }
})

const server = app.listen(1337, '0.0.0.0', () => console.log('Listening at 1337'))
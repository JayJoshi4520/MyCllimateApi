const express = require('express')
const {default : axios} = require('axios')
const PORT = 8000
const cheerio = require('cheerio')
const { response } = require('express')

const app = express()
const articles = []
const climateLink = []

app.get('/', (req, res) => {
    res.json('This is My API')
})

app.get('/news', (req, res) => {

    axios.get(`https://timesofindia.indiatimes.com/topic/climate-change`)
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        const textContains =  $('a:contains("Climate")', html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')
            articles.push({
                title,
                url
            })
        })
    }).catch((err) => console.log(err))
    for (let index = 2; index < 15; index++) {
         axios.get(`https://timesofindia.indiatimes.com/topic/climate-change/${index}`)
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)
            const textContains =  $('a:contains("Climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    title,
                    url
                })
            })
        }).catch((err) => console.log(err))
    }
    

    res.json(articles)
})


app.listen(PORT, () => console.log("Listening Port 8000"))


// MERN = Mongo + Express + React + Node
// Development = Node.js server + Reasct server
// Production = Node.js server + Static react files

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:2701/bearMax')

app.post('/api/register', async (req,res) => {
    console.log(req.body)

    try {
        const user = await User.create({
            name: 
        })
    } catch (err) {

    }

    res.json({status: 'ok' })
})

app.listen(1337, () => {
    console.log('Server Started on 1337')
})
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jsxEngine = require('jsx-view-engine')
const vegetables = require('./models/vegetables')
const Vegetable = require('./models/vegetables')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({ extended: true }))// build a ssr website
// app.use(express.json()) //build an api
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
    console.log('connected to mongodb')
})

//INDUCES

// INDEX
app.get('/vegetables/Index', async (req, res) => {
    try {
        const foundVegetables = await Vegetable.find({})
        res.render('vegetables/Index', {
            vegetables: foundVegetables
        })
    } catch (error) {
        res.status(4000).send({message: error.message})
    }
    })

// SHOW
app.get('/vegetables/Show', async (req, res) => {
    try {
        const foundVegetables = await Fruit.findOne({_id: req.params.id})
        res.render('fruits/Show', {
            fruit: foundVegetables
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// NEW
app.get('/vegetables/New', (req, res) => {
    res.render('fruits/New')
})

// CREATE
app.post('/vegetables', async (req, res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    try{
        const createdVegetable = await Vegetable.create(req.body)
        res.redirect(`/fruits/${createdVegetable._id}`)
    }catch(error){
        res.status(400).send({message: error.message})
    }
})



/*********
listening port
**********/

app.listen(PORT, () => {
    console.log(`Fucking the port is ${PORT}`)
})
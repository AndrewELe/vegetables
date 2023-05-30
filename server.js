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
        res.render('vegetables/Show', {
            fruit: foundVegetables
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// NEW
app.get('/vegetables/New', (req, res) => {
    res.render('vegetables/New')
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

// EDIT
app.get('/vegetables/:id/edit', async (req, res) => {
    try {
        const foundVegetables = await Vegetable.findOne({_id: req.params.id})
        res.render('vegetables/Edit', {
            vegetable:foundVegetables
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// UPDATE
app.put('/vegetables/:id/', async (req, res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    try {
        await Vegetable.findOneAndUpdate({'_id': req.params.id}, req.body, { new: true})
            .then(()=> {
                res.redirect(`/vegetables/${req.params.id}`)
            })
    } catch(error){
        res.status(400).send({ message: error.message })
    }
})

// DELETE
app.delete('/vegetables/:id', async (req, res) => {
    try{
        await Vegetable.findOneAndDelete({'id': req.params.id})
            .then(() => {
                red.redirect('/vegetables')
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

/*********
listening port
**********/

app.listen(PORT, () => {
    console.log(`i'm listening, always listening ${PORT}`)
})
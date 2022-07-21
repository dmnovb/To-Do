const express = require('express');
const router = express.Router()
const Subscriber = require('../models/subscriber')

router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

router.get('/users/:name', async (req, res) => {
    let subscribers
    let found  = false
    try {
        subscribers = await Subscriber.find();
      
        subscribers.every(function(element, index) {
            if (element.name === req.params.name){
                console.log('user : ' + element.name + ' found')
                found = true
                return 
            }

        }) 

        if(!found) {
            console.log("not found")
        }
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message })
    }

})

router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

router.delete('/:id', async (req, res) => {
    let sub = await Subscriber.findById(req.params.id);
    if(sub == null) {
        return res.status(404).json({message: "user doesnt exist"})
    } 

    sub.delete();
    res.send("deleted!");
})

async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({message: "cannot find subscriber"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.subscriber = subscriber
    next()
}

module.exports = router
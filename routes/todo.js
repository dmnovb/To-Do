const express = require('express');
const router = express.Router()
const todo = require('../models/tododb')

router.get('/', async (req, res) => {
    try {

        const tasks = await todo.find();
        let objects = {
            task : tasks
        }
        // res.json(tasks);
        res.send(objects); 
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

router.put('/:id', async(req,res) => {
    try {
        const completed = await todo.findByIdAndUpdate({_id: req.params.id}, {$set:{isComplete: req.body.isComplete}})
        res.send(completed)
    } catch (err) {
        res.json({message: "err"})
    }
})

// todo.iscomplete =true;
//todo.save();

router.post('/', async(req,res) => {
    const task = new todo({
        name: req.body.name,
        description: req.body.description,
        isComplete: req.body.isComplete
    })

        if(!task.name  || task.name == '') {
            res.status(400).json({message: "name required"})
        }

    try {
        const newTask = await task.save()
        res.status(200).json(newTask)
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})


router.delete('/:id', async (req, res) => {
    let thisTask = await todo.findById(req.params.id);
    if(thisTask == null) {
        return res.status(404).json({message: "task doesn't exist"})
    } 

    thisTask.delete();
    res.send("deleted!");
})

router.get('/:id', getTask, (req, res) => {
    let task = {
        name: res.task.name,
        id: res.task.id,
        isComplete: res.task.isComplete
    }

    let object  = { 
        task : task
    }

    res.send(object);
})



async function getTask(req, res, next) {
    let task 
    try {
        task = await todo.findById(req.params.id)
        if (task == null) {
            return res.status(404).json({message: "task not found"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.task = task
    next()
}




module.exports = router
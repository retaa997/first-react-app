const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")

mongoose.connect("mongodb://localhost:27017/todo")
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log("Error", err);
})

const Todos = require("./models/Todos.js")

app.use(express.json())
app.use(cors())

app.get("/todos", async(req,res)=>{
    const todos = await Todos.find()
    res.json(todos)
})

app.post("/todos/new", async(req,res)=>{
    const {text} = req.body
    const newTodo = new Todos({text})

    await newTodo.save()

    res.json(newTodo)
})

app.delete("/todos/delete/:id", async(req,res)=>{
    const { id } = req.params
    const todo = await Todos.findByIdAndDelete(id)

    res.json(todo)
})

app.put("/todos/complete/:id", async(req,res)=>{
    const {id} = req.params
    const todo = await Todos.findOne({_id: id})


    todo.isComplete = !todo.isComplete

    await todo.save()

    res.json(todo)

})


app.listen(3001, ()=>{console.log("listening 3001");})
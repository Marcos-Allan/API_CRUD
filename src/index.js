const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
const port = 3000


const User = mongoose.model('User', {
    name: String,
    email: String,
    image: String
});

app.get('/', async (req, res) => {
    const users = await User.find()
    return res.send(users)
})

app.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    res.send(user)
})

app.put('/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id,{
        name: req.body.name,    
        email: req.body.email,    
        image: req.body.image 
    }, {
      new: true  
    })

    return res.send(user)
})

app.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,    
        email: req.body.email,    
        image: req.body.image 
    })
    
    await user.save()
    return res.send(user)
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://allanmenezes880:bkVFzSWAxD5pT5sz@teste-api.qhekdpu.mongodb.net/?retryWrites=true&w=majority')
    console.log("App Runing")
})
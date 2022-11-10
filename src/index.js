const express = require('express')
const mongoose = require('mongoose')
const route = require('./routes/route.js')
const app = express();

app.use(express.json())

mongoose.connect("mongodb+srv://snehal_3497:snehal_3497@atlascluster.q9xoryr.mongodb.net/placementAssignment?retryWrites=true&w=majority")

.then(()=>console.log("mongoDb is connected"))

.catch(err=>console.log(err))

app.use('/',route)

app.listen(3000,() => {

    console.log("Express at running on port" + (3000))
})
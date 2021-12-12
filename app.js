const express = require("express")
const morgan = require('morgan')
const mongoose = require('mongoose')
const stockRoutes = require('./routes/stockRoutes')
const app = express()
const Port = process.env.PORT || 3000

//connect to MongoDB
const dbURI = 'mongodb+srv://salar:456676@trainingcluster.nw0by.mongodb.net/training?retryWrites=true&w=majority'
// const dbURI = process.env.MONGODB_URI
mongoose.connect(dbURI, {useNewUrlParser: true})
.then((result) => {
    console.log("connected to DB")
    app.listen(Port) 
})
.catch((err) => {console.log(err)})

//register view engine
app.set('view engine', 'ejs') 
//Middleware
//Static Middleware
app.use(express.static('public'))  
app.use(express.urlencoded({ extended: true}))

//3rd Party middleware
app.use(morgan('tiny'))


//Routes
app.get('/', (req, res) => {
    res.redirect('/stocks')
});


//stock Routes
app.use('/stocks', stockRoutes)

//404 
app.use((req, res) => {
    res.status(404).render('404', {title:"404"})
})
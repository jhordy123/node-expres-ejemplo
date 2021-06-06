const mongoose = require('mongoose') // importamos la libreria del monsgose

const password = require('./password.js')
const connectionString = process.env.MONGO_DB_URI

mongoose.connect(connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
    .then(()=> {
        console.log('Database connected')
    })
    .catch(error =>{
        console.error(error)
    })



 
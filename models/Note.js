
const { Mongoose } = require("mongoose")

//const Schema = mongoose.Schema
//const model = mongoose.model  // estos dos ultimos es identico a la definicion de la linea que siga a continuacion

const {Schema,model} = require("mongoose")


const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean
})

noteSchema.set('toJSON',{
    transform :(document,returnedObject)=>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note = model('Note',noteSchema) // crea una instacia de este modelo.


module.exports = Note 
   
/*
Note.find({}) // con esto tambien podemos trar datos desde la base de datos de internet
              // no le damos una parametro en especifico por que en el ejemplo unicamnete tenemos un solo dato.
    .then(result => {   // le pedimos todos los datos
        console.log(result)
        mongoose.connection.close()
    })



 // Con esto guardamos una nota en nuestro servidor monngose
const note = new Note({    // creamos una instancia de nustro modelo de notas
    content:'Jhordy eres un maquina x2¡¡¡',
    date: new Date(),
    important: true
})

note.save()
    .then(result=> {
      console.log(result)
      mongoose.connection.close() // al terminar se puede cerrar la conexion opcional 
    })
    .catch(err => {
        console.error(err)
    })
*/
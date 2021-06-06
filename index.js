
/*
const http = require('http') // la forma antigua de definir algun modulo , vigente aun pero opcional
           // este es un modulo http que no ayuda a crear un servidory lo guardamos en una variable http
//import http from 'http'   // esto es muy similar al pirmero pero un pco mas moderno

// un numero determinado de notas
let notes = [  
    {
      id: 1,
      content: "HTML is easy y a la vez dificil",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
]


const app = http.createServer((req, res) =>{   // req = peticion , res = respuesta
    res.writeHead(200,{'Content-Type':'application/json'})  // ojo con el content-type = hay que tener en cuenta el tipo de datos que devolvemos
    res.end(JSON.stringify(notes)) // con esto convertimos la notas a un formato adecuado para su representacion.

})

const PORT = 3000  // definimos en el puerto 3001
app.listen(PORT)   // activa el puerto y define el puerto donde escuchara
console.log(`server ruming en port ${PORT}`)
    
*/
//
//=//==/===/==USANDO Express ==/==/=/=/=//
//
require('./mongo')  // con esto carga el archivo y ejecuta el contenido para conectarce a la base de datos.

const Express = require('express');
const app = Express(); 
const cors = require('cors');

const Note = require('./models/Note')
app.use(cors());
app.use(Express.json());  // con esto nos ayuda a convertir los datos del tipo .json que nos envia la wep y pasarlos a string y poder enter que nos envia la wep.


// un numero determinado de notas
let notes = [  
    {
      id: 5,  // 1 = es un numero . ojo que se puede confundir "1" que es un estring
      content: "HTML is easy y a la vez dificil",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 7,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 4,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
]

// cara recurso tiene una direccion unica donde dirigirse (ejm: <'/api'> , <'/api/notes'>)
// lo que diferencia es como se trata ese recurso es la accion (.get , .put , .post , .PATCH).

app.get('/',(req,res)=>{
    res.send('<h1> hola jhordy</h1>')
})   

app.get('/api/notes',(req,res)=>{
  Note.find({}).then(notes =>{
    res.json(notes)
  })
})

app.get('/api/notes/:id', (req , res)=>{   // creamos un pat que nos devuelva una nota en concreto,
    const id = Number(req.params.id);// detecta  una porcion del URL de la pagina al momento de hacer la peticion.
                             //Number() => convierte un dato string a numero
    //console.log({id})  //{id} => preguntamos por el objeto 
    const note = notes.find(note => note.id === id); //encontramos la nota que sea igual al id digitado en la peticion en la pagina.
    if(note){      // si la nota existe nos la devuelve .
      res.json(note);
    }
    else{        // si la nota no existe nos da un error
      res.status(404).end();  // devuelve un mensaje de error  si la nota no existe, codigo 404 , otro codigo es 484.
    }
})

app.delete('/api/notes/:id',(req,res)=>{  
  const id = Number(req.params.id);
  
  notes = notes.filter(note => note.id !== id);  // filtramos todas las notas menos la que el id indica.
  res.status(204).end();
  
})


app.post('/api/notes',(req,res)=>{   // nos permite crear un recuerso en la direccion  indicada </api/notes>
  const note = req.body

  if( !note || !note.content){

    return res.status(400).json({
      error: 'note content is missing... (falta el contenido de la nota...)'
    })
  }
  
  //console.log(note)    // nos permite ver la nota que estamos creando.
//===============================================================================================================
//Dos formas de  usar map una con una funcion tipica o una funcion FAT ARROW

//const ids = notes.map(function(note){
  // return note.id
//}) // con esto creamos un array con todos los id de las notas.

const ids = notes.map(note => note.id) // con esto creamos un array con todos los id de las notas.

//================================================================================================================
  const maxId = Math.max(...ids)         // sacamos el maximo id de las notas 

  const newNote = {
    id: maxId + 1, 
    content: note.content,
    important: typeof note.important !== 'undefined'? note.important : false,
    date: new Date().toISOString()  // con esto nos da la fecha , año y hora , ojo la zona horaria que utiliza. 
  }
  //notes = [...notes, newNote]  // esto es muy similar a lo debajo..
  notes= notes.concat(newNote)
  res.json(newNote)
})



const PORT = process.env.PORT || 3000 // definimos en el puerto 3001
app.listen(PORT, () =>{
    console.log(`server ruming en port ${PORT}`)
})   



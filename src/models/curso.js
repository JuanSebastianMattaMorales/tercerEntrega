const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
    nombre:{
        type:String
    },
    id:{
        type:String
    },
    descripcion:{
        type:String
    },
    valor:{
        type:String
    },
    modalidad:{
        type:String
    },
    intensidad:{
        type:String
    },
    estado:{
        type:String  
    },
    inscritos:[]
});

const Curso = mongoose.model('Curso',cursoSchema);
module.exports = Curso;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudianteSchema = new Schema({

    documento:{
        type:String
    },
    nombre:{
        type:String
    },
    correo:{
        type:String
    },
    telefono:{
        type:String
    },
  Curso:[]
});

const Estudiante = mongoose.model('Estudiante',estudianteSchema);
module.exports = Estudiante;
import fs, { appendFile } from 'fs';
import express from 'express';

let listaCursos 
let listaAspirantes = []
const Curso = require('../src/models/curso');
const crearCurso = (curso) => {
    listarCursos()
    let cur = new Curso({
        nombre: curso.nombre,
        id: curso.id,
        descripcion: curso.descripcion,
        valor: curso.valor,
        modalidad: curso.modalidad,
        intensidad: curso.intensidad,
        inscritos: [],
        estado: 'disponible'
    })
    cur.save()
    let duplicado = listaCursos.find(curso => curso.id == cur.id)
    let error = 0
    let mensaje = 'Registro creado con éxito'
    duplicado ? console.log('Ya existe otro curso con ese nombre') : console.log('Ok');
    duplicado ? ((error = 1) && (mensaje = 'Ya existe otro curso con id '+cur.id)): listaCursos.push(cur) && guardar()
    return {error, mensaje, cur}
}

const mostrarCursosDisponibles = () => {
    listarCursos()
    return listaCursos
}

const listarCursos = () => {

    Curso.find({estado : 'disponible'}).exec((err,respuesta)=>{
        if(err){
            return console.log(err)
        }
        listaCursos = respuesta
    })

    
}

const listarCursos2 = (id) => {

    Curso.find({id : 'ew'}).exec((err,respuesta)=>{
        if(err){
            return console.log(err)
        }
        listaCursos = respuesta
    })

    
}

const listarAspirantes = () => {

    Estudiante.find({}).exec((err,respuesta)=>{
        if(err){
            return console.log(err)
        }
        listaAspirantes = respuesta
    })

    
}


const guardar = () => {  
    let datos = JSON.stringify(listaCursos)
    fs.writeFileSync('cursos.json', datos, (err) => {
        err ? trow(err) : console.log('Archivo creado con exito')
    })
}

const guardarAspirantes = (params) => {
    let datos = JSON.stringify(listaAspirantes)
    fs.writeFileSync('aspirantes.json', datos, (err) => {
        err ? trow(err) : console.log('Archivo creado con exito')
    })
}
const cursosId = () => {
    listarCursos()
    return listaCursos    
}

const inscribirme = (aspirante) => {
    listarCursos();
    listarAspirantes();
    const res = crearAspirantes(aspirante);
    Curso.findOneAndUpdate({id:aspirante.curso.idCurso},{estudiantes:aspirante},{new:true},(err,resultado)=>{
        console.log(resultado)
    })


    const cur1 = getCurso(aspirante.curso);
    const curso = {
        nombre: cur1.nombre,
        id: cur1.id,
        descripcion: cur1.descripcion,
        valor: cur1.valor,
        modalidad: cur1.modalidad,
        intensidad: cur1.intensidad,
    }
    let asp = {
        documento: aspirante.documento,
        nombre: aspirante.nombre,
        correo: aspirante.correo,
        telefono: aspirante.telefono,
    }
    

    return {cur1}
}

const getCurso = (id) => {
    listarCursos2(id)
    console.log('dadasdsada'+listaCursos)
    return listaCursos
}

const Estudiante = require('../src/models/estudiante')

const crearAspirantes = (aspirante) => {
    listarAspirantes()
    let estudiante = new Estudiante({
        documento: aspirante.documento,
        nombre: aspirante.nombre,
        correo: aspirante.correo,
        telefono: aspirante.telefono,
        cursos: [],
    })
    estudiante.save();
    return {Estudiante}
}

const cambiarEstado = (id) => {
    listarCursos()
    const curso = getCurso(id)
    listaCursos.forEach((curso) => {
        curso.id == id && (curso.estado = "no disponible")
    })
    guardar()
    return 'El curso '+curso.nombre+ ' ahora no esta disponible'
}

const eliminarAspCur = (idCurso, idAsp) => {
    listarAspirantes()
    listarCursos()
    listaAspirantes.forEach((aspirante) => {
        aspirante.documento == idAsp && aspirante.cursos.find(curso => curso.id == idCurso) && (aspirante.cursos = aspirante.cursos.filter(curso => curso.id !==idCurso))
    })
    listaCursos.forEach((curso) => {
        curso.id == idCurso && curso.inscritos.find(inscrito => inscrito.documento == idAsp) && (curso.inscritos = curso.inscritos.filter(inscrito => inscrito.documento !==idAsp))
    })
    guardar()
    guardarAspirantes()
}


const usuariosIns = () => {
 
    return {error, mensaje, asp}
}


module.exports = {
    crearCurso,
    mostrarCursosDisponibles,
    cursosId,
    inscribirme,
    cambiarEstado,
    eliminarAspCur,
    usuariosIns
}
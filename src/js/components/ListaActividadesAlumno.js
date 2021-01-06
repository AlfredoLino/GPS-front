import React, {useEffect, useState, useRef} from 'react';
import {useParams} from "react-router-dom"
import Layout from "../layouts/Alumno"

const ListaActividadesAlumno = () => {
    const {nombre} = useParams()

    const inputFile = useRef(null)

    const [actividad, setActividad] = useState(undefined)
    const [archivo, setArchivo] = useState(undefined)

    const [error, seterror] = useState(undefined);

    const handlerRequest =  async () =>{
        const req = await fetch(`http://localhost:3001/getSinglePro/${nombre}`)
        const doc = await req.json()
        if(doc){
            setActividad(doc)
        }
        else{
            seterror(true)
        }
    }

    const submitActivity = async (nombreActividad)=>{
        try {
            const req = await fetch('http://localhost:3001/activityToProject', 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fecha: new Date(),
                        filePath: archivo,
                        titulo: nombre,
                        actividad: nombreActividad
                    })
                }
            )
            const res = await req.json()
            if(res.ok){
                handlerRequest()
            }else{
                seterror("Error al subir el archivo")
            }
        } catch (error) {
            seterror("Error")
        }
    }
    

    useEffect(()=>{
        handlerRequest()
    }, [])

    return (
        <Layout>
            <div className="display__home">
                <h1>{nombre}</h1>
                <ul>
                    {actividad && actividad.cronograma.map(act => <div className="project__element" >

                        <h4>{act.nombreActividad}</h4>
                        <p><span><b>fecha limite de entrega: </b></span> {new Date(act.entrega).toISOString().split("T")[0]} </p>
                        {act.entregado ? <>
                            <h5>Fecha de entrega: {new Date(act.entregado.fecha).toISOString().split("T")[0]}. </h5>
                            {act.entregado.comentario && <p><b>Comentarios: {act.entregado.comentario} </b></p> }
                            <p>Estado: {new Date(act.entrega) > new Date(act.entregado.fecha) ?
                            <b style={{color: "green"}}>A tiempo</b> : <b style={{color: "red"}}>Atrasado</b>}</p>
                        </> : <>
                            {archivo && <p onClick={()=>{submitActivity(act.nombreActividad)}} className = "project__entrega">Entregar</p>} 
                            <input ref={inputFile} onChange={(e) => { setArchivo(inputFile.current.files[0].path)}} type="file" accept=".xlsx,.xls,.doc, .docx,.pdf" />
                        </>
                        }
                    </div>)}
                </ul>
            </div>
            {error &&  <><h3>{error}</h3></> }
        </Layout>
    );
}

export default ListaActividadesAlumno;
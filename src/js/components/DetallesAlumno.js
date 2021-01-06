import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom"
import Layout from '../layouts/Alumno';
import ProjectDisplay from "./ProjectDisplay"

const DetallesAlumno = () => {
    const {titulo} = useParams()
    const [actividad, setActividad] = useState(undefined)
    const handlerRequest =  async () =>{
        const req = await fetch(`http://localhost:3001/getSinglePro/${titulo}`)
        const doc = await req.json()
        if(doc){
            setActividad(doc)
        }
        else{
            seterror(true)
        }
    }
    useEffect(()=>{
        handlerRequest()
    },[])
    return <Layout>
        {actividad && <ProjectDisplay {...actividad} />} 
    </Layout>;
}

export default DetallesAlumno;

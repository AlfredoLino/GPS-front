import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom"
import {Context} from "./App"
import Layout from "../layouts/Alumno"
const MainAlumno = () => {
    const {usuario} = useContext(Context)
    const [proyectos, setProyectos] = useState(null)
    const getProjects = async () =>{
        try {
            const req = await fetch(`http://localhost:3001/getProjectsAlumno/${usuario.ncontrol}`)
            const data = await req.json()
            if(data){
                setProyectos(data)
            }else{
                console.log("error en mainalumno")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProjects()
    }, []);
    return (
        <Layout>
            <div className="display__home">
                <h1>Proyectos de {`${usuario.nombre} ${usuario.apellidos}`}</h1>
                <ul>
                    {proyectos && proyectos.map(pro => <div key = {pro.tituloProInt} className="project__element">
                        <h3> <Link className="project__link" to = {`/actividadesProyectoAlumno/${pro.tituloProInt}`}>{pro.tituloProInt}</Link> </h3>
                        <p>coordinador del proyecto: <b>{pro.profResp}</b></p>
                        <p>cliente: <b>{pro.cliente}</b></p>
                        <h4><Link to = {`/alumno/detalles/${pro.tituloProInt}`} >Ver detalles</Link></h4>
                    </div>)}
                </ul>
            </div>

        </Layout>
    );
}

export default MainAlumno;

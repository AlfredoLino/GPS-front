import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Link} from "react-router-dom"
import {Context} from "./App"
import Layout from "../layouts/Alumno"
const MainAlumno = () => {
    const {usuario} = useContext(Context)
    const [proyectos, setProyectos] = useState(null)
    const history = useHistory()
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
                <div>
                    <h1>Proyectos de {`${usuario.nombre} ${usuario.apellidos}`}</h1>
                    <ul>
                        {proyectos && proyectos.map(pro => <div key = {pro.tituloProInt} className="project__element">
                            <div>
                                <h3> <Link className="project__link" to = {`/actividadesProyectoAlumno/${pro.tituloProInt}`}>{pro.tituloProInt}</Link> </h3>
                                <p>coordinador del proyecto: <b>{pro.profRespName}</b></p>
                                <p>cliente: <b>{pro.cliente}</b></p>
                                <h4><Link to = {`/alumno/detalles/${pro.tituloProInt}`} >Ver detalles</Link></h4>
                            </div>
                            <div className='button-to_see_project' onClick={() => history.push(`/alumno/detalles/${pro.tituloProInt}`)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                            </div>
                        </div>
                        )}
                    </ul>
                </div>
            </div>

        </Layout>
    );
}

export default MainAlumno;

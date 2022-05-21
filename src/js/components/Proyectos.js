import React, {useEffect, useContext, useState}  from 'react';
import Layout from "../layouts/Profesor"
import TarjetaProyecto from "./TarjetaProyecto"
import {Context} from "./App"
import ProjectDisplay from "./ProjectDisplay"
import "../../styles/Proyectos.scss"
const Proyectos = () => {
    const {usuario} = useContext(Context)
    const [projectToView, setProjectToView] = useState(null)
    const [projects, setProjects] = useState(null)
    const getProjects = async ()=>{
        try {
            const req = await fetch('http://localhost:3001/getProyectos', {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        nombre: usuario.nombre
                    }
                )
            })
            const {proyecto} = await req.json()
            console.log(proyecto)
            setProjects(proyecto)
        } catch (error) {
            console.log(error)
        }
    }
    const handlerView = ( name )=>{
        const _proj = projects.find( pros => pros.tituloProInt == name )
        setProjectToView(_proj)
    }
    useEffect(() => {
        getProjects()
    }, []);
    return (
        <Layout>
            {
                projects ? 
                <>
                    <h2 className="pro__title">Proyectos: {usuario.nombre}</h2>
                    <div className="center">
                        <div className="irow">
                            <div 
                            style={{
                                padding: '0',
                                borderRadius: '5px',
                                boxShadow: '1px 7px 26px -7px rgba(0,0,0,0.75)'
                            }}
                            className="pro__list">   
                                {projects.map(proj => <TarjetaProyecto setProject={handlerView} title={proj.tituloProInt} />)}
                            </div>
                            <div 
                            style={{
                                margin: 'auto',
                                backgroundColor: 'white',
                                padding: '0',
                                borderRadius: '5px',
                                boxShadow: '1px 7px 26px -7px rgba(0,0,0,0.75)'
                            }}
                            className="project__display">
                                
                                { projectToView ? 
                                <ProjectDisplay 
                                    tituloProInt = {projectToView.tituloProInt}
                                    institucion = {projectToView.institucion}
                                    coordinador = {projectToView.profResp}
                                    departamentos = {projectToView.departamentos} 
                                    colab = {projectToView.colab}
                                    areaConoc = {projectToView.areaConoc}
                                    tipoEjec = {projectToView.tipoEjec}
                                    tipoProyecto = {projectToView.tipoProyecto}
                                    materiaEje = {projectToView.materiaEje}
                                    limityRest = {projectToView.limityRest}
                                    asignaturas = {projectToView.asignaturas}
                                    cronograma = {projectToView.cronograma}
                                />: <h3 className='select__project'> Seleccione un proyecto </h3>}
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className = 'loading__icon'>
                            <svg 
                            xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 loading__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                </div>
            }
            
        </Layout>
    );
}

export default Proyectos;

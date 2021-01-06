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
            <h2 className="pro__title">Proyectos: {usuario.nombre}</h2>
            <div className="center">
                <div className="irow">
                    <div className="pro__list">   
                        { projects && projects.map(proj => <TarjetaProyecto setProject={handlerView} title={proj.tituloProInt} />)}
                    </div>
                    <div className="project__display">
                        { projectToView ? 
                        <ProjectDisplay 
                            title = {projectToView.tituloProInt}
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
                        />: <h3> Seleccione un proyecto </h3>}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Proyectos;

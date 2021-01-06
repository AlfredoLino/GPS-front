import React, { useState } from 'react';
import fs from "fs"
import {join} from "path"
import {shell} from "electron"

const ProjectDisplay = (props) => {
    const {asignaturas, title, institucion, departamentos, coordinador, colab
    , areaConoc, tipoEjec, tipoProyecto, materiaEje
    ,limityRest, cronograma} = props
    
    const [downloadState, setDownloadState] = useState(false);
    const [dStateMsg, setDStateMsg] = useState("")

    const downloadHandler = async (act_name)=>{
        try{
            const req = await fetch("http://localhost:3001/download", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    titulo: title,
                    actividad: act_name
                })
            })

            const res = await req.json()
            if(res.ok){/*
                const file = new Buffer.from(res.buffer)
                console.log(Buffer.from(file.buffer))
                fs.writeFileSync(join(__dirname, "actividadCronograma.pdf"), Buffer.from(file.buffer))
                setDStateMsg("Descarga exitosa")
                setDownloadState(true)*/
            }else{
                setDStateMsg("Descarga fallida")
                setDownloadState(true)
                setInterval(() => {
                    setDownloadState(false)
                }, 2000);
            }
        }catch(err){
            console.log(err)
            setDStateMsg("Descarga fallida")
            setDownloadState(false)
        }
    }
    return (
        <div style={{width:"75%", margin:"20px auto"}}>
            <h3>Titulo: {title}</h3>
            <p> 
                <span><b>Institucion: </b>{institucion}</span> 
                <span><b>Coordinador: </b>{coordinador}</span> 
                <span><b>Colaborador(es): </b>{colab}</span>
            </p>
            <p>Departamentos: </p>
            <ul>
                {departamentos.map(({dep, plan}) => <li><b>{dep}</b>: {plan}</li>)}
            </ul>
            <p><b>Asignaturas: </b></p>
            <ul className="project__asignaturas">
                {asignaturas.map(asign =>
                    <li style={{margin: "7px"}} >
                        <p>
                            <span>
                                <b>Nombre: </b>
                                {asign.nombre}
                            </span> 
                            
                        </p>
                        <p>
                            <span>
                                <b> semestre: </b>
                                {asign.semestre}
                            </span>
                        </p>
                        <div className="row">
                            <div  className="col-md-6 project__element">
                                <p><b>Competencias a desarrollar: </b></p>
                                {asign.compDes}
                            </div>
                            <div  className="col-md-6 project__element">
                                <p><b>Competencias previas</b></p>
                                {asign.compPrev}
                            </div>
                        </div>
                        <div className="row">
                            <div  className="col-md-4 project__element">
                                <p><b>Etapa uno:</b></p>
                                {asign.etapa_one}
                            </div>
                            <div  className="col-md-4 project__element">
                                <p><b>Etapa dos:</b></p>
                                {asign.etapa_two}
                            </div>
                            <div  className="col-md-4 project__element">
                                <p><b>Etapa tres: </b></p>
                                {asign.etapa_three}
                            </div>
                        </div>
                    </li>
                )}
            </ul>
            <p>
                <span><b>Area de conocimiento: </b>{areaConoc+"  "}</span>
            </p>
            <p><span><b>Tipo de ejecución: </b> {tipoEjec+"  "}</span></p>
            <p><span><b>Materia Eje: </b>{materiaEje+"  "}</span></p>
            <p><span><b>Limites y restricciones: </b>{limityRest+"  "}</span></p>
            <p><span><b>Tipo de proyecto: </b>{tipoProyecto}</span></p>

            <h4>Actividades: </h4>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Actividad</th>
                        <th scope="col">Responsable(s)</th>
                        <th scope="col">Fecha de entrega</th>
                        <th scope="col">Estado de Entrega</th>
                    </tr>
                </thead>
                <tbody>
                    {cronograma.map(atvt => 
                    <tr>
                        <td>{atvt.nombreActividad}</td>
                        <td>{atvt.responsables.map(res => "/"+res)}</td>
                        <td>{atvt.entrega.split("T")[0]}</td>
                        <td>{(atvt.entregado) ? ( new Date(atvt.entrega) > new Date(atvt.entregado.fecha) ? <><b style = {{color: "green"}} >A tiempo</b> <button onClick={()=>{shell.openExternal('http://localhost:3001/download')}}>Descargar</button> </> : <><b style = {{color: "red"}} >Tarde</b><br/><button>Descargar</button></> ) 
                        : "Pendiente..."}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default ProjectDisplay;

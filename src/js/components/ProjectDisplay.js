import React, { useState } from 'react';
import {shell} from "electron"
import Comentarios from './Comentarios';

const ProjectDisplay = (props) => {
    const {asignaturas, tituloProInt, institucion, departamentos, coordinador, colab
    , areaConoc, tipoEjec, tipoProyecto, materiaEje
    ,limityRest, cronograma, id, _id} = props

    console.log('ProjectDisp', id)
    return (
        <div style={{width:"90%", margin:"20px auto", padding: '2%', backgroundColor: 'white', borderRadius:'5px'}}>
            
            
            <section className='project__header'>
                <div className='project__header-data'>

                    <h3>Titulo: {tituloProInt}</h3>
                    <p> 
                        <span><b>Institucion: </b>{institucion}</span> 
                        
                    </p>
                    <p><span><b>Coordinador: </b>{coordinador}</span></p>
                    <p><span><b>Colaborador(es): </b>{colab}</span></p>
                </div>
                <div style={{width: 'fit-content'}}>
                    <img style={{
                        
                            maxWidth: '50%',
                            marginLeft: '13.2rem',
                            marginTop: '0'
                        
                    }} src='http://www.cdmadero.tecnm.mx/images/logo-itcm-v2.png' />
                </div>
                <div className ='slash'></div>
            </section>


            <section
                style={{marginTop: "25px", marginBottom: '25px'}}
            >
                <p>Departamentos: </p>
                <ul>
                    {departamentos.map(({dep, plan}) => <li key = {plan}><b>{dep}</b>: {plan}</li>)}
                </ul>
            </section>
            <h3 className='header__asignatura'><b>Asignaturas: </b></h3>
            <section className="project__asignaturas">
                {asignaturas.map(asign =>
                    <div key = {asign.nombre} className = 'asignatura' >
                        <p>
                            <span>
                            <svg 
                            style={{
                                height: '1rem',
                            }}
                            xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                                <b>Nombre: </b>
                                {asign.nombre}
                            </span> 
                            
                        </p>
                        <p>
                            <span>
                                <svg 
                                style={{
                                    height: '1rem',
                                }}
                                xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                </svg>
                                <b> semestre: </b>
                                {asign.semestre}
                            </span>
                        </p>
                        <div style = {{
                                margin: '5px 0',
                                padding: '10px',
                                border: '1px solid gainsboro',
                                borderRadius: '5px',
                        }}
                        className="row">
                            <div  className="col-md-6">
                                <p><b>Competencias a desarrollar: </b></p>
                                {asign.compDes}
                            </div>
                            <div  className="col-md-6">
                                <p><b>Competencias previas</b></p>
                                {asign.compPrev}
                            </div>
                        </div>
                        <div 
                        style = {{
                            margin: '5px 0',
                            padding: '10px',
                            border: '1px solid gainsboro',
                            borderRadius: '5px',
                        }}
                        className="row">
                            <div  className="col-md-4">
                                <p><b>Etapa uno:</b></p>
                                {asign.etapa_one}
                            </div>
                            <div  className="col-md-4">
                                <p><b>Etapa dos:</b></p>
                                {asign.etapa_two}
                            </div>
                            <div  className="col-md-4">
                                <p><b>Etapa tres: </b></p>
                                {asign.etapa_three}
                            </div>
                        </div>
                    </div>
                )}
            </section>
            <section
            className = 'area__conocimiento'
                style = {{
                    margin: '15px 0',
                    padding: '10px',
                    border: '1px solid gainsboro',
                    borderRadius: '5px',
                }}
            >
                <p>
                    <span><b>Area de conocimiento: </b>{areaConoc+"  "}</span>
                </p>
                <p><span><b>Tipo de ejecución: </b> {tipoEjec+"  "}</span></p>
                <p><span><b>Materia Eje: </b>{materiaEje+"  "}</span></p>
                <p><span><b>Limites y restricciones: </b>{limityRest+"  "}</span></p>
                <p><span><b>Tipo de proyecto: </b>{tipoProyecto}</span></p>
            </section>
            

            <h4 className='header__asignatura'>Actividades: </h4>
            <table className="table"
            style={{
                margin: '15px 0',
                border: '2px solid gainsboro',
                borderRadius: '10px',
                boxShadow: '1px 1px 15px -10px rgba(0,0,0,0.75)',
            }}  
            >
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
                        <td>{(atvt.entregado) ? ( new Date(atvt.entrega) > new Date(atvt.entregado.fecha) ? 
                            <div
                            style={{
                                display: 'flex',
                                alignItems: 'baseline'                            
                            }}
                            >
                                <b style = {{color: "green", display:'inline-block'}} >A tiempo</b> 
                                <button className='btn' onClick={()=>{shell.openExternal(`http://localhost:3001/download?proyecto=${tituloProInt}&actividad=${atvt.nombreActividad}`)}}>
                                    
                                    <svg 
                                    style={{
                                        height: '1.3rem'
                                    }}
                                    xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </button> 
                            </div> 
                            : 
                            <div
                            style={{
                                display: 'flex',
                                alignItems: 'baseline'                            
                            }}
                            >
                                <b style = {{color: "red", display:'inline-block'}} >Tarde</b> 
                                <button className='btn' onClick={()=>{shell.openExternal(`http://localhost:3001/download?proyecto=${tituloProInt}&actividad=${atvt.nombreActividad}`)}}>
                                    
                                    <svg 
                                    style={{
                                        height: '1.3rem'
                                    }}
                                    xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </button> 
                            </div>  ) 
                            : "Pendiente..."}</td>
                    </tr>)}
                </tbody>
            </table>
            <button onClick = {() =>{ shell.openExternal(`http://localhost:3001/format-download?titulo=${tituloProInt}`) }} 
            style={{
                margin: "15px 0 0 10px",
                margin: '15px 0px 0px 10px',
                color: 'white',
                backgroundColor: '#00325F',
            }} 
            className='btn'>
                <svg 
                style={{
                    height: '1.3rem',
                    paddingRight: '10px'
                }}
                xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                    Descargar informe
            </button>
                
            <Comentarios projectId = {id || _id}/>
        </div>
    );
}

export default ProjectDisplay;

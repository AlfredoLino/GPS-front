import React, {useState, useContext} from 'react';
import AlumnCard from "./AlumnCard"
import {FormContext} from "../MainProfesor"
import {actions} from "./actions"
const Alumnos = () =>{

    const {state, dispatch} = useContext(FormContext)
    const [ncontrol, setNcontrol] = useState("")
    const [notFound, setNotFound] = useState(false)
    const onHandlerNcontrol = (eve) => { setNcontrol(eve.target.value) }
    const onHandlerAddAlumn = async () =>{
        try {
            const req = await fetch("http://localhost:3001/getAlumno", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ncontrol
                })
            })
            const data = await req.json()
            if(data.error){
              console.log(data)
              setNotFound(true)
              setTimeout(()=>{
                setNotFound(false)
              }, 2000)
              
            }else{
              const {nombre, semestre, apellidos, departamento, email} = data.data
              dispatch({action: actions.ADD_ALUMNO, value: {ncontrol, nombre, semestre, apellidos, departamento, email}})   
              setNcontrol("")
            }
        } catch (error) { 
            console.log(error)
        }
    }
    return <>
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Añadir alumnos
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Alumnos involucrados</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">Cerrar</button>
      </div>
      <div className="modal-body">
        {notFound && <div className="alert alert-warning" role="alert">
          Alumno no identificado
        </div> }
        <div className="input-group mb-3">
            <input value={ncontrol} onChange={onHandlerNcontrol} type="number" className="form-control" placeholder="#control"/>
        </div>
        <button onClick={onHandlerAddAlumn} style={{margin:"0"}} className="btn-block btn-outline-secondary" type="button">Agregar alumno</button>
        {state.alumnos.length > 0 ? state.alumnos.map(alumn => <AlumnCard key={alumn.ncontrol} ncontrol={alumn.ncontrol} nombre={`${alumn.nombre} ${alumn.apellidos}`} semestre = {alumn.semestre} departamento = {alumn.departamento} email = {alumn.email} />) : <h3>No hay alumnos en el proyecto</h3>}
      </div>
    </div>
  </div>
</div>
    </>
}

export default Alumnos
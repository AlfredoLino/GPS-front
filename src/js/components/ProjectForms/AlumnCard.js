import React, {useContext} from 'react';
import {FormContext} from "../MainProfesor"
import {actions} from "./actions"
const AlumnCard = ({nombre, departamento, semestre, email, ncontrol}) =>{
    const {dispatch} = useContext(FormContext)
    return <>
        <div className="card">
            <h5 className="card-header">Alumno: {nombre}</h5>
            <div className="card-body">
                <h5 className="card-title">Departamento: {departamento} ncontrol: {ncontrol}</h5>
                <p className="card-text">Semestre: {semestre}</p>
                <p className="card-text">Correo: {email}</p>
                <button onClick = {()=>{ dispatch({action:actions.REMOVE_ALUMNO, value: ncontrol}) }} className="btn-block btn-danger">Borrar</button>
            </div>
        </div>
    </>
}

export default AlumnCard
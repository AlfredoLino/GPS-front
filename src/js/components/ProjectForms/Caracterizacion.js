import React, {useContext, useState} from 'react';
import {FormContext} from "../MainProfesor"
import {actions} from "./actions"
const Caracterizacion = ()=>{
    const contextForm = useContext(FormContext) 
    
    const planteamientoHandler = (eve)=>{
        contextForm.dispatch({action: actions.SET_PLANTEAMIENTO, value: eve.target.value})
    }

    const justificacionHandler = (eve)=>{
        contextForm.dispatch({action: actions.SET_JUSTIFICACION, value: eve.target.value})
    }
    
    const alcancesHandler = (eve)=>{
        contextForm.dispatch({action: actions.SET_ALCANCES, value: eve.target.value})
    }
    
    const limresHandler = (eve)=>{
        contextForm.dispatch({action: actions.SET_LIM_RES, value: eve.target.value})
    }

    const tipoProyectoHandler = (eve) =>{
        contextForm.dispatch({action: actions.SET_TIPO_PROYECTO, value: eve.target.value})
    }
    
    const optionsTip = ["Formativo", "Resolutivo"]

    return <>
        <h1>Caracterizacion del proyecto</h1>
        <select onChange={tipoProyectoHandler}  value = {contextForm.state.tipoProyecto} className="form-select" style={{display:"block", width:"80%", padding:"5px"}} >
            {optionsTip.map(option => <option key={option} value={option}>{option}</option> )}
        </select>
        <div style={{padding: "10px 0"}} className="row">
            <div className="col-md-6">
                <div className="input-group">
                    <span className="input-group-text">planteamiento <br/>del proyecto</span>
                    <textarea onChange = {planteamientoHandler} value = {contextForm.state.planteamiento} name="form-control" cols="50" rows="5"></textarea>
                </div>
            </div>
            <div className="col-md-6" style={{padding:"0"}}>
                <div className="input-group">
                    <span className="input-group-text">justificacion</span>
                    <textarea onChange = {justificacionHandler} value = {contextForm.state.justificacion} name="form-control" cols="55" rows="5"></textarea>
                </div>
            </div>
        </div>
        <div style={{padding: "10px 0"}} className="row">
            <div className="col-md-6">
                <div className="input-group">
                    <span className="input-group-text">Alcances</span>
                    <textarea onChange = {alcancesHandler} value = {contextForm.state.alcances} name="form-control" cols="50" rows="5"></textarea>
                </div>
            </div>
            <div className="col-md-6" style={{padding:"0"}}>
                <div className="input-group">
                    <span className="input-group-text">Limitaciones<br/>y/o <br/>restricciones</span>
                    <textarea onChange = {limresHandler} value = {contextForm.state.limityRest} name="form-control" cols="55" rows="5"></textarea>
                </div>
            </div>
        </div>
        <button 
            onClick={()=>{contextForm.dispatch({action: actions.PREV_PAGE})}}
            className="btn btn-primary" >Regresar</button>
        <button 
            onClick={()=>{contextForm.dispatch({action: actions.NEXT_PAGE})}}
            className="btn btn-primary" >Siguiente</button>
    </>
}

export default Caracterizacion;
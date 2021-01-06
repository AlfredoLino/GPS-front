import React from 'react';

export default (props) =>{
    const {handler, type} = props
    const changeHandler = (event)=>{
        handler(event.target.value)
    }
    return <>
        <div className="form-group">
            <label htmlFor="tipoUsuario">Tipo de usuario:</label>
            <select value = {type} className="form-control" onChange = {changeHandler}>
                <option value = "profesor" >Maestro</option>
                <option value = "alumno" >Alumno</option>
            </select>
        </div>
    </>
}
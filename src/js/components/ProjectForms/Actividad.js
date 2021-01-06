import React, {useState, useContext} from 'react';
import {actions} from "./actions"
import {FormContext} from "../MainProfesor"
const Actividad = ({nactividad}) =>{

    const {state, dispatch} = useContext(FormContext)
    const [selectedAlumn, setSelectedAlumn] = useState("-1");
    const compStyles = {
        select:{
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "0",
          width: "400px",
        },
        button:{
          borderTopRightRadius: "0",
          borderBottomRightRadius: "0"
        }
    
    }

    const handlerSelectedAlumn = (eve) =>{
      setSelectedAlumn(eve.target.value)
    }
    const handlerDate = (eve)=>{
      dispatch({action: actions.SET_DATE_ACTIVITY, nactividad ,value: eve.target.value})
    }

    const handlerNombreActividad = (eve)=>{
      dispatch({action: actions.SET_NAME_ACTIVITY, nactividad, value: eve.target.value})
    }

    const handlerAddAlumnActivity = (eve) =>{
      if( selectedAlumn == "-1")
        return
      dispatch({action: actions.ADD_ALUMN_ACTIVITY, nactividad, value: selectedAlumn})
    }
    
    
    return <>
        <h3>Actividad {nactividad+1}</h3>
        <div class="input-group mb-3">
          <input onChange={handlerNombreActividad} className="form-control" placeholder="Nombre de actividadd"></input>
        </div>
        <div className="input-group mb-3">
            <button onClick={handlerAddAlumnActivity} style={{ ...compStyles.button }} className="btn btn-outline-secondary" type="button">Añadir</button>
            <select onChange={handlerSelectedAlumn} value={selectedAlumn} style={{ ...compStyles.select }} className="form-select">
                <option defaultChecked value = "-1">--Alumno---</option>
                {state.alumnos.map( alumn => <option value={`${alumn.nombre} ${alumn.ncontrol}`}>{alumn.nombre} || {alumn.ncontrol}</option> )}
            </select>
        </div>
        <div className="input-group mb-3">
            <label>Fecha de entrega: </label>
            <input onChange={handlerDate} style={{marginLeft:"15px"}} type="date" min={state.periodo.inicio} max={state.periodo.fin}/>
        </div>
        <h2>Responsables: </h2>
        {state.cronograma.length > 0 &&
        state.cronograma.map( activity => 
          (activity.nactividad == nactividad) &&
            activity.responsables.map(name => 
              <div class="input-group mb-3">
                <input value={name} type="text" disabled class="form-control" />
                <button onClick={() =>{ dispatch({ action: actions.REMOVE_ALUMN_ACTIVITY, nactividad, value: name }) }} class="btn btn-danger" type="button">Quitar</button>
              </div> 
            )
                  
        )
        }
        
        


    </>
}

export default Actividad
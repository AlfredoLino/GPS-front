import React, {useState, useContext} from 'react';
import {actions} from "./actions"
import {FormContext} from "../MainProfesor"
const Actividad = ({nactividad, index}) =>{

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
    
    
    return <div className='activity'>
        <h3>Actividad {index+1}</h3>
        <div className="input-group mb-3">
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
          (activity.nactividad == nactividad) ?
            activity.responsables.map(name => 
              <div className="input-group mb-3">
                <input value={name} type="text" disabled className="form-control" />
                <button onClick={() =>{ dispatch({ action: actions.REMOVE_ALUMN_ACTIVITY, nactividad, value: name }) }} className="btn btn-danger" type="button">Quitar</button>
              </div> 
            ) : 'Aun no hay responsables asignados'
        )
        }
        <button className='btn section__cronograma-delete-button'
        onClick={eve => {
          dispatch({action : actions.REMOVE_ACTIVITY_FROM_CRONO, value: nactividad})
        }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>

    </div>
}

export default Actividad
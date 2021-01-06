import React, {useContext} from 'react';
import {FormContext} from "../MainProfesor";
import {actions} from "./actions"
const ListaCompetencias = ({titulo, semestre, compPrev, compDes, etapaone, etapatwo, etapathree}) =>{
    const {state, dispatch} = useContext(FormContext)
    const removeCompetencia = () =>{
      dispatch({action: actions.REMOVE_COMPETENCIA, value: titulo})
    }

    const onHandlerEtapaOne = (eve) =>{
      dispatch({action: actions.ADD_COMPETENCIA_ETAPA_1, value:{nombre: titulo, etapa:eve.target.value}})
    }

    const onHandlerEtapaTwo = (eve) =>{
      dispatch({action: actions.ADD_COMPETENCIA_ETAPA_2, value:{nombre: titulo, etapa:eve.target.value}})
    }

    const onHandlerEtapaThree = (eve) =>{
      dispatch({action: actions.ADD_COMPETENCIA_ETAPA_3, value:{nombre: titulo, etapa:eve.target.value}})
    }

    const stylesForms = {
      cols:{
        padding: "0"
      },
      tareas:{
        borderRadius: "0"
      }
    }
    return <div class="list-group" style={{margin: "15px 0"}} >
    <button onClick={removeCompetencia} style={{borderRadius:"0"}} className="btn btn-danger" >Borrar</button>
    <span class="list-group-item">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">Asignatura: {titulo} </h5>
        <small class="text-muted">Semestre: {semestre}</small>
      </div>
      <p class="mb-1"><b>Competencias previas: </b>{compPrev}</p>
      <p class="mb-1"><b>Competencias a desarrollar: </b>{compDes}</p>
      <div className="row">
        <div style={{...stylesForms.cols}} className="col-sm-4">
          <label><p>Etapa 1</p></label>
          <textarea value={etapaone} onChange={onHandlerEtapaOne} placeholder="Descripción" style={{...stylesForms.tareas}} className="form-control" cols="30" rows="5"></textarea>
        </div>
        <div style={{...stylesForms.cols}} className="col-sm-4">
          <label><p>Etapa 2</p></label>
          <textarea value={etapatwo} onChange={onHandlerEtapaTwo} placeholder="Descripción" style={{...stylesForms.tareas}} className="form-control" cols="30" rows="5"></textarea>
        </div>
        <div style={{...stylesForms.cols}} className="col-sm-4">
          <label><p>Etapa 3</p></label>
          <textarea value={etapathree} onChange={onHandlerEtapaThree} placeholder ="Descripción" style={{...stylesForms.tareas}} className="form-control" cols="30" rows="5"></textarea>
        </div>
      </div>
    </span>
  </div>
}

export default ListaCompetencias
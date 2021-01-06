import React, {useContext, useState} from 'react';
import {FormContext} from "../MainProfesor"
import {actions} from "./actions"
import ListaCompetencias from "./ListaCompetencias"

const Competencias = ()=>{
    const {state, dispatch} = useContext(FormContext);
    const [selectedCompt, setSelectedCompt] = useState("-1");
    const compStyles = {
        buttonAdd:{borderTopRightRadius:"0", borderBottomRightRadius:"0"},
        selectMat:{borderRadius:"0", width: "400px"}
    }

    const handlerSelectedCompt = (eve) =>{
        
        setSelectedCompt(eve.target.value)
        
    }

    const addCompetencia = () =>{
        if(selectedCompt == "-1"){
            return
        }
        const [nombre, compDes, compPrev, semestre] = selectedCompt.split("/")
        const newValue = {nombre, compDes, compPrev, semestre}
        dispatch({action: actions.ADD_COMPETENCIA, value: newValue})
    }

    return <>
        <h1>Competencias</h1>
        {state.departamentos.length > 0 &&
        <div className="input-group mb-3">
            <button onClick={addCompetencia} className="btn btn-outline-secondary" style={{...compStyles.buttonAdd}} type="button">Añadir</button>
            <select value={selectedCompt} onChange={handlerSelectedCompt} style={{...compStyles.selectMat}} class="form-select">
                <option defaultChecked value = "-1">--seleccionar competencia--</option>
                {state.departamentos.map(dep => dep.materias.map(materia => <option key={materia._id} value={`${materia.nombre}/${materia.compDes}/${materia.compPrev}/${materia.semestre}`}>{materia.nombre}</option> ) )}
            </select>
        </div>}
        <div className="container">
            {state.asignaturas.length > 0 ? state.asignaturas.map(asign => <ListaCompetencias key={asign.nombre} etapathree= {asign.etapa_three} etapatwo={asign.etapa_two} etapaone={asign.etapa_one} compDes={asign.compDes} compPrev={asign.compPrev} titulo={asign.nombre} semestre ={asign.semestre} />): <h3>Por favor, inserte una competencia</h3> }
            
        </div>
        <button style={{marginTop: "15px"}} className={"btn btn-primary"} onClick = {
            ()=>{ dispatch({ action: actions.PREV_PAGE }) }
        }>Regresar</button>
        <button style={{marginTop: "15px"}} className={"btn btn-primary"} onClick = {
            ()=>{ dispatch({ action: actions.NEXT_PAGE }) }
        }>Siguiente</button>
    </>
}

export default Competencias
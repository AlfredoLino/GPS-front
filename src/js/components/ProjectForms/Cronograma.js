import React,{useContext, useState} from 'react';
import {FormContext} from "../MainProfesor"
import Actividad from "./Actividad"
import {actions} from "./actions"
import validator from '../../validations/cronograma';
import {Redirect} from 'react-router-dom'

const Cronograma = () =>{
  const {state, dispatch} = useContext(FormContext)
  const [last] = state.cronograma.slice(-1)
  const [activityCount, setActivityCount] = useState(last ? last.nactividad+1 : 0)
  const [selectedProduct, setSelectedProduct] = useState("-1");
  const [validData, setValidData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState(false);

  const addActivity = () => {
    setActivityCount(prev => prev+1)
    dispatch({action: actions.ADD_ACTIVITY, value: activityCount})
  }
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

  const productoAcademico = 
  [
    "Artículos científicos en revistas arbitrada",
    "Artículos de divulgación ", "Memorias en extenso en congresos nacionales",
    "Memorias en extenso en congresos internacionales",
    "Libros",
    "Capítulos de libros",
    "Patentes",
    "Prototipos",
    "Paquetes tecnológicos", 
    "Informes técnicos a empresas o instituciones"
  ]

  const handlerProductoEntrega = ()=>{
    if(selectedProduct == "-1")
      return
    dispatch({ action: actions.SET_PRODUCTIVIDAD_ACADEMICA, value: selectedProduct })
  }

  const handlerRemoveEntrega = (value)=>{
    dispatch({ action: actions.REMOVE_PRODUCTIVIDAD_ACADEMICA, value })
  }
  
  const handlerSubmitProject = async () =>{
    setLoading(true)
    try {
      const req = await fetch("http://localhost:3001/createProyecto", {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            ...state
          }
        )
      })
      const res = await req.json()
      if (res) {
        
        setCreated(true)

      }
    } catch (error) {
      console.log(error)
    }
    
  }

  return <>
    {created && <Redirect to = '/creado' />}
    <div style={{padding: "15px 10px 0 0"}} className="accordion accordion-flush" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button style= {{ borderRadius: "5px", width: "100%" }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            Cronograma
          </button>
        </h2>
        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body">
            <div className="container cronograma">
              {state.cronograma.length > 0 && state.cronograma.map(info => <Actividad nactividad= {info.nactividad} />) }
            </div>
            <button style={{margin: "10px 0"}} className = "btn btn-primary" onClick={addActivity} >Agregar Actividad</button>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingThree">
          <button style={{ borderRadius: "5px", width: "100%" }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
            Impacto del Proyecto y Productividad Academica
          </button>
        </h2>
        <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body">
            <div style={{margin: "10px 0"}}>
            <textarea onChange={({target})=>{dispatch({action:actions.SET_IMPACTO_PROYECTO, value: target.value})}} style={{borderRadius:"0"}} className= "form-control" cols="30" rows="5" placeholder="Impacto del proyecto" ></textarea>
            <div className="input-group mb-3">
              <button onClick={handlerProductoEntrega} style={{ ...compStyles.button }} className="btn btn-outline-secondary" type="button">Añadir</button>
              <select onChange={ eve => {setSelectedProduct(eve.target.value)} } style={{ ...compStyles.select }} className="form-select">
                  <option defaultChecked value = "-1">---Producto Academico---</option>
                  { productoAcademico.map( product => <option value={product}>{product}</option> )}
                  <option value="Otras">Otras</option>
              </select>
              { productoAcademico.indexOf(selectedProduct) == "-1" && <input onChange={ eve => {setSelectedProduct(eve.target.value)} } placeholder="Describa el producto." className="form-control" type="text"  />}
            </div>
              <ul className="list-group">
                {state.productoEntrega.map(text => 
                  <li key = {text} className="list-group-item">
                      <p>{text}</p>
                      <button onClick={() =>{ handlerRemoveEntrega(text) }} type="button" className="btn btn-danger btn-sm">Quitar</button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style={{margin: "10px 0"}} >
    <button className="btn btn-primary" onClick={
      ()=>{ dispatch({action: actions.PREV_PAGE}) }
    } >Regresar</button>
    </div>

    <button  onClick = {()=>{
      const {
        cronograma,
        impactoProyecto,
        productoEntrega
      } = state
      const result = validator.validate({
        cronograma,
        impactoProyecto,
        productoEntrega
      })
      console.log(result)
      if(!result.error){
        console.log("DATOS VALIDOS")
        setValidData(true)
      }else{
        setValidData(false)
      }

    }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      CREAR PROYECTO
    </button>

    
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Confirmación</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {validData && <h4>Datos Validos...</h4>}
            {validData ?  "Por favor, confirme que está seguro de los datos proporcionados anteriormente.": "Por favor verifique que cumpla todos los campos antes de continuar."}
            
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            {validData &&
            <button data-bs-dismiss="modal" disabled = {loading} onClick={handlerSubmitProject} className="btn btn-warning">confirmar y crear proyecto</button>
            }
          </div>
        </div>
      </div>
    </div>
        
  </>
}

export default Cronograma
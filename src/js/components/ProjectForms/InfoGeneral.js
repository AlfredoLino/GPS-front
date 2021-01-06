import React, {useState ,useEffect, useContext} from 'react';
import Alumno from "./Alumnos"
import {FormContext} from "../MainProfesor"
import {Context} from "../App"
import {actions} from "./actions"
import "../../../styles/Formulario.scss"

const areaCon = 
[
    "Ingeniería y Tecnologías",
    
    "Ciencia de la Tierra y del Medio Ambiente",
    "Ciencias Económico-Administrativo", 

    "Ciencias Agrícolas ",

    "Ciencias Biológicas" , 

    "Ciencias Naturales" ,

    "Ciencias del Mar" ,

    "Ciencias Sociales y Humanidades"
]
const tipoEjec =
[
    
"Asignatura (estructura genérica)", 

"Especialidad" ,

"Servicio Social",

"Actividades Complementarias",

"Residencias Profesionales", 

"Titulación",

"Evento Nacional de Innovación", 

"Tecnológica (ENIT)"
]
const regex = /[#&%$!\(\)\[\]=*-+\"\'_]/
const InfoGeneral = ()=>{
    const contextForm = useContext(FormContext)
    const {usuario} = useContext(Context)
    const [listaDeps, setListaDeps] = useState([]);
    const [selectedDep, setSelectedDep] = useState("-1");
    const [stateInputs, setStateInputs] = useState(
        {
            inst: false,
            titulo: false,
            colabs: false,
            cliente: false
        }
    )
    const requestPlanes = async()=>{
        try { 
            const req = await fetch('http://localhost:3001/reticulas')
            const {data} = await req.json()
            if(data.error){
                console.log('Error en el request')
            }
            else{
                data.forEach( plan => {
                    setListaDeps( prev =>{
                        return [...prev, {dep:plan.dep, plan: plan.studyPlan, materias: plan.materias}]
                    } )
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        requestPlanes()
        contextForm.dispatch({action: actions.SET_PRO_RESP, value: usuario.nombre})
    }, []);

    const institucionHandler = (eve) =>{
        if(eve.target.value.match(regex) || eve.target.value[eve.target.value.length-1] == "/"){
            setStateInputs(prev => {
                return {...prev, inst:false} 
            })
        }else{
            setStateInputs(prev => {
                return {...prev, inst:true} 
            })
        }
        contextForm.dispatch(
            {
                action: actions.SET_INSTITUCION,
                value: eve.target.value
            }
        )
    }
    const onSelectedDep = (eve) =>{
        const dep = eve.target.value
        setSelectedDep(dep)
    }
    const onSetDepartamento = ()=>{
        if(selectedDep == "-1"){
            return
        }
        const [dep, plan] = selectedDep.split("/")
        const {materias} = listaDeps.find(d => dep == d.dep)
        contextForm.dispatch({action: actions.ADD_DEP, value: {dep, plan, materias}})
    }

    const removeDepartamento = (dep)=> {
        contextForm.dispatch({action: actions.REMOVE_DEP, value: dep})
    }

    const onHandlerTituloPro = (eve) =>{
        contextForm.dispatch({action: actions.SET_TITULO_PRO, value: eve.target.value})
    }

    const onHandlerCliente = (eve) => {
        contextForm.dispatch({action: actions.SET_CLIENTE, value: eve.target.value})
    }

    const onHandlerAreaConoc = (eve) =>{
        contextForm.dispatch({action: actions.SET_AREA_CONOC, value: eve.target.value})
    }

    const onHandlerTipoEjec = (eve) =>{
        contextForm.dispatch({action: actions.SET_TIPO_EJEC, value: eve.target.value})
    }

    const onHandlerInicio = (eve)=>{
        contextForm.dispatch({action: actions.SET_INICIO_PERIODO, value: eve.target.value})
    }
    const onHandlerFin = (eve)=>{
        contextForm.dispatch({action: actions.SET_FIN_PERIODO, value: eve.target.value})
    }

    const onHandlerMateriaEje = (eve) =>{
        contextForm.dispatch({action: actions.SET_MATERIA_EJE, value : eve.target.value})
    }

    return <>
        <h2>Informacion General</h2>
        {!stateInputs.inst &&
            <div class="alert alert-warning" role="alert">
            ---Campo instituciones--- Caracteres especiales no admitidos excepto "/" o último digito no puede ser "/"
            </div>
        }
        <div className="reng">
            <div>
                <label>Institución (dividir con "/" en caso de mas de una): </label>
                <input minLength="6" value = {contextForm.state.institucion} onChange = {institucionHandler} type="text" className="form-control" placeholder="Institucion"  />
                
            </div>
            <div>
                <label>Coordinador del proyecto integrador </label>
                <input value={contextForm.state.profResp} disabled minLength="6" type="text" className="form-control"  />
                
            </div>
        </div>
        <div className="reng">
            <div>
                <label>Departamentos</label>
                    <select onChange={onSelectedDep} value={selectedDep} className="form-select" aria-label="Default select example" style={{marginLeft:"25px", padding:"5px 0"}}>
                        <option defaultChecked value="-1" disabled >--Departamentos--</option>
                        {listaDeps.length > 0 && listaDeps.map(item => 
                            <option value={`${item.dep}/${item.plan}`}>{item.dep}</option>
                        )}
                    </select>
                    <button onClick = {onSetDepartamento} className="btn btn-primary">
                    +
                    </button>
                    
            </div>
            <div>
                <p>Añadir Alumnos para el proyecto: <Alumno /></p>
                
            </div>
        </div>
        <div className="reng">
            <div>
                <ul className="list-group">
                { contextForm.state.departamentos.length > 0 &&
                    contextForm.state.departamentos.map(dep => 
                    <li className="list-group-item" >{dep.dep}
                        <button style={{textAlign:"right"}} onClick={()=>{ removeDepartamento(dep) }}  className = "btn btn-danger" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </li>)
                }
                        
                </ul>
            </div>
        </div>
        <div className="reng">
            <div>
                <label>Titulo del Proyecto Integrador: </label>
                <input value={contextForm.state.tituloProInt} onChange={onHandlerTituloPro} type="text" className="form-control" placeholder="Titulo"  />
            </div>
            <div>
                <label>Colaborador(res): </label>
                <input value={contextForm.state.colab} onChange={(eve)=>{contextForm.dispatch({action: actions.SET_COLAB, value: eve.target.value})}} type="text" className="form-control" placeholder="Colaborador(res)"  />
            </div>
        </div>
        <div className="reng">
            <div>
                <label>Cliente: </label>
                <input value = {contextForm.state.cliente} onChange={onHandlerCliente}  type="text" className="form-control" placeholder="Cliente"  />
            </div>
            <div>
                <label>Plan(es) de Estudio: </label>
                <input disabled value = { 
                    contextForm.state.departamentos.length > 0
                    ? contextForm.state.departamentos.map( dep => dep.plan+" " )
                    : "" 
                } type="text" className="form-control" placeholder="Planes"  />
            </div>
        </div>
        <div className="reng">
            <div>
                <label>Materia eje</label>
                <select onChange={onHandlerMateriaEje} style={{marginLeft:"25px", padding:"5px 0"}} class="form-select" aria-label="Default select example">
                    <option defaultChecked value="-1">Seleccione materia eje</option>
                    {
                        contextForm.state.departamentos.length > 0 &&
                        contextForm.state.departamentos.map(dep =>
                            dep.materias.map(mat => <option key={mat._id} value={mat.nombre}>{mat.nombre}</option> )
                        )
                    }
                </select>
            </div>
            <div>
                <label> Periodo: </label>
                <input type="date" min={new Date().toISOString().split("T")[0]} onChange = {onHandlerInicio} style={{ marginLeft:"25px", padding: "5px 0" }}/>
                <input type="date" min={new Date().toISOString().split("T")[0]} onChange = {onHandlerFin} style={{ marginLeft:"25px", padding: "5px 0" }}/>
            </div>

        </div>           
        <div className="row">
            <div className="col-sm-6">
                <div className="input-group mb-3">
                            <label className="input-group-text" style={{borderTopRightRadius:"0", borderBottomRightRadius:"0"}} >Areas de conocimiento: </label>
                            <select value = {contextForm.state.areaConoc} onChange={onHandlerAreaConoc} style={{width: (areaCon.indexOf(contextForm.state.areaConoc) == "-1" && contextForm.state.areaConoc != "" ) ? "120px":"325px", borderRadius:"0"}} class="form-select" id="inputGroupSelect01">
                                <option defaultChecked value="-1">--Areas--</option>
                                {areaCon.map(area => <option key={area} value={area}>{area}</option> )}
                                <option value="Otras">Otras</option>
                            </select>
                            { (areaCon.indexOf(contextForm.state.areaConoc) == "-1" && contextForm.state.areaConoc != "" ) && <input onChange={onHandlerAreaConoc} placeholder="Especificación" style={{display:"block"}} type="text" className="form-control" />}
                </div>
            </div>
            <div className="col-sm-6">
                <div className="input-group mb-3">
                        <label className="input-group-text" style={{borderTopRightRadius:"0", borderBottomRightRadius:"0"}} >Tipo de ejecución</label>
                        <select value = {contextForm.state.tipoEjec} onChange={onHandlerTipoEjec} style={{width: (tipoEjec.indexOf(contextForm.state.tipoEjec) == "-1" && contextForm.state.tipoEjec != "" ) ? "120px":"325px", borderRadius:"0"}} class="form-select" id="inputGroupSelect01">
                            <option defaultChecked value = "-1">--Ejecuciones--</option>
                            {tipoEjec.map(tipo => <option key={tipo} value={tipo}>{tipo}</option> )}
                            <option value="Otras">Otras</option>
                        </select>
                        {(tipoEjec.indexOf(contextForm.state.tipoEjec) == "-1" && contextForm.state.tipoEjec != "" ) && <input className="form-control" onChange={onHandlerTipoEjec} type="text"/> }
                </div>
            </div>
        </div>
        <button onClick={(eve)=>{
            contextForm.dispatch({ action: actions.NEXT_PAGE, mensaje: "Hola payload" })
            console.log(contextForm.state.departamentos)
        }} className = "btn btn-primary">Siguiente</button>       
    
    </>
    
}
export default InfoGeneral
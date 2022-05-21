import React, {useState ,useEffect, useContext} from 'react';
import Alumno from "./Alumnos"
import {FormContext} from "../MainProfesor"
import {Context} from "../App"
import {actions} from "./actions"
import validator from "../../validations/datos_generales"
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
    const [invalidData, setInvalidData] = useState(false)
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
        <div style={
            {
                backgroundColor: 'white',
                padding: '1rem',
                marginTop: '1rem',
                marginBottom: '1rem',
                borderRadius: '10px',
                boxShadow: '1px 7px 26px -7px rgba(0,0,0,0.75);'
            }
        } >
            <h2>Informacion General</h2>
            {invalidData && <div className="alert alert-danger" role="alert">
                   Todos los campos deben ser llenados de forma satisfactoria.
                </div>
            }
            <div className="reng">
                <div >
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
                        <span onClick = {onSetDepartamento} >
                            <svg style={{
                                cursor: 'pointer',
                                width: '30px'
                            }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </span>
                        
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
                        <li className="list-group-item" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline'
                        }}> {dep.dep}
                            <button style={{textAlign:"right"}} onClick={()=>{ removeDepartamento(dep) }}  className = "btn btn-danger" >
                            <span>
                                <svg 
                                            style={{
                                                cursor: 'pointer',
                                                width: '30px'
                                            }}
                                xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                </svg>
                            </span>
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
                    <select onChange={onHandlerMateriaEje} style={{marginLeft:"25px", padding:"5px 0"}} className="form-select" aria-label="Default select example">
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
                    <input value ={contextForm.state.periodo.inicio ? contextForm.state.periodo.inicio: '' } type="date" min={new Date().toISOString().split("T")[0]} onChange = {onHandlerInicio} style={{ marginLeft:"25px", padding: "5px 0" }}/>
                    <input value ={contextForm.state.periodo.fin ? contextForm.state.periodo.fin: '' } type="date" min={ contextForm.state.periodo.inicio ? contextForm.state.periodo.inicio : new Date().toISOString().split("T")[0]} defaultValue = {contextForm.state.periodo.inicio && contextForm.state.periodo.inicio} onChange = {onHandlerFin} style={{ marginLeft:"25px", padding: "5px 0" }}/>
                </div>

            </div>           
            <div className="row">
                <div className="col-sm-6">
                    <div className="input-group mb-3">
                                <label className="input-group-text" style={{borderTopRightRadius:"0", borderBottomRightRadius:"0"}} >Areas de conocimiento: </label>
                                <select value = {contextForm.state.areaConoc} onChange={onHandlerAreaConoc} style={{width: (areaCon.indexOf(contextForm.state.areaConoc) == "-1" && contextForm.state.areaConoc != "" ) ? "120px":"325px", borderRadius:"0"}} className="form-select" id="inputGroupSelect01">
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
                            <select value = {contextForm.state.tipoEjec} onChange={onHandlerTipoEjec} style={{width: (tipoEjec.indexOf(contextForm.state.tipoEjec) == "-1" && contextForm.state.tipoEjec != "" ) ? "120px":"325px", borderRadius:"0"}} className="form-select" id="inputGroupSelect01">
                                <option defaultChecked value = "-1">--Ejecuciones--</option>
                                {tipoEjec.map(tipo => <option key={tipo} value={tipo}>{tipo}</option> )}
                                <option value="Otras">Otras</option>
                            </select>
                            {(tipoEjec.indexOf(contextForm.state.tipoEjec) == "-1" && contextForm.state.tipoEjec != "" ) && <input className="form-control" onChange={onHandlerTipoEjec} type="text"/> }
                    </div>
                </div>
            </div>
        </div>
        <button onClick={(eve)=>{
            const {
                institucion,
                profResp,
                departamentos,
                alumnos,
                tituloProInt,
                colab,
                cliente,
                materiaEje,
                periodo,
                areaConoc,
                tipoEjec,
            } = contextForm.state
            const result = validator.validate(
            {
                institucion,
                profResp,
                departamentos,
                alumnos,
                tituloProInt,
                colab,
                cliente,
                materiaEje,
                periodo,
                areaConoc,
                tipoEjec,
            })
            if(result.error){
                setInvalidData(true)
                setInterval(()=>{
                    setInvalidData(false)
                }, 2000)
            }else{

                // WTF with the dispatch message payload
                
                contextForm.dispatch({ action: actions.NEXT_PAGE, mensaje: "Hola payload" })
            }
        }} className = "btn btn-primary">Siguiente</button>       
    
    </>
    
}

export default InfoGeneral
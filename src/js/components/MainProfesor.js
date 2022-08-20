import React, { useContext, useReducer} from 'react';
//import {Context} from './App'
//import {Redirect, useParams} from 'react-router-dom'
import { Context } from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import Layout from '../layouts/Profesor'
import InfoGeneral from './ProjectForms/InfoGeneral'
import Caracterizacion from "./ProjectForms/Caracterizacion"
import Competencias from "./ProjectForms/Competencias"
import Cronograma from "./ProjectForms/Cronograma"
import reducer from "./ProjectForms/reducer"
import "../../styles/MainProfesor.scss"

const FormContext = React.createContext()
const initialFormState = 
{
    page: 1,
    institucion: "",
    profResp: "",
    departamentos: [],
    alumnos:[],
    tituloProInt: "",
    colab: "",
    cliente: "",
    materiaEje: "-1",
    periodo: {},
    areaConoc: "",
    tipoEjec: "",
    tipoProyecto: "Formativo",
    planteamiento: "",
    justificacion: "",
    alcances: "",
    limityRest: "",
    asignaturas: [],
    productoEntrega: [],
    cronograma:[],
    impactoProyecto: ""

}
const MainProfesor = (props)=>{
    
    const [state, dispatch] = useReducer(reducer, initialFormState);
    const con = useContext(Context)
    return <>
        <Layout>
            <div className="container">
                <div className="row" >
                    <div className="col-md-12" style={{overflow:"scroll", maxHeight:"100%"}}>
                        <FormContext.Provider value={{state, dispatch}}>
                            {state.page == 1 && <InfoGeneral />}
                            {state.page == 2 && <Caracterizacion />}
                            {state.page == 3 && <Competencias />}
                            {state.page == 4 && <Cronograma />}
                        </FormContext.Provider>
                    </div>
                </div>
            </div>
        </Layout>
        
    </>

}
export {FormContext}
export default MainProfesor
import React, {useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './Login'
import Proyectos from "./Proyectos"
import MainProfesor from "./MainProfesor"
import MainAlumno from "./MainAlumno"
import ListaActividadesAlumno from "./ListaActividadesAlumno"
import DetallesAlumno from "./DetallesAlumno"
import "bootstrap/dist/css/bootstrap.min.css"
import "../../styles/Login.scss"

const Context = React.createContext();
const App = ()=>{
    
    const [token, setToken] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const initialState = 
    {
        token,
        setToken,
        usuario,
        setUsuario
    }
    return <>
        <Context.Provider value={initialState}>
            <BrowserRouter>
                <Switch>
                    <Route exact path={`/actividadesProyectoAlumno/:nombre`} >
                        <ListaActividadesAlumno />
                    </Route>
                    <Route exact path= "/profesor/main">
                        <MainProfesor/>
                    </Route>
                    <Route exact path = "/alumno/detalles/:titulo">
                        <DetallesAlumno />
                    </Route>
                    <Route exact path="/alumno/main">
                        <MainAlumno />
                    </Route>
                    <Route exact path = "/profesor/proyectos">
                        <Proyectos/>
                    </Route>
                    <Route path = "/">
                        <Login />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Context.Provider>
    </>
}
export {Context}
export default App
import React, {useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './Login'
import ProjectCreated from './ProjectCreated'
import Proyectos from "./Proyectos"
import MainProfesor from "./MainProfesor"
import MainAlumno from "./MainAlumno"
import ListaActividadesAlumno from "./ListaActividadesAlumno"
import DetallesAlumno from "./DetallesAlumno"
import "../../styles/Login.scss"
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomeProfesor from './HomeProfesor';
import InformacionGeneral from './ProjectCapture/Index';


const Context = React.createContext();
const colors = {
    madero: {
        base: '#d5a041'
    },
    tecnm: {
        base: '#1d2d50',
        light: '#1d2d50e7',
        dark: '#10182b'
    }
}
const fonts = {
    fonts: {
        body: 'Lato, sans-serif',
        heading: 'Aguafina Script, sans-serif',
        mono: "Menlo, monospace",
    },
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
            refetchOnMount: false,
            refetchInterval: false,
            refetchOnReconnect: false
        },
        mutations: {
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
            refetchOnMount: false,
            refetchInterval: false,
            refetchOnReconnect: false
        }
    }
})

const App = ()=>{
    
    const [token, setToken] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const initialState = 
    {
        token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkNhcmxvc0BnbWFpbC5jb20iLCJpYXQiOjE2NTE2MzY3NDl9.Z2JQ9IR6lAb6i2_BCNQn0BzV9JjwWLoSxDeGxfLv65I",
        setToken,
        usuario
        : {
            departamento: "Sistemas computacionales",
            email: "Carlos@gmail.com",
            nombre: "Carlos Arturo Aguilar",
            password: "password",
            __v: 0,
            _id: "5fccff4af8f1cb2b90967f01",
            foto: 'profesor.jpg'
        },
        setUsuario
    }
    
    

    // apellidos: "Lino Mendoza",
    // date: "2021-01-05T06:00:00.000Z",
    // departamento: "Sistemas Computacionales",
    // email: "LINO2@gmail.com",
    // ncontrol: "17070714",
    // nombre: "Alfredo",
    // password: "password",
    // semestre: "7",
    // __v: 0,
    // _id: "5fcbf2c1df82513e8c50bca2",
    // foto: 'foto.jpeg'
    return <>
        <Context.Provider value={initialState}>
            <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={extendTheme({colors, fonts})}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path = '/creado' >
                            <ProjectCreated />
                        </Route>
                        <Route exact path={`/actividadesProyectoAlumno/:nombre`} >
                            <ListaActividadesAlumno />
                        </Route>
                        <Route exact path= "/profesor/main">
                            <HomeProfesor />
                        </Route>
                        <Route exact path = "/alumno/detalles/:titulo">
                            <DetallesAlumno />
                        </Route>
                        <Route exact path="/alumno/main">
                            <MainAlumno />
                        </Route>
                        <Route exact path = "/profesor/nuevacaptura">
                            <InformacionGeneral/>
                        </Route>
                        <Route exact path = "/profesor/capturar">
                            <MainProfesor/>
                        </Route>
                        <Route exact path = "/profesor/proyectos">
                            <Proyectos/>
                        </Route>
                        <Route path = "/">
                            <Login />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </ChakraProvider>
            </QueryClientProvider>
        </Context.Provider>
    </>
}
export {Context}
export default App
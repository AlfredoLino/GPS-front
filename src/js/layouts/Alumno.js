import React,{useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Context} from "../components/App"
import "../../styles/Alumno.scss"
const LayoutAlumno = ({children}) =>{
    const {token, setToken, usuario } = useContext(Context)
    
    return <>
        { !token && <Redirect to="/" /> }
        <nav className="navbar navbar-light" style={{ backgroundColor: "#1d2d50" }}>
            <div className="container-fluid">
                <div style={{display: "flex"}}>
                    <Link to="/alumno/main" className="navbar-brand" style={{color: "#ffffff"}}> <h4> TecNM </h4></Link>
                    
                    
                <Link to = "/alumno/main" className="navbar-brand" style={{color: "white", paddingLeft:"10px"}}>Usuario: {usuario.nombre} {usuario.ncontrol}</Link>
                </div>
                <button onClick = {() => { setToken(null) }} className="btn btn-primary" >Cerrar</button>
            </div>
        </nav>
        {children}
    </>
}
export default LayoutAlumno
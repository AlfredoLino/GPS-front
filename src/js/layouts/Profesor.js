import React,{useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Context} from "../components/App"
const LayoutProfesor = ({children}) =>{
    const {token, setToken, usuario } = useContext(Context)
    return <>
        { !token && <Redirect to="/" /> }
        <nav className="navbar navbar-light" style={{ backgroundColor: "#1d2d50" }}>
            <div className="container-fluid">
                <div style={{display: "flex"}}>
                    <Link to="/profesor/main" className="navbar-brand" style={{color: "#ffffff"}}> <h4> TecNM </h4></Link>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            Opciones
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><Link className="dropdown-item" to="/profesor/proyectos">Proyectos</Link></li>
                            <li><a className="dropdown-item" href="#">Informacion</a></li>
                            <li><a className="dropdown-item" href="#">Estadisticas</a></li>
                        </ul>
                    </div>
                    
                <Link to = "/profesor/info" className="navbar-brand" style={{color: "white", paddingLeft:"10px"}}>Usuario: {usuario.nombre}</Link>
                </div>
                <button onClick = {() => { setToken(null) }} className="btn btn-primary" >Cerrar</button>
            </div>
        </nav>
        {children}
    </>
}
export default LayoutProfesor
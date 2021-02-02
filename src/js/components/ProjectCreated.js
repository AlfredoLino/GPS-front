import React from 'react';
import {Link} from 'react-router-dom'
import '../../styles/ProjectCreated.scss'

const ProjectCreated = () => {
    return (
        <div style={{height: '450px'}}>
            <div className = 'advice' >
                <h1>Proyecto Creado.</h1>
                <hr/>
                <h3><Link to = '/profesor/proyectos' >Ver proyectos.</Link></h3>
            </div>
        </div>
    );
};




export default ProjectCreated;

import React from 'react';

const TarjetaProyecto = (props) => {
    const {title, setProject} = props
    return (
        
        <div style={{borderRadius:"0"}} className="card">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <button onClick={()=>{setProject(title)}} className="btn btn-primary"> Ver detalles </button>
            </div>
        </div>
    );
}

export default TarjetaProyecto;

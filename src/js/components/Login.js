import React, {useState, useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import RadioLog from './RadioGroupLogin'
import {Context} from "./App"

export default ()=>{
    const tokenContext = useContext(Context)
    useEffect(() => {
        console.log(tokenContext.token)
    }, []);

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [type, setType] = useState("profesor")
    const [error, setError] = useState("")

    const onLogIn = async ()=>{
        try {
            const req = await fetch(`http://localhost:3001/login/${type}`, {
                method: "POST",
                headers:{
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(
                    {
                        email,
                        password: pass
                    }
                )
            })

            const data = await req.json()
            if(data.error){
                setError(data.error);
            }else{
                console.log(data.user)
                tokenContext.setUsuario(data.user)
                tokenContext.setToken(data.token)
            }
        } catch (error) {
            setError('Incapaz de conectar con el servidor')
        }
    }
    return <>
    
        {tokenContext.token && <Redirect to = {`/${type}/main/`} />}
        <div className="container">
            <div className = "row">
                <div
                style={{
                    height: '100vh',
                    backgroundColor: 'white',
                    boxShadow: '1px 7px 26px -7px rgba(0,0,0,0.75)',
                    borderRadius: '0',
                    position: 'relative',
                    overflow: 'hidden'
                }}
                className="fields__login col-sm-4">
                    <div
                    style={{
                        height: '1000px',
                        width: '200px',
                        backgroundColor: '#00325F',
                        position:'absolute',
                        transform: 'rotate(-27deg)',
                        right: '70%'
                    }}
                    ></div>
                    <h2 style={{marginBottom: '1rem'}}>Login</h2>
                    <div className="form-group">
                    <input style={
                        {
                            borderBottomLeftRadius:0,
                            borderBottomRightRadius:0
                        }
                    } onChange = 
                    {e => {setEmail(e.target.value)}} type="email" 
                    placeholder = "Correo Electronico" 
                    className="form-control" 
                    aria-describedby="emailHelp"/>
                    <input style={
                        {
                            borderTopLeftRadius:0,
                            borderTopRightRadius:0
                        }
                    } 
                    onChange = 
                    {e => {setPass(e.target.value)}} type="password" 
                    placeholder = "Password" 
                    className="form-control" 
                    aria-describedby="emailHelp"/>
                    </div>
                    <RadioLog handler = {setType} type = {type} />
                    <button onClick={onLogIn} className="btn btn-primary btn-lg btn-block">Log in</button>
                    
                    <div className="card infoLog">
                        <div  >
                            <p className="card-text">Instituto Tecnológico de Ciudad Madero</p>
                            <p className="card-text">
                            Av. 1o. de Mayo esq. Sor Juana Inés de la Cruz s/n Col. Los Mangos C.P.89440
                            </p>
                            <p className="card-text">Conmutador: <b>01 (833) 357-48-20</b></p>
                        </div>
                    </div>
                    
                </div>
                <div className="col-sm-8">
                    <img 
                    style={{
                        display: 'block',
                        margin: '2rem auto'
                    }}
                    src='https://www.tecnm.mx/images/tecnm_virtual/tecnm.png'/>
                </div>                

            </div>
        </div>
        {error && <div className="alert alert-danger" role="alert">
            {error}
        </div>}
        

     </>
}
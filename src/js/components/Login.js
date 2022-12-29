import React, {useState, useContext, useRef, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import RadioLog from './RadioGroupLogin'
import {Context} from "./App"

import { Button } from '@chakra-ui/react';
import { NoSymbol } from './Icons';


let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


const LoginButton = ({isValid, error}) => {
    if(error){
        return error
    }
    if(!isValid){
        return 'Log In'
    }
    return <NoSymbol />
}
export default ()=>{
    const tokenContext = useContext(Context)

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [type, setType] = useState("profesor")
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const isValidLogInFormat = !(email.match(mailformat) && pass.length >= 6);

    const onLogIn = async ()=>{
        try {
            setLoading(true)
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
                tokenContext.setUsuario(data.user)
                tokenContext.setToken(data.token)
                
            }
        } catch (error) {
            setError('Malas Credenciales')
        }
        setLoading(false)
    }

    useEffect(() => {
        const errorTimeout = setInterval(() => {
            setError(undefined)
        }, 2500);
        return () => clearInterval(errorTimeout)
    }, [error])
    

    return <>
    
        {tokenContext.token && <Redirect to = {`/${'profesor'}/main/`} />}
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
                    <h2 style={
                        {
                            marginBottom: '1rem',
                            fontSize: '2rem'
                        }
                    }>Login</h2>
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
                    <Button fontFamily={'body'} isLoading = {loading} isDisabled = {isValidLogInFormat || error} isFullWidth onClick={onLogIn} color='black' bgColor={(isValidLogInFormat || error) ? 'red.700':'madero.base'} size = 'lg'>
                        <LoginButton isValid = {isValidLogInFormat} error = {error}/>
                    </Button>
                    <div className="card infoLog">
                        <div>
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
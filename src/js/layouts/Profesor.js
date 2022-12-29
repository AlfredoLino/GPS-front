import { Button, Flex, Spacer, Text } from '@chakra-ui/react';
import React,{useContext} from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import {Context} from "../components/App"
import { UserBadge } from './Alumno';
import { LogOutIcon } from '../components/Icons';

const LayoutProfesor = ({children}) =>{
    const {token, setToken, usuario } = useContext(Context)
    const history = useHistory()
    const toHome = () => history.push("/profesor/main")

    return <>
        {!token && <Redirect to="/" />}
        <nav>
            <Flex pl='6' pr={'6'} pt='4' pb={'2'} bg={'tecnm.dark'}>
                <Text fontSize={'1.5rem'} mr='9' color={'gray.300'} as={'button'} onClick={toHome}> Tecnm </Text>
                <UserBadge {...usuario} />
                <Spacer/>
                <Button variant={'link'} rightIcon={<LogOutIcon style={{ width:'1.5rem' }}/>} color='gray.300' onClick={() => { setToken(null) }}>Cerrar</Button>
            </Flex>
        </nav>
        {children}
    </>
}
export default LayoutProfesor
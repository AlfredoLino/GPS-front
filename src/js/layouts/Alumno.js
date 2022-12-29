import React,{useContext} from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {Context} from "../components/App"
import "../../styles/Alumno.scss"
import { Button, Flex, Spacer, Text, Avatar, VStack, Badge } from '@chakra-ui/react';
import { LogOutIcon } from '../components/Icons';

export const UserBadge = ({_id, ncontrol, foto, nombre, apellidos, departamento}) => {

    return <Flex bg={'tecnm.light'} p='2' borderRadius={'lg'}>
        <Avatar mr={'2'} name={'nombre'} src={`http://localhost:3001/static/img/${ncontrol || _id}/${foto}`}/>
        <VStack alignItems={'start'} spacing={'0'}>
            <Text color={'gray.300'} >{nombre} {apellidos} - {ncontrol || _id}</Text>
            <Text  color={'gray.300'} > <Badge bg={'madero.base'} color='tecnm.base' variant={'solid'}>{departamento}</Badge></Text>
        </VStack>
    </Flex>
}

const LayoutAlumno = ({children}) =>{
    const {token, setToken, usuario } = useContext(Context)
    const history = useHistory()
    const toHome = () => history.push("/alumno/main")
    return <>
        { !token && <Redirect to="/" /> }
        <nav>
            <Flex pl='6' pr={'6'} pt='4' pb={'2'} bg={'tecnm.dark'}>
                <Text fontSize={'1.5rem'} mr='9' color={'gray.300'} as={'button'} onClick={toHome}> Tecnm </Text>
                <UserBadge {...usuario}/>
                <Spacer />
                <Button variant={'link'} rightIcon={<LogOutIcon style={{ width:'1.5rem' }}/>} color='gray.300' onClick = {() => { setToken(null) }} >Cerrar</Button>
            </Flex>
        </nav>
        {children}
    </>
}

export default LayoutAlumno
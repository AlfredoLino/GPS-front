import React from 'react';
import {shell} from "electron"
import Comentarios from './Comentarios';
import { Badge, Box, Container, Divider, Heading, ListItem, UnorderedList, VStack, Text, TableContainer, Table, Thead, Th, Tbody, Tr, Td, HStack, Flex, Spacer } from '@chakra-ui/react';

const ProjectDisplay = (props) => {
    const {asignaturas, tituloProInt, institucion, departamentos, coordinador, colab
    , areaConoc, tipoEjec, tipoProyecto, materiaEje
    ,limityRest, cronograma, id, _id} = props

    return (
        <Container maxW='full' mt={'0'} pt='4' minHeight={'100vh'}>
            <VStack alignItems={'start'} spacing={'5'} color={'gray.300'} height={'100%'} width='85%' m={'auto'}>
                <Box w={'full'}>
                    <Box borderRadius={'md'} boxShadow='lg' p={'2'} bg={'tecnm.base'}>

                        <Heading>Titulo: {tituloProInt}</Heading>
                        <Text fontSize={'lg'}> 
                            <span><b>Institucion: </b>{institucion}</span> 
                        </Text>
                        <Text fontSize={'lg'}><span><b>Coordinador: </b>{coordinador}</span></Text>
                        <Text fontSize={'lg'}><span><b>Colaborador(es): </b>{colab}</span></Text>
                    </Box>
                </Box>
                <Divider/>
                <VStack alignItems={'start'} spacing={'5'} borderRadius={'md'} boxShadow='lg' p={'2'} bg={'tecnm.base'}>
                    <Box w={'full'}>
                        <Heading fontSize={'2xl'}>Departamentos: </Heading>
                        <TableContainer mt={'3'} borderRadius='md' boxShadow={'md'} bg={'gray.300'} color='tecnm.base'>
                            <Table size={'sm'} variant={'simple'}>
                                <Thead fontSize={'lg'}>
                                    <Tr>
                                        <Th>Nombre</Th>
                                        <Th>Plan de estudio</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    
                                </Tbody>
                                {departamentos.map(({dep, plan}) => 
                                    <Tr fontSize={'xl'} key = {plan}>
                                        <Td>{dep}</Td> 
                                        <Td><Badge fontSize={'sm'} bg={'tecnm.base'} color='gray.300'>{plan}</Badge></Td>
                                    </Tr>)}
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box >
                        <Heading fontSize={'2xl'}>Asignaturas</Heading>
                        {asignaturas.map(asign => <VStack alignItems={'start'} spacing={'5'}>
                                <TableContainer w={'full'}  mt={'3'} borderRadius='md' boxShadow={'md'} bg={'gray.300'} color='tecnm.base' key = {asign.nombre} >
                                    <Table size={'sm'} variant={'simple'}>
                                        <Thead>
                                            <Tr>
                                                <Th>Nombre</Th>
                                                <Th>Semestre</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr>
                                                <Td>{asign.nombre}</Td>
                                                <Td>{asign.semestre}</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                                <VStack borderRadius={'md'} borderColor={'gray.300'} borderWidth='thin' boxShadow={'md'} spacing={'3'} p={'4'} >
                                    <Flex>
                                        <Box>
                                            <Heading size={'md'}>
                                                Competencias a desarrollar
                                            </Heading>
                                            <Text>{asign.compDes}</Text>
                                        </Box>
                                        <Spacer />
                                        <Box>
                                            <Heading size={'md'}>
                                                Competencias previas
                                            </Heading>
                                            <Text>{asign.compPrev}</Text>
                                        </Box>
                                    </Flex>
                                    <Flex>
                                        <Box>
                                            <Heading size={'sm'}>
                                                Etapa 1
                                            </Heading>
                                            <Text></Text>
                                            {asign.etapa_one}
                                        </Box>
                                        <Box>
                                            <Heading size={'sm'}>
                                                Etapa 2
                                            </Heading>
                                            <Text>{asign.etapa_two}</Text>
                                        </Box>
                                        <Box>
                                            <Heading size={'sm'}>
                                                Etapa 3
                                            </Heading>
                                            <Text>{asign.etapa_three}</Text>
                                        </Box>
                                    </Flex>
                                </VStack>
                            </VStack>
                        )}
                    </Box>
                    <section
                    className = 'area__conocimiento'
                        style = {{
                            margin: '15px 0',
                            padding: '10px',
                            border: '1px solid gainsboro',
                            borderRadius: '5px',
                        }}
                    >
                        <p>
                            <span><b>Area de conocimiento: </b>{areaConoc+"  "}</span>
                        </p>
                        <p><span><b>Tipo de ejecución: </b> {tipoEjec+"  "}</span></p>
                        <p><span><b>Materia Eje: </b>{materiaEje+"  "}</span></p>
                        <p><span><b>Limites y restricciones: </b>{limityRest+"  "}</span></p>
                        <p><span><b>Tipo de proyecto: </b>{tipoProyecto}</span></p>
                    </section>
                    

                    <h4 className='header__asignatura'>Actividades: </h4>
                    <table className="table"
                    style={{
                        margin: '15px 0',
                        border: '2px solid gainsboro',
                        borderRadius: '10px',
                        boxShadow: '1px 1px 15px -10px rgba(0,0,0,0.75)',
                    }}  
                    >
                        <thead>
                            <tr>
                                <th scope="col">Actividad</th>
                                <th scope="col">Responsable(s)</th>
                                <th scope="col">Fecha de entrega</th>
                                <th scope="col">Estado de Entrega</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cronograma.map(atvt => 
                            <tr>
                                <td>{atvt.nombreActividad}</td>
                                <td>{atvt.responsables.map(res => "/"+res)}</td>
                                <td>{atvt.entrega.split("T")[0]}</td>
                                <td>{(atvt.entregado) ? ( new Date(atvt.entrega) > new Date(atvt.entregado.fecha) ? 
                                    <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'baseline'                            
                                    }}
                                    >
                                        <b style = {{color: "green", display:'inline-block'}} >A tiempo</b> 
                                        <button className='btn' onClick={()=>{shell.openExternal(`http://localhost:3001/download?proyecto=${tituloProInt}&actividad=${atvt.nombreActividad}`)}}>
                                            
                                            <svg 
                                            style={{
                                                height: '1.3rem'
                                            }}
                                            xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </button> 
                                    </div> 
                                    : 
                                    <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'baseline'                            
                                    }}
                                    >
                                        <b style = {{color: "red", display:'inline-block'}} >Tarde</b> 
                                        <button className='btn' onClick={()=>{shell.openExternal(`http://localhost:3001/download?proyecto=${tituloProInt}&actividad=${atvt.nombreActividad}`)}}>
                                            
                                            <svg 
                                            style={{
                                                height: '1.3rem'
                                            }}
                                            xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </button> 
                                    </div>  ) 
                                    : "Pendiente..."}</td>
                            </tr>)}
                        </tbody>
                    </table>
                    <button onClick = {() =>{ shell.openExternal(`http://localhost:3001/format-download?titulo=${tituloProInt}`) }} 
                    style={{
                        margin: "15px 0 0 10px",
                        margin: '15px 0px 0px 10px',
                        color: 'white',
                        backgroundColor: '#00325F',
                    }} 
                    className='btn'>
                        <svg 
                        style={{
                            height: '1.3rem',
                            paddingRight: '10px'
                        }}
                        xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                            Descargar informe
                    </button>
                </VStack>    
                <Comentarios projectId = {id || _id}/>
            </VStack>
        </Container>
    );
}

export default ProjectDisplay;

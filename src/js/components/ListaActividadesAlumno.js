import { Container, Heading, Box, Text, VStack, Badge } from '@chakra-ui/react';
import React, {useState} from 'react';
import { useQuery } from 'react-query';
import {useParams} from "react-router-dom"
import Layout from "../layouts/Alumno"
import { CustomFileInput } from './Icons';
import { AlumnActivitiesListSkeleton, QueryHasError } from './MainAlumno';


const AlumnLayout = ({children, nombre}) => {
    return (
        <Layout>
            <Container maxW={'full'} minHeight='100vh' maxH={'full'} bg='tecnm.dark' pt={'1rem'} p>
                <Box width={'85%'} m='auto'>
                    <Heading
                        fontFamily={'fonts.heading'}
                        as='h2'
                        size='xl'
                        color={'gray.300'}
                    >
                        {nombre}
                    </Heading >
                    <VStack mt={'4'}>
                        {children}
                    </VStack>
                </Box>
            </Container>
        </Layout>
    )
}

const ListaActividadesAlumno = () => {
    const {nombre} = useParams()

    const handlerRequest =  async () =>{
        const req = await fetch(`http://localhost:3001/getSinglePro/${nombre}`)
        return req.json()
    }

    const { data, isError, isLoading, refetch } = useQuery(['Actividades', nombre], handlerRequest)

    if(isLoading) {
        return <AlumnLayout nombre={nombre}>
            <AlumnActivitiesListSkeleton/>
        </AlumnLayout>
    }
    if(isError) {
        return <AlumnLayout nombre={nombre}>
            <QueryHasError />
        </AlumnLayout>
    }

    return <AlumnLayout nombre={nombre}>
        {
            data && data.cronograma.map(act => <Box bg={'tecnm.base'} w='full' borderRadius={'md'} boxShadow='xl' color='gray.300' padding={'0.5rem'} key={act.nombreActividad}>
                <VStack alignItems={'start'}>
                    <Heading fontSize={'lg'}>{act.nombreActividad}</Heading>
                    <Text>
                        <span><b>fecha limite de entrega: </b></span> {new Date(act.entrega).toISOString().split("T")[0]}
                    </Text>
                    {act.entregado ?
                        <Box>
                            <Text>
                                Fecha de entrega: {new Date(act.entregado.fecha).toISOString().split("T")[0]}.
                            </Text>
                            {
                                act.entregado.comentario && <Text><b>Comentarios: {act.entregado.comentario} </b></Text>
                            }
                            <Text>
                                Estado:
                                {
                                    new Date(act.entrega) > new Date(act.entregado.fecha) ?
                                        <Badge colorScheme={'green'} variant='solid'>A tiempo</Badge>
                                        :
                                        <Badge colorScheme={'red'} variant='solid'>Atrasado</Badge>
                                }
                            </Text>
                        </Box>
                        :
                        <Box>
                            <VStack alignItems={'start'}>
                                <CustomFileInput
                                    customProps={{
                                        size: 'lg',
                                        color: 'black',
                                        bgColor: 'madero.base',
                                    }} />
                            </VStack>
                        </Box>
                    }
                </VStack>
            </Box>)
        }
    </AlumnLayout>
}

export default ListaActividadesAlumno;

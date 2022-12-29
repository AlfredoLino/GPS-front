import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {Link} from "react-router-dom"
import {Context} from "./App"
import Layout from "../layouts/Alumno"
import { Skeleton, Stack, Heading, Text, Button, Box, Center, Container, Badge, HStack, Input, VStack } from '@chakra-ui/react';
import {motion} from 'framer-motion'
import { DocumentIcon, ListIcon } from './Icons';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const container = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 1,
        staggerChildren: 0.2
      }
    }
}

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    },
};

const StyledMotionDiv = styled(motion.div)`
    width: 100%
`

export const AlumnActivitiesListSkeleton = () =>
    <Box mt={'4'} width='100%'>
        <Stack mt='2'>
            <Skeleton height='35px' />
            <Skeleton height='35px' />
            <Skeleton height='35px' />
        </Stack>
        <Stack mt='2'>
            <Skeleton height='35px' />
            <Skeleton height='35px' />
            <Skeleton height='35px' />
        </Stack>
        <Stack mt='2'>
            <Skeleton height='35px' />
            <Skeleton height='35px' />
            <Skeleton height='35px' />
        </Stack>
        <Stack mt='2'>
            <Skeleton height='35px' />
            <Skeleton height='35px' />
            <Skeleton height='35px' />
        </Stack>
    </Box>

export const QueryHasError = ({isLoading, refetch}) =>
    <Center bg={'gray.300'} height='56' mt={'2'}>
        <Box >
            <Text fontSize={'2xl'}>
                    Error al traer las actividades
            </Text>
            <Button isLoading={isLoading} display={'block'} margin={'auto'} bg={'madero.base'} onClick={refetch}>
                    Volver a intentar
            </Button>
        </Box>
    </Center>

const MainAlumnBody = ( {data, isError, refetch, isLoading} ) => {
    const history = useHistory()

    if (isError) {
        return <QueryHasError isLoading={isLoading} refetch = {refetch}/>
    }
    return <motion.section variants={container} initial='hidden' animate = 'visible'>          
        <VStack paddingTop={'4'} spacing='3' className='testFont'>
        {data ? 
            data.map(pro => 
                <StyledMotionDiv 
                whileHover={
                    { 
                        scale: [null, 1.002],
                    }
                }
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.95 }}
                key = {pro.tituloProInt} 
                variants={item}
                >
                    <Box boxShadow={'lg'} borderStyle = 'solid' borderWidth={'thin'} borderColor='gray.300' color={'gray.700'} padding={'2'}>
                        <Heading fontSize='2xl' fontFamily={'fonts.body'}> 
                            {pro.tituloProInt}
                        </Heading>
                        <Text fontSize='xl' fontFamily={'fonts.body'}>Coordinador del proyecto: {pro.profRespName}</Text>
                        <Text fontSize='xl' fontFamily={'fonts.body'}>Cliente: {pro.cliente}</Text>
                        <HStack paddingTop={'0.4rem'}>
                            <Button 
                                fontFamily={'body'} 
                                color='black' 
                                bgColor={'madero.base'} 
                                size = 'lg'
                                onClick={() => history.push(`/actividadesProyectoAlumno/${pro.tituloProInt}`)}
                                rightIcon={<ListIcon style={{ width:'1.5rem' }}/>}
                                >
                                        Ver actividades
                            </Button>
                            <Button 
                                fontFamily={'body'} 
                                color='black' 
                                bgColor={'madero.base'} 
                                size = 'lg'
                                onClick={() => history.push(`/alumno/detalles/${pro.tituloProInt}`)}
                                rightIcon={<DocumentIcon style={{ width:'1.5rem' }}/>}
                                >
                                        Ver Detalles

                            </Button>
                        </HStack>
                    </Box>
                </StyledMotionDiv>
                ) 
            :
            <AlumnActivitiesListSkeleton />
        }
        </VStack>
        </motion.section>
    
}
const MainAlumno = () => {
    const {usuario} = useContext(Context)

    const query = useQuery('MainAlumnQuery', async () => {
        const req = await fetch(`http://localhost:3001/getProjectsAlumno/${usuario.ncontrol}`)
        return await req.json()
    }, {
        refetchInterval: 60000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 5000
    })
    return (
        <Layout>
            <Container bg={'white'} maxW='full' mt={'0'} pt='4' minHeight={'100vh'}>
                <div className="display__home">
                    <Box h={'full'}>
                        <Heading color={'gray.600'} fontFamily={'fonts.heading'} as='h2' size='2xl'>
                            Proyectos de {`${usuario.nombre} ${usuario.apellidos}`}
                        </Heading>
                        <MainAlumnBody {...query}/>
                    </Box>
                </div>
            </Container>

        </Layout>
    );
}

export default MainAlumno;

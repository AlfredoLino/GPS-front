import React, {useContext, useState, useEffect}  from 'react';
import { Box, Container, Heading, Flex, Spacer, Center } from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {motion, useAnimation} from 'framer-motion'
import Layout from "../layouts/Profesor"
import TarjetaProyecto from "./TarjetaProyecto"
import {Context} from "./App"
import ProjectDisplay from "./ProjectDisplay"
import "../../styles/Proyectos.scss"
const Proyectos = () => {


    const { usuario } = useContext(Context)
    const [ projectToView, setProjectToView ] = useState(null)
    const animationControls = useAnimation()

    const getProjects = async ()=>{
            const req = await fetch('http://localhost:3001/getProyectos', {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        nombre: usuario._id,
                        all: true,
                    }
                )
            })
            return await req.json()
    }

    const {data : projects, isError, isLoading} = useQuery('proyectos', getProjects)

    const handlerView = ( id )=>{
        const _proj = projects.proyecto.find( pros => pros._id == id )
        setProjectToView(_proj)
    }

    useEffect(() => {
      animationControls.start({
        clipPath: ['inset(0% 100% 0% 0% round 10px)', 
            'inset(0% 0% 0% 0% round 10px)'],
        opacity: [0,1],
        transition:{
            duration: 1,
            ease: "easeInOut",
        }
      })
    }, [projectToView])
    
    if(isLoading) {
        return <div className = 'loading__icon'>
            <svg 
            xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 loading__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        </div>
    }

    return (
        <Layout>
            
                <Container maxW={'95%'} height='100vh' pt='4'>
                    <Box borderBottomColor={'gray.300'} borderBottomWidth='thin' pb={'4'}>
                        <Heading size='2xl'>Proyectos: {usuario.nombre}</Heading>  
                    </Box>
                    <Box h={'100vh'} >
                        <Flex h={'100%'}>
                            <Box minW={'25%'} pr='4'>
                                <Box>   
                                    {projects.proyecto.map(proj => <TarjetaProyecto key={proj._id} setProject={handlerView} title={proj.tituloProInt} id = {proj._id} />)}
                                </Box>
                            </Box>
                            <Box pt={'4'} borderLeftColor={'gray.300'} borderLeftWidth='thin' minW={'75%'} overflow='scroll'>
                                    { projectToView ? 
                                    <motion.div
                                        animate={animationControls}
                                    >
                                        <ProjectDisplay 
                                            tituloProInt = {projectToView.tituloProInt}
                                            institucion = {projectToView.institucion}
                                            coordinador = {projectToView.profRespName}
                                            departamentos = {projectToView.departamentos} 
                                            colab = {projectToView.colab}
                                            areaConoc = {projectToView.areaConoc}
                                            tipoEjec = {projectToView.tipoEjec}
                                            tipoProyecto = {projectToView.tipoProyecto}
                                            materiaEje = {projectToView.materiaEje}
                                            limityRest = {projectToView.limityRest}
                                            asignaturas = {projectToView.asignaturas}
                                            cronograma = {projectToView.cronograma}
                                            id = {projectToView._id}
                                            />
                                    </motion.div>
                                    : 
                                    <Center w={'100%'}>
                                        <Heading size={'lg'} >Seleccione un proyecto</Heading>
                                    </Center>
                                    }
                            </Box>
                        </Flex>
                    </Box>
                </Container>
            
            
        </Layout>
    );
}

export default Proyectos;

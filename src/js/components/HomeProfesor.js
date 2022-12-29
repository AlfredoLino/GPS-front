import { Box, Container, Heading, Text, HStack, Badge, Button, SimpleGrid } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import React from 'react'
import { useHistory } from 'react-router-dom'
import LayoutProfesor from '../layouts/Profesor'

const StyledBox = styled(motion.div)`
    height: 100vh;
    padding-top: 1rem;
`

const StyledRedDiv = styled(motion.div)`
    height: 500px;
    width: 500px;
    background-color: blue;
`
const StyledBlueDiv = styled(motion.div)`
    height: 500px;
    width: 500px;
    background-color: red;
`

function HomeProfesor() {

    const history = useHistory()
    
    const [first, setfirst] = React.useState(true)

    return (
        <LayoutProfesor>
            <Container maxW={'80%'} height='100vh' pt='4'>
                <Heading size={'2xl'} color='gray.700'>
                    Hola, Profesor
                </Heading>
                <StyledBox
                animate={{
                    clipPath: ['inset(0% 0% 100% 0% round 10px)', 
                    'inset(0% 0% 0% 0% round 10px)'],
                    opacity: [0,1]
                }}
                transition={{
                    duration: 1,
                    ease: "easeInOut",
                }}
                pt={'4'}>
                    <SimpleGrid columns={'2'} spacing={'4'}>
                        <Box p='5' borderWidth='1px' rounded='md'>
                            <Heading size={'md'}>
                                Capurar proyecto con Chakra
                                <Badge ml={'2'} colorScheme={'green'} variant='solid'>
                                    Nuevo
                                </Badge>
                            </Heading>
                            <Text pt={'2'} pb='2'>
                                Modo nuevo usando una libreria de UI llamada Chakra y un gestor de formularios llamado Formik.
                            </Text>
                            <Button onClick={()=> history.push("/profesor/nuevacaptura")} bg={'madero.base'}>
                                Crear proyecto
                            </Button>
                        </Box>
                        <Box p='5' borderWidth='1px' rounded='md'>
                            <Heading size={'md'}>
                                Capurar proyecto Bootstrap
                                <Badge ml={'2'} variant='solid'>
                                    obsoleto
                                </Badge>
                            </Heading>
                            <Text pt={'2'} pb='2'>
                                Vieja UI que pronto ya no estará disponible para su uso en producción.
                            </Text>
                            <Button onClick={()=> history.push("/profesor/capturar")} bg={'madero.base'}>
                                Crear proyecto
                            </Button>
                        </Box>
                        <Box p='5' borderWidth='1px' rounded='md'>
                            <Heading size={'md'}>
                                Ver proyectos
                            </Heading>
                            <Text pt={'2'} pb='2'>
                                Ver la lista de proyectos con todos los detalles de estos.
                            </Text>
                            <Button onClick={()=> history.push("/profesor/proyectos")} bg={'madero.base'}>
                                Ver proyectos
                            </Button>
                        </Box>
                    </SimpleGrid >
                </StyledBox>
                    <StyledBox >
                        <Button onClick={() => {
                            setfirst(!first)
                        }} >Toggle</Button>
                        {
                            first ?
                                <StyledBlueDiv
                                    animate={{
                                        clipPath: ['inset(0% 0% 100% 0% round 10px)', 
                                        'inset(0% 0% 0% 0% round 10px)'],
                                        opacity: [0,1]
                                    }}
                                    transition={{
                                        duration: 1,
                                        ease: "easeInOut",
                                    }}
                                >
                                    FORMULARIO
                                </StyledBlueDiv>
                                    :
                                <StyledRedDiv
                                    animate={{
                                        scale: [1, 2, 2, 1, 1],
                                        rotate: [0, 0, 180, 180, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        ease: "easeInOut",

                                    }}
                                />

                        }
                    </StyledBox>
            </Container>
        </LayoutProfesor>
  )
}

export default HomeProfesor
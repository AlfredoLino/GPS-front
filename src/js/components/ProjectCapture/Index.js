import { Container, 
    Heading,
    Text, 
    Box, 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    FormHelperText, 
    HStack, 
    Portal, 
    Select,
    Flex,
    TagCloseButton,
    Tag,
    TagLabel,
    Wrap,
    WrapItem
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { motion } from 'framer-motion'
import React from 'react'
import LayoutProfesor from '../../layouts/Profesor'

const InformacionGeneral = () => {
    const [departamentos, setDepartamentos] = React.useState([])
    const nombresDeDepartamentos = React.useRef(
        [
            'Sistemas Computaciones', 
            'Electronica',
            'Ambiental',
            'Gestion empresarial',
            'Industrial',
            'Electricidad',
            'Petrolera'
        ])
    return (
        <LayoutProfesor>
                    <Portal>HOLA</Portal>
            <Container maxW={'80%'} pt='4'>
                <Heading size={'2xl'}>
                    Informacion general del proyecto
                </Heading>
                <Box pt={'4'} px='2'>
                    <Formik
                        initialValues={
                            {
                                nombreProyecto: '',
                                nombreInstitucion: '',
                                departamento: ''
                            }
                        }
                        onSubmit = {
                            (values, actions) =>{
                                console.log(values, actions);
                                actions.setSubmitting(false)
                            }
                        }
                    >
                        {
                            (props) =>{
                                return <motion.div
                                animate={{
                                    clipPath: ['inset(0% 0% 100% 0% round 10px)', 
                                    'inset(0% 0% 0% 0% round 10px)'],
                                    opacity: [0,1]
                                }}
                                transition={{
                                    duration: 1,
                                    ease: "easeInOut",
                                }}>
                                    <Form>
                                            <HStack>
                                                <Field name='nombreProyecto'>
                                                    {
                                                        ({ field, form }) => {
                                                            return  <FormControl>
                                                                <FormLabel htmlFor='nombreProyecto'>Nombre del proyecto</FormLabel>
                                                                <Input {...field} id='nombreProyecto' placeholder='Nombre del proyecto' />
                                                            </FormControl>
                                                        } 
                                                        
                                                    }
                                                </Field>
                                                <Field name='nombreInstitucion'>
                                                    {
                                                        ({ field, form }) => {
                                                            return  <FormControl>
                                                                <FormLabel htmlFor='nombreInstitucion'>Institucion</FormLabel>
                                                                <Input {...field} id='nombreInstitucion' placeholder='Nombre de las intitucion' />
                                                            </FormControl>
                                                        } 
                                                    }
                                                </Field>

                                            </HStack>
                                            <Flex pt={'4'}>
                                                <Field as = 'select'  name = 'departamento'>
                                                    {
                                                        ({field, form})=>{
                                                            return <FormControl>
                                                                <FormLabel htmlFor='departamento' >Departamentos involucrados</FormLabel>
                                                                <Select {...field} placeholder='Departamentos'>
                                                                    {
                                                                        nombresDeDepartamentos.current.map(nombre => <option key={`option-${nombre}`} value={nombre}>
                                                                            {nombre}
                                                                        </option>)
                                                                    }
                                                                </Select>
                                                                <FormHelperText>Agregue los departamentos involucrados</FormHelperText>
                                                                <Button
                                                                    bg='madero.base'
                                                                    mt={'2'}
                                                                    onClick = {
                                                                        ()=>{
                                                                            const dep = form.values.departamento
                                                                            if(dep === ''){
                                                                                return
                                                                            }
                                                                            setDepartamentos(prev =>{
                                                                                if(prev.includes(dep)){
                                                                                    return prev
                                                                                }
                                                                                return [...prev, dep]
                                                                            })
                                                                        }
                                                                    }
                                                                >
                                                                    Agregar
                                                                </Button>
                                                            </FormControl>
                                                        }
                                                    }
                                                </Field>
                                                <Wrap spacing={'2'} p={'4'} borderRadius={'md'} boxShadow='md' ml={'2'} width={'100%'} bgColor={'gray.300'}>
                                                    {
                                                        departamentos.length === 0 ? <Text size='lg' fontWeight={'bold'}>No hay departamentos agregados.</Text>
                                                        :
                                                        departamentos.map(nombre =>
                                                            <WrapItem key={`departamento-${nombre}`}>
                                                                <Tag
                                                                    size={'md'}
                                                                    borderRadius='full'
                                                                    variant='solid'
                                                                    colorScheme='green'
                                                                >
                                                                    <TagLabel>{nombre}</TagLabel>
                                                                    <TagCloseButton 
                                                                        onClick={()=>{
                                                                            setDepartamentos((prev) => prev.filter(departamento => departamento !== nombre))
                                                                        }}
                                                                    />
                                                                </Tag>
                                                            </WrapItem>
                                                        )
                                                    }
                                                </Wrap>
                                            </Flex>
                                            <HStack pt={'4'}>
                                                <Field name = 'Cliente'>
                                                    {
                                                        ({field, form})=>{
                                                            return <FormControl>
                                                                <FormLabel htmlFor='Cliente' >Cliente</FormLabel>
                                                                <Input {...field} id='Cliente' placeholder='Nombre completo' />
                                                                <FormHelperText>Nombre completo del Cliente</FormHelperText>
                                                            </FormControl>
                                                        }
                                                    }
                                                </Field>
                                            </HStack>
                                            <Button
                                                mt={4}
                                                bg='madero.base'
                                                isLoading={props.isSubmitting}
                                                type='submit'
                                                >
                                                Siguiente
                                            </Button>
                                    </Form>
                                </motion.div>
                            }
                        }
                    </Formik>
                </Box>
            </Container>
        </LayoutProfesor>
    )
}

export default InformacionGeneral
import React from 'react';
import { Text, Box, Button } from '@chakra-ui/react';

const TarjetaProyecto = (props) => {
    const {title, setProject, id} = props
    return (
        <Box p={'2'} mt='2' bg='gray.300' borderRadius={'md'} >
                <Text isTruncated fontWeight={'medium'}>{title}</Text>
                <Button size={'sm'} mt='2' onClick={()=>{setProject(id)}} bg='madero.base'> Ver detalles </Button>
        </Box>
    );
}

export default TarjetaProyecto;

import { Box, Button, ButtonGroup, IconButton, useToast } from '@chakra-ui/react'
import React, { useContext, useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { Context } from './App'

const style = {
    height : '1.8rem'
}
export const NoSymbol = () => {
  return (
    <svg style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  )
}

export const DocumentIcon = ( props ) => 
  <svg {...props} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>

export const ListIcon = ( props ) =>
  <svg {...props }xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>

export const LogOutIcon = props =>
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </svg>

export const UploadIcon = props =>
  <svg {...props}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>

export const CustomFileInput = ({customProps}) => {

  const {usuario} = useContext(Context)
  const [fileStatus, setFileStatus] = useState(undefined)
  const createToast = useToast()
  
  const onUploadFile = async (photo) => {
    const pFile = photo
    const formData = new FormData()
    formData.append('profilePick', pFile)
    try {
      return await fetch(`http://localhost:3001/uploadFile/${usuario.ncontrol}`, {
        method: "POST",
        body: formData
      })
      
    } catch (error) {
      throw error
    }
  }
  
  const {mutate, isLoading, isSuccess, isError} = useMutation(onUploadFile)

  useEffect(() => {
    if (isSuccess) {
      createToast({
        title: 'Archivo subido',
        description: `El archivo se ha subido con exito`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        variant: 'left-accent'
      })
      setFileStatus(undefined)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isLoading) {
      createToast({
        title: 'Subiendo archivo',
        description: `El archivo se está subiendo.`,
        status: 'info',
        duration: 9000,
        isClosable: true,
        variant: 'left-accent'
      })
      setFileStatus(undefined)
    }
  }, [isLoading])

  useEffect(() => {
    if (isError) {
      createToast({
        title: 'Error',
        description: `Ha habido un problema al subir el archivo`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      setFileStatus(undefined)
    }
  }, [isError])
  

  return <Box>
    
    <input 
    style = {{
      height:'0',
      width:'0.1px',
      opacity: '0',
      overflow: 'hidden',
      position: 'absolute',
      zIndex: -1,
    }}
    accept = ".xlsx,.xls,.doc, .docx,.pdf"
    onChange = {
      (event) => {
        const file = event.target.files.item(0)
        setFileStatus(file)
      }
    }
    onClick={(event)=> { 
      event.target.value = null
    }}
    name='file-picker' id='file-picker' type = 'file' color ='madero.base' />
    <ButtonGroup isAttached = {fileStatus}>
      <Button
        as = {'label'} 
        mb = '0'
        htmlFor = 'file-picker'
        cursor = {'pointer'}
        rightIcon = {<DocumentIcon style={{width:'1.5rem'}}/>}
        isLoading = {isLoading}
        {...customProps}
      >
        {fileStatus ? fileStatus.name : 'Archivo'}
      </Button>
      {fileStatus && <>
        <IconButton isLoading = {isLoading} onClick={() => mutate(fileStatus, usuario.ncontrol)} bg={'tecnm.dark'} ml='4' color='madero.base' size={'lg'} aria-label='upload-file' icon={<UploadIcon style={{width:'1.5rem'}}/>}/>
        <IconButton isLoading = {isLoading} onClick={() => setFileStatus(undefined)} bg={'red.700'} color='madero.base' size={'lg'} aria-label='upload-file' icon={<NoSymbol style={{width:'1.5rem'}}/>}/>
      </>
      }
    </ButtonGroup>
  </Box>
}
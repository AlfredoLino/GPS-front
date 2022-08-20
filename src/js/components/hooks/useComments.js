import React, {useState, useEffect} from 'react'

export const makeRequest = async (get = false, textComment) => {
    const requestBody = get ? {
        profResp: usuario.id,
        _id : projectId,
        get : true, 
    } :
    {
        profResp: usuario.id,
        _id : projectId,
        payload: {
            comment: {
                date : new Date().toISOString(),
                name : usuario.id,
                text: textComment
            }
        }
    }
    const res = await fetch('http://localhost:3001/postComment', {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })

    const { data, ok } = await res.json()
    if(get && data){
        const [co] = data
        console.log(co)
        setComments(co.comments)
    }else if(ok){
        console.log(data)
        setComments(() => [...data.comments])
    }
}

const useComments = () => {

    useEffect(() => {
        makeRequest(true)
    },[])
    return [textComment, setTextComment, comments, setComments]
}



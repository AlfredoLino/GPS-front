import React, {useState, useContext, useEffect} from 'react'
import { Context } from './App'

const Comentarios = ({projectId}) => {
    console.log(projectId);
    const { usuario } = useContext( Context )

    const [textComment, setTextComment] = useState('')
    const [comments, setComments] = useState(null)
    const makeRequest = async (get = false) => {
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
    useEffect(() => {
        makeRequest(true)
    },[])

    return (
        <section id = 'section__comentaries'>
            <div>Comentarios</div>
            <div>
                <form onSubmit={ async eve => {
                    eve.preventDefault()
                    makeRequest()
                    setTextComment('')
                }}>
                    <div className="input-group">
                        <textarea onChange = {(e) => setTextComment(e.target.value) } value = {textComment} name="form-control" cols="50" rows="5" placeholder = 'Comentario'></textarea>
                    </div>
                    <button type='submit' className='btn btn-primary'>Comentar</button>
                </form>
                <div className = 'comments__list'>
                    {comments && comments.map(comentario => (
                        <div className = 'comment_card'>
                            <div className = 'comment_header'>
                                <span className='comment_user'>
                                    {comentario.name}
                                </span>
                                <span> {comentario.date}</span>
                            </div>
                            <div>
                                {comentario.text}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Comentarios
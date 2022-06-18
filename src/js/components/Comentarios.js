import React, {useState} from 'react'

const Comentarios = () => {
const [textComment, setTextComment] = useState('')
  return (
    <section id = 'section__comentaries'>
        <div>Comentarios</div>
        <div>
            <div className="input-group">
                        <textarea onChange = {(e) => setTextComment(e.target.value) } value = {textComment} name="form-control" cols="50" rows="5" placeholder = 'Comentario'></textarea>
            </div>
            <div className = 'comments__list'>
                <div className = 'comment_card'>
                    <div className = 'comment_header'>
                        <span className='comment_user'>
                            Alfredo Lino Mendoza
                        </span>
                        <span> 17/06/2022 11:49 pm</span>
                    </div>
                    <div>
                        
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam metus quam, sodales quis laoreet sed, facilisis vel ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi at auctor nibh. Nulla iaculis magna pharetra sollicitudin aliquet. Fusce rhoncus, lectus vitae facilisis semper, quam lorem eleifend tortor, porta mattis urna leo sed erat. Sed quis justo sagittis, facilisis augue eget, tristique mauris. Aliquam sit amet odio quis ante pretium varius nec eget nunc. Praesent vitae turpis pretium, fringilla ipsum in, tempus magna. In non placerat justo.

Maecenas vitae ex vel orci sollicitudin vulputate sed quis eros. Nam nec nisl efficitur, rutrum massa eu, lacinia nibh. Praesent tempor vehicula congue. Fusce efficitur eget nulla sed aliquet. Proin lectus nulla, tristique sit amet vulputate ut, laoreet venenatis dolor. Mauris consectetur bibendum nunc, et elementum eros semper vitae. Vivamus id tempus metus, nec imperdiet quam. Maecenas posuere lorem vel odio efficitur commodo. Nulla cursus sem at augue eleifend, id mollis magna sollicitudin. Cras efficitur dui in ultricies consequat. Suspendisse quis iaculis magna.
                    </div>
                </div>

                <div className = 'comment_card'>
                    <div className = 'comment_header'>
                        <span className='comment_user'>
                            Alfredo Lino Mendoza
                        </span>
                        <span> 17/06/2022 11:49 pm</span>
                    </div>
                    <div>
                        
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam metus quam, sodales quis laoreet sed, facilisis vel ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi at auctor nibh. Nulla iaculis magna pharetra sollicitudin aliquet. Fusce rhoncus, lectus vitae facilisis semper, quam lorem eleifend tortor, porta mattis urna leo sed erat. Sed quis justo sagittis, facilisis augue eget, tristique mauris. Aliquam sit amet odio quis ante pretium varius nec eget nunc. Praesent vitae turpis pretium, fringilla ipsum in, tempus magna. In non placerat justo.

Maecenas vitae ex vel orci sollicitudin vulputate sed quis eros. Nam nec nisl efficitur, rutrum massa eu, lacinia nibh. Praesent tempor vehicula congue. Fusce efficitur eget nulla sed aliquet. Proin lectus nulla, tristique sit amet vulputate ut, laoreet venenatis dolor. Mauris consectetur bibendum nunc, et elementum eros semper vitae. Vivamus id tempus metus, nec imperdiet quam. Maecenas posuere lorem vel odio efficitur commodo. Nulla cursus sem at augue eleifend, id mollis magna sollicitudin. Cras efficitur dui in ultricies consequat. Suspendisse quis iaculis magna.
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Comentarios
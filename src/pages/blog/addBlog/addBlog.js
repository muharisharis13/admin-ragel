import React, { useState, useContext } from 'react'
import { Container } from '../../../component/element/Container'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import classicEditor from '@ckeditor/ckeditor5-build-classic'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import { Button } from '../../../component/element/Button'
import styled from 'styled-components'
import { Context } from '../../../service/context/Context'

export const AddBlog = () => {
  const [data, setData] = useState('')
  const [datawohtml, setDatawohtml] = useState('')
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')

  const { apiarticle } = useContext(Context)


  const handleChange = (e, editor) => {
    setData(editor.getData())
    setDatawohtml(ReactHtmlParser(editor.getData()))
  }


  const btnPublish = () => {
    const formData = new FormData()

    formData.append('article_title', title)
    formData.append('article_description', data)
    formData.append('article_pic[]', image)

    // // console.log(datawohtml[0].props.children[0])
    // console.log(data)
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    apiarticle({
      type: "POST_ADD_ARTICLE", data: formData
    })
  }

  // console.log(datawohtml[0].props.children[0])

  return (
    <Container bgColor data-aos="fade-down" className="container" style={{ height: '100vh' }}>
      <div className="row mt-5">
        <div className="col-lg-4 col-md-12 col-sm-12">
          <input type="text" placeholder="Title" className="form-control" style={{ fontWeight: '700' }}
            value={title} onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="row mt-3">
        <ContainerText className="col-lg-12 col-md-12 col-sm-12"  >
          <CKEditor
            editor={classicEditor}
            onChange={(e, editor) => handleChange(e, editor)}
          />
        </ContainerText>
      </div>
      <div className="row mt-4">
        <div className="col-lg-4 col-sm-12 col-md-12">
          <input type="file" placeholder="Select Picture" className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
      </div>

      <div className="row justify-content-center align-items-center text-center mt-5">
        <div className="col-lg-4 col-md-12 col-sm-12">
          <Button onClick={btnPublish}>Publish</Button>
        </div>
      </div>
    </Container>
  )
}


const ContainerText = styled.div`

`

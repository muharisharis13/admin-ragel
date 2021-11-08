import React, { useState, useContext, useEffect } from 'react'
import { Container } from '../../../component/element/Container'
import styled from 'styled-components'
import { Context } from '../../../service/context/Context'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import classicEditor from '@ckeditor/ckeditor5-build-classic'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import { Button } from '../../../component/element/Button'

export const FieldEdit = (props) => {
  const p = props.location.state

  // console.log(p)

  const [data, setData] = useState('')
  const [datawohtml, setDatawohtml] = useState('')
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [id, setId] = useState('')

  const { apiarticle } = useContext(Context)

  const [labelImg, setLabelimg] = useState("")



  useEffect(() => {
    setTitle(p.article_title)
    setData(p.article_description)
    setDatawohtml(p.article_description)
    setImage(p.url_pics)
    setLabelimg(p.url_pics)
    setId(p.id)
  }, [p])





  const handleChange = (e, editor) => {
    setData(editor.getData())
    setDatawohtml(ReactHtmlParser(editor.getData()))
    console.log(editor)
  }

  const btnChooseImage = (e) => {
    const reader = new FileReader()
    reader.onload = function () {
      setLabelimg(reader.result)
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
      setImage(e.target.files[0])

    }
  }


  const btnPublish = () => {
    const formData = new FormData()

    formData.append('article_title', title)
    formData.append('article_id', id)
    formData.append('article_description', datawohtml.length > 0 && datawohtml[0].props ? datawohtml[0].props.children[0] : '')
    formData.append('article_pic', image)

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    apiarticle({
      type: "POST_EDIT_ARTICLE", data: formData
    })
  }


  // console.log(datawohtml.length > 0 && datawohtml[0].props ? datawohtml[0].props.children[0] : '')

  console.log('ini data: ',)

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

        <ContainerText className="col-lg-12 col-md-12 col-sm-12 mt-2">
          <CKEditor
            editor={classicEditor}
            data={data}
            onChange={(e, editor) => handleChange(e, editor)}
          />
        </ContainerText>
      </div>
      <div className="row mt-4">
        <div className="col-lg-4 col-sm-12 col-md-12">
          <img src={labelImg} alt={labelImg} width={200} height={200} style={{ objectFit: "cover" }} />
          <input type="file" placeholder="Select Picture" className="form-control"
            onChange={(e) => btnChooseImage(e)}
          />
        </div>
        {/* <div className="col-md-12 col-lg-12 col-sm-12 mt-2">
          <div dangerouslySetInnerHTML={{ __html: data }}></div>
        </div> */}
      </div>

      <div className="row justify-content-center align-items-center text-center mt-5">
        <div className="col-lg-4 col-md-12 col-sm-12 pb-5">
          <Button onClick={btnPublish}>Edit Article</Button>
        </div>
      </div>
    </Container>
  )
}


const ContainerText = styled.div`

`



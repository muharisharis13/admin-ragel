import React, { useContext, useEffect } from 'react'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { Container } from '../../../component/element/Container'
import styled from 'styled-components'
import { Context } from '../../../service/context/Context'
import { LinkButton } from '../../../component/element/Button'

export const EditBlog = (props) => {
  const { apiarticle, detailArticle } = useContext(Context)
  const p = props.match.params.id


  // console.log(props)
  console.log(detailArticle)
  useEffect(() => {
    apiarticle({ type: 'GET_DETAIL_ARTICLE', id: p })
  }, [])

  const btnDelete = () => {
    if (window.confirm("Are you Sure ?")) {

      apiarticle({
        type: 'POST_DELETE_ARTICLE', data: {
          article_id: p
        }
      })
    }
  }



  return (
    <Container data-aos="fade-down" bgColor className="container-fluid">
      <div className="row text-center">
        <div className="col-lg-1 col-md-12 col-sm-12">
          <LinkButton to={{ pathname: '/blogs/editBlogs/InputFieldEdit', state: detailArticle }}>
            <FaPencilAlt1 />
          </LinkButton>
        </div>
        <div className="col-lg-1 col-md-12 col-sm-12">
          <FaTrashAlt1 onClick={btnDelete} />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-5 col-md-12 col-sm-12">
          <Image width={500} src={detailArticle.url_pics} alt="img" />
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 mt-2 pb-5">
          <Title>{detailArticle.article_title}</Title>
        </div>
        <div className="col-lg-7 col-md-12 col-sm-12">
          <Content>
            <div dangerouslySetInnerHTML={{ __html: detailArticle.article_description }} />
            {/* {detailArticle.article_description} */}
          </Content>
        </div>
      </div>
    </Container>
  )
}

const FaTrashAlt1 = styled(FaTrashAlt)`
cursor:pointer;
`

const FaPencilAlt1 = styled(FaPencilAlt)`
cursor:pointer;
color:#000;
`

const Content = styled.div`
text-align: justify;
`

const Title = styled.div`
font-weight: 700;
font-size: 17pt;
`

const Image = styled.img`
width: 100%;
height: 50vh;
object-fit: cover;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
border-radius:10px;

`

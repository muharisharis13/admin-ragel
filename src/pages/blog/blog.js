import React, { useContext, useEffect } from 'react'
import { Container } from '../../component/element/Container'
import pencil from '../../image/icon/pencil white.png'
import { FaPlusCircle } from 'react-icons/fa'
import styled from 'styled-components'
import { Search } from '../../component/search/search'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Context } from '../../service/context/Context'

let str = ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi deleniti iste accusantium quos facilis eum ex atque, aliquid quis explicabo! Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, facilis?'

export const Blog = () => {
  const { apiarticle, arrArticle } = useContext(Context)


  useEffect(() => {
    apiarticle({ type: 'GET_ALL_ARTICLE' })
  }, [])


  // console.log('ini article', arrArticle)
  return (
    <Container bgColor data-aos="fade-down" className="container-fluid">
      <small>
        -add article error 500
      </small>
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <img src={pencil} alt="Pencil" /> - Blog
        </div>
        <div className="col-md-12 col-sm-12 mt-2">
          <h5>{arrArticle.length} Article</h5>
        </div>
      </div>


      <div className="container mt-4">
        <div className="row ">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <LinkButton color={"#fff"} to="/blogs/addBlog">
              <ContainerButtonAddNew>
                <FaPlusCircle />
                <div>Create New Article</div>

              </ContainerButtonAddNew>
            </LinkButton>
          </div>

        </div>

      </div>

      <div className="row mt-5">
        <div className="col-lg-5 col-md-12 col-sm-12">
          <Search />
        </div>
      </div>

      <div className="container">
        <div className="row align-items-baseline  mt-5">
          {
            arrArticle.length > 0 ? arrArticle.map((item, index) => (
              <WrapperCard className="col-lg-3 col-md-12 col-sm-12" key={index}>
                <div>
                  <ImageProduct src={item.url_pics} alt="img" />
                </div>
                <ContainerContent>
                  <Title>
                    {item.article_title}
                  </Title>
                  <SmallTgl>
                    By &nbsp;{item.published_by} on {moment(item.created_at).format('MMMM DD YYYY - HH:mm')}
                  </SmallTgl>
                  <Content>
                    {/* <div dangerouslySetInnerHTML={{ __html: item.article_description.substring(0, 20) }} /> */}
                    <p>{item.article_description.substring(0, 20)}</p>
                    {/* {item.article_description.substring(0, 100)} .... */}
                  </Content>
                  <LinkButton to={{ pathname: `/blogs/editBlog/${item.id}` }}>
                    <ViewArticle>
                      View Article
                    </ViewArticle>

                  </LinkButton>
                </ContainerContent>
              </WrapperCard>

            ))
              :
              <WrapperCard className="col-lg-3 col-md-12 col-sm-12">
                <div>
                  <ImageProduct src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="img" />
                </div>
                <ContainerContent>
                  <Title>
                    Deep Dive In Nature Article
                  </Title>
                  <SmallTgl>
                    By Muharis on {moment(new Date()).format('MMMM DD YYYY - HH:mm')}
                  </SmallTgl>
                  <Content>
                    {str.substring(1, 100)} ....
                  </Content>

                  <LinkButton to={{ pathname: `/blogs/editBlog/${'asdasd1213'}` }}>
                    <ViewArticle>
                      View Article
                    </ViewArticle>

                  </LinkButton>
                </ContainerContent>
              </WrapperCard>
          }
        </div>

      </div>
    </Container>
  )
}

const LinkButton = styled(Link)`
text-decoration : none;
color : ${({ color }) => (color && `${color}`)};
&:hover{
  color : ${({ color }) => (color && `${color}`)}

}
`

const SmallTgl = styled.small`
color:#8898AA;
`

const Title = styled.div`
font-weight: 800;
font-size:12.5pt;
`

const ViewArticle = styled.div`
font-weight: 700;
color:#7764E4;
cursor:pointer;
margin-top:10px;
text-align: right;
`

const ContainerContent = styled.div`
padding: 15px 15px;
position:relative;
`

const Content = styled.div`
margin-top:10px;
`

const WrapperCard = styled.div`
background:#fff;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
padding:0px 0px;
border-radius:10px;
margin:10px 10px;
height:370px;
`

const ImageProduct = styled.img`
width:100%;
height:200px;
object-fit: cover;
border-radius:10px 10px 0px 0px;
display: flex;
align-items: center;
justify-content: center;
text-align: center;
`


const ContainerButtonAddNew = styled.div`
background-color: #FFBF00;
border:none;
text-align: center;
display: inline-block;
padding:20px 15px;
border-radius:7px;
font-size:18pt;
color:#fff;
font-weight:700;
cursor:pointer;
transition:840ms;
box-shadow: -1px 15px 17px -13px rgba(255,191,0,1);
display: inline-block;
width: 100%;
`

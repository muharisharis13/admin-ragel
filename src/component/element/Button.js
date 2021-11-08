import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const LinkButton = styled(Link)`
text-decoration : none;
color : ${({ color }) => (color && `${color}`)};

&:hover{
  color : ${({ color }) => (color && `${color}`)}

}
`
export const A = styled.a`
text-decoration: none;
`

export const Button = styled.div`
font-weight:700;
font-size: 10pt;
padding:5px 10px;
border-radius: 7px;
border: 1px solid #FFBF00;
color:#7764E4;
justify-content: center;
align-items: center;
text-align: center;
cursor:pointer;
transition:850ms;
text-decoration: none;

&:hover{
  background-color: #7764E4;
  border: 1px solid #7764E4;
  color: #fff;
}
`
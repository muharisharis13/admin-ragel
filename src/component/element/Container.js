import styled from 'styled-components'


export const Container = styled.div`
background:${({ bgColor }) => bgColor ? `#F1F3F9` : '#fff'};
margin-top: -80px;
padding-top:80px;
padding-bottom:100px;
transition:450ms;
/* height: 100vh; */
overflow-y: scroll;
`
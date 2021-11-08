import React from 'react'
import { FaSearch } from 'react-icons/fa'
import styled from 'styled-components'


export const Search = ({ value, onChange, btnSearch }) => {
  return (
    <Container onSubmit={btnSearch}>
      <InputSearch type="text" placeholder="Search" className="form-control" id="search" value={value} onChange={onChange} />
      <IconSearch type="submit" onClick={btnSearch} />
    </Container>
  )
}

const InputSearch = styled.input`
padding-left: 10%;
&:focus {

background: transparent;
}
`

const IconSearch = styled(FaSearch)`
position:absolute;
left:2%;
color:grey;
`

const Container = styled.form`
position:relative;
display: flex;
align-items: center;
justify-content: center;
`

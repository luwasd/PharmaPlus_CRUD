import React from 'react'
import styled from 'styled-components'
import Banners from '../components/Banners'
import Heard from '../components/Heard'

import '../styles/banners.css'

const Home = () => {
  return (
    <>
        <Heard/>
        <main>
          <Banners/>
        </main>
    </>
  )
}
const Titulo = styled.p`
    font-size:18px;
    font-weight:0;
    text-transform:uppercase;
    margin-bottom:10px
`;

export default Home
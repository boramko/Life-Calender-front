import React from 'react'
import styled from 'styled-components'
import LoginInput from '../../../../components/Form/LoginForm/login'
import LogoIner from './logoimg'
import Join from '../../../../components/Button/Joinbutton/index'
import { AllLayout } from '../../../../styles/Common/CommonStyle'
import { media } from '../../../../styles/Media/media'
import './out.css'

const Onepage = () => {
    return(
        <>
        <Allwrap>
          <div className='shape'>
          <Centerwrap>
            <LogoIner/>
            <LoginInput/>
            <Join/>
          </Centerwrap>
          </div>  
        </Allwrap>
        </>
    )
};
export default Onepage;

const Allwrap = styled.div`
  ${AllLayout}

  ${media.mobileS`    
    width: 100vw;
    height: 100vh;
  `}

  ${media.tablet`   
    width: 100vw;
    height: 100vh;
  `}

  ${media.desktopM`   
    width: 100vw;
    height: 100vh;
  `}

  ${media.desktopL`
    width: 100vw;
    height: 100vh;
  `}
`
const Centerwrap = styled.div`
  width: 510px;
  height: 560px;
  margin: 0 auto;
  position: relative;
  top: 15%;
  /* background-color: red ; */
  
  ${media.mobileS`
    right: 10px;
  `}

  ${media.desktopL`
    right: 20px;
  `}
`
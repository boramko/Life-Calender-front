import { useState } from 'react'
import styled from 'styled-components'
import  { useNavigate }  from 'react-router-dom';
import useInputs from '../../../hooks/useInputs'
import AuthService from '../../../service/auth.service';
import TokenRepository from '../../../repository/TokenRepository';
import { InnerPlaceHolder } from '../../../styles/Common/CommonStyle';
import { fontsize } from '../../../styles/Media/theme';
import {ShowAlert} from '../../../pages/alert';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
//import Swal from "sweetalert2";

const LoginInput = () => {
  const navigate = useNavigate(); 

  const [{ email, password }, onChangeForm] = useInputs({
    email: '',
    password: '',
  });

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      if(!e.shiftKey){
        HandleLogin(); 
      }
    }
  }

   const  HandleLogin  = async () => {
    if(email === undefined || email === ""  || email === null){
      //alert("아이디 입력해주세요.");
      ShowAlert('아이디 입력해주세요.', "warning", "확인")
      return false;
    }
    
    try {
        await AuthService.Login({ id:email, password })
        .then((res) => {
        if (res.status === 201) {
          TokenRepository.setToken(res);

          if (TokenRepository.getToken()) {

        ShowAlert('로그인되었습니다.', "success", "확인").then((isConfirmed) => {
            if(isConfirmed){
              navigate('/thirdpage')
            }
        });
            //Swal.fire('로그인 성공!','success')
          }
        }
        })
    } catch (error) {
        ShowAlert('로그인 실패했습니다.', "warning", "확인").then((isConfirmed) => {
          return false;
        });
        //alert();
      };
    };

    return(
        <LoginForm>
          <Inputbox>
            <input
              placeholder="이메일을 입력하세요"
              autoComplete="on"
              name={'email'}
              onChange={onChangeForm}
              />
          </Inputbox>
          <Inputbox>
            <input
              type={'password'}
              placeholder="비밀번호를 입력하세요"
              autoComplete="on"
              name={'password'}
              onChange={onChangeForm}
              onKeyDown={handleEnter} 
              />
          </Inputbox>
            <InerButton onClick={HandleLogin}>
              로그인
            </InerButton>
        </LoginForm>
    );
};
export default LoginInput;


const LoginForm = styled.div`
    width: 70%;
    left: 18%;
    height: 220px;
    position: relative;
    margin-top: 50px;

  
   & input {
    width: 80%;
    height: 45px;
    border: none;
    font-size: ${fontsize[0]};
    position: absolute;
    left: 25px;
  }

  & input::placeholder {
    ${InnerPlaceHolder}
  }

  & input:focus {
    outline: none;
  }
`
const Inputbox = styled.div`
 width: 80%;
    height: 50px;
    margin-bottom: 30px;
    border: none;
    border-bottom: 4px solid #afafaf;
    font-size: ${fontsize[0]};
    display: flex;
    position: relative;
    left: 5%;
    border-radius: 10px;
    background-Color:white;
`


const InerButton = styled.button`
  width: 70%;
  height: 50px;
  border-radius: 15px;
  background-color: #7C83FD;
  border: none;
  color: white;
  font-family: "Gaegu", serif;
  position: relative;
  bottom:5px;
  left: 10%;
  text-align: center;
  font-size: ${fontsize[3]};
  cursor: pointer;
  margin: 0 auto;
  :hover{
    background-color: #5f67f8;
  }


  
`
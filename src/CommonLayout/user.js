 import styled from 'styled-components';
 import { fontsize } from '../styles/Media/theme';
 import React from 'react';

const UserName = ({ users }) => {
    console.log(users)
    return (
      <Userbox>
      <P>💕{users}님 환영합니다.</P>
      </Userbox>
    );
};
export default UserName;

const Userbox = styled.div`
  width: 450px;
  height: 40px;
  border-radius: 30px;
  background-color: white;
`
const P = styled.div`
  width: 300px;
  margin: auto;
  display: flex;
  text-align: center;
  font-size: ${fontsize[4]};
  padding-left: 20px;
`
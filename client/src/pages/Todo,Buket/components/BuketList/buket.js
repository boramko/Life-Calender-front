import Api from '../../../../apis/Api';
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,  faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, forwardRef, useEffect} from 'react';
import { DateStyle} from '../../../../styles/Common/CommonStyle';
import { media } from "../../../../styles/Media/media";
import { BoxSize, InputWrapStyle, InnerTextStyle, IconStyle } from '../../../../styles/DetailStyle/ListStyle/common/common';
import { fontsize } from '../../../../styles/Media/theme';

const BuketList = () => {
  const [Viewcontent, setViewcontent] = useState([]);
  const [ViewData, setViewData] = useState({
    content:""
    ,date:""
  })
  const {content, date } = ViewData;

  const search = () => {
    Api.buketGet()
    .then((response) => {
    setViewcontent(response.data.data);
    })
  }; 

  useEffect(()=> {
    setViewData({
      date:new Date() 
    })
    search();
  },[])

  const DatePick = forwardRef(({ value, onClick }, ref) => (
    <Datebutton className='custom-btn'
      onClick={onClick} ref={ref}>
        {value}
    </Datebutton> 
  ));

  const RemoveBuketList = (idx) => {
    window.confirm("삭제하시겠습니까?");
    Api.bucketDelete(idx)
    .then((response) => { 
    if(response.data.message === "successful"){
      alert('삭제 되었습니다😉');
      search();
    } else {
      alert('다시 선택해 주세요!');
      }
    });
  }

  const getChangeBuket = (e) => {
    const{name, value} = e.target;
    setViewData({
      ...ViewData,
      [name]: value
    })
  };

  const onClickBucket = () => {
    Api.buketPost(ViewData)
    .then((response) => {
      alert('등록 완료😊');
    setViewData({
      title: "test"
      ,content:""
      ,date:new Date()
    })
      search();
    })
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      onClickBucket();
    }
  };
    
  return(
    <>
    <BuketWhiteBox>
        <div className="headerWrap">
          <div className="dateBox">
            <DatePicker
              value={date}
              dateFormat="yyyy-MM-dd"
              selected={ViewData.date}
              onChange={(date) => setViewData({
              ...ViewData,
              'date': date
              })}
              customInput={<DatePick/>}
            />
          </div>
          <p className="buketText">Bucket List</p>
          
          <BuketInputWrap>
            <input
              type="text"
              placeholder="버킷리스트를 추가해 주세요"
              onChange={getChangeBuket}
              name='content'
              value={content}
              onKeyDown={handleEnter}
            />
            <FontAwesomeIcon 
            className="faPlus" 
            icon={faPlus}
            onClick={onClickBucket}
            />
          </BuketInputWrap>
        </div>

          {Viewcontent.map((item) => (
            <Buket>
              <BucketInnerText>
              {item.content}
              </BucketInnerText>
              <div className="iconBox">
                <FontAwesomeIcon className="XIcon" 
                icon={faXmark}
                onClick={(e) => RemoveBuketList(item._id, e)}
                />
              </div>  
            </Buket>
          ))}
    </BuketWhiteBox>
    </>
  )
};
export default BuketList;

const BuketWhiteBox = styled.div`
  width: 350px;
  ${BoxSize}
  left: 600px;
  border-radius: 10px;

  & .headerWrap {
    margin: 0 auto;
    margin-bottom: 20px;  

    ${media.mobileS` 
     width: 250px;
     left: 10px;
     top: 60px;
     height: 130px;
    `}
  }
  
  & .buketText {
    text-align: center;
    font-size: ${fontsize[2]};
    font-family: "Gaegu", serif;
    color: #FFCCCC;
  }

  ${media.mobileS`  
    width: 500px ;
    left: 1px;
    top: 50px;
    height: 380px;
  `}
    
  ${media.tablet`   
    width: 350px;
    ${BoxSize}
    left: 500px;
    position: absolute;
    top: 0px;
  `}

  ${media.desktopM`    
    left:700px;
  `}
`
const Datebutton = styled.button`
  ${DateStyle}
  background-color: pink;
  margin-left: 80px;

  :hover{
    background-color: #FFD4D4;
  }
`

const BuketInputWrap = styled.div`
  width: 206px;
  margin-left: 35px;
  ${InputWrapStyle}

  & .faPlus {
    background-color: #FFCCCC;
  }
`

const Buket = styled.div`
  width: 220px;
  background-color: #FFCCCC;
  height: 60px;
  margin-top: 13px;
  margin-left: 25px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  ${IconStyle}

  ${media.mobileS`    
    margin-left:100px;
  `}

  ${media.tablet`   
    right: 70px;
  `}
`
const BucketInnerText = styled.div`
  ${ InnerTextStyle }
  color: white;
`
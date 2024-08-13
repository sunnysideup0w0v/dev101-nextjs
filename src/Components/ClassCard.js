import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegHeart, FaHeart, FaThumbsUp, FaFireAlt } from "react-icons/fa";
import styled from "styled-components";
import { JHAPI } from "../config";

const timePassed = (time) => {
  const BackDate = time.split(".").slice(0, 1)[0];
  const frontDateNew = new Date(BackDate);
  const now = new Date();
  const between = now - frontDateNew;

  const seconds = (between - (between % 1000)) / 1000;
  if (seconds < 60) {
    return `${seconds}초 `;
  }
  if (seconds < 3600) {
    return `${seconds / 60}분 `;
  }
  if (seconds >= 3600) {
    const day = Math.floor(seconds / 86400);
    const hour = Math.floor((seconds - day * 86400) / 3600);
    const minute = Math.floor((seconds - day * 86400 - hour * 3600) / 60);
    return `${day ? day + "일 " : ""}${hour ? hour + "시간 " : ""}${minute ? minute + "분 " : ""}`;
  }
};

const ClassCard = ({
  cardWidth,
  image_url,
  is_open,
  sub_category,
  mentor,
  title,
  like_count,
  cheered,
  thumbs_up,
  price,
  discount,
  coupon,
  updated_at,
  product_id,
  modalHandler,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [pricePerMonth, setPricePerMonth] = useState(0);
  const navigate = useNavigate();

  const likeBtnHandler = () => {
    axios
      .post(
        `${JHAPI}/product/${product_id}/like`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("TOKEN"),
            // Authorization:
            //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTd9.6B6hmXf3Wu4LMlAU3aIc7XUiFDmaHli7V4a6YwKpPmI",
          },
        },
      )
      .then((res) => alert("찜 등록이 완료되었습니다."))
      .catch((err) => {
        if (err.message.includes("400")) {
          alert("로그인을 먼저 해주세요.");
          navigate("/Login");
        }
      });
    setIsLiked(!isLiked);
  };

  const cheerBtnHandler = (e) => {
    e.stopPropagation();
    axios
      .post(
        `${JHAPI}/product/${product_id}/cheer`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("TOKEN"),
          },
        },
      )
      .then((res) => alert("응원하기가 완료되었습니다."))
      .catch((err) => {
        if (err.message.includes("400")) {
          alert("로그인을 먼저 해주세요.");
          navigate("/Login");
        }
      });
  };

  useEffect(() => {
    if (price && discount) {
      const discountedPrice = price * discount;
      setPricePerMonth(discountedPrice / 5);
    }
  }, [discount, price]);

  return (
    <ClassCardComponent cardWidth={cardWidth}>
      <LikeBtn className="likeBtn" onClick={likeBtnHandler}>
        {isLiked ? <FaHeart fill="#f33340" /> : <FaRegHeart fill="#f8f8f8" />}
      </LikeBtn>
      <div
        onClick={() =>
          is_open === false ? modalHandler(product_id) : navigate(`/detail/${product_id}`)
        }
      >
        <HoverImgBox>
          {coupon && <span style={{ display: coupon === "0" ? "none" : "block" }}>{coupon}</span>}
          <ImgWithProps
            src={
              image_url ||
              "https://images.unsplash.com/photo-1589395595558-18e333cf6341?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            }
            alt="ClassThumbnails"
          />
        </HoverImgBox>
        <TextDiv className="description">
          <Bold>
            {sub_category}, {mentor}
          </Bold>
          <p>{title}</p>
          <Rates>
            {is_open === false && (
              <span className="red">
                <FaFireAlt /> {cheered * 10}% 달성
              </span>
            )}
            <span>
              <FaHeart /> {like_count}
            </span>
            {is_open !== false && (
              <span>
                <FaThumbsUp /> {Math.floor(thumbs_up * 100)}%
              </span>
            )}
          </Rates>
        </TextDiv>
        <TextDiv className="noBorder">
          {is_open === false ? (
            <Button onClick={(e) => cheerBtnHandler(e)}>응원하기</Button>
          ) : price ? (
            <>
              <p>
                <CentereLinedSpan>{Number(price).toLocaleString()}원</CentereLinedSpan>
                <span className="red">{Math.floor(discount * 100)}%</span>
              </p>
              <p>
                <Bold className="cost">월 {Math.floor(pricePerMonth).toLocaleString()}원</Bold>
                <span>(5개월)</span>
              </p>
            </>
          ) : (
            <span>
              미션 답변 <span className="red"> {timePassed(updated_at)}전</span>
            </span>
          )}
        </TextDiv>
      </div>
    </ClassCardComponent>
  );
};

const ClassCardComponent = styled.div`
  width: 267px;
  position: relative;
  cursor: pointer;
`;

const HoverImgBox = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  border-radius: 5px;
  overflow: hidden;

  span {
    display: inline-block;
    position: absolute;
    left: 10px;
    top: 10px;
    padding: 10px;
    background-color: #f33340;
    border-radius: 4px;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    z-index: 2;
  }
`;

const ImgWithProps = styled.img`
  width: 100%;
  height: 100%;
  transition: 0.35s ease-in-out;

  &:hover {
    transform: scale(1.125);
  }
`;

const TextDiv = styled.div`
  padding: 5px 0;
  margin-bottom: 5px;
  border-bottom: 1px solid #f2f4f5;

  &.description {
    height: 110px;
  }

  &.noBorder {
    border-bottom: none;

    p {
      margin: 0;
    }
  }

  p {
    margin: 10px 0;
    line-height: 1.25;
    font-size: 14px;
  }

  span {
    padding-right: 5px;
    font-size: 12px;

    &.red {
      color: red;
    }
  }
`;

const Bold = styled.span`
  font-weight: 700;

  &.category {
    font-size: 10px;
  }

  &.cost {
    display: inline-block;
    padding-top: 5px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  display: inline-block;
  width: 100%;
  margin-top: 10px;
  padding: 10px 0;
  border-radius: 5px;
  background-color: rgba(255, 77, 0, 0.1);
  color: #ff4d00;
  cursor: pointer;
  transition: 0.125s ease;

  &:hover {
    background-color: rgba(255, 77, 0, 0.2);
  }
`;

const LikeBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  z-index: 333;
  svg {
    pointer-events: none;
  }
`;

const CentereLinedSpan = styled.span`
  position: relative;
  padding: 0 2px;
  margin-right: 3px;

  ::after {
    position: absolute;
    content: "";
    left: 0;
    right: 0;
    height: 1px;
    top: 50%;
    background-color: #333;
  }
`;

const Rates = styled.p`
  color: gray;
`;

export default ClassCard;

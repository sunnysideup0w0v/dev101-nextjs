import { useState, useEffect } from "react";
import Styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { JHAPI } from "../../../config";
import { useSelector } from "react-redux";

const Footer = ({ info, coverImg, thumbnailImg, currentPage, handleCurrentPage }) => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState(0);
  const [newBrand, setNewBrand] = useState("크리에이티브");
  const { brand, creatorName, category, subCategory, level } = useSelector(
    (state) => state.CreatorsReducer.infomation,
  );
  const { classTitle } = useSelector((state) => state.CreatorsReducer.titleAndCover);

  useEffect(() => {
    if (Number(brand) === 0) {
      setNewBrand("크리에이티브");
    } else if (Number(brand) === 1) {
      setNewBrand("커리어");
    } else if (Number(brand) === 2) {
      setNewBrand("머니");
    }
  }, [brand]);

  const handlePrev = () => {
    if (currentPage === "last") {
      handleCurrentPage("info");
    } else if (currentPage === "info") {
      handleCurrentPage("title");
    } else if (currentPage === "title") {
      handleCurrentPage("intro");
    }
  };
  const handleNext = () => {
    console.log(currentPage);
    if (currentPage === "intro") {
      handleCurrentPage("title");
      const formData = new FormData();
      formData.append("category", newBrand);
      formData.append("nickname", creatorName);
      formData.append("sub_category", category);
      formData.append("category_detail", subCategory);
      formData.append("level", level);
      axios
        .post(`${JHAPI}/user/basicinfo`, formData, {
          headers: {
            Authorization: localStorage.getItem("TOKEN"),
          },
        })
        .then((res) => {
          res.data.product_id && setProductId(res.data.product_id);
        });
    } else if (currentPage === "title") {
      handleCurrentPage("info");
      const formData = new FormData();
      formData.append("title", classTitle);
      formData.append("file", coverImg);
      formData.append("file", thumbnailImg);

      try {
        axios.post(`${JHAPI}/user/covertitle/${productId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("TOKEN"),
          },
        });
      } catch (err) {
        console.log(err);
      }
    } else if (currentPage === "info") {
      const formData = new FormData();
      formData.append("theme_desc", info.one.desc);
      formData.append("process_desc", info.two.desc);
      formData.append("work_desc", info.three.desc);
      formData.append("file", info.one.src);
      formData.append("file", info.one.src);
      formData.append("file", info.one.src);
      try {
        axios.post(`${JHAPI}/user/introduction/${productId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("TOKEN"),
          },
        });
      } catch (err) {
        console.log(err);
      }
      alert("클래스 생성에 성공하셨습니다.");
      navigate("/");
    }
  };
  return (
    <Wrap>
      <button onClick={handlePrev} className={`prev ${currentPage === "intro" && "hidden"}`}>
        이전
      </button>
      <button disabled className="save">
        저장하기
      </button>
      <button onClick={handleNext} className="next">
        다음
      </button>
    </Wrap>
  );
};

export default Footer;

const Wrap = Styled.div`
  position: fixed;
  right:0;
  bottom:0;
  display:flex;
  z-index: 10;
  align-items: center;
  width: calc(100% - 280px);
  padding: 18px 32px;
  border-top: 1px solid #edeff0;
  background: white;
  button {
    cursor: pointer;
    font-size: 16px;
    border-radius: 3px;
    padding: 0 16px;
    height: 40px;
  }
  .hidden {
    display: none;
  }
  .prev {
    &:hover {
      background: #dddde1;
    }
  }
  .save {
    margin-left: auto;

  }
  .next {
    color: white;
    background: #ff922b
  }
  `;

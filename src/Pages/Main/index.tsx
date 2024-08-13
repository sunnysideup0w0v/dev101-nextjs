import { useState, useEffect } from "react";
import axios from "axios";
import SliderComponent, { Data } from "../../Components/SliderComponent";
import MainSlider from "./components/MainSlider";
import InfiniteScroll from "../../Components/InfiniteScroll";
import IsPlannedModal from "../../Components/IsPlannedModal";
import SubBanner from "./components/SubBanner";
import { JHAPI } from "../../config";
import { MainSection, PageWrapper } from "./components/styled";

export const Main = () => {
  const [top10, setTop10] = useState([]);
  const [planned, setPlanned] = useState([]);
  const [updated, setUpdated] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProductId, setModalProductId] = useState("");
  let fetchCount = 0;

  useEffect(() => {
    axios
      .get(`${JHAPI}/products?offset=0&limit=16`, {
        headers: {
          Authorization: localStorage.getItem("TOKEN"),
        },
      })
      .then(({ data }) => {
        setTop10(data.top_10_data);
        setPlanned(data.planned_data);
        setUpdated(data.updated_data);
      });

    intersection();
  }, []);

  useEffect(() => {
    const mergedData = [...updated, ...fetchedData];
    setUpdated(mergedData);
  }, [fetchedData]);

  const fetchData = () => {
    fetchCount++;
    axios
      .get(`${JHAPI}/products?offset=${16 * fetchCount}&limit=16`, {
        headers: {
          Authorization: localStorage.getItem("TOKEN"),
        },
      })
      .then((res) => {
        setFetchedData(res.data.updated_data);
      });
  };

  const intersection = () => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    let callback: IntersectionObserverCallback = (entries) => {
      console.log(entries);

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.75) {
            fetchData();
          }
        }
      });
    };
    let target = document.querySelector(".observer");
    let observer = new IntersectionObserver(callback, options);

    if (target) observer.observe(target);
  };

  const modalHandler = (itemId: string) => {
    setModalProductId(itemId);
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <MainSection>
        <MainSlider />
        <PageWrapper>
          <div>
            <h3>지금, 인기 TOP 10</h3>
            <SliderComponent dataList={top10 as Data[]} />
            <h3>오픈 예정 클래스</h3>
            <SliderComponent dataList={planned} modalHandler={modalHandler} />
            <SubBanner />
            <h3>최근 업데이트 클래스</h3>
            <InfiniteScroll dataList={updated} />
            <div className="observer"></div>
          </div>
        </PageWrapper>
      </MainSection>
      {modalVisible && (
        <IsPlannedModal
          modalVisible={modalVisible}
          id={modalProductId}
          modalHandler={modalHandler}
        />
      )}
    </>
  );
};

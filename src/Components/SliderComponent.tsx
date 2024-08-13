import ClassCard from "./ClassCard";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

export type Data = {
  cardWidth: number;
  image_url: string;
  is_open: boolean;
  sub_category: string;
  mentor: string;
  title: string;
  like_count: number;
  cheered: number;
  thumbs_up: number;
  price: number;
  discount: number;
  coupon: string;
  updated_at: string;
  product_id: string;
  modalHandler: (itemId: string) => void;
};

type Props = {
  dataList: Data[];
  showingSlidesCount?: number;
  modalHandler?: any;
};

const SliderComponent = ({ dataList, showingSlidesCount, modalHandler }: Props) => {
  return (
    <SliderWrapper>
      <Swiper slidesPerView={showingSlidesCount || 4}>
        {dataList?.map((data) => {
          return (
            <SwiperSlide key={data.product_id}>
              <ClassCard {...data} modalHandler={modalHandler} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div`
  margin-bottom: 100px;
  ${Swiper as any} {
    .swiper-container {
      position: relative;
    }
  }
`;

export default SliderComponent;

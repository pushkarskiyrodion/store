import React from 'react';
import { Link } from 'react-router-dom';
import Slider, { CustomArrowProps } from 'react-slick';
import './InfiniteSlider.scss';

import { ISlideImage } from 'types/SlideImage';

const Prev = ({
  currentSlide, slideCount, onClick, ...props
}: CustomArrowProps) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className="custom-slider-button custom-slider-button--prev"
      type="button"
      aria-hidden="true"
      aria-disabled={currentSlide === 0}
    />
  );
};

const Next = ({
  currentSlide, slideCount = 0, onClick, ...props
}: CustomArrowProps) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className="custom-slider-button custom-slider-button--next"
      type="button"
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1}
    />
  );
};

type Props = {
  images: ISlideImage[],
};

export const InfiniteSlider: React.FC<Props> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <Next />,
    prevArrow: <Prev />,
    autoplay: true,
    autoplaySpeed: 2000,
    useTransform: false,
    swipe: true,
    swipeToSlide: true, 
  };

  return (
    <Slider {...settings}>
      {images.map(({ src, href }) => (
        <Link
          to={href}
          key={src}
          className="infinite-slider-link"
        >
          <img
            src={src}
            alt="Slide banner"
          />
        </Link>
      ))}
    </Slider>
  );
};

import React, { useState, createRef, useRef, useEffect } from "react";
import { imageUrlFor } from "../../lib/image-url";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/zoom";
import { Zoom, Navigation } from "swiper/modules";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

export const ImageSlider = ({ images }) => {
  console.log("images:", images);
  const swiperRef = useRef();
  useEffect(() => {
    swiperRef.current.slideTo(0);
  }, [images]);

  const captionRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCaption, setCurrentCaption] = useState(0);

  const lightbox = new PhotoSwipeLightbox({
    gallery: "#swiper-photoswipe-gallery",
    children: "a",
    bgOpacity: 1.0,
    // showHideAnimationType: "none",
    pswpModule: () => import("photoswipe")
  });
  lightbox.init();
  useEffect(() => {
    if (images[currentIndex]?.caption) {
      setTimeout(() => setCurrentCaption(images[currentIndex]?.caption), 250);
    } else {
      setCurrentCaption(null);
    }
  }, [currentIndex]);

  return (
    <>
      <div className="relative image-slider">
        {/* <div
          className="hidden md:block cursor-pointer w-1/2 h-full absolute top-0 left-0 z-10"
          onClick={() => swiperRef.current.slidePrev()}
        />
        <div
          className="hidden md:block cursor-pointer w-1/2 h-full absolute top-0 right-0 z-10"
          onClick={() => swiperRef.current.slideNext()}
        /> */}

        <Swiper
          zoom={true}
          loop={true}
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
          mousewheel={{ forceToAxis: true }}
          modules={[Zoom, Navigation]}
          className="mySwiper max-w-[560px] md:max-w-[unset] -ml-4 w-[calc(100%_+_2rem)]"
        >
          {images?.map((image, index) =>
            image.image?.asset ? (
              <SwiperSlide>
                <div className="swiper-zoom-container" id="swiper-photoswipe-gallery">
                  <a
                    href={imageUrlFor(image.image)
                      .width(1000)
                      .auto("format")
                      .url()}
                    data-pswp-width="3200"
                    data-pswp-height="4000"
                  >
                    <img
                      key={index}
                      className="max-w-[560px] md:max-w-[unset] px-4 h-full w-full object-cover"
                      src={imageUrlFor(image.image)
                        .width(1000)
                        .auto("format")
                        .url()}
                      alt=""
                    />
                  </a>
                </div>
              </SwiperSlide>
            ) : null
          )}
        </Swiper>
      </div>

      <div className="mt-4">
        {/* {images[currentIndex]?.file?.asset?.url ? (
          <a
            className="hover:text-[#000] w-fit flex items-center mt-4 text-mobile-body md:text-desktop-body"
            href={images[currentIndex]?.file?.asset?.url}
            target="_blank"
          >
            Download <span className="block ml-1 mb-1">↓</span>
          </a>
        ) : null} */}
        <div className="flex justify-center items-center max-w-[560px] md:max-w-[unset]">
          <button
            onClick={() => swiperRef.current.slidePrev()}
            className="review-swiper-button-prev disabled:shadow-none disabled:bg-transparent disabled:opacity-40 mr-2"
          >
            <svg
              className="transform rotate-180"
              width="22"
              height="10"
              viewBox="0 0 22 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5191 5.22869e-07L21.5 5L15.5191 10L14.4911 9.15179L18.7231 5.61384L0.5 5.61384L0.5 4.38616L18.7231 4.38616L14.4911 0.859376L15.5191 5.22869e-07Z"
                fill="black"
              />
            </svg>
          </button>
          <button
            className="disabled:shadow-none disabled:bg-transparent disabled:opacity-40"
            onClick={() => swiperRef.current.slideNext()}
          >
            <svg
              width="22"
              height="10"
              viewBox="0 0 22 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5191 5.22869e-07L21.5 5L15.5191 10L14.4911 9.15179L18.7231 5.61384L0.5 5.61384L0.5 4.38616L18.7231 4.38616L14.4911 0.859376L15.5191 5.22869e-07Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

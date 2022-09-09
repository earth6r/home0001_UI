import { useEffect, useState } from "react";
import Figure from "./Figure";

const HeroRnd = ({ images, imageUrls, titles, showTitles }) => {
  const [selectedMedia, setSelectedMedia] = useState(undefined);
  const [selectedTitle, setSelectedTitle] = useState(undefined);
  const [mediaLeft, setMediaLeft] = useState(undefined);
  const [mediaTop, setMediaTop] = useState(undefined);
  const [textLeft, setTextLeft] = useState(undefined);
  const [textTop, setTextTop] = useState(undefined);

  useEffect(() => {
    setSelectedMedia(Math.floor(Math.random() * (images.length + imageUrls.length)));
    setSelectedTitle(Math.floor(Math.random() * titles.length));
    setMediaLeft(Math.floor(Math.random() * 3));
    setMediaTop(Math.floor(Math.random() * 3));
    setTextLeft(Math.floor(Math.random() * 3));
    setTextTop(Math.floor(Math.random() * 3));
  }, []);

  return (
    <div className="w-full relative hero-rnd">
      {selectedMedia !== undefined && mediaLeft !== undefined && mediaTop !== undefined ? (
        <div
          className={`absolute hero-rnd-image w-full h-full flex ${
            mediaLeft === 0 ? "justify-start" : mediaLeft === 1 ? "justify-center" : "justify-end"
          } ${
            mediaTop === 0 ? "items-start" : mediaTop === 1 ? "items-center" : "items-end"
          } md:mr-10`}
        >
          {selectedMedia >= images.length ? (
            <img src={imageUrls[selectedMedia - images.length]} alt="Hero Image" />
          ) : (
            <Figure node={images[selectedMedia]}></Figure>
          )}
        </div>
      ) : null}
      {showTitles &&
      selectedTitle !== undefined &&
      textLeft !== undefined &&
      textTop !== undefined ? (
        <div
          className={`absolute hero-rnd-text uppercase w-full h-full flex ${
            textLeft === 0 ? "justify-start" : textLeft === 1 ? "justify-center" : "justify-end"
          } ${
            textTop === 0 ? "items-start" : textTop === 1 ? "items-center" : "items-end"
          } md:mr-10`}
        >
          <div>{titles[selectedTitle]}</div>
        </div>
      ) : null}
    </div>
  );
};

export default HeroRnd;

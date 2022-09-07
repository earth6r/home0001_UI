import { useEffect, useState } from "react";
import Figure from "./Figure";
import YouTube from "react-youtube";

const HeroRnd = ({ images, titles, videos }) => {
  const [selectedMedia, setSelectedMedia] = useState(undefined);
  const [selectedTitle, setSelectedTitle] = useState(undefined);
  const [mediaLeft, setMediaLeft] = useState(undefined);
  const [mediaTop, setMediaTop] = useState(undefined);
  const [textLeft, setTextLeft] = useState(undefined);
  const [textTop, setTextTop] = useState(undefined);

  useEffect(() => {
    setSelectedMedia(Math.floor(Math.random() * (images.length + videos.length)));
    setSelectedTitle(Math.floor(Math.random() * titles.length));
    setMediaLeft(Math.floor(Math.random() * 3));
    setMediaTop(Math.floor(Math.random() * 3));
    setTextLeft(Math.floor(Math.random() * 3));
    setTextTop(Math.floor(Math.random() * 3));
  }, []);

  const opts = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      iv_load_policy: 3,
      loop: 1,
      modestbranding: 1,
      mute: 1,
      playsinline: 1
    }
  };

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
            <YouTube
              videoId={videos[selectedMedia - images.length]}
              opts={opts}
              className="hero-rnd-video"
              onReady={event => event.target.playVideo()} // In case autoplay doesn't work on mobile
            />
          ) : (
            <Figure node={images[selectedMedia]}></Figure>
          )}
        </div>
      ) : null}
      {selectedTitle !== undefined && textLeft !== undefined && textTop !== undefined ? (
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

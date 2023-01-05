import React, { useEffect, useState } from "react";
import Figure from "./Figure";
import YouTube from "react-youtube";
import { imageUrlFor } from '../lib/image-url';

const HeroRnd = ({ images, thumbnails, titles, showTitles, videos }) => {
  const [selectedMedia, setSelectedMedia] = useState(undefined);
  const [selectedThumbnail, setSelectedThumbnail] = useState(undefined);
  const [selectedTitle, setSelectedTitle] = useState(undefined);
  const [mediaLeft, setMediaLeft] = useState(undefined);
  const [mediaTop, setMediaTop] = useState(undefined);
  const [textLeft, setTextLeft] = useState(undefined);
  const [textTop, setTextTop] = useState(undefined);
  const [showThumbnail, setShowThumbnail] = useState(true);

  useEffect(() => {
    setSelectedMedia(Math.floor(Math.random() * (images.length + videos.length)));
    setSelectedThumbnail(Math.floor(Math.random() * thumbnails.length));
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
          className={`absolute hero-rnd-container -mx-4 md:-mx-8 h-full flex ${mediaLeft === 0 ? "justify-start" : mediaLeft === 1 ? "justify-center" : "justify-end"
            } ${mediaTop === 0 ? "items-start" : mediaTop === 1 ? "items-center" : "items-end"
            }`}
        >
          {selectedMedia >= images.length ? (
            <div className="hero-rnd-video">
              {thumbnails.length && showThumbnail ? (
                <div className="hero-rnd-video-thumbnail">
                  <img src={imageUrlFor(thumbnails[selectedThumbnail]).url()} alt={thumbnails[selectedThumbnail].caption} />
                </div>
              ) : null}

              <YouTube
                videoId={videos[selectedMedia - images.length]}
                opts={opts}
                onReady={event => {
                  // In case autoplay doesn't work on mobile
                  event.target.playVideo();
                }}
                onError={event => {
                  setShowThumbnail(true);
                }}
                onStateChange={event => {
                  // Check if video playing
                  if (event && event.data === 1) {
                    // Hide thumbnail after video is playing
                    setTimeout(() => {
                      setShowThumbnail(false);
                    }, 4000);
                  } else {
                    // Try to play video and show thumbnail
                    event.target.playVideo();
                    setShowThumbnail(true);
                  }
                }}
              />
            </div>
          ) : (
            <div className="hero-rnd-image">
              <Figure node={images[selectedMedia]}></Figure>
            </div>
          )}
        </div>
      ) : null}
      {showTitles &&
        selectedTitle !== undefined &&
        textLeft !== undefined &&
        textTop !== undefined ? (
        <div
          className={`absolute hero-rnd-text -mx-4 md:-mx-8 uppercase h-full flex ${textLeft === 0 ? "justify-start" : textLeft === 1 ? "justify-center" : "justify-end"
            } ${textTop === 0 ? "items-start" : textTop === 1 ? "items-center" : "items-end"}`}
        >
          <div>{titles[selectedTitle]}</div>
        </div>
      ) : null}
    </div>
  );
};

export default HeroRnd;

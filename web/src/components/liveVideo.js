import { useEffect, useState } from 'react';
import YouTube from "react-youtube";
import { imageUrlFor } from '../lib/image-url';
import PortableText from './portableText';

const LiveVideo = ({ description, image, links, youtubeVideo }) => {
  const [showThumbnail, setShowThumbnail] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowVideo(true);
    }, 2000);
  }, []);

  const opts = {
    playerVars: {
      controls: 1,
      disablekb: 1,
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
    }
  };

  return (
    <div className="live-video-container">
      <div className="live-video bg-black">
        {image && showThumbnail ? (
          <div className="live-video-placeholder">
            <img src={imageUrlFor(image).url()} alt="Stream placeholder" />
          </div>
        ) : null}

        {setShowVideo ? (
          <YouTube
            videoId={youtubeVideo}
            opts={opts}
            onError={event => {
              setShowThumbnail(true);
            }}
          />
        ) : null}
      </div>
      <div className="mt-4"><PortableText blocks={description} /></div>
      {links.length ? (
        <div className="flex mt-4">
          {links.map((item, i) => (
            <a key={i} className={`underline ${i < links.length - 1 ? 'mr-5' : ''}`} href={item.url} title={item.title} target="_blank">
              {item.title}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default LiveVideo;

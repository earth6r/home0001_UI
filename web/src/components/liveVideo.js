import { useEffect, useState } from 'react';
import YouTube from "react-youtube";
import { imageUrlFor } from '../lib/image-url';
import PortableText from './portableText';

const LiveVideo = ({ description, image, links, channelId }) => {
  const [showThumbnail, setShowThumbnail] = useState(false);
  const [player, setPlayer] = useState()

  const onPlayerError = () => {
    console.log('Error')
    setShowThumbnail(true)
  };

  const loadVideo = () => {
    new window.YT.Player(`youtube-player`, {
      events: {
        onError: onPlayerError,
      },
    });
  };

  useEffect(() => {
    if (window.YT) {
      loadVideo();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      window.onYouTubeIframeAPIReady = loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  return (
    <div className="live-video-container">
      <div className="live-video bg-black">
        {image && showThumbnail ? (
          <div className="live-video-placeholder">
            <img src={imageUrlFor(image).url()} alt="Stream placeholder" />
          </div>
        ) : null}

        <iframe
          id="youtube-player"
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/live_stream?enablejsapi=1&channel=${channelId}&iv_load_policy=3&controls=1&modestbranding=1&rel=0`}
          title="My Broadcast"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
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

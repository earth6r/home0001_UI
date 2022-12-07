import { useEffect, useState } from 'react';
import { imageUrlFor } from '../lib/image-url';
import PortableText from './portableText';

const LiveVideo = ({ description, image, links, vimeoEventId, vimeoEmbedId, showOnlyPlaceholder }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  const loadVideo = () => {
    const player = new window.Vimeo.Player('vimeo-video');

    player.getQualities().then((qualities) => {
      // If there are no qualities, it means stream is off
      if (!qualities || qualities.length === 0) {
        setShowPlaceholder(true);
      }
    }).catch(() => {
      setShowPlaceholder(true);
    });
  };

  useEffect(() => {
    const vimeoCheckInterval = setInterval(() => {
      if (window.Vimeo) {
        loadVideo();
        clearInterval(vimeoCheckInterval);
      }
    }, 500);
  });

  useEffect(() => {
    if (!window.Player) {
      const tag = document.createElement('script');
      tag.src = 'https://player.vimeo.com/api/player.js';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  return (
    <div className="live-video-container">
      <div className="live-video bg-black">
        {image && (showPlaceholder || showOnlyPlaceholder) ? (
          <div className="live-video-placeholder">
            <img src={imageUrlFor(image).url()} alt="Stream placeholder" />
          </div>
        ) : null}

        <iframe
          id="vimeo-video"
          src={`https://vimeo.com/event/${vimeoEventId}/embed/${vimeoEmbedId}?badge=0&autopause=0&autoplay=1`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ display: showPlaceholder || showOnlyPlaceholder ? 'none' : 'block' }}
        >
        </iframe>
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

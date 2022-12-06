import { useEffect, useState } from 'react';
import { imageUrlFor } from '../lib/image-url';
import PortableText from './portableText';

const LiveVideo = ({ description, image, links, vimeoEventId, vimeoEmbedId, showOnlyPlaceholder }) => {
  return (
    <div className="live-video-container">
      <div className="live-video bg-black">
        {image && showOnlyPlaceholder ? (
          <div className="live-video-placeholder">
            <img src={imageUrlFor(image).url()} alt="Stream placeholder" />
          </div>
        ) : null}

        {!showOnlyPlaceholder ? (
          <iframe
            src={`https://vimeo.com/event/${vimeoEventId}/embed/${vimeoEmbedId}`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen>
          </iframe>
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

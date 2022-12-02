import YouTube from "react-youtube";

const LiveVideo = ({ description, links, youtubeVideo }) => {
  const opts = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      iv_load_policy: 3,
      loop: 1,
      modestbranding: 1,
      playsinline: 1
    }
  };

  return (
    <div className="live-video-container">
      <div className="live-video">
        <YouTube
          videoId={youtubeVideo}
          opts={opts}
          onReady={event => {
            // In case autoplay doesn't work on mobile
            event.target.playVideo();
          }}
          onError={event => {
            console.log('Error')
          }}
        />
      </div>
      <div className="mt-4">{description}</div>
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

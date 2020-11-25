import React from "react";
import Vimeo from "@u-wave/react-vimeo";

const Preview = ({ value }) => {
  const { url } = value;
  //const id = getYouTubeId(url);
  return <Vimeo video={url} width="200px" showByline="false" />;
};

export default {
  name: "vimeo",
  type: "object",
  title: "Video",
  fields: [
    {
      name: 'callibrationMark',
      title: 'Show Callibration Marks',
      default: true,
      type: 'boolean',
    },
    {
      name: "url",
      type: "url",
      title: "Vimeo video URL",
    },
  ],
  preview: {
    select: {
      url: "url",
    },
    component: Preview,
  },
};

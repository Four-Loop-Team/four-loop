// Mock for Next.js Image component
import React from 'react';

const MockImage = ({ src, alt, width, height, ...props }) => {
  return React.createElement('img', {
    src,
    alt,
    width,
    height,
    ...props,
  });
};

export default MockImage;

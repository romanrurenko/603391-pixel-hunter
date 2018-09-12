export const resize = (frame, image) => {
  const newSize = {width: undefined, height: undefined};
  const sourceAspect = image.width / image.height;
  const destAspect = frame.width / frame.height;

  if (sourceAspect > destAspect) {
    newSize.height = Math.floor(frame.width / sourceAspect);
    newSize.width = frame.width;
  } else if (sourceAspect < destAspect) {
    newSize.width = Math.floor(frame.height * destAspect);
    newSize.height = frame.height;
  } else if (sourceAspect === destAspect) {
    newSize.height = frame.height;
    newSize.width = frame.height;
  }

  if (sourceAspect === destAspect) {
    newSize.height = frame.height;
    newSize.width = frame.width;
  }

  return newSize;
};


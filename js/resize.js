export const resize = (frame, image) => {
  const newSize = {width: undefined, height: undefined};
  const sourceAspect = image.width / image.height;
  const destAspect = frame.width / frame.height;

  if (sourceAspect > 1) {
    newSize.height = frame.width / sourceAspect;
    newSize.width = frame.width;
  } else if (sourceAspect < 1 && destAspect > 0) {
    newSize.width = Math.floor(frame.width / 2);
    newSize.height = frame.height;
  } else if (sourceAspect === 1 && destAspect > 1) {
    newSize.height = frame.height;
    newSize.width = frame.height;
  }

  if (sourceAspect === destAspect) {
    newSize.height = frame.height;
    newSize.width = frame.width;
  }

  return newSize;
};


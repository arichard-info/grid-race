export const isTrackpadWheelEvent = (event: WheelEvent): boolean => {
  if (event.deltaY) {
    if (Math.abs(event.deltaY) !== 100) {
      return true;
    }
  } else if (event.deltaMode === 0) {
    return true;
  }

  return false;
};

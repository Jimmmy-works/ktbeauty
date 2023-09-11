import { timeVN } from './timeVN';

const compareTime = (newestFilter) => {
  function timeToSecs(time) {
    let [h, m, s] = time.split(':');
    return h * 3.6e3 + m * 60 + s * 1;
  }
  var OGArray = newestFilter;
  var timeArray = [timeVN(new Date().getTime())];
  // For each element in timeArray
  const thisTime = timeArray?.map((time, arr) => {
    let secs = timeToSecs(time);
    let closest = null;
    // Find closest element in OGArray
    OGArray?.reduce((acc, obj, i) => {
      let diff = Math.abs(timeToSecs(obj.time) - secs);
      if (diff < acc) {
        acc = diff;
        closest = obj;
      }
      return acc;
    }, Number.POSITIVE_INFINITY);
    // Display result
    // console.log('Time   : ' + time + '\nClosest: ' + JSON.stringify(closest));
    return closest;
  });
  return thisTime;
};
export default compareTime;

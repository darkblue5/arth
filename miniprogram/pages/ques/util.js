//
//    fundamental function
//    by sean
//

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function rangeRand(lower, limit) {
    var a = 0, ret = 0;

    a = Math.round(Math.random() * (limit - lower));
    ret = a + lower;

    return ret;
}

function max(a, b) {
    if (a > b)
        return a;
    else
        return b;
}

function min(a, b) {
    if (a > b)
        return b;
    else
        return a;
}

module.exports = {
    formatTime : formatTime,
    formatNumber: formatNumber,
    rangeRand: rangeRand,
    max: max,
    min: min,
}

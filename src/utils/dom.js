function getOffsetTop(dom) {
  let top = dom.offsetTop;
  while (dom.offsetParent !== null) {
    top += dom.offsetParent.offsetTop;
    dom = dom.offsetParent;
  }
  return top;
}

function getOffsetLeft(dom) {
  let left = dom.offsetLeft;
  while (dom.offsetParent !== null) {
    left += dom.offsetParent.offsetLeft;
    dom = dom.offsetParent;
  }
  return left;
}

export { getOffsetLeft, getOffsetTop }

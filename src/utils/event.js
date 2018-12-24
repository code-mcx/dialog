let isSupportAddEventListener = !!document.addEventListener;

function on(dom, eventType, callback) {
  if (isSupportAddEventListener) {
    dom.addEventListener(eventType, callback);
  } else {
    dom.attachEvent("on" + eventType, callback);
  }
}

function off(dom, eventType, fun) {
  if (isSupportAddEventListener) {
    dom.removeEventListener(eventType, fun);
  } else {
    dom.detachEvent("on" + eventType, fun);
  }
}

export { on, off }

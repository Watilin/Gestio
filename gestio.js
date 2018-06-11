const GRID_PITCH = 48;

let onDomReady = () => {
  'use strict';

  document.removeEventListener('DOMContentLoaded', onDomReady);

  let $canvas = document.querySelector('canvas');
  let cx = $canvas.getContext('2d');

  let throttleResize = () => {
    let oldW = $canvas.width;
    let oldH = $canvas.height;
    let imageData = cx.getImageData(0, 0, oldW, oldH);

    let w = Math.floor(window.innerWidth  * 0.8);
    let h = Math.floor(window.innerHeight * 0.6);
    $canvas.width  = w;
    $canvas.height = h;

    cx.fillStyle   = '#103038';
    cx.strokeStyle = '#101010';
    cx.lineWidth   = 6;
    cx.lineCap     = 'round';

    cx.putImageData(imageData, (w - oldW) / 2, (h - oldH) / 2);
  };

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(throttleResize, 250);
  });

  throttleResize();

  new Animation({
    layer: $canvas,
    duration: 1000,
    animationFunction: (frac) => {
      let w = $canvas.width;
      let h = $canvas.height;

      let center = {
        x: Math.floor(w / 2),
        y: Math.floor(h / 2)
      };

      cx.fillRect(0, 0, w, h);

      let longestEdge = Math.max(w, h);
      let xOffset = center.x % GRID_PITCH;
      let yOffset = center.y % GRID_PITCH;
      cx.beginPath();
      for (let i = 0; i < longestEdge; i += GRID_PITCH) {
        cx.moveTo(i + xOffset, 0       );
        cx.lineTo(i + xOffset, h * frac);
        cx.moveTo(0       , i + yOffset);
        cx.lineTo(w * frac, i + yOffset);
      }
      cx.stroke();
    }
  }).pushToQueue();

  let mainLoop = (time) => {
    requestAnimationFrame(mainLoop);

    for (let anim of Animation.queue) {
      if (anim.startTime < time) {
        if (-1 === anim.startTime) {
          anim.startTime = time;
        }
        anim.step(time);
        if (anim.startTime + anim.duration < time) {
          anim.removeFromQueue();
        }
      }
    }
  };

  requestAnimationFrame(mainLoop);
};

document.addEventListener('DOMContentLoaded', onDomReady);

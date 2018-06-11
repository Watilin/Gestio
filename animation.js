class Animation {

  constructor( options = {} ) {
    if (options.layer) {
      this.layer = options.layer;
    }
    if (options.startTime) {
      this.startTime = options.startTime;
    }
    if (options.duration) {
      this.duration = options.duration;
    }
    if (options.animationFunction) {
      this.animationFunction = options.animationFunction;
    }
  }

  // properties //////////////////////////////////////////////////////

  // layer             : HTMLCanvasElement
  // startTime         : Number
  // duration          : Number
  // animationFunction : Function

  get layer() {
    return this._layer;
  }

  set layer(layer) {
    if (layer instanceof HTMLCanvasElement) {
      this._layer = layer;
    }
  }

  get startTime() {
    return this._startTime;
  }

  set startTime(startTime) {
    if ('number' === typeof startTime && !Number.isNaN(startTime)) {
      this._startTime = startTime;
    }
  }

  get duration() {
    return this._duration;
  }

  set duration(duration) {
    if ('number' === typeof duration &&
        !Number.isNaN(duration) &&
        duration > 0) {
      this._duration = duration;
    }
  }

  get animationFunction() {
    return this._animationFunction;
  }

  set animationFunction(animationFunction) {
    if ('function' === typeof animationFunction) {
      this._animationFunction = animationFunction;
    }
  }

  // methods /////////////////////////////////////////////////////////

  step(time) {
    let frac = (time - this.startTime) / this.duration;
    if (frac > 1) frac = 1;
    console.log(frac);
    this.animationFunction(frac);
  }

  chain(nextAnim) {
    console.log('chain... TODO');
  }

  pushToQueue() {
    if (!this.startTime) {
      this.startTime = -1;
    }
    Animation.queue.push(this);
    console.log(`queued ${this}`);
  }

  removeFromQueue() {
    Animation.queue.splice(Animation.queue.indexOf(this), 1);
    console.log(`removed ${this}`);
  }

  toString() {
    return `Animation[${this.startTime}---${this.duration}>`;
  }
}

Animation.queue = [];

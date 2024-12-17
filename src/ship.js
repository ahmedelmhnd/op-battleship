class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  set length(value) {
    this._length = value;
  }

  get length() {
    return this._length;
  }

  set hits(value) {
    this._hits = value;
  }

  get hits() {
    return this._hits;
  }

  set sunk(value) {
    this._sunk = value;
  }

  get sunk() {
    return this._sunk;
  }


}

export default Ship;

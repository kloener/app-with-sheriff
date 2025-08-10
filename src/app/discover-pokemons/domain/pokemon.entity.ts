export class Pokemon {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _order: number,
    private readonly _height: number,
    private readonly _weight: number,
    private readonly _frontImgUrl: string,
    private readonly _backImgUrl: string,
    private readonly _shinyImgUrl: string,
  ) {}

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get order() {
    return this._order;
  }
  get height() {
    return this._height;
  }
  get weight() {
    return this._weight;
  }
  get frontImgUrl() {
    return this._frontImgUrl;
  }
  get backImgUrl() {
    return this._backImgUrl;
  }
  get shinyImgUrl() {
    return this._shinyImgUrl;
  }
}

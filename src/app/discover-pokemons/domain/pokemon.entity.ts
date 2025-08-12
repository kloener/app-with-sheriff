class PokemonEntityCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PokemonEntityCreationError';
  }
}
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
  ) {
    if (!_id || _id.length < 1) {
      throw new PokemonEntityCreationError('Invalid ID: ' + _id);
    }
    if (!_name || _name.length < 1) {
      throw new PokemonEntityCreationError(
        'Invalid Name: ' + _name + ' for ' + _name + ' / ' + _id,
      );
    }
    if (_order <= 0 || _order > 1500) {
      throw new PokemonEntityCreationError(
        'Invalid Order: ' + _order + ' for ' + _name + ' / ' + _id,
      );
    }
    if (_height <= 0 || _height > 1000) {
      throw new PokemonEntityCreationError(
        'Invalid Height: ' + _height + ' for ' + _name + ' / ' + _id,
      );
    }
    if (_weight <= 0 || _weight > 9999) {
      throw new PokemonEntityCreationError(
        'Invalid Weight: ' + _weight + ' for ' + _name + ' / ' + _id,
      );
    }
    /**/
    if (!_frontImgUrl || _frontImgUrl.length < 1) {
      throw new PokemonEntityCreationError(
        'Invalid FrontImgUrl: ' + _frontImgUrl + ' for ' + _name + ' / ' + _id,
      );
    }
    /**/
    /**/
    if (!_backImgUrl || _backImgUrl.length < 1) {
      throw new PokemonEntityCreationError(
        'Invalid BackImgUrl: ' + _backImgUrl + ' for ' + _name + ' / ' + _id,
      );
    }
    /**/
    /**/
    if (!_shinyImgUrl || _shinyImgUrl.length < 1) {
      throw new PokemonEntityCreationError(
        'Invalid ShinyImgUrl: ' + _shinyImgUrl + ' for ' + _name + ' / ' + _id,
      );
    }
    /**/
  }

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

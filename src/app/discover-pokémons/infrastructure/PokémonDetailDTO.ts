/**
 * Partial Response DTO from the Pokémon API
 */
export interface PokémonDetailDTO {
  id: number;
  name: string;
  order: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    back_default: string;
    [key: string]: object | string | null;
    other: {
      'official-artwork': {
        front_default: string;
        [key: string]: string | null;
      };
      [groupKey: string]: {
        front_default: string;
        [key: string]: string | null;
      };
    };
  };
  [moreKeys: string]: object | number | string | boolean | null;
}

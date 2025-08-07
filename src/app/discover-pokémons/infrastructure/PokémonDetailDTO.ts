/**
 * Partial Response DTO from the Pokémon API
 */
export interface PokémonDetailDTO {
  id: string;
  name: string;
  order: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    back_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

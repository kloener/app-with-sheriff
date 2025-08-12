/**
 * Partial Response DTO from the Pokemon API
 */
export interface PokemonDetailDTO {
  id: number;
  name: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  order: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    back_default: string;
    [key: string]: object | string | null;
    other: Record<
      string,
      {
        front_default: string;
        back_default?: string;
        [key: string]: string | null | undefined;
      }
    >;
  };
  [moreKeys: string]: object | number | string | boolean | null;
}

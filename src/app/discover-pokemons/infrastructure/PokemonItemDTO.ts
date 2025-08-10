/**
 * DTO for the Pokemon API response of list endpoints.
 * We don't get all details of any Pokemon, just the name and URL.
 * We need to fetch details separately for each pokemon.
 */
export interface PokemonItemDTO {
  name: string;
  url: string;
}

/**
 * DTO for the Pokémon API response of list endpoints.
 * We don't get all details of any Pokémon, just the name and URL.
 * We need to fetch details separately for each pokémon.
 */
export interface PokémonItemDTO {
  name: string;
  url: string;
}

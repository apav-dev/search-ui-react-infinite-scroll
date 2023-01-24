export interface C_abilities {
  isHidden?: boolean;
  slot?: number;
  name?: string;
  uRL?: string;
}

export interface EntityReference {
  entityId: string;
  name: string;
}

export interface C_pokedexDescriptions {
  version?: string;
  description?: string;
}

export interface ImageThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  thumbnails?: ImageThumbnail[];
  alternateText?: string;
}

export interface C_sprites {
  backDefault?: Image;
  backFemale?: Image;
  backShiny?: Image;
  backShinyFemale?: Image;
  frontDefault?: Image;
  frontFemale?: Image;
  frontShiny?: Image;
  frontShinyFemale?: Image;
  officialArtwork?: Image;
}

export interface C_stats {
  baseStat?: number;
  effort?: number;
  name?: string;
  uRL?: string;
}

export interface C_types {
  slot?: number;
  name?: string;
  uRL?: string;
}

export default interface Ce_pokemon {
  name: string;
  c_abilities?: C_abilities[];
  c_baseExperience?: number;
  c_baseHappiness?: number;
  c_captureRate?: number;
  c_cards?: EntityReference[];
  c_formsSwitchable?: boolean;
  c_genderRate?: number;
  c_generation?: string;
  c_genus?: string;
  c_growthRate?: string;
  c_habitat?: string;
  c_hasGenderDifferences?: boolean;
  c_hatchCounter?: number;
  c_height?: number;
  c_isBaby?: boolean;
  c_isLegendary?: boolean;
  c_isMythical?: boolean;
  c_pokedexDescriptions?: C_pokedexDescriptions[];
  c_pokedexNumber?: number;
  c_sprites?: C_sprites;
  c_stats?: C_stats[];
  c_types?: C_types[];
  c_weight?: number;
  id: string;
}

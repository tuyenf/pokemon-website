declare namespace PokemonModule {
  interface Filter {
    type: number | null
  }

  interface Sort {
    key: string,
    order?: string
  }
  interface PokemonsResponse {
    data:    Pokemon[];
    links:   Links;
    meta:    Meta;
    status:  number;
    success: boolean;
  }

  interface Pokemon {
    id:         string;
    number:     number;
    name:       string;
    type_1:     number;
    type_2:     number | null;
    total:      number;
    hp:         number;
    attack:     number;
    defense:    number;
    sp_atk:     number;
    sp_def:     number;
    speed:      number;
    generation: number;
    legendary:  number;
    created_at: Date;
    updated_at: Date;
  }

   interface Links {
    first: string;
    last:  string;
    prev:  null;
    next:  string;
  }

   interface Meta {
    per_page:     number;
    current_page: number;
    from?:         number;
    to?:           number;
    total?:        number;
    last_page?:    number;
    path?:         string;
  }

  interface Type {
    id: number;
    name: string;
  }
}
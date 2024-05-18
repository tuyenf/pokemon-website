import { PokemonModule } from '@/@types/pokemon';
interface PokemonStoreState {
    pokemons: Array<PokemonModule.Pokemon>;
    isLoading: boolean;
    isLoadingDetailModal: boolean;
    pagination: PokemonModule.Meta;
    types: PokemonModule.Type[];
    detail: PokemonModule.Pokemon | null;
    avatar: string | null;
}
interface PokemonStoreAction {
    getPokemons(filter: PokemonModule.Filter, sort: PokemonModule.Sort, pagination: PokemonModule.Meta): Promise<void>;
    getTypes(): Promise<void>;
    getPokemonDetail(id: string): Promise<void>;
    getPokemonAvatar(id: string): Promise<void>;
}
export interface PokemonStore extends PokemonStoreState, PokemonStoreAction {
}
export declare const usePokemonStore: import("pinia").StoreDefinition<"pokemon", PokemonStoreState, {}, {
    getTypes(): Promise<void>;
    getPokemons(filter: PokemonModule.Filter, sort: PokemonModule.Sort, pagination: PokemonModule.Meta): Promise<void>;
    getPokemonDetail(id: string): Promise<void>;
    getPokemonAvatar(id: string): Promise<void>;
}>;
export {};

import { defineStore } from 'pinia'
import { ApiService } from '@/plugins/ApiService'
import { Constant } from '@/plugins/Constant'
// @ts-ignore
import { PokemonModule } from '@/@types/pokemon'
interface PokemonStoreState {
    pokemons: Array<PokemonModule.Pokemon>
    isLoading: boolean
    isLoadingDetailModal: boolean
    pagination: PokemonModule.Meta,
    types: PokemonModule.Type[],
    detail: PokemonModule.Pokemon | null,
    avatar: string | null
}

interface PokemonStoreAction {
    getPokemons(
        filter: PokemonModule.Filter,
        sort: PokemonModule.Sort,
        pagination: PokemonModule.Meta
    ): Promise<void>,
    getTypes(): Promise<void>,
    getPokemonDetail(id: string): Promise<void>
    getPokemonAvatar(id: string): Promise<void>
}

export interface PokemonStore extends PokemonStoreState, PokemonStoreAction {}

export const usePokemonStore = defineStore('pokemon', {
    state(): PokemonStoreState {
        return {
            pokemons: [],
            isLoading: false,
            isLoadingDetailModal: false,
            pagination: {
                per_page: 10,
                current_page: 1,
                last_page: 0
            },
            types: [],
            detail: null,
            avatar: null
        }
    },
    actions: {
        async getTypes(): Promise<void> {
            try {
                const response: any = await ApiService.instance().axios.get(Constant.POKEMON_TYPES)
                this.types = response.data
            } catch (e) {
                console.log(e)
            }
        },
        async getPokemons(
            filter: PokemonModule.Filter,
            sort: PokemonModule.Sort,
            pagination: PokemonModule.Meta
        ): Promise<void> {
            try {
                if (this.isLoading) return
                this.isLoading = true
                const response: PokemonModule.PokemonsResponse = await ApiService.instance().axios.get(
                    Constant.POKEMON_LIST +
                    (!filter.type
                        ? `?page[number]=${pagination.current_page}&page[size]=${pagination.per_page}&sort=${sort.key}`
                        : `?page[number]=${pagination.current_page}&page[size]=${pagination.per_page}&sort=${sort.key}&filter[type]=${filter.type}`)
                )

                this.pokemons = response.data
                this.pagination = response.meta
            } catch (e) {
                console.log(e)
            } finally {
                this.isLoading = false
            }
        },
        async getPokemonDetail(id: string): Promise<void> {
            try {
                if (this.isLoadingDetailModal) return
                this.isLoadingDetailModal = true
                const response: any = await ApiService.instance().axios.get(Constant.POKEMON_DETAIL + '/' + id)
                this.detail = response.data
            } catch (e) {
                console.log(e)
            } finally {
                this.isLoadingDetailModal = false
            }
        }
        ,
        async getPokemonAvatar(id: string): Promise<void> {
            this.avatar = import.meta.env.VITE_BASE_URL +  Constant.POKEMON_DETAIL + '/' + id + '/sprite'
        }
        ,
    }
})

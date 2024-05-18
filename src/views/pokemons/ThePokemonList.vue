<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { PokemonStore, usePokemonStore } from '@/stores/pokemon'
import TheNoData from '@components/TheNoData.vue'
import ThePokemonItem from '@/views/pokemons/ThePokemonItem.vue'
import ThePagination from '@/components/ThePagination.vue'
import TheLoading from '@/components/TheLoading.vue'
import TheFilter from '@/views/pokemons/TheFilter.vue'
import TheDetailModal from "@/views/pokemons/TheDetailModal.vue";
import {PokemonModule} from "@/@types/pokemon";

const pokemonStore: PokemonStore = usePokemonStore()

const isShowDetailModal = ref<boolean>(false)
const idPokemon = ref<string>('')
const filter = ref<PokemonModule.Filter>({
  type: null
})

const sort = ref<PokemonModule.Sort>({
  key: 'name',
})
const pagination = ref<PokemonModule.Meta>({
  current_page: 1,
  per_page: 10
})

/*
 * Hooks*/
onMounted(async () => {
  await pokemonStore.getTypes()
  await pokemonStore.getPokemons(filter.value, sort.value, pagination.value)
})

async function updatePagination(val: number) {
  pagination.value.current_page = val
  await pokemonStore.getPokemons(filter.value, sort.value, pagination.value)
}

async function handleFilter(val: number | null) {
  filter.value.type = val
  pagination.value.current_page = 1
  await pokemonStore.getPokemons(filter.value, sort.value, pagination.value)
}

async function handleSort(val: string) {
  sort.value.key = val
  await pokemonStore.getPokemons(filter.value, sort.value, pagination.value)
}

function showPokemonDetailModal (id: string) {
  if (!id) return
  idPokemon.value = id
  isShowDetailModal.value = true
}
</script>

<template>
  <div class="container">
    <the-filter @selected-type="handleFilter" @selected-sort="handleSort"></the-filter>
    <div class="table-block">
      <div class="table-row table-head">
        <div class="table-col">Number</div>
        <div class="table-col">Name</div>
        <div class="table-col">Total</div>
        <div class="table-col">Hp</div>
        <div class="table-col">Attact</div>
        <div class="table-col">Defense</div>
        <div class="table-col">sp_atk</div>
        <div class="table-col">sp_def</div>
        <div class="table-col">Speed</div>
        <div class="table-col">Types</div>
      </div>
      <div class="table-content">
        <the-loading v-if="pokemonStore.isLoading"></the-loading>
        <the-no-data v-else-if="!pokemonStore.isLoading && !pokemonStore.pokemons"></the-no-data>
        <template v-else>
          <the-pokemon-item
            v-for="pokemon in pokemonStore.pokemons"
            :key="pokemon.id"
            :data="pokemon"
            @click="showPokemonDetailModal(pokemon.id)"
          >
          </the-pokemon-item>
          <the-detail-modal :id="idPokemon" :isShow="isShowDetailModal" v-if="isShowDetailModal" @close="(val) => isShowDetailModal = val"></the-detail-modal>
        </template>
      </div>
    </div>
    <the-pagination
      v-if="!pokemonStore.isLoading && pokemonStore.pagination && pokemonStore.pokemons.length"
      :data="pokemonStore.pagination"
      @pageChange="updatePagination"
    ></the-pagination>
  </div>
</template>

<style scoped></style>

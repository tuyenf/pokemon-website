<script lang="ts" setup>
import type { PokemonModule } from '@/@types/pokemon'
import {PokemonStore, usePokemonStore} from "@/stores/pokemon";
import TheModal from "@/views/pokemons/TheDetailModal.vue";
import {ref} from "vue";

const pokemonStore: PokemonStore = usePokemonStore()
interface IProps {
  data: PokemonModule.Pokemon,
}

const props = defineProps<IProps>()

function getTypeName (type: number | null): string {
  if (type === null) return ''
  const targetTypes = [...pokemonStore.types]?.filter((t: PokemonModule.Type) => t.id === type)
  if (!targetTypes?.length) return `${type}`
  return targetTypes[0].name
}
</script>

<template>
  <div v-if="props.data" class="table-row">
    <div class="table-col">{{ props.data.number }}</div>
    <div class="table-col">{{ props.data.name }}</div>
    <div class="table-col">{{ props.data.total }}</div>
    <div class="table-col">{{ props.data.hp }}</div>
    <div class="table-col">{{ props.data.attack }}</div>
    <div class="table-col">{{ props.data.defense }}</div>
    <div class="table-col">{{ props.data.sp_atk }}</div>
    <div class="table-col">{{ props.data.sp_def }}</div>
    <div class="table-col">{{ props.data.speed }}</div>
    <div class="table-col">{{ getTypeName(props.data?.type_1) }}{{ getTypeName(props.data?.type_1) && getTypeName(props.data?.type_2) ? ', ' : ''}}{{getTypeName(props.data?.type_2)}}</div>
  </div>

</template>

<style scoped></style>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'
import { PokemonStore, usePokemonStore } from '@/stores/pokemon'
import TheLoading from '@/components/TheLoading.vue'
import TheNoData from '@/components/TheNoData.vue'
import axios from "axios";
import {PokemonModule} from "@/@types/pokemon";

interface IProps {
  isShow: boolean
  id: string
}

interface IEmits {
  (e: 'close', value: boolean): void
}

const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()

const pokemonStore: PokemonStore = usePokemonStore()

onMounted(async () => {
  await pokemonStore.getPokemonAvatar(props.id)
  await pokemonStore.getPokemonDetail(props.id)
})

function closeModal () {
  emits('close', false)
}
function getTypeName (type: number | null): string {
  if (type === null) return ''
  const targetTypes = [...pokemonStore.types]?.filter((t: PokemonModule.Type) => t.id === type)
  if (!targetTypes?.length) return `${type}`
  return targetTypes[0].name
}

</script>

<template>
  <div class="modal">
    <div class="overlay"></div>
    <div class="modal-content" v-if="pokemonStore">
      <the-loading v-if="pokemonStore.isLoadingDetailModal"></the-loading>
      <the-no-data
        v-else-if="!pokemonStore.isLoadingDetailModal && !pokemonStore?.detail"
      ></the-no-data>
      <div v-else class="card-content">
        <div class="card-header">
          <div class="card-name">{{ pokemonStore?.detail?.name }}</div>
          <span @click="closeModal" class="ionicon ionicon-close-outline modal-close-button"></span>
        </div>
        <img :src="pokemonStore?.avatar || ''" :alt="pokemonStore?.detail?.name" class="card-image"/>
        <div class="card-body">
          <div class="card-type">
            <span v-if="pokemonStore?.detail?.type_1 || pokemonStore?.detail?.type_1 === 0" class="card-type-item">{{ getTypeName(pokemonStore?.detail?.type_1) }}</span>
            <span v-if="pokemonStore?.detail?.type_2 || pokemonStore?.detail?.type_2 === 0" class="card-type-item">{{ getTypeName(pokemonStore?.detail?.type_2) }}</span>
          </div>
          <div class="card-feature">
            <div class="card-feature-item">
              <span>Generation</span>
              {{ pokemonStore?.detail?.generation }}
            </div>
            <div class="card-feature-item">
              <span>Speed</span>
              {{ pokemonStore?.detail?.speed }}
            </div>
            <div class="card-feature-item">
              <span>Defense</span>
              {{ pokemonStore?.detail?.defense }}
            </div>
            <div class="card-feature-item">
              <span>HP</span>
              {{ pokemonStore?.detail?.hp }}
            </div>
            <div class="card-feature-item">
              <span>Attack</span>
              {{ pokemonStore?.detail?.attack }}
            </div>
            <div class="card-feature-item">
              <span>Legendary</span>
              {{ pokemonStore?.detail?.legendary }}
            </div>
            <div class="card-feature-item">
              <span>SP_ATK</span>
              {{ pokemonStore?.detail?.sp_atk }}
            </div>
            <div class="card-feature-item">
              <span>SP_DEF</span>
              {{ pokemonStore?.detail?.sp_def }}
            </div>
            <div class="card-feature-item">
              <span>Total</span>
              {{ pokemonStore?.detail?.total }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.modal {
  overflow: hidden;
  position: fixed;
  inset: 0;
  &-content {
    width: 350px;
    height: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFFFFF;
    border: 1px solid #FFFFFF;
    border-radius: 5px;
    padding: 10px;
  }
  &-close-button {
    font-size: 24px;
    cursor: pointer;
  }
}

image {
  width: 200px;
  height: 200px;
}
.card {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-name {
    font-weight: 600;
    font-size: 20px;
  }
  &-image {
    width: 200px;
    aspect-ratio: 1;
    margin: 0 auto;
  }
  &-content {
    width: 100%;
    height: 100%;
    background-color: #70BF50;
    border-radius: inherit;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &-body {
    padding: 10px;
    background-color: var(--color-text);
    height: 50%;
    border-radius: inherit;
    display: flex;
    flex-direction: column;
  }
  &-type {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    &-item {
      font-size: 12px;
      border-radius: 20px;
      padding: 3px 15px;
      &:first-child {
        background-color: #70BF50;
      }
      &:last-child {
        background-color: #A43E9E;
      }
      & + .card-type-item {
        margin-left: 10px;
      }
    }
  }
  &-feature {
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 20px;
    gap: 10px;
    &-item {
      color: var(--color-background);
      font-size: 12px;
      span {
        display: block;
        font-weight: 600;
      }
    }
  }
}
</style>

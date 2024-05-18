<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import {PokemonStore, usePokemonStore} from "@/stores/pokemon";
import {SortType} from "@/plugins/Constant";
import TheNoData from "@/components/TheNoData.vue";
import {PokemonModule} from "@/@types/pokemon";

const pokemonStore: PokemonStore = usePokemonStore()

const isActive = ref<boolean>(false)
const isShowSortOption = ref<boolean>(false)
const dropdownButton = ref<HTMLElement | null>(null)
const sortBlock = ref<HTMLElement | null>(null)
const selectedType = ref<PokemonModule.Type | null>(null)
const selectedSort = ref<PokemonModule.Sort>({
  key: 'number',
  order: 'asc'
})

const selectedSortTemporary = ref<PokemonModule.Sort>({
  key: 'number',
  order: 'asc'
})

interface IEmit {
  (e: 'selectedType', value: number | null): void
  (e: 'selectedSort', value: string): void
}

const emits = defineEmits<IEmit>()
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (dropdownButton.value && !dropdownButton.value?.contains(e.target as Node)) {
      isActive.value = false
    }
  })
  document.addEventListener('click', (e) => {
    if (sortBlock.value && !sortBlock.value?.contains(e.target as Node)) {
      isShowSortOption.value = false
      selectedSort.value = { ...selectedSortTemporary.value }
    }
  })
})

function resetFilter () {
  selectedType.value = null
  emits('selectedType', null)
}

function chooseFilterType (type: PokemonModule.Type) {
  selectedType.value = type
  emits('selectedType', selectedType.value.id)
}

function handleSort () {
  if (selectedSort.value.order !== 'asc') emits('selectedSort', `-${selectedSort.value.key}`)
  else emits('selectedSort', selectedSort.value.key)
  isShowSortOption.value = false
  selectedSortTemporary.value = { ...selectedSort.value }
}

watch(selectedType, (newVal) => {
  if (newVal) {

  }
})

watch(selectedSort, (newVal) => {
  if (newVal && !selectedSortTemporary.value) {
    selectedSortTemporary.value = { ...newVal }
  }
}, {immediate: true, deep: true})
</script>

<template>
  <div class="filter">
    <div class="filter-block">
      <div class="filter-list">
        <div class="dropdown">
          <div ref="dropdownButton" class="dropdown-button" @click="isActive = !isActive">
            {{ selectedType?.name || 'Choose Type' }}
            <span v-if="!isActive" class="ionicon ionicon-chevron-down-outline"></span>
            <span v-else class="ionicon ionicon-chevron-up-outline"></span>
          </div>
          <div v-if="isActive" class="dropdown-content scrollbar">
            <template v-if="pokemonStore.types.length">
              <div @click="chooseFilterType(type)"
                   v-for="type in pokemonStore.types"
                   :key="type.id"
                   class="dropdown-item"
                   :class="{isActive: selectedType?.id === type.id}"
              >
                {{  type.name }}
              </div>
            </template>
            <the-no-data v-else></the-no-data>
          </div>
        </div>
      </div>
      <div @click="resetFilter" class="filter-reset-button">
        <span class="ionicon ionicon-refresh-outline"></span>
        Reset Filters
      </div>
    </div>
    <div ref="sortBlock" class="sort-block">
      <span @click="isShowSortOption = !isShowSortOption" class="ionicon ionicon-settings-outline sort-icon"></span>
      <div v-if="isShowSortOption" class="sort-option">
        <div class="sort-key">
          <span class="sort-label">Choose value: </span>
          <div class="sort-value">
            <label :for="`${i.key}`" v-for="i in SortType" :key="i.key" class="sort-item" >
              <input v-model="selectedSort.key" :value="i.key" type="radio" name="sort-value" :id="`${i.key}`"/>
              <span>{{ i.name }}</span>
            </label>
          </div>
        </div>
        <div class="sort-key">
          <span class="sort-label">Choose option: </span>
          <div class="sort-value">
            <label for="sort-asc" class="sort-item" >
              <input v-model="selectedSort.order" value="asc" type="radio" name="sort-option" id="sort-asc"/>
              <span>ASC</span>
            </label>
            <label for="sort-desc" class="sort-item" >
              <input v-model="selectedSort.order" value="desc" type="radio" name="sort-option" id="sort-desc"/>
              <span>DESC</span>
            </label>
          </div>
        </div>
        <button class="sort-button" @click.prevent="handleSort">Sort</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filter {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  &-block {
    margin-bottom: 40px;
    display: flex;
    align-items: stretch;
  }
  &-list {
    margin-right: 20px;
  }
  &-reset-button {
    width: fit-content;
    height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 16px;
    border-radius: 6px;
    border: 1px solid transparent;
    transition: all 0.15s ease;
    &:hover {
      border-color: var(--color-highlight);
    }
    span {
      font-size: 22px;
      display: inline-block;
      margin-right: 4px;
    }
  }
}

.dropdown {
  width: 218px;
  position: relative;
  &-button {
    width: inherit;
    height: 40px;
    border-radius: 6px;
    background-color: #3c3e52;
    border: 1px solid var(--color-highlight);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    cursor: pointer;
    span {
      font-size: 16px;
    }
  }
  &-content {
    width: inherit;
    max-height: 280px;
    min-height: 100px;
    overflow-y: auto;
    position: absolute;
    background-color: #3c3e52;
    border: 1px solid var(--color-highlight);
    border-radius: 6px;
    top: 43px;
    z-index: 999;
  }
  &-item {
    height: 40px;
    padding: 12px;
    cursor: pointer;
    &.isActive {
      user-select: none;
      pointer-events: none;
      background-color: var(--color-highlight);
    }
    &:hover {
      background-color: var(--color-highlight);
    }
  }
}

.sort {
  &-block {
    position: relative;
  }
  &-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border-radius: 6px;
    border: 1px solid var(--color-highlight);
    cursor: pointer;
    transition: all 0.15s ease;
    &:hover {
      background-color: var(--color-highlight);
    }
  }
  &-key {
    width: 100%;
    & + .sort-key {
      margin-top: 10px;
    }
  }
  &-option {
    width: 400px;
    position: absolute;
    border-radius: 6px;
    border: 1px solid var(--color-highlight);
    background-color: #3c3e52;
    right: 0;
    top: 43px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    z-index: 99;
    span {
      display: block;
    }
  }
  &-value {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  &-label {
    font-weight: 600;
    padding: 8px;
  }
  &-item {
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    input {
      margin-right: 10px;
    }
  }
  &-button {
    background-color: var(--color-secondary);
    border: 1px solid var(--color-secondary);
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    border-radius: 6px;
    color: var(--color-text);
    cursor: pointer;
    font-weight: 500;
    transition: opacity 0.15s ease;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>

<script lang="ts" setup>
import { PokemonModule } from '@/@types/pokemon'
import { watch } from 'vue'
import { ref } from 'vue'
interface IProps {
  data: PokemonModule.Meta
}

interface IEmits {
  (e: 'pageChange', value: number): void
}

const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()

const pagination = ref<PokemonModule.Meta>(props.data)
const currentPage = ref<number>(1)

function changePage(page?: number) {
  if (!page) page =1
  currentPage.value = page
  emits('pageChange', page)
}

watch(
  () => props.data,
  (newVal) => {
    if (!newVal) return
    pagination.value = { ...newVal }
    currentPage.value = newVal.current_page || 1
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <div class="pagination">
    <span @click="changePage(currentPage - 1)"
          class="ionicon ionicon-chevron-back-outline pagination-arrow pagination-button"
          :class="{disabled: currentPage === 1 }"
    ></span>
    <template v-if="pagination.last_page && pagination?.last_page <= 5">
      <span
        v-for="i in pagination?.last_page"
        :key="i"
        class="pagination-button"
        :class="{ isActive: currentPage === i }"
        @click="changePage(i)"
        >{{ i }}</span
      >
    </template>
    <template v-else>
      <template v-if="currentPage < 4">
        <span
          v-for="i in 4"
          :key="i"
          class="pagination-button"
          :class="{ isActive: currentPage === i }"
          @click="changePage(i)"
          >{{ i }}</span
        >
        <span class="pagination-button">...</span>
        <span
            class="pagination-button"
            :class="{ isActive: currentPage === pagination?.last_page }"
            @click="changePage(pagination?.last_page)"
        >{{ pagination?.last_page }}</span
        >
      </template>
      <template v-else-if="pagination.last_page && currentPage > pagination?.last_page - 3">
        <span class="pagination-button" @click="changePage(1)">1</span>
        <span class="pagination-button">...</span>
        <span
          class="pagination-button"
          :class="{ isActive: currentPage === pagination?.last_page - 3 }"
          @click="changePage(pagination?.last_page - 3)"
          >{{ pagination?.last_page - 3 }}</span
        >
        <span
          class="pagination-button"
          :class="{ isActive: currentPage === pagination?.last_page - 2 }"
          @click="changePage(pagination?.last_page - 2)"
          >{{ pagination?.last_page - 2 }}</span
        >
        <span
          class="pagination-button"
          :class="{ isActive: currentPage === pagination?.last_page - 1 }"
          @click="changePage(pagination?.last_page - 1)"
          >{{ pagination?.last_page - 1 }}</span
        >
        <span
          class="pagination-button"
          :class="{ isActive: currentPage === pagination?.last_page }"
          @click="changePage(pagination?.last_page)"
          >{{ pagination?.last_page }}</span
        >
      </template>
      <template v-else>
        <span class="pagination-button" @click="changePage(1)">1</span>
        <span class="pagination-button">...</span>
        <span class="pagination-button isActive">{{ currentPage }}</span>
        <span class="pagination-button" @click="changePage(currentPage + 1)">{{
          currentPage + 1
        }}</span>
        <span class="pagination-button">...</span>
        <span
          class="pagination-button"
          :class="{ isActive: currentPage === pagination?.last_page }"
          @click="changePage(pagination?.last_page)"
          >{{ pagination?.last_page }}</span
        >
      </template>
    </template>
    <span @click="changePage(currentPage + 1)"
          class="ionicon ionicon-chevron-forward-outline pagination-arrow pagination-button"
          :class="{disabled: currentPage === pagination?.last_page }"
    ></span>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  &-arrow {
    font-size: 18px;
  }
  &-button {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 4px;
    transition: all 0.15s ease;
    &:hover {
      background-color: #32343e;
    }
    &:not(.pagination-arrow).isActive {
      background-color: var(--color-secondary);
    }
    &.disabled {
      user-select: none;
      pointer-events: none;
      opacity: 0.5;
    }
  }
}
</style>

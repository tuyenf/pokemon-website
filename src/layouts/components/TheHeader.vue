<script lang="ts" setup>

</script>

<template>
  <header>
    <div class="tab">
      <router-link to="pokemons" class="tab-item">Pokemon List</router-link>
    </div>
  </header>
</template>


<style scoped lang="scss">
header {
  height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid var(--color-highlight);
}
.tab {
  display: flex;
  align-items: stretch;
  height: 100%;
  &-item {
    min-width: 220px;
    font-size: 20px;
    font-weight: bold;
    color: var(--color-text);
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    &.router-link-active {
      position: relative;
      &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 2px;
        background-color: #798BD1;
        left: 0;
        bottom: -2px;
      }
    }
  }
}
</style>
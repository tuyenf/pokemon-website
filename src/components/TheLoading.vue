<script lang="ts" setup>

</script>

<template>
  <div class="loader-block">
    <span class="loader"></span>
  </div>
</template>

<style scoped lang="scss">
.loader {
  width: 30px;
  height: 30px;
  display: inline-block;
  border: 3px solid var(--color-secondary);
  border-bottom-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  &-block {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<template>
  <div class="all" ondragstart="return false">
    <router-view/>
  </div>
</template>

<style lang="scss">
  .all{
    user-select: none;
  }
  @import '@/assets/all';
</style>

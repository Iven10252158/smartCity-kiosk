<template>
  <div class="all" draggable="false">
    <router-view/>
  </div>
</template>

<style lang="scss">
  .all{
    user-select: none;
  }
  @import '@/assets/all';
</style>

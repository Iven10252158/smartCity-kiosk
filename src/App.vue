<template>
  <div class="all" ondragstart="return false">
    <router-view/>
  </div>
</template>

<script>

</script>

<style lang="scss">
    @import '@/assets/all';
  .all{
    user-select: none;
  }
</style>

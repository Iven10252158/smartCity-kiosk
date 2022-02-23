<template>
  <div class="home">

  </div>
</template>

<script>
export default {
  methods: {
    templateAPI () {
      this.$router.push({ path: 'content', query: { uuid: 'c5898923-dee3-459f-9a36-0ef06c268903' } })
    }
  },
  mounted () {
    this.templateAPI()
  }
}
</script>

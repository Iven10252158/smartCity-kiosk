<template>
    <div class="oexpo-wrap">
        <div class="oexpo-content">
            <div class="mask">
                <div class="oexpo">
                    <iframe sandbox="allow-scripts allow-same-origin allow-presentation" :src="src" frameborder="0"></iframe>
                </div>
                <div class="cover-bottom"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      stores: [],
      src: ''
    }
  },

  methods: {
    showDetail () {
      this.stores.filter(item => {
        if (item.uuid === this.$route.query.merchantsUUID) {
          this.src = item.OEXPOURL
          // console.log(this.src)
        }
      })
    }
  },
  mounted () {
    this.stores = this.$store.getters['storesData/storesData']
    this.showDetail()
  }
}
</script>

<style lang="scss" scoped>
.oexpo-wrap{
    display: flex;
    height: 62.5vh;
    position: relative;
}
.oexpo-content{
    background-color: #213341;
    flex: 1;

    iframe {
        width: 100%;
        height: 40vh;
    }
    .mask {
        width: 100%;
        position: absolute;
        z-index:1;
    }
    .dontTouch-top {
        position: absolute;
        top: 0;
        z-index: 2;
        width: 100%;
        height: 10%;
        // opacity: 0;
    }
    .cover-bottom{
        position: absolute;
        bottom: 0;
        background-color: #213341; //#1F303D;
        height: 8%;
        width: 100%;
        z-index: 2;
        @media(max-width:1080px) {
          height: 15%;
        }
    }
}
</style>

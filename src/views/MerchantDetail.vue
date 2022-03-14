<template>
    <div class="merchantDetail-wrap">
        <div class="merchantDetail-content">
            <div class="merchantDetail-left">
              <SideMenu />
            </div>
            <div class="merchantDetail-right bg-info text-white">
                <div class="container">
                  <div class="shop-information mt-5" v-for="store in showDetail" :key="store.uuid">
                    <p>店家名稱： {{ store.name }} </p>
                    <p>店家電話： {{ store.telephone }} </p>
                    <p>店家地址： {{ store.address }} </p>
                    <img class="qr-code my-3"  v-if="store.qrcode" :src="store.qrcode" alt="">
                    <!-- <router-link :id="store.name" v-if="store.qrcode" class="oexpo-btn btn rounded-pill text-dark my-3 d-block"
                    :to="{path : '/content/merchantOexpo' ,
                      query: {
                      uuid: `${$route.query.uuid}`,
                      merchantsUUID: `${store.uuid}`
                      }}">
                      進入店家攤位
                  </router-link> -->
                  <div v-if="!store.qrcode" class="text-white increase">
                    目前尚無新增店家攤位哦!
                  </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue'

export default {
  components: {
    SideMenu
  },
  data () {
    return {
      stores: [],
      merchantsValue: ''
    }
  },
  computed: {
    showDetail () {
      return this.stores.filter(item => {
        if (item.uuid === this.$route.query.merchantsUUID) {
          // console.log(this.merchantsValue)
          // console.log(item.region)
          return item
        }
      })
    },
    getMerchantValue () {
      return this.$store.getters['storesData/merchantValue']
    }
  },
  mounted () {
    console.log(this.$route)
    this.stores = this.$store.getters['storesData/storesData']
  }
}
</script>

<style lang="scss" scoped>
.merchantDetail-wrap{
    height: 62.5vh;
    // position: relative;
}
.merchantDetail-content{

    .merchantDetail-left{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        // width: 100%;
    }

    .merchantDetail-right{
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 76.4%;
        .shop-information{
          font-size: 48px;
        }
        .qr-code{
          width: 618px;
          height: 618px;
        }
        .oexpo-btn{
          background: linear-gradient(180deg, #86D4FA 0%, #52A1D9 51.56%, #86D4FA 100%);
          width: 526px;
          height: 115px;
          padding-top: 1.2rem;
          font-size: 48px;
        }
      @media(max-width:1080px) {
        .shop-information{
          font-size: 36px;
        }
        .qr-code{
          width: 518px;
          height: 518px;
        }
        .oexpo-btn{
          padding-top: 2rem;
          font-size: 36px;
        }
      }
    }
}
</style>

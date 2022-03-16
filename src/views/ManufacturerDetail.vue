<template>
    <div class="merchantDetail-wrap">
        <div class="merchantDetail-content">
            <div class="merchantDetail-left">
              <SideMenu />
            </div>
            <div class="merchantDetail-right bg-info text-white">
                <div class="container">
                  <div class="manufacturer-information mt-5" v-for="manufacturer in manufacturers" :key="manufacturer.uuid">
                    <p>廠商名稱： {{ manufacturer.name }} </p>
                    <p>請掃描QR CODE 進入網頁</p>
                    <img class="qr-code my-3"  v-if="manufacturer.qrcode" :src="manufacturer.qrcode" alt="">
                    <button :id="manufacturer.name" v-if="manufacturer.qrcode && manufacturer.OEXPOURL.includes('oexpo')" class="oexpo-btn rounded-pill text-white my-3 pt-0" @click="oexpoBtn(manufacturer)">
                      進入店家攤位
                  </button>
                  <div v-if="!manufacturer.qrcode" class="text-white increase">
                    目前尚無新增廠商攤位哦!
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
    manufacturers () {
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
  methods: {
    oexpoBtn (manufacturer) {
      this.$router.push({
        path: '/content/manufacturerOexpo',
        query: {
          uuid: `${this.$route.query.uuid}`,
          district: `${manufacturer.region}`,
          merchantsUUID: `${manufacturer.uuid}`
        }
      })
    }
  },
  mounted () {
    // console.log(this.$route)
    this.stores = this.$store.getters['storesData/storesData']
  }
}
</script>

<style lang="scss" scoped>
.merchantDetail-wrap{
    height: 62.5vh;
}
.merchantDetail-content{

    .merchantDetail-left{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .merchantDetail-right{
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 76.4%;
        .manufacturer-information{
          font-size: 48px;
        }
        .qr-code{
          width: 518px;
          height: 518px;
        }
        .oexpo-btn{
          background: linear-gradient(180deg, #69DCEC 0%, #019FA9 51.56%, #69DCEC 100%);
          width: 526px;
          height: 115px;
          padding-top: 1.2rem;
          font-size: 48px;
        }
      @media(max-width:1080px) {
        .manufacturer-information{
          font-size: 36px;
        }
        .qr-code{
          width: 418px;
          height: 418px;
        }
        .oexpo-btn{
          padding-top: 2rem;
          font-size: 36px;
        }
      }
    }
}
</style>

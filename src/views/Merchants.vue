<template>
    <div class="bottom">
      <SideMenu />
      <div class="bottom-content">
        <div class="container">
          <div class="pagination-bar bg-info container">
            <div class="pagination-num d-flex justify-content-between">
              <div class="text-secondary mb-0">
                  <h4 class="mb-0">
                    <i class="fas fa-chevron-left"></i>
                  </h4>
              </div>
              <h4 class="text-white mb-0" v-for="page in paginations.total_page" :key="page.offset"
              @click="getAllShops(page)">
                  {{ page }}
              </h4>
              <div class="text-secondary mb-0">
                  <h4 class="mb-0">
                    <i class="fas fa-chevron-right"></i>
                  </h4>
              </div>
          </div>
          </div>
            <div>
                <h2>{{ TypeValue }}</h2>
            </div>
          <!-- <div class="row">
            <div class="col-sm-4 d-flex justify-content-center" v-for="store in filterMerchants" :key="store.uuid">
              <router-link :to="{ path: '/merchantDetail', query: { district: store.region, shop: store.uuid }}"
              class="store-btn text-center w-100 my-2 py-4 px-4 rounded-0 border-0 text-decoration-none">{{ store.name }}</router-link>
            </div>
          </div> -->
          </div>
        </div>
      </div>
    <!-- <router-view /> -->
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
      typeValue: '',
      paginations: []
    }
  },
  computed: {
    // filterMerchants () {
    //   return this.stores.filter((item) => {
    //     if (item.type.match(this.typeBtn) && item.region.match(this.getMerchantValue)) {
    //       return item.type !== ''
    //     }
    //   })
    // },
    getMerchantValue () {
      return this.$store.getters['storesData/merchantValue']
    },
    TypeValue () {
      console.log(this.$store.getters['storesData/typeValue'])
      return this.$store.getters['storesData/typeValue']
    }
  },
  methods: {
    getAllShops () {
      this.$store.dispatch('storesData/getAllShops').then(res => {
        console.log(res)
        this.paginations = res[0]
        this.stores = res
      })
    }
  },
  mounted () {
    this.$store.dispatch('storesData/getCategories').then(res => {
      this.types = res.type
      console.log(res)
    })
    this.getAllShops()
  }
}
</script>

<style lang="scss" scoped>
.bottom{
  position: relative;
  height: 62.5vh;
  background-color: #003539;

  .bottom-content{
    position: absolute;
    top: 2%;
    left: 23.6%;
    width: 76.3%;
      .pagination-bar{
        height: 4vh;
        .pagination-num{
          padding-top: 4rem;
          @media (max-width:1080px) {
            padding-top: 1.5rem;
          }

          h4 {
            font-size: 36.8px;
            @media(max-width: 1080px) {
              font-size: 26px;
            }
          }
        }
      }
  }

  .store-btn{
    background-color: #016A72;
    color: #D6FBFF;
    font-size: 56px;
    @media(max-width:1080px) {
      font-size: 32px;
    }
  }
}
</style>

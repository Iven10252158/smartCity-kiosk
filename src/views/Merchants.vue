<template>
    <div class="bottom">
      <SideMenu />
      <div class="bottom-content">
        <div class="container">
            <div class="bottom-content-top">
                <div class="pagination-bar bg-info container">
                    <div>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination pagination-num d-flex justify-content-between">
                                <li class="page-item w-25 text-center pointer"
                                :class="{'disabled': paginations.page === 1}">
                                    <a class="page-link"
                                    href="#" aria-label="Previous" @click="prePage(paginations.page)">
                                    <i class="fas fa-chevron-left"></i>
                                    </a>
                                </li>
                                <li class="page-item" v-for="page in paginations.total_page" :key="page.offset"
                                :class="{'active':paginations.page === page}">
                                    <a class="page-link page-num"
                                    @click="getAllShops(page)"
                                    href="#">{{ page }}</a>
                                </li>
                                <li class="page-item w-25 text-center pointer" :class="{'disabled': paginations.page === paginations.total_page}">
                                    <a class="page-link" @click="nextPage(paginations.page)" href="#" aria-label="Next">
                                    <i class="fas fa-chevron-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4 d-flex justify-content-center" v-for="store in filterMerchants" :key="store.uuid">
                <router-link :to="{ path: '/content/merchantDetail', query: {
                    uuid: `${$route.query.uuid}`,
                    district: `${store.region}`,
                    merchantsUUID: `${store.uuid}`
                    }}"
                class="store-btn text-center w-100 my-2 py-4 px-4 rounded-0 border-0 text-decoration-none">{{ store.name }}</router-link>
                </div>
            </div>
            <div v-if="filterMerchants.length === 0" class="text-white"></div>
          </div>
        </div>
      </div>
    <router-view />
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
      regions: [],
      paginations: [],
      merchantsValue: '',
      typeValue: ''
    }
  },
  computed: {
    filterMerchants () {
      return this.stores.filter((item) => {
        if (item.type === this.TypeValue && (!this.getMerchantValue || item.region === this.getMerchantValue)) {
          console.log('yes', item.region)
          return item.region !== ''
        }
      })
    },
    getMerchantValue () {
      return this.$store.getters['storesData/merchantValue']
    },
    TypeValue () {
      return this.$store.getters['storesData/typeValue']
    }
  },
  watch: {
    getMerchantValue () {
      this.merchantsValue = this.$store.getters['storesData/merchantValue']
    }
  },
  methods: {
    getAllShops (page = 1) {
      const regions = new Set()
      this.$store.dispatch('storesData/getAllShops', page).then(res => {
        this.paginations = res[0]
        this.stores = res
        this.stores.forEach(item => {
          if (item.region !== '') {
            // console.log(item.region)
            regions.add(item.region)
            this.regions = [...regions]
          }
        })
        console.log(res)
      })
    },
    prePage (remove) {
      console.log('原本的item', remove)

      remove--
      console.log('--後的item', remove)
      this.$store.dispatch('storesData/getAllShops', remove).then(res => {
        this.paginations = res[0]
        console.log('prePage', this.paginations)
        this.stores = res
      })
    },
    nextPage (add) {
      console.log('add', add)
      add++
      this.$store.dispatch('storesData/getAllShops', add).then(res => {
        this.paginations = res[0]
        console.log('nextPage', this.paginations)
        this.stores = res
      })
    }
  },
  mounted () {
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
  }
.pagination-bar{
  // height: 4vh;
  .pagination-num{
    padding-top: 3rem;
    div{
      font-size: 36.8px;
    }
    a{
      font-size: 42px;
    }
    @media(max-width:1080px) {
      padding-top: 1rem;
      padding-bottom: 1rem;

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

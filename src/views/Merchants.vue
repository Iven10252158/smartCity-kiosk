<template>
    <div class="bottom">
      <SideMenu />
      <div class="bottom-content">
        <div class="container">
            <div class="bottom-content-top">
                <div class="pagination-bar bg-dark container">
                    <nav class="mt-4">
                        <ul class="pagination pagination-num d-flex justify-content-between">
                          <template v-for="page in paginations" :key="page.offset">
                            <li id="page-prev-function" class="page-item w-25 text-center pointer"
                            :class="{'disabled': paginations[0].page === 1}">
                                <a class="page-link"
                                href="#" aria-label="Previous" @click="prevPage(paginations[0].page)">
                                <i class="fas fa-chevron-left"></i>
                                </a>
                            </li>
                          </template>
                            <template v-for="page in paginations" :key="page.offset">
                            <li id="page-item-function" class="page-item" v-for="i in page.total_page" :key="i"
                            :class="{'active':paginations[0].page === i}">
                                <a class="page-link page-num"
                                @click="getAllShops('', i)"
                                href="#">{{ i }}</a>
                            </li>
                            </template>
                            <template v-for="page in paginations" :key="page.offset">
                              <li id="page-next-function" class="page-item w-25 text-center pointer" :class="{'disabled': paginations[0].page === paginations[0].total_page || paginations[0].total_page === 0}">
                                  <a class="page-link" @click="nextPage(paginations[0].page)" href="#" aria-label="Next">
                                  <i class="fas fa-chevron-right"></i>
                                  </a>
                              </li>
                            </template>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class="container px-3">
                <div class="row g-3 mt-5">
                    <div class="col-sm-4 mt-0 d-flex justify-content-center" v-for="store in stores" :key="store.uuid">
                    <router-link :to="{ path: '/content/merchantDetail', query: {
                        uuid: `${$route.query.uuid}`,
                        district: `${store.region}`,
                        merchantsUUID: `${store.uuid}`
                        }}"
                    class="store-btn text-center w-100 my-2 py-4 px-4 rounded-0 border-0 text-decoration-none">{{ store.name }}</router-link>
                    </div>
                </div>
            </div>
            <div v-if="stores.length === 0" class="text-white"></div>
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
      merchantsValue: '',
      typeValue: ''
    }
  },
  computed: {
    getMerchantValue () {
      return this.$store.getters['storesData/merchantValue']
    },
    TypeValue () {
      return this.$store.getters['storesData/typeValue']
    },
    stores () {
      return this.$store.getters['storesData/storesData']
    },
    paginations () {
      return this.$store.getters['storesData/pagination']
    }
  },
  watch: {
    getMerchantValue () {
      this.merchantsValue = this.$store.getters['storesData/merchantValue']
    }
  },
  methods: {
    getAllShops (item, page = 1) {
      if (this.$route.query.category === 'total') {
        this.$store.dispatch('storesData/getAllShops', { district: this.TypeValue, category: '', page: page })
      } else {
        this.$store.dispatch('storesData/getAllShops', { district: this.TypeValue, category: this.getMerchantValue, page: page })
      }
    },
    prevPage (remove) {
      remove--
      if (this.$route.query.category === 'total') {
        this.$store.dispatch('storesData/getAllShops', { district: this.TypeValue, category: '', page: remove })
      } else {
        this.$store.dispatch('storesData/getAllShops', { district: this.TypeValue, category: this.getMerchantValue, page: remove })
      }
    },
    nextPage (add) {
      add++
      if (this.$route.query.category === 'total') {
        this.$store.dispatch('storesData/getAllShops', { district: this.TypeValue, category: '', page: add })
      } else {
        this.$store.dispatch('storesData/getAllShops', { district: this.TypeValue, category: this.getMerchantValue, page: add })
      }
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
    width: 76.4%;
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

<template>
    <div class="side-menu">
        <div class="side-menu-content">
            <button
                type="button"
                class="side-menu-text sideMenu-content text-center py-3 rounded-0 w-100"
                @click="totalCategories(store)"
                :class="{'bg-secondary':$route.query.category === 'total'}">
                <span :class="{'text-white': $route.query.category === 'total'}">全部展區</span>
            </button>
            <button
                type="button"
                class="side-menu-text sideMenu-content text-center py-3 rounded-0 w-100"
                v-for="(category, index) in getCategoryArray" :key="index"
                @click="chooseCategory(category)"
                :class="{'bg-secondary': category === $route.query.category}">
                <!-- <span  :class="{'text-white': category === $route.query.category}">{{ category }}</span> -->
                <template v-if="category.includes('(')">
                  <div :class="{'text-white': category === $route.query.category}">{{ category.split('(')[0] }}</div>
                  <div :class="{'text-white': category === $route.query.category}">({{ category.split('(')[1] }}</div>
                </template>
                <template v-else>
                  <span :class="{'text-white': category === $route.query.category}">{{ category }}</span>
                </template>
            </button>
        </div>
    </div>

</template>
<script>

export default {
  data () {
    return {
      merchantsValue: '',
      totalShops: [],
      stringAry: []
    }
  },
  computed: {
    getCategoryArray () {
      return this.$store.getters['storesData/categories'][this.TypeValue]
    },
    TypeValue () {
      return this.$store.getters['storesData/typeValue']
    },
    getMerchantValue () {
      return this.$store.getters['storesData/merchantValue']
    }
  },
  methods: {
    getCategories () {
      this.$store.dispatch('storesData/getCategories')
    },
    totalCategories (item, page = 1) {
      // console.warn('totalMerchants')
      this.$store.dispatch('storesData/getValue', item)
      this.$store.dispatch('storesData/getAllShops', { district: this.TypeValue, category: '', page: page })
      this.merchantsValue = 'total'
      if (!item) {
        // console.log('!item')
        this.$router.push({ path: '/content/manufacturer', query: { uuid: this.$route.query.uuid, district: this.TypeValue, category: 'total' } })
        // this.$store.dispatch('storesData/getAllShops')
      }
    },
    chooseCategory (item, page = 1) {
      // console.log(item)
      this.$store.dispatch('storesData/getValue', item)
      this.$store.dispatch('storesData/getAllShops', { district: this.TypeValue, category: item, page: page })
      this.merchantsValue = this.getMerchantValue
      this.$router.push({ path: '/content/manufacturer', query: { uuid: this.$route.query.uuid, district: this.TypeValue, category: `${item}` } })
    }
  },
  mounted () {
    this.getCategories()
  }
}
</script>

<style lang="scss" scoped>
// *{
//   position: relative;
//   font-family: Roboto;
// }
.side-menu{
    background-color:#016A72;
    width: 23.6%;
    height: 62.5vh;
    .side-menu-content {
      .side-menu-text{
        background-color: #005960;
          color: #58CEDC;
          border-top: 0;
          border-left: 0;
          border-right: 0;
          border-bottom: 10px solid #016A72;
          font-size: 64px;
          @media(max-width: 1080px) {
              font-size: 32px;
          }
      }
    }
}

</style>

<template>
    <div class="side-menu">
        <div class="side-menu-content">
            <button
                type="button"
                class="side-menu-text text-white text-center py-2 rounded-0 border-0 w-100"
                @click="totalCategories(store)"
                :class="{'bg-secondary':$route.query.category === 'total'}">
                <span :class="{'text-dark': $route.query.category === 'total'}">全部商家</span>
                <span :class="{'triangle': $route.query.category === 'total'}"></span>
            </button>
            <button
                type="button"
                class="side-menu-text text-center text-white py-2 rounded-0 border-0 w-100"
                v-for="(category, index) in getCategoryArray" :key="index"
                @click="chooseCategory(category)"
                :class="{'bg-secondary': category === $route.query.category}">
                <span :class="{'text-dark': category === $route.query.category}">{{ category }}</span>
                <span :class="{'triangle': category === $route.query.category}"></span>
            </button>
            <!-- <div class="side-menu-text text-center text-white py-3" @click="chooseCategory(category)">{{ category }}</div> -->
        </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      merchantsValue: '',
      totalShops: []
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
        console.log('!item')
        this.$router.push({ path: '/content/merchants', query: { uuid: this.$route.query.uuid, district: this.TypeValue, category: 'total' } })
        // this.$store.dispatch('storesData/getAllShops')
      }
    },
    chooseCategory (item, page = 1) {
      console.log(item)
      this.$store.dispatch('storesData/getValue', item)
      this.$store.dispatch('storesData/getAllShops', { district: this.TypeValue, category: item, page: page })
      this.merchantsValue = this.getMerchantValue
      this.$router.push({ path: '/content/merchants', query: { uuid: this.$route.query.uuid, district: this.TypeValue, category: `${item}` } })
      // this.$store.dispatch('storesData/districtType', category)
    }
  },
  mounted () {
    this.getCategories()
  }
}
</script>

<style lang="scss" scoped>
*{
  position: relative;
  font-family: Roboto;
}
.side-menu{
    background-color:#016A72;
    width: 23.6%;
    height: 62.5vh;
    .side-menu-text{
        background-color: transparent;
        font-size: 64px;
        @media(max-width: 1080px) {
            font-size: 36px;
        }
    }
    .triangle {
        position: absolute;
        top:50%;
        right:0;
        transform: translateY(-50%);
        border: 36px solid;
        border-color: transparent #003539 transparent transparent;
        @media (max-width: 1080px) {
            border: 22px solid;
            border-color: transparent #003539 transparent transparent;
        }
    }
}

</style>

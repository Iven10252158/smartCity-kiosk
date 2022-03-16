<template>
<div class="wrap">
  <div class="top">
    <div class="media-block">
    <div class="muteBtn pointer" @click="mute"></div>
        <img v-show="isLoading" class="loading" src="~@/assets/load.gif" alt="">
      <div class="video-part">
        <div v-show="showImage" class="media bg-cover" :style="{backgroundImage:'url(' +image+ ')'}"></div>
        <div v-show="!showImage" class="media">
            <YoutubeVue3 ref="youtube" :videoid="video" :width="width" :height="height" @ended="onEnded" @paused="onPaused" @played="onPlayed"/>
          <div class="dontTouch"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="btn-group d-flex">
    <div id="B--return-arrow-function" v-if="$store.state.isShow" class="bg-color d-flex align-items-center pointer" @click="arrowBtn">
      <div class="arrowBtn mx-auto d-flex justify-content-center align-items-center">
        <a href="#" class="text-decoration-none text-white">
          <i class="fas fa-chevron-left"></i>
        </a>
      </div>
    </div>
    <button class="kaohsiung kaohsiung-exhibition-btn border-0 text-white" @click="goTo_Kaohsiung('高雄展區')" :class="{ 'click-active' :isKaohsiung , 'active-width': $store.state.isShow}">高雄展區</button>
    <button class="omo omo-exhibition-btn border-0 text-white" @click="goTo_OMO('OMO展區')" :class="{ 'click-active' :isOMO , 'active-width': $store.state.isShow}">OMO展區</button>
    <button class="taipei taipei-exhibition-btn border-0 text-white" @click="goTo_Taipei('台北展區')" :class="{ 'click-active' :isTaipei , 'active-width': $store.state.isShow}">台北展區</button>
  </div>
  <First v-if="changePage" />
</div>
<router-view></router-view>
</template>

<script>
import { connectSocket } from '@/webSocket/websocket'
import First from '@/components/First.vue'
import YoutubeVue3 from '@/components/YoutubeVue3.vue'
export default {
  components: {
    First,
    YoutubeVue3
  },
  data () {
    return {
      isKaohsiung: false,
      isOMO: false,
      isTaipei: false,
      showImage: false,
      changePage: true,
      isMute: true,
      isLoading: true,
      types: [],
      typeValue: ''
    }
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  watch: {
    image () {
      if (this.image) {
        this.showImage = true
        this.isLoading = false
        // console.log('watch, image', this.image, this.showImage)
      }
    },
    video () {
      if (this.video) {
        this.showImage = false
        this.isLoading = false
        // console.log('watch,video', this.youtubeSrc, !this.showImage)
      }
    }
  },
  computed: {
    image () {
      return this.$store.getters['ws/image']
    },
    video () {
      return this.$store.getters['ws/video']
    },
    categories () {
      return this.$store.getters['storesData/categories']
    }
  },
  methods: {
    goTo_Kaohsiung (district, page = 1) {
      console.warn('goTo_Kaohsiung', district)
      this.$store.dispatch('showBtn', true)
      this.$store.dispatch('storesData/getDistrict', district)
      this.types.forEach(item => {
        if (item === district) {
          this.$router.push({ path: '/content/manufacturer', query: { uuid: this.$route.query.uuid, district: item, category: 'total' } })
          this.$store.dispatch('storesData/getAllShops', { district: district, category: '', page: page })
          this.isKaohsiung = true
          this.isTaipei = false
          this.isOMO = false
          this.changePage = false
        }
      })
    },
    goTo_OMO (district, page = 1) {
      this.$store.dispatch('storesData/getDistrict', district)
      this.$store.dispatch('showBtn', true)
      this.types.forEach(item => {
        if (item === district) {
          this.$router.push({ path: '/content/manufacturer', query: { uuid: this.$route.query.uuid, district: item, category: 'total' } })
          this.$store.dispatch('storesData/getAllShops', { district: district, category: '', page: page })
          this.isKaohsiung = false
          this.isTaipei = false
          this.isOMO = true
          this.changePage = false
        }
      })
    },
    goTo_Taipei (district, page = 1) {
      this.$store.dispatch('storesData/getDistrict', district)
      this.$store.dispatch('showBtn', true)
      this.types.forEach(item => {
        if (item === district) {
          this.$router.push({ path: '/content/manufacturer', query: { uuid: this.$route.query.uuid, district: item, category: 'total' } })
          this.$store.dispatch('storesData/getAllShops', { district: district, category: '', page: page })
          this.isKaohsiung = false
          this.isOMO = false
          this.isTaipei = true
          this.changePage = false
        }
      })
    },
    getPageID () {
      this.$http.get(`${process.env.VUE_APP_URL}/template/${process.env.VUE_APP_UUID}`)
        .then(res => {
          connectSocket(res.data.uuid)
          this.$store.dispatch('storesData/getCategories').then(res => {
            // console.log(res)
            this.types = res.type
            this.$router.push({ path: '/content', query: { uuid: this.$route.query.uuid } })
          })
        })
    },
    arrowBtn () {
      if (this.$route.path === '/content/manufacturerDetail') {
        this.$router.push(history.state.back)
        this.$store.dispatch('showBtn', false)
        // console.log(history.state)
      } else if (this.$route.path === '/content/manufacturer') {
        this.$router.push({ path: '/content', query: { uuid: this.$route.query.uuid } })
        this.changePage = true
        this.isKaohsiung = false
        this.isOMO = false
        this.isTaipei = false
        this.$store.dispatch('showBtn', false)
      } else if (this.$route.path === '/content/manufacturerOexpo') {
        this.$router.go(-1)
        this.$store.dispatch('showBtn', true)
        // console.log(history.state)
      }
    },
    onPlayed () {
      console.log('## OnPlayed')
    },
    onEnded () {
      console.log('## OnEnded')
      this.$refs.youtube.player.seekTo(0)
    },
    onPaused () {
      console.log('## OnPaused')
    },
    mute () {
      if (this.isMute) {
        this.isMute = false
        this.$refs.youtube.player.unMute()
        this.$swal({ icon: 'success', title: '音訊開啟' })
      } else {
        this.isMute = true
        this.$refs.youtube.player.mute()
        this.$swal({ icon: 'warning', title: '音訊關閉' })
      }
    }
  },
  mounted () {
    console.log(1)
    this.getPageID()
    this.$store.dispatch('showBtn', false)
    this.$refs.youtube.player.mute()
  }
}
</script>

<style lang="scss" scoped>
*{
  position: relative;
}
.bg-cover{
  background-size: cover;
  background-position: center center;
}
.media-block{
  width: 100%;
  height: 33.59vh;
  background-color: #000;
    .video-part{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 1080px;
      width: 1920px;
      @media(max-width:1080px){
        height: 540px;
        width: 960px;
      }
    .media{
      display: block;
      height: 100%;
      width: 100%;
    }
      .dontTouch{
        width: 100%;
        opacity: 0;
        background-color: orange;
        position: absolute;
        z-index: 2;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 100%;
        &.changeStyle{
        transition: all .5s;
        height: 19.7vh;
        width: 62.5%;
      }
    }
  }
}
.btn-group{
  position: relative;
  height: 3.91vh;
    button {
      width: 33.3%;
      font-size: 72px;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
      background: linear-gradient(180deg, #69DCEC 0%, #019FA9 100%);
      @media(max-width:1080px) {
          font-size: 48px;
      }
    }
      .click-active{
        background: linear-gradient(180deg, #6332A2 0%, #3E0D61 51.56%, #6332A2 100%);
      }
      .active-width{
        width: 25.4%;
      }
    .bg-color {
      width: 23.6%;
      background: linear-gradient(180deg, #FFFFFF 0%, #B2B2B2 51.56%, #FFFFFF 100%);
    }
    .arrowBtn{
      background: #00A5A7;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      transition: .5s all;
    a{
      font-size: 48px;
      margin-bottom: 0px;
      color:#fff;
    }
  }
    @media(max-width:1080px) {
      .arrowBtn{
        width: 50px;
        height: 50px;
          a{
          font-size: 36px;
          color:#fff;
        }
      }
    }
}
.muteBtn{
  // border: 2px solid #fff;
  height: 54px;
}
.loading{
    width: 160px;
    height: 160px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media(max-width:1080px) {
      width: 80px;
      height: 80px;
    }
}
.pointer{
  cursor: pointer;
}
</style>

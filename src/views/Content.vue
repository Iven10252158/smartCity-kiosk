<template>
<div class="wrap">
  <div class="top">
    <div class="media-block">
      <div class="video-part">
        <div v-show="showImage" class="media bg-cover" :style="{backgroundImage:'url(' +image+ ')'}"></div>
        <div v-show="!showImage" class="media">
          <iframe class="media liveVideo" ref="liveVideo"
              :src="video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>
  </div>
  <div class="btn-group d-flex">
    <div v-if="$store.state.storesData.isShow" class="bg-color d-flex align-items-center" @click="arrowBtn">
      <div class="arrowBtn mx-auto d-flex justify-content-center align-items-center">
        <a href="#" class="text-decoration-none text-white">
          <i class="fas fa-chevron-left"></i>
        </a>
      </div>
    </div>
    <button class="kaohsiung border-0 text-white" @click="goTo_Kaohsiung('高雄展區')" :class="{ 'click-active' :isKaohsiung , 'active-width': $store.state.storesData.isShow}">高雄展區</button>
    <button class="omo border-0 text-white" @click="goTo_OMO('OMO展區')" :class="{ 'click-active' :isOMO , 'active-width': $store.state.storesData.isShow}">OMO展區</button>
    <button class="taipei border-0 text-white" @click="goTo_Taipei('台北展區')" :class="{ 'click-active' :isTaipei , 'active-width': $store.state.storesData.isShow}">台北展區</button>
  </div>
</div>
<router-view></router-view>
</template>

<script>
import { connectSocket } from '@/webSocket/websocket'
export default {
  data () {
    return {
      isKaohsiung: false,
      isOMO: false,
      isTaipei: false,
      showImage: false,
      type: [],
      typeValue: ''
    }
  },
  watch: {
    image () {
      this.showImage = true
    },
    video () {
      this.showImage = false
    }
  },
  computed: {
    image () {
      return this.$store.getters['ws/image']
    },
    video () {
      return this.$store.getters['ws/video']
    }
  },
  methods: {
    goTo_Kaohsiung (district) {
      this.$store.dispatch('storesData/getDistrict', district)
      this.types.forEach(item => {
        if (item === district) {
          this.$router.push({ path: '/content/merchants', query: { uuid: this.$route.query.uuid, district: item } })
          this.isKaohsiung = true
          this.isTaipei = false
          this.isOMO = false
          this.$store.dispatch('storesData/getDistrict', district)
        }
      })
    },
    goTo_OMO (item) {
      console.log(item)
      this.isKaohsiung = false
      this.isTaipei = false
      this.isOMO = true
      this.$router.push({ path: '/content/merchants', query: { district: item } })
      this.$store.dispatch('storesData/getDistrict', item)
    },
    goTo_Taipei (item) {
      console.log(item)
      this.isKaohsiung = false
      this.isOMO = false
      this.isTaipei = true
      this.$router.push({ path: '/content/merchants', query: { district: item } })
      this.$store.dispatch('storesData/getDistrict', item)
    },
    getPageID () {
      this.$http.get('http://20.106.156.149:8080/template/c5898923-dee3-459f-9a36-0ef06c268903')
        .then(res => {
          console.log(res)
          connectSocket(res.data.uuid)
          // this.goTo_OMO('OMO')
        })
    }
  },
  mounted () {
    this.$store.dispatch('storesData/getCategories').then(res => {
      this.types = res.type
    })
    this.getPageID()
  }
}
</script>

<style lang="scss" scoped>
*{
  position: relative;
}
.wrap{
  display: flex;
  flex-direction: column;
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
      border: 5px solid #fff;
      position: absolute;
      top: 14%;
      left: 11.5%;
      height: 891px;
      width: 1671px;
      @media(max-width:1080px){
        height: 445.5px;
        width: 835.5px;
      }
    .media{
      display: block;
      height: 100%;
      width: 100%;
    }
  }
}
.btn-group{
  position: relative;
  height: 3.91vh;
    button {
      width: 33.3%;
      font-size: 72px;
      background: linear-gradient(180deg, #69DCEC 0%, #019FA9 51.56%, #69DCEC 100%);
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

</style>

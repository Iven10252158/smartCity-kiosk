<template>
    <div class="booth-oexpo">
        <iframe ref="iframe" src="https://www.oexpo.io/vb/61f35acfb62f2dec9646b5cc" sandbox="allow-scripts allow-same-origin allow-presentation" frameborder="0"></iframe>
        <div class="b-cover"></div>
    </div>
</template>

<script>
export default {
//   methods: {
//     click () {
//       console.log('click')
//     }
//   },
//   mounted () {
//     this.$refs.iframe.classList.add('pointer-none')
//   }
}
</script>

<style lang="scss" scoped>
    .booth-oexpo{
        position: relative;
        z-index: 1;
        height: 62.5vh;
        background-color: #1B1D20;
        iframe {
            // position: relative;
            // z-index: 1;
            width: 100%;
            height: 100%;
        }
        // .cover{
        //     pointer-events: none;
        //     position: absolute;
        //     top: 0;
        //     opacity: 0;
        //     width: 100%;
        //     height: 62.5vh;
        //     z-index: 5;
        //     background-color: #1B1D20;
        // }
        .b-cover {
            position: absolute;
            height: 100px;
            width: 100%;
            bottom: 0;
            z-index: 2;
            background-color: #1B1D20;
        }
    }
    // .pointer-none{
    //     pointer-events: none;
    // }
</style>

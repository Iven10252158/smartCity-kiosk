<template>
    <div class="booth-oexpo">
        <iframe src="https://www.oexpo.io/vb/61f35acfb62f2dec9646b5cc" sandbox="allow-scripts allow-same-origin allow-presentation" frameborder="0"></iframe>
        <div class="b-cover"></div>
    </div>
</template>

<style lang="scss" scoped>
    .booth-oexpo{
        position: relative;
        z-index: 1;
        height: 62.5vh;
        background-color: #1B1D20;
        iframe {
            width: 100%;
            height: 100%;
        }
        .b-cover {
            position: absolute;
            height: 100px;
            width: 100%;
            bottom: 0;
            z-index: 2;
            background-color: #1B1D20;
            // background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.687569) 14.06%, #FFFFFF 29.69%, #FFFFFF 56.25%, #FFFFFF 100%);
        }
    }
</style>

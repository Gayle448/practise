<script setup>

import {  } from 'vue'

const props = defineProps({
    src: String,
    class: String
})

function getImageUrl(name) {
    const url = new URL(`../assets/images/${name}.png`, import.meta.url).href;
    return url;
}

</script>

<template>
    <img v-if="props.src" :src="getImageUrl(props.src)" :class="[props.class ? props.class : 'iconStyle']" />
    <!-- class 虽然传过来,但是得在当前 style 内有样式定义,在外部定义不会生效 -->
</template>

<style>

.iconStyle {
    width: 25px;
    height: 25px;
    margin: 5px;
}

.loadingStyle {
    width: 25px;
    height: 25px;
    animation: turn 1s linear infinite;
    -webkit-animation: turn 1s linear infinite;
}
</style>
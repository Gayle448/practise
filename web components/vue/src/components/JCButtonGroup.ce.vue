<script setup>

</script>

<template>
    <div class="wrapper">
        <slot></slot>
    </div>
</template>

<style>

.wrapper {
    display: inline-flex;
    flex-flow: row nowrap;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border: 1px solid rgba(255, 222, 255, 1);
    background-color: white;
    overflow: hidden;
}

.borderWhite {
    border:1px solid rgba(255,255,255,0); border-right-color:rgba(255,255,255,1); border-radius:0px; margin:0px;
}

.borderAlpha {
    border:1px solid rgba(255,255,255,0); border-right-color:rgba(255,255,255,0); border-radius:0px; margin:0px;
}

</style>
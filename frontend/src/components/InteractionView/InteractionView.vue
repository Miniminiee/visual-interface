<template src='./InteractionView.html'></template>

<script src='./InteractionView.js'></script>

<style>
    .card {
        margin-bottom: 10px;
        border-radius: 5px;
    }

    .card-header {
        font-size: 12px;
        padding: 6px 12px;
        height: 36px;
    }

    .card-block {
        padding: 0px;
        position: relative;
    }

    text {
        font-weight: 300;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serf;
        font-size: 14px;
    }

    #InteractionContainer {
        height: 300px;
    }

    #InteractionGraph {
        height: 300px;
    }

    #InteractionContainer .line-path {
        fill: none;   /*曲线与轴之间的填充*/
        stroke: steelblue;
        stroke-width: 2;
        stroke-linejoin: round;   /*转折点的圆滑程度*/
    }

    div.tooltip {
        position: absolute;
        text-align: center;
        width: 100px;
        height: 28px;
        padding: 2px;
        font: 8px sans-serif;
        background: lightsteelblue;
        border: 0px;
        border-radius: 8px;
        pointer-events: none;/*禁用滚动*/
    }

</style>

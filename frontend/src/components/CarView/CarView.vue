<template src='./CarView.html'></template>

<script src='./CarView.js'></script>

<style>
    .tab-button {
      padding: 1px 10px;
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      border: 1px solid #ccc;
      cursor: pointer;
      background: #f0f0f0;
      margin-bottom: -1px;
      margin-right: -1px;
    }

    .tab-button:hover {
      background: #e0e0e0;
    }

    .tab-button.active {
      background: #e0e0e0;
    }

    .demo-tab {
      border: 1px solid #ccc;
      padding: 10px;
    }

    .tab {
      margin: 20px auto;
    }

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

    #carContainer {
          height: 300px;
    }

    #carGraph {
      height: 300px;
    }

    #carContainer .line-path {
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

<template>
  <div id="carGraph"></div>
</template>

<script>
import dataService from '../../service/dataService.js'
import DrawCar from './drawCar'
export default {
  props: {
    data: {
      type: String
    },
    dataB: {
      type: String
    }
  },
  data(){
  return{
    containerId: 'carGraph',
  }
  },
  mounted: function () {
        this.DrawCar = new DrawCar(this.containerId)
        dataService.dailyData((stockDataDaily) => {
            let data = new Array;
            var dataDict;
            for(let key in stockDataDaily["data"]["Time Series (Daily)"]){
                dataDict = stockDataDaily["data"]["Time Series (Daily)"][key];
                data.push({time:new Date(key), open:+dataDict["1. open"], high:+dataDict["2. high"], low:+dataDict["3. low"], close:+dataDict["4. close"], volume: +dataDict["5. volume"]});
            }
        this.DrawCar.drawspeed(data);
    })
  }
}
</script>

<style>
</style>


import Vue from 'vue'
//只需要修改this.$emit()和this.$on()里面的信号名称即可。
var pipeService = new Vue({
    data: {
        UPDATEPIC: 'update_pic',   //信号名称
    },
    methods: {
        emitUPDATEPIC: function (currenttime) {  //发送add_circle信号
            this.$emit(this.UPDATEPIC, currenttime)
        },
        onUPDATEPIC: function (callback) {  //接收add_circle信号
            this.$on(this.UPDATEPIC, function (currenttime) {
                callback(currenttime)
            })
        },
        
    }
})

export default pipeService

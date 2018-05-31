Bmob.initialize("f63434203e1c5a6e7aed136a594551a7", "51bf934f7b7c44b8441bc3c5beb986e9");
window.App = {

queryGPS: function(){
    var gps = Bmob.Object.extend("gps");
    var query = new Bmob.Query(gps);
    // 查询所有数据
    query.find({
        success: function(results) {
        //a=数据长度-1  因为数组从0开始
        var a = parseInt(results.length-1);
        var str1 = results[a].get('longitude');
        var str2 = results[a].get('latitude');
        var str3 = results[a].get('mac');
        document.getElementById("queryGPS").innerHTML = '用户id' + ' - ' + str3;

        var Map_val = {
                jing: str1,
                wei: str2,
            }
            $(document).ready(
                function()
                {
                    $.extend(
                        {
                            init_map:function()
                            {
                                Map_val.map = new BMap.Map("main_ditu");                    // 创建Map实例
                                Map_val.point = new BMap.Point(Map_val.jing,Map_val.wei);    // 创建点坐标
                                Map_val.map.centerAndZoom(Map_val.point,15);
                                if(Map_val.jing > 0)
                                {
                                    Map_val.marker = new BMap.Marker(Map_val.point);  // 创建标注
                                    Map_val.map.addOverlay(Map_val.marker); 
                                }
                                Map_val.map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
                                Map_val.map.disableDoubleClickZoom();
                                Map_val.map.disableContinuousZoom();
                                Map_val.local = new BMap.LocalSearch
                                (
                                    "全国", 
                                    {
                                        renderOptions:
                                       {
                                            map: Map_val.map,
                                            autoViewport: true,
                                            selectFirstResult: false
                                        }
                                    }
                                );
                            },
                            markerDragStart:function()
                            {
                                $("#confirm_position").slideUp();
                                return false;
                            },
                            markerDragEnd:function(e)
                            {
                                $("#position_lng").val(e.point.lng);
                                $("#position_lat").val(e.point.lat);
                                $("#confirm_position").slideDown();
                                return false;
                            }

                        }
                    );

                    $.init_map();


                }
            );

        //弹出窗口
        //alert(results[a].get('longitude') + ' - ' + results[a].get('latitude'));
        //网页输出
        },
        error: function(error) {
            alert("查询失败: " + error.code + " " + error.message);
        }
    });


},

querycpr: function(){
    var cpr = Bmob.Object.extend("cpr");
    var query = new Bmob.Query(cpr);
    // 查询所有数据
    query.find({
        success: function(results) {
        var a = parseInt(results.length - 10);//这里的数字是显示数据的数量
        // 循环处理查询到的数据
        // for (var i = a; i < results.length; i++) {
        // var object = results[i];
        // alert(object.get('rate') + ' - ' + object.get('depth'));
        // }
        // document.getElementById("queryGPS").innerHTML = '深度' + ' - ' + results[a+9].get('depth');
        //document.getElementById("ddd").innerHTML = '深度' + ' - ' + results[a+9].get('depth') + '    '+ '频率' + ' - ' + results[a+9].get('rate');
       
var dom = document.getElementById("container");
var myChart = echarts.init(dom);
var app = {};
option = null;
var labelRight = {
    normal: {
        position: 'right'
    }
};
option = {
    title: {
        text: '左深度-右频率',
        sublink: 'http://e.weibo.com/1341556070/AjwF2AgQm'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        top: 80,
        bottom: 30
    },
    xAxis: {
        type : 'value',
        position: 'top',
        splitLine: {lineStyle:{type:'dashed'}},
    },
    yAxis: {
        type : 'category',
        axisLine: {show: false},
        axisLabel: {show: false},
        axisTick: {show: false},
        splitLine: {show: false},
        data : ['depth', 'rate', 'depth', 'rate', 'depth', 'rate', 'depth', 'rate', 'depth', 'rate', 'depth', 'rate', 
        'depth', 'rate', 'depth', 'rate', 'depth', 'rate', 'depth', 'rate']
    },
    series : [
        {
            name:'value',
            type:'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    formatter: '{b}'
                }
            },
            data:[
                {value: -results[a].get('depth'), label: labelRight},
                results[a].get('rate'),
                {value: -results[a+1].get('depth'), label: labelRight},
                results[a+1].get('rate'),
                {value: -results[a+2].get('depth'), label: labelRight},
                results[a+2].get('rate'),
                {value: -results[a+3].get('depth'), label: labelRight},
                results[a+3].get('rate'),
                {value: -results[a+4].get('depth'), label: labelRight},
                results[a+4].get('rate'),
                {value: -results[a+5].get('depth'), label: labelRight},
                results[a+5].get('rate'),
                {value: -results[a+6].get('depth'), label: labelRight},
                results[a+6].get('rate'),
                {value: -results[a+7].get('depth'), label: labelRight},
                results[a+7].get('rate'),
                {value: -results[a+8].get('depth'), label: labelRight},
                results[a+8].get('rate'),
                {value: -results[a+9].get('depth'), label: labelRight},
                results[a+9].get('rate')
                // {value: -0.09, label: labelRight},
                // 0.2, 0.44,
                // {value: -0.23, label: labelRight},
                // 0.08,
                // {value: -0.17, label: labelRight},
                // 0.47,
                // {value: -0.36, label: labelRight},
                // 0.18
            ]
            // data: [results[a].get('rate'), -results[a].get('depth'), results[a+1].get('rate'), -results[a+1].get('depth'), 
            // results[a+2].get('rate'), -results[a+2].get('depth'), results[a+3].get('rate'), -results[a+3].get('depth'), 
            // results[a+4].get('rate'), -results[a+4].get('depth'), results[a+5].get('rate'), -results[a+5].get('depth'), 
            // results[a+6].get('rate'), -results[a+6].get('depth'), results[a+7].get('rate'), -results[a+7].get('depth'), 
            // results[a+8].get('rate'), -results[a+8].get('depth'), results[a+9].get('rate'), -results[a+9].get('depth')], 
        }
    ]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}
    //     var dom = document.getElementById("container");
    //     var myChart = echarts.init(dom);
    //     var app = {};
    //     option = null;
    //     option = {
    //         legend: {
    //             data:['支出','收入']
    //         },
    //         xAxis: {
    //             type: 'category',
    //             // data: ['rate', 'depth','rate', 'depth','rate', 'depth','rate', 'depth','rate', 'depth',
    //             // 'rate', 'depth','rate', 'depth','rate', 'depth','rate', 'depth','rate', 'depth']
    //         },
    //         yAxis: {
    //             type: 'value'
    //         },
    //         series: [{
                // data: [results[a].get('rate'), -results[a].get('depth'), results[a+1].get('rate'), -results[a+1].get('depth'), 
                // results[a+2].get('rate'), -results[a+2].get('depth'), results[a+3].get('rate'), -results[a+3].get('depth'), 
                // results[a+4].get('rate'), -results[a+4].get('depth'), results[a+5].get('rate'), -results[a+5].get('depth'), 
                // results[a+6].get('rate'), -results[a+6].get('depth'), results[a+7].get('rate'), -results[a+7].get('depth'), 
                // results[a+8].get('rate'), -results[a+8].get('depth'), results[a+9].get('rate'), -results[a+9].get('depth')], 
    //             type: 'bar'
    //         }]
    //         // {
    //         //     data: [results[a].get('depth'), results[a+1].get('depth'), results[a+2].get('depth'), results[a+3].get('depth'), 
    //         //     results[a+4].get('depth'), results[a+5].get('depth'), results[a+6].get('depth'), results[a+7].get('depth'),
    //         //     results[a+8].get('depth'), results[a+9].get('depth')],
                
    //         //     type: 'bar'
    //         // }]
    //     };
    // ;
    // if (option && typeof option === "object") {
    // myChart.setOption(option, true);
    // }
    },
    
    error: function(error) {
        alert("查询失败: " + error.code + " " + error.message);
    }
    });
}


};
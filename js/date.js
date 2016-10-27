requirejs.config({
	baseUrl:"./js",//配置基础路径
	//urlArgs:"v=1.2.0",//对所有的js文件加版本信息
	paths:{
		jquery:"lib/jquery.min",//起别名
		my97:"My97DatePicker/WdatePicker"
	},
    shim:{ //如果js文件不支持AMD;//exports//输出
        'my97': {
             exports: 'WdatePicker'
         }
    }
});

//日历插件使用
requirejs(['jquery','my97'],function($,WdatePicker){
	$('.J-date').click(function(){
		WdatePicker({
			el:this,//指定一个控件节点或控件的ID,必须具有value或innerHTML属性
			skin:"twoer",//皮肤
			dateFmt:'yyyy-MM-dd HH:mm:ss',//日期显示格式
			//minDate:'1900-01-01 00:00:00',//最小日期
			//maxDate:'2099-12-31 23:59:59',//最大日期
		})
	});

	$('.J-date-other').click(function(){
		WdatePicker({
			el:this,//指定一个控件节点或控件的ID,必须具有value或innerHTML属性
			skin:"twoer",//皮肤
			dateFmt:'yyyy年MM月dd日  HH:mm:ss',//日期显示格式
			//minDate:'1900-01-01 00:00:00',//最小日期
			//maxDate:'2099-12-31 23:59:59',//最大日期
		})
	});
});
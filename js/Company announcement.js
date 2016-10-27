$(".mainer dl dd h3").click(function(){
	
	$(this).parent().children("h4").slideToggle("slow");


})



function holidayDate(json){
			this.init(json);
		};
		holidayDate.prototype={
			tableHtml:'<table class="table" cellspacing="0" cellpadding="0"></table>',
			init:function(json){
				var that=this;
				var el=$(json.el);
				var tableNode=$(this.tableHtml);
				$.ajax({
					type:json.type?json.type:"get",
					url:json.url,
					data:json.data?json.data:"",
					dataType:"json",
					success:function(json){
						//第一行
						tableNode.append('<tr><td colspan="7">'+json.year+'年'+json.holidayName+'放假安排（'+json.month+'月）</td></tr>');
						//第二行
						tableNode.append('<tr><td>周一</td><td>周二</td><td>周三</td><td>周四</td><td>周五</td><td>周六</td><td>周日</td></tr>');
						//第三到八行——日期行
						
						that.createDate(json,tableNode);

						el.append(tableNode);
					},
					error:function(xml,status,error){
						alert("请稍后重试");
						console.log(error);
					}
				});
			},
			createDate:function(json,tableNode){//第三到八行——日期行
				var holidayDate=new Date(json.year+"/"+(Number(json.month))+"/"+json.date);//相当于"2015/9/27"这里9是指9月
				var holidayWeek=holidayDate.getDay();
				var dValue=json.date%7;//差距的星期天数
				var firstDayWeek;//月份第一天是星期几
				if(holidayWeek==0)
					holidayWeek=7;//日期返回0表示周日，强制变为数字7
				firstDayWeek=holidayWeek-dValue+1;//星期几//返回是1-7

				var boolNum=0;//0表示提示假期的文字不需要换行，1表示换行写提示假期文字
				var forNum=0;//一个月有几天，即循环次数
				if(json.month==2)
				{
					if(json.year%4==0)//闰年
						forNum=29;
					else
						forNum=28;
				}
				else
				{
					if(json.month==1 || json.month==3 || json.month==5 || json.month==7 || json.month==8 ||  json.month==10 ||  json.month==12)
						forNum=31;
					else
						forNum=30;
				}

				//赋值boolNum
				if((forNum==28 && firstDayWeek>4) || (forNum==29 && firstDayWeek>3) || (forNum==30 && firstDayWeek>2) || (forNum==31 && firstDayWeek>1)){
					boolNum=1;
				}

				//假日信息
				var holidayNum=json.holiday.length-1;//假日天数
				var holidayOverMonth;//上班的日子，记录月，可能跨月
				var holidayOverDate=Number(json.holiday[holidayNum])+1;//上班的日子，记录日，可能跨月
				if(holidayOverDate>forNum){
					holidayOverMonth=Number(json.month)+1;
					holidayOverDate=1;
				}else
					holidayOverMonth=json.month;

				var holidayStr=json.month+"月"+json.holiday[0]+"日至"+json.month+"月"+json.holiday[holidayNum]+"日放假"+(holidayNum+1)+"天，"+holidayOverMonth+"月"+holidayOverDate+"日上班。";

				//写入日期的html
				var rows=Math.ceil(forNum/7)+boolNum;
				var num=0;//记录日期
				for(var i=0;i<rows;i++){
					tableNode.append('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
					for(var j=0;j<7;j++)
					{
						if(i==0 && firstDayWeek<=j+1)//日期第一排
						{
							num++;
							var tdObj=tableNode.find('tr:last').children('td').eq(j);
							tdObj.text(num);
						}
						else if(i>0 && i<rows-1)
						{
							num++;
							var tdObj=tableNode.find('tr:last').children('td').eq(j);
							tdObj.text(num);
						}
						else if(i==rows-1){//最后一排
							//console.log(num);
							num++;
							var tdObj=tableNode.find('tr:last').children('td').eq(j);
							if(forNum>=num)
								tdObj.text(num);
							else{
								//console.log(j);
								tdObj.attr('colspan',7-j).text(holidayStr).nextAll('td').remove();
								break;
							}

						}
						//加样式标记
						if(this.boolHoliday(json,num)==='holiday')//放假
						{
							tdObj.addClass('holiday');
						}
						else if(this.boolHoliday(json,num)==="work")
						{
							tdObj.addClass('workDay');
						}
					}
				}
				
			},
			boolHoliday:function(json,dayDate){
				if(dayDate==json.holiday[json.holiday.length-1]+1){
					return 'work';
				}

				for(var i=0;i<json.holiday.length;i++){
					if(json.holiday[i]==dayDate)
					{
						return 'holiday';
					}
				}
			},
			constructor:holidayDate
		};

		var table1=new holidayDate({
			el:"#J_table",
			type:'get',
			url:'json/date.json'
		});

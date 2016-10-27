window.onload=function(){

var BigNode=document.getElementById("bg-bg");
var SmaImgNode=$("#changwp-bottom dd ")
for(var i=0;i<SmaImgNode.length;i++){
	SmaImgNode[i].index=i;
	
	SmaImgNode[i].onclick=function(){
		Bigsrc="images/bg_"+this.index+".jpg";
		BigNode.src=Bigsrc;
		
	}

 }
}

$("#hp").click(function(){
	
	$("#hp-1").toggle()

})

$("#background").click(function(){
	
	$("#changwp-bottom").toggle()

})
 

requirejs.config({
	baseUrl:"./js",//配置基础路径
	//urlArgs:"v=1.2.0",//对所有的js文件加版本信息
	paths:{
		jquery:"lib/jquery.min",//起别名
		swfupload:"swfupload/swfupload",
		jq_swfupload:"swfupload/jquery.swfupload"
	},
    shim:{ //如果js文件不支持AMD;//exports//输出
         swfupload:{
         	exports: 'swfupload'
         },
         jq_swfupload:{
         	exports: 'jq_swfupload',
         	deps:['jquery']//依赖
         }
    }
});

//日历插件使用
requirejs(['jquery','swfupload','jq_swfupload'],function($){
    $('#swfupload-control').swfupload({
        upload_url: "js/swfupload/upload.php",//请求地址
        file_size_limit : "10240",
        file_types : "*.*",
        file_types_description : "All Files",
        file_upload_limit : "0",
        flash_url : "js/swfupload/swfupload.swf",
        button_image_url : 'js/swfupload/XPButtonUploadText_61x22.png',
        button_width : 61,
        button_height : 22,
        button_placeholder : $('#button')[0],
        debug: true,//debug模式
        custom_settings : {something : "here"}
    })
    .bind('swfuploadLoaded', function(event){
        $('#log').append('<li>Loaded</li>');
    })
    .bind('fileQueued', function(event, file){
        $('#log').append('<li>File queued - '+file.name+'</li>');
        // start the upload since it's queued
        $(this).swfupload('startUpload');
    })
    .bind('fileQueueError', function(event, file, errorCode, message){
        $('#log').append('<li>File queue error - '+message+'</li>');
    })
    .bind('fileDialogStart', function(event){
        $('#log').append('<li>File dialog start</li>');
    })
    .bind('fileDialogComplete', function(event, numFilesSelected, numFilesQueued){
        $('#log').append('<li>File dialog complete</li>');
    })
    .bind('uploadStart', function(event, file){
        $('#log').append('<li>Upload start - '+file.name+'</li>');
    })
    .bind('uploadProgress', function(event, file, bytesLoaded){
        $('#log').append('<li>Upload progress - '+bytesLoaded+'</li>');
    })
    .bind('uploadSuccess', function(event, file, serverData){//成功
        $('#log').append('<li>Upload success - '+file.name+'</li>');
        console.log(file);//写入路径
    })
    .bind('uploadComplete', function(event, file){
        $('#log').append('<li>Upload complete - '+file.name+'</li>');
        // upload has completed, lets try the next one in the queue
        $(this).swfupload('startUpload');
    })
    .bind('uploadError', function(event, file, errorCode, message){//失败
        console.log(file);
        $('#log').append('<li>Upload error - '+message+'</li>');
    });
});
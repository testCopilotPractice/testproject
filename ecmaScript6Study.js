// 兼容不同浏览器和版本得创建函数数组
function createXHR () {
  var XHR = [
      // 标准的XMLHttpRequest对象
      function () { return new XMLHttpRequest () },
      // IE浏览器中的XMLHttpRequest对象
      function () { return new ActiveXObject ("Msxml2.XMLHTTP") },
      // IE浏览器中的XMLHttpRequest对象
      function () { return new ActiveXObject ("Msxml3.XMLHTTP") },
      // IE浏览器中的XMLHttpRequest对象
      function () { return new ActiveXObject ("Microsoft.XMLHTTP") }
  ];
  var xhr = null;
  //尝试调用函数，如果成功则返回XMLHttpRequest对象，否则继续尝试
  for (var i = 0; i < XHR.length; i ++) {
      try {
          xhr = XHR[i]();
      } catch(e) {
          continue  //如果发生异常，则继续下一个函数调用
      }
      break;  //如果成功，则中止循环
  }
  return xhr;  //返回对象实例
}
// 使用promise实现AJAX逻辑
// 创建一个promise对象
var getJson = function(url){
  // 在promise对象中执行AJAX请求
  return new Promise(function (resolve, reject) {      
      var xhr = createXHR();
      // open方法用于指定请求的类型、URL以及是否异步处理请求
      xhr.open('GET', url);
      // responseType属性用于指定服务器返回数据的类型
      // 默认值是空字符串，表示DOMString
      // 除了DOMString，还可以设置以下几种类型
      // arraybuffer: ArrayBuffer对象
      // blob: Blob对象
      // document: Document对象
      // json: JSON对象
      // text : 字符串
      // empty: 无数据
      // ms-stream: ReadableStream对象
      xhr.responseType = 'json';
      // content-type的几个类型
      // text/html: HTML格式
      // text/plain: 纯文本格式
      // text/xml: XML格式
      // application/json: JSON数据格式
      // application/x-www-form-urlencoded: form表单数据
      // multipart/form-data: 用于文件上传
      // image/gif: GIF图片格式
      // image/jpeg: JPG图片格式
      // image
      // image/png: PNG图片格式
      // image/svg+xml: SVG图片格式
      // image/x-icon: ICO图片格式
      // application/pdf: PDF文档格式
      // application/msword: Word文档格式
      // application/vnd.ms-excel: Excel文档格式
      // application/zip: ZIP压缩格式
      // application/octet-stream: 二进制流数据
      // application/xhtml+xml: XHTML格式
      // application/xml: XML数据格式
      // application/atom+xml: Atom数据格式
      // application/rss+xml: RSS数据格式
      // application/javascript: JavaScript格式
      // application/ecmascript: ECMAScript脚本格式
      // application/x-shockwave-flash: Flash动画格式
      // application/sql: SQL数据格式
      xhr.setRequestHeader('Content-Type', 'application/json');
      // onreadystatechange属性存储函数，当readyState属性改变时，会调用该函数
      xhr.onreadystatechange = function () {
        // 请求过程,readyState的几个状态（5个）
        // 0: 请求未初始化
        // 1: 服务器连接已建立
        // 2: 请求已接收
        // 3: 请求处理中  
        // 4: 请求已完成，且响应已就绪        
          if (xhr.readyState === 4) {
              // 3. 在promise对象中处理AJAX请求的结果
              // 响应的几个状态
              // 200: "OK"
              // 403: "Forbidden"
              // 404: "Not Found"
              // 500: "Internal Server Error"
              // 503: "Service Unavailable"
              switch(xhr.status){
                  case 200:
                    // xhr.responseText
                    resolve(xhr.response);
                    break;
                  case 403:
                    reject(new Error('Forbidden'));
                    break;
                  case 404:
                    reject(new Error('404 Not Found'));
                    break;
                  case 500:
                    reject(new Error('Internal Server Error'));
                    break;
                  case 503:
                    reject(new Error('Service Unavailable'));
                    break;
                  default:
                      reject(new Error('请求失败Other Error'));
              }              
          }
      };
      xhr.send();
  });
}

getJson("http://api.example.com/data").then(function(data){
  // success
  
}, function(){
  // failed

});

var CACHE_NAME = 'sw' + Date.now()
var cachelist = [
    '/static/index.html',
] 


self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then(
        cache =>{
          cache.addAll(cachelist)
        }
      ),
      console.log('install sucessfully!'),
      self.skipWaiting()
    )
  });




//清除旧缓存
self.addEventListener('activate', event => {
    const cacheName = CACHE_NAME;
  
    event.waitUntil(
      caches.keys().then(keys => {
        return Promise.all(
          keys.filter(name => name !== cacheName).map(name => caches.delete(name))
        );
      })
    );
    console.log('activate sucessfully')
});




// 请求拦截，请求转发，构建请求和响应。。。。  
self.addEventListener('fetch',function ( event ) {
    if(event.request.url == 'http://127.0.0.1:8000/getinfo/'){
        console.log("this request url is:" + event.request.url);
    }
    if(event.request.url == 'http://127.0.0.1:8000/fileup/'){
        console.log("this request url is:" + event.request.url);
        var res = operate(event.request) //进行上传文件的操作
        event.respondWith(res)
    }
    if(event.request.url == 'http://127.0.0.1:8000/download/'){
        console.log("this request url is:" + event.request.url);
        event.respondWith( new Response("来自sw中对download拦截的响应"))
    }
})
//文件后缀名对应的要添加的url字段
//测试是只是URL下的接口里的字段添加，但实际开发中是需要不同文件后缀对应不同的服务器，必须在sw中完成映射
var list = [{txt:'txt'},{py:'python'},{java:'java'},{c:'c'},{cpp:'c++'}]

//上传文件的总操作
function operate(req){
  var requestClone = req.clone();
  var filetext = getfiletext(requestClone);// 读取请求主体内容,正式开发中可以换为请求文件名
  console.log(filetext)
  //根据文件名进行url字段的添加
  var newreq = Addurl(req)
  return fetch(newreq)
}



//在正式的开发中只需要将文件名拿到就好，然后根据文件名添加对应的url字段
function getfiletext(req){
  const reader = new FileReader();
  reader.onload = function(event) {
    const fileContent = event.target.result;
    console.log('文件内容为：'+fileContent);
    return fileContent
  };
  return req.formData().then(formdata=>{
    console.log('文件名为：'+formdata.get('File').name)
    return reader.readAsText(formdata.get('File')); //文件内容
  })
}

//根据映射关系修改URL,还未写完
function AddURL(req){

  return req;
}
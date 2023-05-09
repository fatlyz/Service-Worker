if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../static/sw.js', { scope: '/static/' }).then(function(reg) {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
}
function getdata(){
    fetch('/getinfo/').then(res => {
        return res.text()
        }).then(
        data => console.log(data)
    )  
}
function uploadfile(tag){
    var filenumber = parseInt(tag)+1
    var file = document.getElementById("file"+filenumber).files[0];
    var formData = new FormData();
    formData.append("File",file);
    for (const [name, value] of formData.entries()) {
        console.log(name, value);
        console.log(typeof value); // 输出对应字段值的类型
      }
      console.log(file.name)
    fetch('/fileup/',{
        method:'POST',
        body: formData,
        //不可以在代码中设置这个Content-Type，因为浏览器对于formdata数据会自动生成一个随机的分隔符
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // }
    }).then(res => res.text())
    .then(data => console.log(data))
    .catch(err => console.error(err))
}

function download(ID){
    console.log(ID)
  var data = {file : ID}
  fetch('/download?file='+data.file).then((response) => response.blob())
  .then((blob) => {
    console.log(blob)
    return URL.createObjectURL(blob)})
    .then((href) => {
        const a = document.createElement("a")
        document.body.appendChild(a)
        a.style = "display: none"
        a.href = href
        a.download = ID
        a.click()
        return 0
    })
}
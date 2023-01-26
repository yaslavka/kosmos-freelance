var formData = new FormData();
var imagefile = document.querySelector('#file');
formData.append("image", imagefile.files[0]);
axios.post('upload_file', formData, {headers: {'Content-Type': 'application/octet-stream'}})

{"avatar":{"name":"slide-2-.jpg","data":{"type":"Buffer","data":[здесь двоичный код]},"size":558244,"encoding":"7bit","tempFilePath":"","truncated":false,"mimetype":"image/jpeg","md5":"ed8f3fcafcff7bf2c58951fb88418fab"}}

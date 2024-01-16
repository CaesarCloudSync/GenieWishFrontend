export default function ConvertBase64(file:any,setState:any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        const base64image:any = reader.result
        setState(base64image)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
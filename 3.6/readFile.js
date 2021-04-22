// const fs = require('fs');

// fs.readFile(
//     __dirname + '/readme.txt', //처리할 파일경로 포함 파일명
//     (err, data) =>{  //처리후 실행할 콜백함수
//     if(err){
//         throw err;
//     }
//     console.log(data);  //buffer 객체
//     console.log(data.toString());
// });

const fs = require('fs').promises

fs.readFile(__dirname + '/readme.txt')
   .then((data) => {
        console.log(data);  //buffer 객체
        console.log(data.toString());
   })
   .catch((err) => {
        console.error(err);
   })
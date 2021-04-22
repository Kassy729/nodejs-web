// const http = require('http');

// http.createServer(  //http.Server객체를 생성
//     (req,res) => {  //(request, response)=>{}
//         //여기에 어떻게 응답할 지 작성

//     }
// );  //Server객체가 만들어짐

// const http = require('http');

// //HTTP

// http.createServer(
//     (req,res) => {  
//         res.writeHead(
//             200, //응답코드
//             {'Content-Type' : 'text/html; charset=utf8'}
//             //헤더들
//         );
//         res.write('<h1>안녕 노드!</h1>');
//         res.end('<p>헬로 서버!</p>')
//     }
// ).listen(
//     8081, //포트번호 : 서버(기계)의 해당 서비스구분(프로세스 구분)
//     () => {
//         console.log('8081번 포트에서 서버대기중');
//         console.log('http://localhost:8081/ 접속');

//     }
// );  

// const http = require('http');

// const server = http.createServer((req,res) => {
//     res.writeHead(200,{ 'Content-Type' : 'text/html; charset=utf8' });
//     res.write('<H2>안녕노드야 반가워<h2>');
//     res.write('<h3>나도 반가워!<h3>');
//     res.end('<p>헤헤헤<p>');
// })
// server.listen(8080);

// server.on('listening', () => {
//     console.log('8080대기중입니다');
// });
// server.on('error', (error) => {
//     console.error(error);
// });


// const http = require('http');

// const server = http.createServer((req, res) => {
//                 res.writeHead(200, {});
//                 res.write('<h1>Hello World</h1>');
//                 res.write('<h2>hahh<h2>');
//                 res.end('<p>Hello Server<p>');
// });
// server.listen(8080, () => {
//     console.log('8080포트 서버 대기중입니다.');
// });

// http.createServer((req,res) => {
//     res.writeHead(200, {});
//     res.write('<h1>What<h1>');
//     res.end('<p>hihihihihi<p>');
// }).listen(8081, () => {
//     console.log('8081 서버가 대기중 입니다.')
// });

const http = require('http');
const fs = require('fs').promises;

http.createServer(async(req,res) => {
    try {
        const data = await fs.readFile('./server2.html') ;
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        res.end(data);
    } catch (error) {
        console.error(err);
        res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'});
        res.end(err.message);
    }
}).listen(8081, () => {
    console.log('8081번 포트에서 서버 대기중입니다.');
})







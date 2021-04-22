const http = require('http');
const fs = require('fs').promises;

http.createServer(
    async(req,res) => {
        try {
            const data = await fs.readFile('./server2.html');
                  //data의 타입은? Buffer객체
            res.writeHead(
                200, //응답코드
                {'Content-Type' : 'text/html; charset=utf8'}
                //헤더들
                );
            res.end(data);
        } catch (error) {
            console.error(error);
            res.writeHead(
                500, //응답코드
                {'Content-Type' : 'text/html; charset=utf8'}
            );
            res.end(error.message);
        }
    }
).listen(
    8081, //포트번호 : 서버(기계)의 해당 서비스구분(프로세스 구분)
    () => {
        console.log('8081번 포트에서 서버대기중');
        console.log('http://localhost:8081/ 접속');
    }
);  
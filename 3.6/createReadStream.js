const fs = require('fs');

const readStream = fs.createReadStream(
    './readme3.txt',
    {highWaterMark: 16}
);
const dataArray = [];

readStream.on(  //이벤트와 이벤트리스너를 연결하는 메서드
    'data', //이벤트명, 처리할 데이터가 있으면 발생하는 이벤트  
    (chunk) => { //이벤트처리함수 - 이벤트핸들러, 이벤트리스너
        data.push(chunk);
        console.log('data : ', chunk, chunk.length);
    }
);

readStream.on(
    'end',  //처리할 데이터가 없으면 발생
    () => {  //이벤트 리스너가 실헹
    console.log('end : ', Buffer.concat(dataArray).toString);
});

readStream.on('error', (err) => {
    console.log('error : ', err);
});


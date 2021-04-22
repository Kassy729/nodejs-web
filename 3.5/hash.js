const crypto = require('crypto');

console.log('base64: ', crypto.createHash('sha512') //사용할 해시 알고리즘을 선택하여 crypto객체 생성
                                    .update('암호화할 문자열')  //암호화시킴
                                    // .digest('hex'));  //base64 엔코딩처리
                                    .digest('base64'));

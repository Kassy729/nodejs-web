const crypto = require('crypto');

crypto.randomBytes(
    64, //발생시킬 문자열 길이
    (err,buf) => {//설정된 길이만큼 문자열이 생성되면 호출(콜백)
        const salt = '나의소금'.toString('base64');
        console.log('salt: ', salt);
        crypto.pbkdf2(
            '암호화할 문자열', 
            salt, 
            100000, //반복횟수
            64, //길이
            'sha512', //암호알고리즘
            (err,key) => {
                console.log('password: ', 
                key.toString('base64'));
            }
        )
    }
);

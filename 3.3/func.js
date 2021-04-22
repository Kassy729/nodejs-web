const { odd, even } = require('./var');
//다른 파일의 모듈 불러오기 : require(모듈경로)
//구조분해 할당

function checkOddOrEven(num){
    if(num % 2){
        return odd;
    }
    return even;
}

module.exports = checkOddOrEven;
//모듈로 함수 내보내기
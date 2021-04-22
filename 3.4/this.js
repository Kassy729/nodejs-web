console.log(this);
console.log(this === module.exports);
console.log(this === exports)
// === : 값과 타입(데이터형, data type)이 같아야 true

function whatIsThis(){
    console.log('function', this === exports, this === global);
}
whatIsThis();


//process.env.NODE_ENV 
//환경변수를 의미한다.

if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
}
else{
    module.exports = require('./dev');
}
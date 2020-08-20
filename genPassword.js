const bcrpyt = require ('bcrypt') ; 

let pswrd = bcrpyt.hashSync('12345',9) ;
console.log(pswrd) ;
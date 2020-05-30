var jwt = require('jsonwebtoken')
module.exports = {
    sign:function(tokan,secret){
        return jwt.sign(tokan,secret,{});
    },
    verify:function(token,secret){
        try{
            var data = jwt.verify(token,secret)
            return {data};
        }catch(error){
            return {error};
        }
    }
}
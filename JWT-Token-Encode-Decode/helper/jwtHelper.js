var jwt = require('jsonwebtoken');
module.exports = {
    sign: function (secret) {
        return jwt.sign({ name: 'Akshay Jain' }, secret, {})
    },
    verify: async function (token, secret) {
        try {
            var data = await jwt.verify(token, secret);
            return { data };
        } catch (error) {
            if (error) {
                console.log("Error ocuure while verity the token");
                return { error };
            }
        }
    }
};
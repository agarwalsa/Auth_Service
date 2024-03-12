const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const bcrypt = require('bcrypt');
const{JWT_KEY} = require('../config/serverConfig');
class UserService{

    constructor(){
        this.userRepository = new UserRepository();
    }
    async create(data){
        try{
              const user = this.userRepository.create(data);
              return user;
        }catch(error){
            console.log("something went wrong in the service layer");
            throw error;
        }
    }
    createToken(user){
        try{
           const result = jwt.sign(user,JWT_KEY,{expiresIn: '1h'});
           return result;
        }catch(error){
            console.log("something went wrong in the token creation");
            throw error;
        }
    }
    verifyToken(token){
        try{
             const response = jwt.verify(token,JWT_KEY)
             return response;
        }catch(error){
            console.log("something went wrong in the token validation",error);
            throw error;

        }
    }
    checkPassword(userInputplainPassword,encryptedPassword){
        try{
           return bcrypt.compareSync(userInputplainPassword,encryptedPassword);
        }catch(error){
            console.log("something went wrong in the password comparasion above up");
            throw error;
        }
    }
}
module.exports = UserService;
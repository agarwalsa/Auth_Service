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
    async signIn(email,plainPassword){
        try{
              
            //fetch the user using the email id
            const user = await this.userRepository.getByEmail(email);

            //compare incoming password with the stored password
            const passwordMatch = this.checkPassword(plainPassword,user.password);
            if(!passwordMatch)
            {
                console.log("Password does not match");
                throw {error:'incorrect password'};
            }
            //  if password match create a new jwt token
            const newJWT = this.createToken({email:user.email,id:user.id});
            return newJWT;
        }catch(error){
            console.log("something went wrong in the service layer");
            throw error;
        }
    }
    async isAuthenticated(token){
        try{
             const response = this.verifyToken(token);
             if(!response){
                
                throw {error: 'Invalid token'}
             }
             const user = await this.userRepository.getbyId(response.id);
            if(!user)
            {

                throw {error: 'user no more exists'}
            }
            return user.id;
        }catch(error){
            console.log("something went wrong in the service layer");
            throw error;
        }
    }
}
module.exports = UserService;
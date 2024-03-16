const {response} = require('express');
const UserService  = require('../services/user-service');

const userService = new UserService();


const create = async(req,res) => {
    try{
             const response = await userService.create({
                email: req.body.email,
                password: req.body.password
             
            });
            return res.status(201).json({
                  success: true,
                  message:"successfully created a new user",
                  data: response,
                  err:{}
            });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"something went wrong here",
            data:{},
            success:false,
            err:error
        })
    }
}
const signIn = async(req,res) => {
    try{
          const response = await userService.signIn( req.body.email,req.body.password);
        //   return response;
          return res.status(200).json({
            success: true,
            message:"successfully signed in up",
            data: response,
            err:{}
      });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"something went wrong here",
            data:{},
            success:false,
            err:error
        })
    }
}
const isAuthenticated = async(req,res) => {
    try{
           const token = req.headers['x-access-token'];
           const response = await userService.isAuthenticated(token);
           return res.status(201).json({
            message: "user is authenticated in a successful manner",
            data: response,
            success: true,
            err: {}
           })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"something went wrong here",
            data:{},
            success:false,
            err:error
        })
    }
}
const isAdmin = async(req,res) => {
    try{
          
        const response = await userService.isAdmin(req.body.userId);
        return res.status(200).json({
            data:response,
            message:"user is predicted wheather he is an admin or not",
            success:true,
            err:{}
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "something went wrong here",
            data:{},
            success:false,
            err:error
        })
    }
}
module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}
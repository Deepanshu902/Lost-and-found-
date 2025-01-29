import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import {User} from "../models/user.models.js"
import {generateAccessAndRefreshTokens} from "../utils/generateAccessAndRefreshTokens.js"



const options = {
    httpOnly:true, 
    secure:true
 }


const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body

    if(!email || !password){
        throw new ApiError(500,"Both email and password is required")
    }

    const user =  await User.findOne({
        $or : [{email}]
     })

    if(!user){
     throw new ApiError(500,"No user exist ")
     
    }

    const givenPassword = await user.isPasswordCorrect(password)

    if(!givenPassword){
        throw new ApiError(401,"Password is not correct")
    }

    const {refreshToken,accessToken} =  await generateAccessAndRefreshTokens(user._id) 

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
     )

     return res.status(200).
     json(new ApiResponse(200,loggedInUser,"User Logged in successfully")).
     cookie("refreshToken",refreshToken,options).
     cookie("accessToken",accessToken,options)
    })

const registerUser = asyncHandler(async(req,res)=>{
    const {email,password,username,name} = req.body

    if(!email || !password || !username ||!name){
        throw new ApiError(401,"All the feilds are required")
    }

    const existedUser = await User.findOne({
        $or:[{email},{username}]
    })

    if(existedUser){
        throw new ApiError(401,"User Already Exist")
    }

    const user = await User.create({
        email,password,username:username.toLowerCase(),name
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong ")
     }


    return res.status(200).json(new ApiResponse(200,createdUser,"User Created Successfully ")) 

    })

export {
    loginUser,
    registerUser
}
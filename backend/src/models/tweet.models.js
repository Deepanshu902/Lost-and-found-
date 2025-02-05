import mongoose from "mongoose";
import {User} from "../models/user.models.js"


const TweetSchema = mongoose.Schema({
    
    content:{
        type:String,
        required:true,

    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    }
    
},{timestamps:true})




export const Tweet = mongoose.model("Tweet",TweetSchema)
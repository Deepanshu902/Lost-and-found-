import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import {Report} from "../models/report.models.js"
import {User} from "../models/user.models.js"
import mongoose,{ isValidObjectId } from "mongoose"



const createReport = asyncHandler(async (req, res) => {
    const { title, content, location,status } = req.body;

    if (!title || !content || !location || !status) {
        throw new ApiError(400, "Title, content, status, and location are required");
    }

    
    const user = await User.findById(req.user?._id).select("number");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const report = await Report.create({
        title,
        content,
        location,
        owner: req.user?._id,
        number:user.number,
        status
    });

    if (!report) {
        throw new ApiError(500, "Error while creating report");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, report, "Report created successfully"));
});


const getUserReports = asyncHandler(async (req, res) => {
   
    const {userId} = req.params
    
    if(!isValidObjectId(userId)){
        throw new ApiError(401,"Not valid userId")
    }

    const user = await User.findById(userId)

    if(!user){
        throw new ApiError(401,"No user found")
    }

    const reports = await Report.find({owner:userId})

    return res.status(200).json(new ApiResponse(
        200,
        reports,
        "Successfully Fetched Reports")
    )



})

const updateReport = asyncHandler(async (req, res) => {
    
    const {content,status} = req.body
    const {reportId}  = req.params

    if(!isValidObjectId(reportId)){
        throw new ApiError(401,"Not valid userId")
    }
    if(!content && !status){
        throw new ApiError(401,"Enter content")

    }
        const report = await Report.findOneAndUpdate(
            {
                _id:reportId,
                owner: req.user?._id
            },
            {   
                $set:{
                content : content,
                status : status
            }
            },
            {
                new:true
            }
        )
        if(!report){
            throw new ApiError(401,"No report found ")
        }   

        return res
        .status(200)
        .json(new ApiResponse(201, report, "Successfully updated the report"));
    

})

const deleteReport = asyncHandler(async (req, res) => {
    
    const {reportId} = req.params

    if(!isValidObjectId(reportId)){
        throw new ApiError(401,"Not valid reportId")
    }
    const deleteReport = await Report.findOneAndDelete(
        {
            _id: reportId,
            owner: req.user?._id,
        }
    )

    if(!deleteReport){
        throw new ApiError(500,"No report or you are not owner of report")
    }

    return res.status(200).json(new ApiResponse(200,{},"Successfully deleted the report"))

})

export {
    createReport,
    getUserReports,
    updateReport,
    deleteReport
}
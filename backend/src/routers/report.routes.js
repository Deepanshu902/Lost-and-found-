import { Router } from 'express';
import {
    createReport,
    getUserReports,
    updateReport,
    deleteReport
} from "../controller/report.controller.js"
import {verifyJWT} from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js"



const router = Router();
router.use(verifyJWT); 
router.use(upload.none());

router.route("/").post(createReport);
router.route("/user/:userId").get(getUserReports);
router.route("/:reportId").put(updateReport).delete(deleteReport);
// patch for updating one field and put for updating  2 or more field

export default router
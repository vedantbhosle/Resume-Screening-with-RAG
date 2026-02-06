import express from "express"
import multer from "multer"
import {uploadFiles} from "../controllers/uploadController"
import {analyze} from "../controllers/analysisController"
import {chat} from "../controllers/chatController"

const router = express.Router()
const upload = multer({dest:"uploads/"})

router.post("/upload",
 upload.fields([{name:"resume", maxCount: 1},{name:"jd", maxCount: 1}]),
 uploadFiles
)

router.post("/analyze",analyze)
router.post("/chat",chat)

export default router

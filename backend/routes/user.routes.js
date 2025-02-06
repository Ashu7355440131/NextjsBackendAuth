import { Router } from 'express';
import { getUserAndProfile, login, register,requestPasswordResetOTP,updateUserProfile,uploadProfilePicture, verifyPasswordResetOTP } from '../controllers/user.controllers.js';
import multer from 'multer';
const router=Router();

//for updating profile
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");//folder name
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({storage:storage});






router.route("/update_profile_picture").post(upload.single('profile_picture'),uploadProfilePicture);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user_update").post(updateUserProfile);
router.route("/request_otp").post(requestPasswordResetOTP);
router.route("/reset-password").post(verifyPasswordResetOTP);
router.route("/get_user_and_profile").get(getUserAndProfile)
export default router;
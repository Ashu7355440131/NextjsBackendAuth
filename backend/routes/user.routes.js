import { Router } from 'express';
import { acceptConnectionRequest, getAllUserProfile, getMyConnectionRequests, getUserAndProfile, login, register,requestPasswordResetOTP,sendConnectionRequest,updateProfileData,updateUserProfile,uploadProfilePicture, verifyPasswordResetOTP, whatAreMyConnections } from '../controllers/user.controllers.js';
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
router.route("/get_user_and_profile").get(getUserAndProfile);
router.route("/update_profile_data").post(updateProfileData);
router.route("/user/get_all_user").get(getAllUserProfile);
router.route("/user/send_connection_requset").post(sendConnectionRequest);
router.route("/user/getConnectionRequest").get(getMyConnectionRequests);
router.route("/user/user_connection_request").get(whatAreMyConnections);
router.route("/user/accept_connection_request").post(acceptConnectionRequest);
export default router;
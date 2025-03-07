import { Router } from 'express';
import {activeCheck} from '../controllers/post.controllers.js';




const router=Router();


router.route("/").get(activeCheck);







export default router;
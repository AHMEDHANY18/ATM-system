import { Router } from "express";
const router = Router();
import * as UC from "./user.controller.js";
import { auth } from "../../middelware/auth.js";
import { validate } from "../../middelware/validation.js";
import * as UV from "./userValidation.js";


router.post("/signup", validate(UV.signupValidation), UC.signup);
router.post("/signin", validate(UV.signinValidation), UC.signin);
router.get("/getacc", auth(), UC.getAcc);
router.post("/requestPasswordReset", validate(UV.requestPasswordResetValidation), UC.requestPasswordReset);
router.patch('/updatePassword', auth(), validate(UV.updatePasswordValidation), UC.updatePassword);
router.post("/resetPassword", validate(UV.resetPasswordValidation), UC.resetPassword);
router.post("/confirm", UC.confirmEmail);

export default router;

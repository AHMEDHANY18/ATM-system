import { Router } from "express";
import * as AC from "./account.controller.js";
import { auth } from "../../middelware/auth.js";
import { systemRole } from "../../../Utility/sysrole.js";

const router = Router();

router.post('/createAcc', auth('user'), AC.createAccount);
router.post('/deposit',  auth([systemRole.user]) , AC.deposit);
router.post('/withdraw',  auth([systemRole.user]) , AC.withdraw);
router.get('/balance',  auth([systemRole.user]) , AC.getBalance);
router.get('/transactions',  auth([systemRole.user]) , AC.getTransactions);

export default router;

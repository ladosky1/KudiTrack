import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { protect } from "../middleware/auth.middleware";

import { 
    createTransaction,
    getTransaction,
    clearTransactions,
    updateTransaction,
    deleteTransaction, } from "../controllers/transaction.controller";


const router = Router();

router.use(protect);

router.route("/")
    .post(asyncHandler(createTransaction))
    .get(asyncHandler(getTransaction));

router.route("/clear-all")
    .delete(asyncHandler(clearTransactions));

router.route("/:id")
    .patch(asyncHandler(updateTransaction))
    .delete(asyncHandler(deleteTransaction));

export default router;
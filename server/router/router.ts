import { Router } from "express";

// ROUTES
import api from "./register/register.controllers";

const router = Router();

router.use("/v1", api)

export default router;
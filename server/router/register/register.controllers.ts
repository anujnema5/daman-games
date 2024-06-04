import { Router } from "express";
import { registerUser, sendMail } from "./register.services";
import { use } from "../../utils/api.use";

const api: Router = Router();

api.post('/register', use(registerUser))
api.get('/send-mail', use(sendMail))

export default api;
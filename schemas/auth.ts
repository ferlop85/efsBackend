import { Request, Response } from "express"
import { ClientSession } from "mongoose"
import z from "zod"

export interface User {
  _id?: string
  sub?: string
  firstname: string
  lastname: string
  roles: {
    admin: boolean
    seller: boolean
  }
  email?: string
  login_code?: string
  image_url?: string
}

export interface MyRequest<
  ReqBody = any,
  ReqParams = any,
  ReqQuery = any,
  ResBody = any,
  Locals extends Record<string, any> = any
> extends Request<ReqParams, ResBody, ReqBody, ReqQuery, Locals> {
  user?: User
  session?: ClientSession
  cookies: {
    jwt: string
  }
}

export interface MyResponse<
  ResBody = {
    ok: boolean
    message?: string
    data?: any
  }
> extends Response<ResBody> {}

const emailParamSchema = z.object({ email: z.string().email("Email inválido") })

const LoginBody = z.object({ code: z.string().length(6) })

export const LoginSchema = z.object({
  body: LoginBody,
  params: emailParamSchema,
})

export const GetCodeSchema = z.object({
  params: emailParamSchema,
})

export type LoginBody = z.infer<typeof LoginBody>
export type LoginParams = z.infer<typeof emailParamSchema>
export type GetCodeParams = z.infer<typeof emailParamSchema>

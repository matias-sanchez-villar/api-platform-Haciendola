import { Request, Response } from "express";
import { renewToken } from "../helpers/token";

export async function verify( req: Request, res: Response): Promise<Response | void> {
  try {
    return res.status(200).send({ ok: true});
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function renew( req: Request, res: Response): Promise<Response | void> {
  try {
    const { token } = req.body;
    const newToken = await renewToken(token)
    return res.status(200)
              .header("Authorization", `Bearer ${newToken}`)
              .setHeader("Access-Control-Expose-Headers", `Bearer ${newToken}`)
              .setHeader("pepe", `Bearer ${newToken}`)
              .send({token: newToken});
  } catch (e) {
    return res.status(400).json(e);
  }
}
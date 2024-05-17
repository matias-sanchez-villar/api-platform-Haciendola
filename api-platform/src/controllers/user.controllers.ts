import { Request, Response } from "express";
import { User } from "../database/models/Users";
import { Credential } from "../database/models/Credentials";
import { encryptPassword, comparePasswords } from "../helpers/encrypt";
import { createToken } from "../helpers/token";

export async function postLogin(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(404)
        .json({
          error:
            "Campos incompletos, por favor complete todos los campos y vuelva a intentarlo",
        });
    }

    const credential = await Credential.findOne({ where: { email } });

    if (
      !credential ||
      !(await comparePasswords(password, credential.password))
    ) {
      return res.status(404).json({ error: "Credenciales incorrectas" });
    }

    const user = await User.findByPk(credential.user_id);
    const token = createToken({
      firstName: user?.first_name,
      lastName: user?.last_name,
      email,
    });

    return res
      .status(200)
      .header("Authorization", `Bearer ${token}`)
      .send({ token, user });
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function postNew(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const { firstName, lastName, phone, dateOfBirth, email, password } =
      req.body;
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(404)
        .json({
          error:
            "Campos incompletos, por favor complete todos los campos y vuelva a intentarlo",
        });
    }

    const credentialEmail = await Credential.findOne({ where: { email } });

    if (credentialEmail) {
      return res
        .status(404)
        .json({ error: "El correo electronico ya se encuentra registrado" });
    }

    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      phone,
      date_of_birth: dateOfBirth,
    });

    if (!user.id) {
      return res
        .status(500)
        .json({ error: "Error interno del servidor al procesar la solicitud" });
    }

    const hashedPassword = await encryptPassword(password);

    const credential = await Credential.create({
      user_id: user.id,
      email,
      password: hashedPassword,
    });

    if (!credential) {
      return res
        .status(500)
        .json({ error: "Error interno del servidor al procesar la solicitud" });
    }
    const token = createToken({
      firstName: user?.first_name,
      lastName: user?.last_name,
      email,
    });

    return res
      .status(200)
      .header("Authorization", `Bearer ${token}`)
      .send({ token, user });
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function postResetPassword(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(404)
        .json({
          error:
            "Campos incompletos, por favor complete todos los campos y vuelva a intentarlo",
        });
    }
    const hashedPassword = await encryptPassword(password);
    const credential = await Credential.update(
      { password: hashedPassword },
      {
        where: {
          email: email,
        },
      }
    );

    if (!credential) {
      return res
        .status(500)
        .json({ error: "Error interno del servidor al procesar la solicitud" });
    }

    return res
      .status(200)
      .send({ ok: "La contraseña fue modificada correctamente" });
  } catch (e) {
    return res.status(400).json(e);
  }
}

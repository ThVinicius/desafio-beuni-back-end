import { Request, Response } from 'express'
import customerService from '../services/customerService'
import { ICustomer } from './../types/customerType'

async function signUp(req: Request, res: Response) {
  const userData = req.body

  delete userData.confirmPassword

  await customerService.add(userData)

  return res.sendStatus(201)
}

async function signIn(req: Request, res: Response) {
  const userData = req.body as ICustomer

  const token = await customerService.handleSignIn(userData)

  return res.status(200).send({ token })
}

export default { signUp, signIn }

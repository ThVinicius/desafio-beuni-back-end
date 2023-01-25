import { Request, Response } from 'express'
import customerService from '../services/customerService'

async function signUp(req: Request, res: Response) {
  const userData = req.body

  delete userData.confirmPassword

  await customerService.add(userData)

  return res.sendStatus(201)
}

export default { signUp }

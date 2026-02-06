import {askQuestion} from "../services/ragService"
import { Request, Response } from 'express'

export async function chat(req: Request, res: Response){
  const {question} = req.body
  const answer = await askQuestion(question)
  res.json({answer})
}

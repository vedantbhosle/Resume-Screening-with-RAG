import {calculateMatch} from "../services/scoringService"
import { Request, Response } from 'express'

export function analyze(req: Request, res: Response){
  const {resumeText,jdText} = req.body
  const result = calculateMatch(resumeText,jdText)
  res.json(result)
}

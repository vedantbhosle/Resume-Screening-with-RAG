import {extractText} from "../services/pdfService"
import {chunkText} from "../utils/chunkText"
import {getEmbedding} from "../services/embeddingService"
import {addToStore} from "../services/vectorStore"
import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'

export async function uploadFiles(req: Request, res: Response){
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  
  if (!files || !files.resume || !files.jd) {
    return res.status(400).json({ error: "Missing files" });
  }

  const resumePath = files.resume[0].path
  const jdPath = files.jd[0].path

  try {
    const resumeText = await extractText(resumePath)
    const jdText = await extractText(jdPath)

    const chunks = chunkText(resumeText)

    for(const c of chunks){
      const emb = await getEmbedding(c)
      addToStore({
        id:uuidv4(),
        text:c,
        embedding:emb
      })
    }

    res.json({resumeText,jdText})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Processing failed" });
  }
}

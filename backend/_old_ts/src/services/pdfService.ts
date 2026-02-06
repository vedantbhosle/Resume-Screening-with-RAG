import pdf from "pdf-parse"
import fs from "fs"

export async function extractText(filePath:string){
  if(filePath.endsWith(".pdf")){
    const dataBuffer = fs.readFileSync(filePath)
    const data = await pdf(dataBuffer)
    return data.text
  }
  return fs.readFileSync(filePath,"utf-8")
}

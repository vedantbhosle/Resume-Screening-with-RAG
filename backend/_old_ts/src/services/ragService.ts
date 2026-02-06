import OpenAI from "openai"
import {getEmbedding} from "./embeddingService"
import {searchSimilar} from "./vectorStore"

const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY})

export async function askQuestion(question:string){
  const qEmbed = await getEmbedding(question)
  const contextChunks = searchSimilar(qEmbed)

  const context = contextChunks.map(c=>c.text).join("\n")

  const prompt = `
Answer using only the context below.

Context:
${context}

Question:
${question}
`

  const res = await openai.chat.completions.create({
    model:"gpt-4o-mini",
    messages:[{role:"user",content:prompt}]
  })

  return res.choices[0].message.content
}

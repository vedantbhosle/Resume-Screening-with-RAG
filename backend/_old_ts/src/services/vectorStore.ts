export type Chunk = {
  id:string,
  text:string,
  embedding:number[]
}

let store:Chunk[] = []

export function addToStore(chunk:Chunk){
  store.push(chunk)
}

export function getStore(){
  return store
}

export function cosineSim(a:number[],b:number[]){
  let dot=0, normA=0, normB=0
  for(let i=0;i<a.length;i++){
    dot+=a[i]*b[i]
    normA+=a[i]*a[i]
    normB+=b[i]*b[i]
  }
  if(normA === 0 || normB === 0) return 0
  return dot/(Math.sqrt(normA)*Math.sqrt(normB))
}

export function searchSimilar(queryEmbedding:number[]){
  const scored = store.map(c=>({
    text:c.text,
    score:cosineSim(queryEmbedding,c.embedding)
  }))

  return scored.sort((a,b)=>b.score-a.score).slice(0,3)
}

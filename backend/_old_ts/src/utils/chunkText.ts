export function chunkText(text:string){
  const size = 800
  const overlap = 150
  const chunks = []

  for(let i=0;i<text.length;i+=size-overlap){
    chunks.push(text.slice(i,i+size))
  }
  return chunks
}

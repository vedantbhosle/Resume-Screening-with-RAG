const skillDB = ["react","node","python","aws","docker","sql","mongodb","typescript"]

export function extractSkills(text:string){
  const lower=text.toLowerCase()
  return skillDB.filter(s=>lower.includes(s))
}

export function calculateMatch(resume:string,jd:string){
  const rSkills = extractSkills(resume)
  const jSkills = extractSkills(jd)

  const matched = jSkills.filter(s=>rSkills.includes(s))
  const missing = jSkills.filter(s=>!rSkills.includes(s))

  // Prevent division by zero
  const score = jSkills.length > 0 ? Math.round((matched.length/jSkills.length)*100) : 0

  return {score, matched, missing}
}

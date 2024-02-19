const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

module.exports.handler = async (event) => {
  for(const record of event.Records){
    const parsedRecord = JSON.parse(record.body)
    const job = await prisma.job.findUnique({
      where: {
        id: parsedRecord.id
      }
    })
    
    if(job){
      const titleModeration = await fetch(process.env.BASE_URL_OPEN_AI_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPEN_AI_API_KEY}`
        },
        body: JSON.stringify({input: job.title})
      })

      const titleModerationResponse = await titleModeration.json()

      const descriptionModeration = await fetch(process.env.BASE_URL_OPEN_AI_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPEN_AI_API_KEY}`
        },
        body: JSON.stringify({input: job.description})
      })

      const descriptionModerationResponse = await descriptionModeration.json()

      let status = 'published'
      const notes = []

      if(titleModerationResponse.results[0].flagged === true) {
        status = 'rejected' 
        const harmfullContentsFound = Object.entries(titleModerationResponse.results[0].categories)
        .filter(item => {
          if(item[1] === true){
            return item
          }
        
          return false
        })
        .map(item => item[0]).join(',') 
        notes.push(`Some harmfulls contents was found in job posting title: ${harmfullContentsFound}.`)
      } 
      
      if(descriptionModerationResponse.results[0].flagged === true) {
        status = 'rejected'
        const harmfullContentsFound = Object.entries(descriptionModerationResponse.results[0].categories)
        .filter(item => {
          if(item[1] === true){
            return item
          }
        
          return false
        })
        .map(item => item[0]).join(',') 
        notes.push(`Some harmfulls contents was found in job posting description: ${harmfullContentsFound}.`)
      }
      
      await prisma.job.update({
        where: {
          id: job.id
        },
        data: {
          status,
          notes: notes.length > 0 ? notes.join(';') : null
        }
      })

    }

  }

  return {
    statusCode: 200,
  };
};

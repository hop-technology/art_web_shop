
const Queue = require('bee-queue')
const data = require('../../public/convertcsv.json')

const run = async () => {
 
 const products = data 

  const queue = new Queue('GraphCMS Import')

   await Promise.all(
    products.map(async (row) => {
      const job = await queue.createJob(row).backoff('fixed', 5000).save()

      return job
    })
  )

  queue.on('job succeeded', (jobId) => console.log(`[SUCCESS]: ${jobId}`))
  queue.on('job failed', (jobId, err) =>
    console.log(`[FAILED]: ${jobId} (${err})`)
  )

  await queue.process(async (job) => await createContentEntry(job.products)) 
}

run()

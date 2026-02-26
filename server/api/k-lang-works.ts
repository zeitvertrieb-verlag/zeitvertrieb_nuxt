import { readKlangWorks } from '../lib/db.ts'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    try {
      return await readKlangWorks()
    } catch (error) {
      throw createError({ statusCode: 500, statusMessage: 'Failed to read Klaus Lang works' })
    }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
})

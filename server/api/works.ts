import { readWorks, writeWorks } from '../lib/db.ts'

const ADMIN_PASSWORD = 'zeit2026'

export default defineEventHandler(async (event) => {
  const method = event.method
  const headers = getRequestHeaders(event)
  const authHeader = headers['authorization']
  const isAuthenticated = authHeader === `Bearer ${ADMIN_PASSWORD}`

  if (method === 'GET') {
    try {
      return await readWorks()
    } catch (error) {
      throw createError({ statusCode: 500, statusMessage: 'Failed to read works' })
    }
  }

  if (method === 'PUT' || method === 'POST') {
    if (!isAuthenticated) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }
    
    try {
      const body = await readBody(event)
      await writeWorks(body)
      return { success: true }
    } catch (error) {
      throw createError({ statusCode: 500, statusMessage: 'Failed to save works' })
    }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
})

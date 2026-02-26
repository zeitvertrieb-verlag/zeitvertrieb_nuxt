import { readWorks } from '../lib/db.ts'

const ADMIN_PASSWORD = 'zeit2026'

export default defineEventHandler(async (event) => {
  const method = event.method
  const headers = getRequestHeaders(event)
  const authHeader = headers['authorization']
  const isAuthenticated = authHeader === `Bearer ${ADMIN_PASSWORD}`

  if (method === 'GET') {
    if (!isAuthenticated) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }
    try {
      return await readWorks()
    } catch (error) {
      throw createError({ statusCode: 500, statusMessage: 'Failed to read works' })
    }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
})

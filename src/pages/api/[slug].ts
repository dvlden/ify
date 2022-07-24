import { prisma } from '@/lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method now allowed' })
  }

  // Next.js is not smart enough, to know that we're not using [...slug].ts
  // as our route, which is the only case where param can be string[]
  const slug = req.query.slug as string

  const data = await prisma.entry.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!data) {
    return res.status(404).json({ message: 'This slug could not be found.' })
  }

  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  // 60s * 60m * 24h * 30d = 2592000s
  res.setHeader('Cache-Control', 'public, max-age=2592000, immutable')

  return res.status(200).json(data)
}

import { prisma } from '@/lib/db'
import { isValidBody, isValidLink } from '@/utils/validators'
import Hashids from 'hashids'
import type { NextApiRequest, NextApiResponse } from 'next'

type RequestBody = {
  link: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method now allowed' })
  }

  if (!isValidBody<RequestBody>(req.body, ['link'])) {
    return res.status(422).json({ message: 'Unprocessable entity' })
  }

  const link = req.body.link

  if (!isValidLink(link)) {
    return res.status(422).json({ message: 'Not a valid URL.' })
  }

  const hid = new Hashids(process.env.HASHID_SALT, 3)
  const latestEntry = await prisma.entry.findMany({
    select: {
      id: true,
    },
    orderBy: {
      id: 'desc',
    },
    take: 1,
  })

  const id = (latestEntry[0]?.id || 0) + 1

  const data = await prisma.entry.create({
    data: {
      link,
      slug: hid.encode(id),
    },
  })

  return res.json(data)
}

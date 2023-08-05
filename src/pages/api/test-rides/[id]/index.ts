import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { testRideValidationSchema } from 'validationSchema/test-rides';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.test_ride
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTestRideById();
    case 'PUT':
      return updateTestRideById();
    case 'DELETE':
      return deleteTestRideById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTestRideById() {
    const data = await prisma.test_ride.findFirst(convertQueryToPrismaUtil(req.query, 'test_ride'));
    return res.status(200).json(data);
  }

  async function updateTestRideById() {
    await testRideValidationSchema.validate(req.body);
    const data = await prisma.test_ride.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTestRideById() {
    const data = await prisma.test_ride.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

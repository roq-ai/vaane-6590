import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { branchValidationSchema } from 'validationSchema/branches';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getBranches();
    case 'POST':
      return createBranch();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBranches() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.branch
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'branch'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createBranch() {
    await branchValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.enquiry?.length > 0) {
      const create_enquiry = body.enquiry;
      body.enquiry = {
        create: create_enquiry,
      };
    } else {
      delete body.enquiry;
    }
    if (body?.sales_record?.length > 0) {
      const create_sales_record = body.sales_record;
      body.sales_record = {
        create: create_sales_record,
      };
    } else {
      delete body.sales_record;
    }
    if (body?.service_record?.length > 0) {
      const create_service_record = body.service_record;
      body.service_record = {
        create: create_service_record,
      };
    } else {
      delete body.service_record;
    }
    if (body?.test_ride?.length > 0) {
      const create_test_ride = body.test_ride;
      body.test_ride = {
        create: create_test_ride,
      };
    } else {
      delete body.test_ride;
    }
    const data = await prisma.branch.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}

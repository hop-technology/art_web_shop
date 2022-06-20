import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        email,
        name,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        total,
        stripeCheckoutId,
        orderItems,
      } = req.body;

      const order = await prisma.order.create({
        data: {
          email,
          name,
          addressLine1,
          addressLine2,
          city,
          state,
          postalCode,
          total,
          stripeCheckoutId,
          orderItems,
        },
      });
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'There was a problem with creating your order',
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} is not supported`);
  }
}

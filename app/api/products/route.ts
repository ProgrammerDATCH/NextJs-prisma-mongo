import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const products = await prisma.product.findMany({ include: { shop: true } });
  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const product = await prisma.product.create({
    data: {
      name: `Product ${Math.floor(Math.random() * 100)}`,
      shop: { create: { name: `SHOP ${Math.floor(Math.random() * 100)}` } },
      price: 1000 + Math.floor(Math.random() * 100),
    },
    include: {
        shop: true
    }
  });
  return new Response(JSON.stringify(product), {
    headers: { "Content-Type": "application/json" },
  });
}


export async function DELETE(request: Request) {
    await prisma.product.deleteMany();
    await prisma.shop.deleteMany();
    return new Response('All products and shops deleted', {
      headers: { "Content-Type": "application/json" },
    });
  }
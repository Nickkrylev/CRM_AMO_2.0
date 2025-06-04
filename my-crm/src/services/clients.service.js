const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAll  = ()         => prisma.client.findMany();
exports.getById = id         => prisma.client.findUnique({ where: { id } });
exports.create  = data       => prisma.client.create({ data });
exports.update  = (id,data)  => prisma.client.update({ where: { id }, data });
exports.remove  = id         => prisma.client.delete({ where: { id } });
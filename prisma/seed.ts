import { PrismaClient, Role, InvoiceStatus, AttendanceStatus, PaymentMethod } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('password123', 10);
  const trainer = await prisma.user.upsert({
    where: { email: 'trainer@example.com' },
    update: {},
    create: {
      name: 'Entrenadora Demo',
      email: 'trainer@example.com',
      password,
      role: Role.TRAINER,
    },
  });

  const clientA = await prisma.user.create({
    data: {
      name: 'Cliente Uno',
      email: 'cliente1@example.com',
      password,
      role: Role.CLIENT,
      trainerId: trainer.id,
    },
  });

  const clientB = await prisma.user.create({
    data: {
      name: 'Cliente Dos',
      email: 'cliente2@example.com',
      password,
      role: Role.CLIENT,
      trainerId: trainer.id,
    },
  });

  const plan = await prisma.membershipPlan.create({
    data: {
      name: 'Mensual',
      price: 5000,
      cadence: 'monthly',
      createdById: trainer.id,
    },
  });

  await prisma.subscription.createMany({
    data: [
      { userId: clientA.id, planId: plan.id, startDate: new Date(), endDate: null },
      { userId: clientB.id, planId: plan.id, startDate: new Date(), endDate: null },
    ],
  });

  const template = await prisma.programTemplate.create({
    data: {
      name: 'Fuerza Base',
      goal: 'Mejorar fuerza y técnica',
      createdById: trainer.id,
      versions: {
        create: {
          versionNumber: 1,
          name: 'Semana 1',
          description: 'Rutina de inicio',
          effectiveFrom: new Date(),
        },
      },
    },
    include: { versions: true },
  });

  await prisma.workoutSession.create({
    data: {
      userId: clientA.id,
      trainerId: trainer.id,
      date: new Date(),
      planVersionId: template.versions[0].id,
      notes: 'Sesión de bienvenida',
      exerciseSets: {
        create: [
          { userId: clientA.id, exercise: 'Sentadilla', reps: 8, weight: 40, rpe: 7, pain: 1 },
          { userId: clientA.id, exercise: 'Press Banca', reps: 10, weight: 30, rpe: 7, pain: 0 },
        ],
      },
    },
  });

  await prisma.invoice.createMany({
    data: [
      { userId: clientA.id, amount: 5000, dueDate: new Date(), status: InvoiceStatus.up_to_date },
      { userId: clientB.id, amount: 5000, dueDate: new Date(), status: InvoiceStatus.due_soon },
    ],
  });

  await prisma.payment.create({
    data: {
      userId: clientA.id,
      invoiceId: 1,
      amount: 5000,
      method: PaymentMethod.transfer,
      auditLogs: {
        create: {
          message: 'Pago registrado manualmente',
        },
      },
    },
  });

  await prisma.attendance.createMany({
    data: [
      { userId: clientA.id, trainerId: trainer.id, date: new Date(), status: AttendanceStatus.PRESENT },
      { userId: clientB.id, trainerId: trainer.id, date: new Date(), status: AttendanceStatus.LATE },
    ],
  });

  await prisma.progressPhoto.create({
    data: {
      userId: clientA.id,
      url: 'https://example.com/progress.jpg',
      caption: 'Inicio',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

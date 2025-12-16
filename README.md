# Entrenadora Personal PWA

Aplicación **mobile-first** para entrenadoras y clientes con flujos rápidos de entrenamiento, pagos, progreso y comunicación. Construida con Next.js (App Router), Tailwind + shadcn-style UI y PostgreSQL/Prisma.

## Requisitos
- Node 18+
- Docker / Docker Compose
- PostgreSQL

## Setup local
1. Copia `.env.example` a `.env` y ajusta credenciales (NextAuth, S3 compatible, bootstrap de TRAINER).
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Genera el cliente Prisma y ejecuta migraciones:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
4. Ejecuta seed con datos demo (1 TRAINER, 2 CLIENTS, plan y rutina asignada):
   ```bash
   npx ts-node prisma/seed.ts
   ```
5. Inicia el servidor:
   ```bash
   npm run dev
   ```

Credenciales demo: `trainer@example.com` / `password123`.

## Arquitectura
- **Auth**: NextAuth con Credentials + middleware RBAC (TRAINER/CLIENT) que protege `/trainer` y `/client`.
- **DB**: Prisma + PostgreSQL. Modelos para usuarios, suscripciones, invoices/pagos con auditoría, asistencia, rutinas versionadas y chat con adjuntos (S3).
- **UI**: App Router con tabs inferiores, botones grandes y flujos mobile (hoy→iniciar, clientes→detalle). Tailwind y componentes estilo shadcn.
- **PWA**: `manifest.json`, `next-pwa` configurado (service worker en build prod).
- **Storage S3**: variables de entorno para endpoint y bucket.

## Docker
`docker-compose.yml` levanta app y base de datos.
```bash
docker-compose up --build
```

## Scripts útiles
- `npm run prisma:migrate`
- `npm run prisma:seed`
- `npm run build`

## Notas
- Usa `.env` para bootstrap del TRAINER inicial.
- CLIENT solo accede a sus datos y rutas cliente; middleware fuerza redirecciones.
- Versionado de planes: cada cambio crea `ProgramVersion` sin perder historial.

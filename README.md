# Entrenadora Personal PWA

Aplicación **mobile-first** para entrenadoras y clientes con flujos rápidos de entrenamiento, pagos, progreso y comunicación. Construida con Next.js (App Router), Tailwind + shadcn-style UI y PostgreSQL/Prisma.

## Requisitos
- Node 18+
- Docker / Docker Compose
- PostgreSQL
- Git instalado
- Editor recomendado: **Visual Studio Code** (VS Code)

## Antes de empezar (clona y abre el proyecto)
1. Instala Git si no lo tienes (https://git-scm.com/downloads) y VS Code (https://code.visualstudio.com/).
2. Abre una terminal (puede ser la integrada de VS Code) y clona el repositorio:
   ```bash
   git clone <URL_DEL_REPO>
   cd EntregadorPersonal
   ```
3. Abre la carpeta en VS Code para ver los archivos y seguir los pasos siguientes.

## Setup local (guía para no técnicos)
Sigue estos pasos en orden; copia/pega los comandos tal cual. Si algo falla, copia el mensaje y vuelve a pedir ayuda.

1. **Prepara las variables**
   - Duplica el archivo de ejemplo: `cp .env.example .env`
   - Abre `.env` y reemplaza los valores en mayúsculas:
     - `NEXTAUTH_SECRET`: cualquier texto largo y único (p. ej. generado con https://generate-secret.vercel.app/32)
     - `TRAINER_EMAIL` y `TRAINER_PASSWORD`: serán las credenciales iniciales de la entrenadora
     - `DATABASE_URL`: si usarás Docker, déjalo como está; si tienes Postgres propio, pon tu conexión.
     - `S3_ENDPOINT`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_BUCKET`: si no tienes S3 aún, puedes dejar valores de prueba.

2. **Instala dependencias**
   ```bash
   npm install
   ```

3. **Prepara la base de datos**
   - Genera el cliente Prisma y crea tablas:
     ```bash
     npx prisma generate
     npx prisma migrate dev
     ```

4. **Carga datos de demo** (1 TRAINER, 2 CLIENTS, plan y rutina asignada):
   ```bash
   npx ts-node prisma/seed.ts
   ```

5. **Arranca la app**
   ```bash
   npm run dev
   ```
   - Abre http://localhost:3000 en tu navegador (idealmente en modo móvil o en tu celular).

Credenciales demo (si usaste el seed y no cambiaste el `.env`): `trainer@example.com` / `password123`.

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

Guía rápida con Docker (no necesitas tener Postgres instalado):
- Asegúrate de tener Docker Desktop encendido.
- Ejecuta el comando anterior en la raíz del proyecto.
- Cuando veas el mensaje “ready” en la consola, abre http://localhost:3000.

## Scripts útiles
- `npm run prisma:migrate`
- `npm run prisma:seed`
- `npm run build`

## Notas
- Usa `.env` para bootstrap del TRAINER inicial.
- CLIENT solo accede a sus datos y rutas cliente; middleware fuerza redirecciones.
- Versionado de planes: cada cambio crea `ProgramVersion` sin perder historial.
- Para probar flujos:
  - CLIENT: pestaña “Hoy” → botón “Iniciar” → registra sets (reps, peso, RPE, dolor, notas) → “Completar sesión”.
  - TRAINER: “Clientes” → elige uno → pestañas de progreso, pagos y mensajes; desde “Rutinas” puedes crear/editar plantillas.

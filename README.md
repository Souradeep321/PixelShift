# PixelShift

PixelShift is a modern media optimization web application built with **Next.js App Router**, **Cloudinary**, **Prisma**, and **Neon PostgreSQL**.  
It allows users to upload videos, automatically optimize them, preview compressed versions, and download optimized media.

---

## ✨ Features

- 🔐 Authentication with Clerk
- 🎥 Video upload & compression using Cloudinary
- 🖼️ Automatic thumbnail & preview generation
- 📥 Optimized video downloads
- 📊 Compression stats (original vs optimized)
- 🌍 Cloud delivery via CDN
- ⚡ Built for serverless deployment

---

## 🛠 Tech Stack

- **Framework**: Next.js (App Router)
- **Auth**: Clerk
- **Database**: Neon (PostgreSQL)
- **ORM**: Prisma
- **Media Processing**: Cloudinary
- **Styling**: Tailwind CSS + DaisyUI
- **Deployment**: Vercel

---

## 📁 Project Structure


app/
├─ (auth)/
│ ├─ sign-in/
│ ├─ sign-up/
│ └─ layout.tsx
│
├─ (app)/
│ ├─ upload/
│ ├─ videos/
│ └─ layout.tsx
│
├─ page.tsx
│
lib/
└─ prisma.ts
prisma/
├─ schema.prisma
└─ migrations/
generated/
└─ prisma/


---

## 🔐 Authentication

Authentication is handled using **Clerk**.

- `/sign-in` → Clerk SignIn
- `/sign-up` → Clerk SignUp
- Auth routes share a common layout
- App routes are protected using Clerk middleware

---

## 🗄 Database

- PostgreSQL hosted on **Neon**
- Prisma ORM for schema and queries
- Connection pooling enabled for serverless environments

---

## 🎥 Media Handling

- Videos are uploaded and processed using **Cloudinary**
- Automatic optimization and format conversion
- Preview videos and thumbnails generated dynamically
- Only metadata is stored in the database

---

## 🚀 Deployment

This project is designed for **Vercel** deployment.

During deployment:
- Prisma Client is generated as part of the build process
- Environment variables are configured in Vercel
- Neon pooled database connection is used

No special setup is required for local development.

---

## 🔑 Environment Variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
DATABASE_URL=
```

## Add this command while you are deploying in vercel
in the build section
```
prisma generate && next build
```



# 🎮 Tic Tac Toe Web Application

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-brown?style=for-the-badge&logo=npm)

เกม Tic Tac Toe ที่มีระบบ Authentication และระบบคะแนน พัฒนาด้วย Next.js และ Next-auth

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## ✨ Features

### 🔐 Authentication
- OAuth 2.0 Authentication ผ่าน Google
- ระบบจัดการ Session

### 🎮 Gameplay
- ระบบเกม Player vs Bot
- 3 ระดับความยาก:
  - 🟢 Easy
  - 🟡 Medium
  - 🔴 Hard

### 📊 ระบบคะแนน
- ชนะ: +1 คะแนน
- แพ้: -1 คะแนน
- โบนัส: ชนะ 3 ครั้งติด +1 คะแนน

### 🏆 ระบบ Achievement & สถิติ
- บันทึกสถิติการเล่น
- Achievements หลากหลายรูปแบบ
- แสดงผลความสำเร็จแบบ Real-time

---

## 🚀 การติดตั้ง

1. Clone repository:
```bash
git clone https://github.com/Peemsc/OX-Web.git
cd OX-Web
```

2. ติดตั้ง dependencies:
```bash
pnpm install
```

3. ตั้งค่าไฟล์ `.env`:
```env
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

4. รันโปรเจค:
```bash
pnpm dev
```

---

## 🛠️ Tech Stack

### Core
- ⚡ Next.js 15
- 🔒 NextAuth.js
- 📦 Zustand
- 🎨 Tailwind CSS
- 📝 TypeScript

### Development Tools
```json
{
  "dependencies": {
    "next": "14.0.1",
    "next-auth": "^4.24.5",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "zustand": "^4.4.7"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.4.1",
    "postcss": "^8",
    "eslint": "^8",
    "eslint-config-next": "14.0.1"
  }
}
```

---

## 📁 โครงสร้างโปรเจค

```
📦 ox
 ┣ 📂 app/                # Next.js app router
 ┃ ┣ 📂 (auth)           # Authentication routes
 ┃ ┣ 📂 game             # Game pages
 ┃ ┗ 📂 api              # API routes
 ┣ 📂 components/         # React components
 ┃ ┣ 📂 auth/            # Authentication components
 ┃ ┣ 📂 game/            # Game components
 ┃ ┗ 📂 ui/              # UI components
 ┣ 📂 lib/               # Utilities และ logic
 ┃ ┣ 📂 game/            # Game logic
 ┃ ┣ 📂 store/           # Zustand store
 ┃ ┗ 📂 utility/         # Utility functions
 ┗ 📂 public/            # Static files
```

---

## 📝 การใช้งาน

1. 🔐 เข้าสู่ระบบด้วย Google Account
2. 🎯 เลือกระดับความยาก
3. 🎮 เริ่มเล่นเกมโดยคลิกที่ช่องที่ต้องการ
4. 🏆 ดูคะแนนและ Achievement ที่ได้รับ

---

## ⚠️ ข้อกำหนดระบบ
- Node.js version 18 ขึ้นไป
- PNPM version 8 ขึ้นไป
- แนะนำ Chromium-based browsers สำหรับประสบการณ์การใช้งานที่ดีที่สุด

---

<div align="center">

### Made with ❤️ by [SAHACHAT CHILLANONDA](https://github.com/Peemsc)

</div>
# Tic Tac Toe Web Application

เกม Tic Tac Toe ที่มีระบบ Authentication และระบบคะแนน

## Features

- OAuth 2.0 Authentication ด้วย Google
- เกม Tic Tac Toe แบบ Player vs Bot
- ระบบคะแนน
  - ชนะ: +1 คะแนน
  - แพ้: -1 คะแนน
  - ชนะ 3 ครั้งติดต่อกัน: +1 คะแนนโบนัส
- ระดับความยาก (Easy, Medium, Hard)
- ระบบ Achievement
- บันทึกสถิติการเล่น

## การติดตั้ง

1. Clone repository:
```bash
git clone [repository-url]
cd [project-name]
```

2. ติดตั้ง dependencies:
```bash
pnpm install
```

3. สร้างไฟล์ `.env` และกำหนดค่า:
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

## Tech Stack

- Next.js 14
- NextAuth.js
- Zustand
- Tailwind CSS
- TypeScript

## Dependencies
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

## โครงสร้างโปรเจค

```
📦 ox
 ┣ 📂 app/                # Next.js app router
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

## การใช้งาน

1. เข้าสู่ระบบด้วย Google Account
2. เลือกระดับความยาก
3. เริ่มเล่นเกมโดยคลิกที่ช่องที่ต้องการ
4. ดูคะแนนและ Achievement ที่ได้รับ

## หมายเหตุ
- ใช้ Node.js version 18 ขึ้นไป
- PNPM version 8 ขึ้นไป
- Chromium-based browsers is better
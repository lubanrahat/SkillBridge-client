# SkillBridge Client

SkillBridge is a premium platform connecting students with expert tutors for personalized learning. This is the frontend client application built with modern web technologies.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **UI Components:** Shadcn UI (Radix Primitives)
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Data Visualization:** Recharts
- **Networking:** Native Fetch with Custom API Wrapper

## ✨ Features

- **User Authentication:** Secure login and registration for Students and Tutors.
- **Tutor Profiles:** Detailed profiles with bios, verified badges, ratings, and subject tags.
- **Availability Management:** Interactive weekly schedule builder for tutors.
- **Booking System:** Seamless session booking with conflict detection.
- **Reviews:** Rating and review system for completed sessions.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop.
- **Admin Dashboard:** Tools for platform management (bookings, users).

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- Bun (recommended) or npm/yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd skill-bridge-client
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and add your backend API URL:

   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api/v1
   ```

4. **Run Development Server:**

   ```bash
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint

## 📁 Project Structure

```
src/
├── app/            # Next.js App Router pages
├── components/     # Reusable UI components
├── lib/            # Utilities and services
├── hooks/          # Custom React hooks
├── types/          # TypeScript definitions
└── utils/          # Helper functions
```
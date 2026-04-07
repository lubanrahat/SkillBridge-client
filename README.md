<!-- PROJECT SHIELDS -->
<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <div style="background-color: #f3f4f6; padding: 20px; border-radius: 20px; display: inline-block; margin-bottom: 20px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  </div>

  <h3 align="center">SkillBridge Client</h3>

  <p align="center">
    A premium platform connecting students with expert tutors for personalized learning.
    <br />
    <br />
    <a href="https://github.com/lubanrahat/SkillBridge-client"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://skill-bridge-client-ten.vercel.app">View Demo</a>
    ·
    <a href="#">Report Bug</a>
    ·
    <a href="#">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#features">Features</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#environment-variables">Environment Variables</a></li>
      </ul>
    </li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#available-scripts">Available Scripts</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## 🌟 About The Project

SkillBridge is a modern, high-performance web application designed to bridge the gap between students seeking knowledge and experts eager to teach. It offers a seamless, intuitive, and feature-rich interface to facilitate personalized tutoring sessions, schedule management, and interactive learning.

### 🛠️ Built With

This project is built using modern web development standards and the latest technologies to ensure performance, scalability, and an exceptional developer experience.

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Tailwind][TailwindCSS]][Tailwind-url]
* [![Shadcn][ShadcnUI]][Shadcn-url]

## ✨ Features

* 🔐 **Secure Authentication** — Robust login, registration, and role-based access control for both Students and Tutors.
* 👨‍🏫 **Tutor Profiles** — Comprehensive profiles featuring bios, verified badges, ratings, and specialized subject tags.
* 📅 **Availability Management** — An interactive, easy-to-use weekly schedule builder for tutors to manage their time.
* 🗓️ **Smart Booking System** — Frictionless session booking with built-in conflict detection to prevent double-booking.
* ⭐ **Review & Ratings** — A transparent rating system for students to leave feedback on completed sessions.
* 📱 **Responsive Design** — Pixel-perfect execution that looks beautiful on mobile, tablet, and desktop viewports.
* 🎛️ **Admin Dashboard** — Powerful tools for platform administrators to manage users, bookings, and content.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed on your local development machine:

* Node.js (v18.0.0 or higher)
* [bun](https://bun.sh/) (Recommended) or npm/yarn/pnpm

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/lubanrahat/SkillBridge-client.git
   ```
2. Navigate into the project directory
   ```sh
   cd skill-bridge-client
   ```
3. Install dependencies
   ```sh
   bun install
   ```
   *Alternative: `npm install` or `yarn install`*

### Environment Variables

Create a `.env.local` file in the root directory and configure the environment variables based on `.env.example` (if available). At a minimum, you'll need:

```env
# Backend API Base URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api/v1

# Other variables...
```

## 📁 Project Structure

```text
skill-bridge-client/
├── public/             # Static assets (images, fonts, robots.txt, etc.)
├── src/
│   ├── app/            # Next.js App Router (pages & layouts)
│   ├── components/     # Reusable React components (UI, layouts, features)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility libraries, services, API wrappers
│   ├── types/          # Global TypeScript type definitions & interfaces
│   └── utils/          # Helper functions and formatters
├── tailwind.config.ts  # Tailwind CSS configuration
├── package.json        # Dependencies and scripts
└── ...
```

## 📦 Available Scripts

In the project directory, you can run the following commands:

| Command | Description |
|---------|-------------|
| `bun dev` | Starts the development server on `http://localhost:3000`. |
| `bun build` | Builds the app for production to the `.next` folder. |
| `bun start` | Starts the production server using the built application. |
| `bun lint` | Runs ESLint to statically analyze the code for issues. |

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📫 Contact

Luban Rahat - [@lubanrahat](https://twitter.com/lubanrahat) - me@lubanrahat.com

Project Link: [https://github.com/lubanrahat/SkillBridge-client](https://github.com/lubanrahat/SkillBridge-client)

---
<p align="center">Made with ❤️ by Luban Rahat</p>

<!-- MARKDOWN LINKS & IMAGES -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[ShadcnUI]: https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white
[Shadcn-url]: https://ui.shadcn.com/
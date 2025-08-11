# not-Social

A modern, minimal, lightning-fast social app. Built to impress: clean UX, real-time feel, production-ready stack.

## Live
- Web: [LIVE](https://not-social.vercel.app/login)


## Highlights
- Optimistic like/unlike (instant UI updates)
- Real-time user search (username/full name) with debounced queries
- For You / Following feeds
- Create posts with images
- Comments with inline composer
- Follow/Unfollow + notifications
- Profile editing with Cloudinary uploads
- Liked posts and user posts tabs
- Fully responsive, accessible, keyboard-friendly UI

## Tech Stack
- Frontend: React (Vite), React Router, TanStack Query, Tailwind CSS + DaisyUI
- Backend: Node.js, Express, Mongoose (MongoDB)
- Auth: HTTP-only cookies + JWT
- Media: Cloudinary
- Deploy: Vercel (frontend+API)

## Quick Start
1) Clone and install
```bash
git clone https://github.com/your/repo.git
cd not-social
npm install
cd frontend && npm install
```

2) Env vars (create .env in project root)
   PORT=5000
  MONGODB_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret
  CLOUDINARY_CLOUD_NAME=xxx
  CLOUDINARY_API_KEY=xxx
  CLOUDINARY_API_SECRET=xxx

3) Run locally (two terminals)
```bash
# terminal 1 (backend)
npm run dev

# terminal 2 (frontend)
cd frontend
npm run dev
```

## Architecture
- Backend serves REST at /api/*
- Frontend consumes REST via TanStack Query
- Static assets built to frontend/dist (served in production)

## Why It Stands Out
- Production patterns (query keys, cache invalidation, optimistic mutations)
- Clean component design and naming
- Strong UX: zero-jank interactions, sensible empty/loading states
- Recruiter-friendly codebase: readable, consistent, maintainable

## Screenshots
- <img width="1687" height="902" alt="feed" src="https://github.com/user-attachments/assets/f93c98d0-a2e8-4978-9c7a-f584e179eeb0" />
<img width="1758" height="883" alt="signup" src="https://github.com/user-attachments/assets/0be6281a-c5c6-4ba9-89cc-7cc865d87445" />
<img width="1725" height="887" alt="login" src="https://github.com/user-attachments/assets/76ff5606-b147-46ec-a751-6bc04a407b79" />
<img width="1735" height="896" alt="profile" src="https://github.com/user-attachments/assets/b54a32c2-c0f1-41e9-9cd4-7db2b02560b9" />
<img width="1696" height="897" alt="notifications" src="https://github.com/user-attachments/assets/21a49660-912e-4d0f-99e9-ad35772b867d" />


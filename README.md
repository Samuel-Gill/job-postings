# Community Job Board

A modern, mobile-first community job board built with React, Vite, Tailwind CSS, Firebase Authentication, and Firestore. There is no custom backend; all job data is stored in the `jobs` Firestore collection.

## Features

- Google and Email/Password authentication with Firebase Auth.
- Public job listings with mobile-first cards and responsive 1/2/3 column grid.
- Authenticated users can create jobs, edit their own jobs, and mark their own jobs as closed.
- Admin users, configured by email, can delete any job.
- Client-side search and filters for title/keywords, category, tags, and status.
- Full-screen mobile modals and centered desktop modals.
- Toast notifications for create, update, delete, and error states.
- Optional dark mode toggle.

## Firestore Data Model

Collection: `jobs`

```js
{
  title: string,
  description: string,
  category: 'Full-Time' | 'Part-Time' | 'Seasonal',
  tags: string[],
  postedBy: string,
  userId: string,
  email: string,
  phone: string,
  location: string,
  status: 'active' | 'closed',
  createdAt: timestamp,
  updatedAt: timestamp
}
```

The document id is supplied by Firestore and mapped to `id` in the app.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment example and add your Firebase project values:

```bash
cp .env.example .env
```

3. Configure `.env`:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ADMIN_EMAILS=admin@example.com,moderator@example.com
```

4. Start the app:

```bash
npm run dev
```

## Firebase Setup Guide

1. Create a Firebase project at <https://console.firebase.google.com/>.
2. Add a Web App and copy the config values into `.env`.
3. Enable Authentication providers:
   - Google
   - Email/Password
4. Create a Firestore database.
5. Deploy or paste the rules from `firestore.rules`.
6. Update the hardcoded admin email list in `firestore.rules` to match `VITE_ADMIN_EMAILS`.

## Available Scripts

- `npm run dev` - run Vite locally.
- `npm run build` - create a production build.
- `npm run preview` - preview the production build.
- `npm run lint` - run ESLint.

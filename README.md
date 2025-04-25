# Next.js i18n Starter Template

A modern, full-featured Next.js 15 starter template with internationalization (i18n) support for English and Arabic, including RTL layout, dark mode, and responsive design.

## Features

- **Next.js 15** - App Router, Server Components, React Server Components
- **TypeScript** - Type safety throughout the project
- **Internationalization (i18n)** - Support for English and Arabic with Next-intl
- **RTL Support** - Full Right-to-Left layout for Arabic content
- **ShadCN UI** - High-quality, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Dark Mode** - Theme switching with next-themes
- **Authentication** - Firebase Authentication integration
- **Animations** - Framer Motion and AOS (Animate On Scroll)
- **AI Integration** - Chatbot powered by Google's Gemini AI
- **SEO Optimized** - Meta tags, Schema.org markup, sitemap generation
- **Performance** - Vercel Analytics and Speed Insights integration
- **Deployment Ready** - Optimized for Vercel deployment
- **Package Manager** - Compatible with npm, yarn, and Bun

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or Bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/next-app-i18n-starter.git
   cd next-app-i18n-starter
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Create a `.env.local` file in the root directory and add the following environment variables:
   ```
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Firebase configuration (if using Firebase)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
next-app-i18n-starter/
├── src/
│   ├── app/
│   │   ├── [locale]/           # Locale-based routing
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── (auth)/         # Auth routes (signin, signup, profile)
│   │   │   └── layout.tsx      # Layout for localized pages
│   │   ├── api/                # API routes
│   │   │   └── chat/route.ts   # Chat API for Gemini integration
│   │   ├── sitemap.ts          # Dynamic sitemap generation
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # UI components (ShadCN)
│   │   │   ├── button.tsx      # Button component
│   │   │   ├── chatbot.tsx     # Chatbot implementation
│   │   │   └── ...             # Other UI components
│   │   ├── auth/               # Authentication components
│   │   ├── layout/             # Layout components (Navbar, Footer)
│   │   ├── shared/             # Shared components
│   │   └── OmitRtl.tsx         # Component to handle RTL/LTR CSS issues
│   ├── context/                # React context providers
│   │   └── AuthContext.tsx     # Firebase authentication context
│   ├── hooks/                  # Custom hooks
│   │   └── useTransitionFix.ts # Fix for Next.js transitions with i18n
│   ├── lib/                    # Utility functions
│   │   ├── firebase.ts         # Firebase configuration
│   │   └── utils.ts            # Helper functions
│   ├── i18n/                   # i18n configuration
│   │   ├── navigation.ts       # Navigation helper for i18n
│   │   ├── request.ts          # Request-time i18n configuration
│   │   └── routing.ts          # Routing configuration for i18n
│   ├── types/                  # TypeScript type definitions
│   └── middleware.ts           # Next.js middleware for locale routing
├── dictionary/                 # Translation files
│   ├── en.json                 # English translations
│   └── ar.json                 # Arabic translations
├── public/                     # Static assets
├── next.config.ts              # Next.js configuration
├── bun.lock                    # Bun package lock file
├── package.json                # Project dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## Key Files Explained

### Configuration Files

- **next.config.ts**: Configuration for Next.js, including internationalization setup.
- **tsconfig.json**: TypeScript configuration.
- **components.json**: ShadCN UI configuration.
- **bun.lock**: Bun package manager lock file for faster installations.

### Internationalization (i18n)

This template uses `next-intl` for internationalization with the following components:

- **src/i18n/routing.ts**: Defines available locales and default locale.
- **src/i18n/navigation.ts**: Helps with internationalized routing.
- **src/i18n/request.ts**: Handles locale detection and loading translations.
- **src/middleware.ts**: Redirects users based on their preferred language.
- **dictionary/**: Contains translation files (en.json, ar.json).

### Sitemap Generation

The **src/app/sitemap.ts** file generates a dynamic sitemap that includes:
- All supported languages
- All routes in each language
- Proper priority and change frequency for SEO

### Chatbot Integration

The template includes a floating AI chatbot powered by Google's Gemini AI:

- **src/components/ui/chatbot.tsx**: Frontend component using Vercel's AI SDK
- **src/app/api/chat/route.ts**: Backend Edge API route that connects to Gemini API
- Uses streaming responses for better user experience

## Adding a New Language

1. Create a new translation file in the `dictionary` directory (e.g., `fr.json`).
2. Copy the structure from `en.json` and translate all values.
3. Add the new locale to the `locales` array in `src/i18n/routing.ts`:
   ```typescript
   export const routing = {
     locales: ['en', 'ar', 'fr'],
     defaultLocale: 'en'
   }
   ```

## Firebase Authentication

The template includes a complete authentication system using Firebase:

1. **src/lib/firebase.ts**: Firebase initialization
2. **src/context/AuthContext.tsx**: Authentication context provider
3. **src/components/auth/**: Authentication forms and components

To use Firebase authentication:
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication
3. Add your Firebase config to `.env.local`

## Theme Switching

Dark mode is implemented using `next-themes`:

- Toggle is available in the navigation bar
- Theme preference is saved in local storage
- Supports system preference detection

## Performance Monitoring

The template integrates Vercel's performance monitoring tools:

- **@vercel/analytics**: Tracks page views and user interactions
- **@vercel/speed-insights**: Measures and reports Core Web Vitals

## Chatbot Feature

The AI chatbot uses Google's Gemini AI through the Vercel AI SDK:

1. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Add the API key to your `.env.local` file
3. The chatbot is ready to use with no additional configuration

To customize the chatbot:
- Edit prompts in the translation files (`dictionary/en.json` and `dictionary/ar.json`)
- Modify the UI in `src/components/ui/chatbot.tsx`
- Adjust the API implementation in `src/app/api/chat/route.ts`

## Deployment

### Deploying to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Create a new project on [Vercel](https://vercel.com)
3. Connect your Git repository to Vercel
4. Add the environment variables from your `.env.local` file to the Vercel project settings
5. Deploy the project

Vercel will automatically detect Next.js and deploy with the optimal configuration.

### Environment Variables for Production

Make sure to set these environment variables in your production environment:

```
NEXT_PUBLIC_BASE_URL=https://your-production-domain.com
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

## Best Practices

- Use Next.js Server Components for static content and Client Components for interactive parts
- Follow the established file structure and naming conventions
- Use TypeScript interfaces for type safety
- Implement proper loading states and error handling
- Follow accessibility (a11y) guidelines
- Optimize images using Next.js Image component
- Implement proper SEO with metadata

## Common Tasks

### Adding a New Page

1. Create a new file in `src/app/[locale]/your-path/page.tsx`
2. Add translations for the page in `dictionary/en.json` and `dictionary/ar.json`
3. Add the route to the sitemap in `src/app/sitemap.ts`

### Adding a New Component

1. Create a new file in the appropriate directory under `src/components/`
2. If it's a UI component, follow the ShadCN UI patterns
3. For client components that need interactivity, add `"use client";` at the top

### Modifying Translations

1. Find the relevant section in `dictionary/en.json` and `dictionary/ar.json`
2. Add or update the translation keys and values
3. Use the translations in your components with `useTranslations(namespace)`

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

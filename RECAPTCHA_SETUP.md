# reCAPTCHA v3 Setup

## Environment Variables

Add these to your `.env.local` file:

```bash
# reCAPTCHA v3 Keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LelaA4sAAAAAP1CsMAVZIcAxnsAyZEtAXYoEs72
RECAPTCHA_SECRET_KEY=6LelaA4sAAAAAEBfuymgI3Df9dP4lmsykyUFUk_s
```

## Vercel Deployment

Make sure to add these same environment variables in Vercel:
1. Go to your project settings in Vercel
2. Navigate to Environment Variables
3. Add both variables:
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (public, can be exposed)
   - `RECAPTCHA_SECRET_KEY` (private, server-side only)

## How It Works

- reCAPTCHA v3 runs invisibly in the background
- No "I'm not a robot" checkbox for users
- Score threshold: 0.5 (adjustable in `src/app/api/contact/route.ts`)
- Spam submissions are blocked before processing
- Legitimate users proceed normally

## Score Threshold

The current threshold is set to 0.5. You can adjust this in `src/app/api/contact/route.ts`:
- Lower threshold (e.g., 0.3) = more lenient, may let some spam through
- Higher threshold (e.g., 0.7) = more strict, may block some legitimate users


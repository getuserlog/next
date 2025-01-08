# UserLog for Next.js

## Installation

### Using npm

```bash
npm install @userlog/next
```

## Usage

The usage depends on whether you are using the `app router` or the `pages router`.

**App router:**

In the app router, you need to import the UserLogProvider as a head element in your root layout component:

```tsx
import { UserLogProvider } from "@userlog/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <UserLogProvider api_key="<API_KEY>" project="<PROJECT_NAME>" />
        {/* Your existing head elements */}
      </head>
      <body>
        {/* Your existing layout */}
        <main>{children}</main>
      </body>
    </html>
  );
}
```

For setting the user id in server components, use the `SetUserIdServerComponent`:

```tsx
import { SetUserIdServerComponent } from "@userlog/next";

export default function Page() {
  const userId: string | null = "user@example.com";

  return (
    <>
      {/* Your existing page content */}
      <SetUserIdServerComponent userId={userId} />
    </>
  );
}
```

**Pages router:**

In the pages router, you can wrap your app with the UserLogProvider, similar to how you would do in a React application:

```tsx
import { UserLogProvider } from "@userlog/next";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserLogProvider api_key="<API_KEY>" project="<PROJECT_NAME>">
      {/* Your existing app content */}
      <Component {...pageProps} />
    </UserLogProvider>
  );
}
```

## Hooks

The `useUserLog` hook can be used across your client components and provides the following methods:

- `track(options: TrackOptions)`: Track custom events.
- `setUserId(userId: string | null)`: Set the user id for the current user. If the user is not logged in, pass null.
- `clearUserId()`: Clear the user id for the current user.
- `setDebug(flag: boolean = true)`: Set debug mode for logging.

**Usage:**

```tsx
import { useUserLog } from "@userlog/next";

export function Component() {
  // Get the hooks
  const { setUserId, track } = useUserLog();

  // Set the user id when a user logs in
  setUserId("user@example.com");

  // Track an event
  track({
    channel: "payments",
    event: "New Subscription",
    user_id: "user@example.com", // optional when set using setUserId
    icon: "💰",
    notify: true,
    tags: {
      plan: "premium",
      cycle: "monthly",
      trial: false,
    },
  });

  // Your existing component
}
```

These hooks have the same usage as their counterparts in the [@userlog/react](https://www.npmjs.com/package/@userlog/react) package.

## Tracking Events

You can also track events directly from HTML elements using data attributes:

```jsx
<button
  data-event="New Subscription"
  data-channel="payments"
  data-user-id="user@example.com" // optional (optional when set using setUserId)
  data-icon="💰" // optional
  data-tag-plan="Pro" // optional
  data-tag-period="Monthly" // optional
  data-tag-price="19.99" // optional
>
  Subscribe to Pro
</button>
```

In this example, when the button is clicked, an event named "New Subscription" will be tracked with the specified tags.

## Server-side Usage with Next

For server-side usage, you can use UserLog from `@userlog/next/server` It behaves similarly to [`@userlog/node`](https://www.npmjs.com/package/@userlog/node)

```typescript
import { UserLog } from "@userlog/next/server";

// Initialize UserLog
const userlog = new UserLog({
  api_key: "<API_KEY>",
  project: "<PROJECT_NAME>",
});

// Use it in your server-side code
// Track an event
await userlog.track({
  event: "New Subscription",
  channel: "payments",
  user_id: "user@example.com",
  icon: "💰",
  notify: true,
  tags: {
    plan: "premium",
    cycle: "monthly",
    trial: false,
  },
});
```

## API Documentation

For more information about the UserLog API, see: [docs.getuserlog.com](https://docs.getuserlog.com)

## Support

If you have any problems or issues, please contact us at [michael@8byte.de](mailto:michael@8byte.de)

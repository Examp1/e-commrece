How it works step by step:
➤ When you open /admin/[slug]:
auth.global.ts runs before the route.

It checks if you're navigating to the "admin" layout and makes a useFetch("/api/admin/isAuthenticated") call.

This API call:

Is wrapped in withAuth(),

Calls authGuard(),

Checks the JWT in the Authorization: Bearer ... header,

If the token is valid — the response is isAuthenticated: true,

If not — a 401 error is returned.

If there's a 401 error, $isAuthenticated() is called → redirect to /auth/signin.
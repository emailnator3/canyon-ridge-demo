// Gates any /admin path behind HTTP Basic Auth, server-side — the browser's
// native login prompt, checked before the static file is ever served. Every
// other path (the public site, the outreach demos) is untouched.
//
// Credentials come from Vercel project env vars (ADMIN_USER / ADMIN_PASSWORD),
// never hardcoded here since this repo is public on GitHub.
export default function middleware(request) {
  const { pathname } = new URL(request.url);
  if (!/\/admin(\/|$)/.test(pathname)) return;

  const auth = request.headers.get("authorization") || "";
  const [scheme, encoded] = auth.split(" ");
  if (scheme === "Basic" && encoded) {
    const [user, pass] = atob(encoded).split(":");
    if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASSWORD) {
      return; // let the request through
    }
  }

  return new Response("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin Panel"' },
  });
}

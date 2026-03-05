/**
 * app/admin/login/layout.tsx
 *
 * The login page needs a BARE layout (no sidebar, no header).
 * This layout intentionally does NOT extend the parent /admin/layout.tsx
 * because Next.js App Router resolves layouts from the root; the /admin/layout.tsx
 * has a session check that would redirect unauthenticated visitors before they
 * reach the login form.
 *
 * Solution: place this layout inside /admin/login/ so it overrides the
 * parent for this segment. It renders nothing but the children (the login form
 * is already full-screen via `fixed inset-0`).
 */
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

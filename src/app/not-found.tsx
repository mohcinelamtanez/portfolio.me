import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <span className="font-mono text-2xs uppercase tracking-widest text-accent">error 404</span>
      <h1 className="font-mono text-2xl text-foreground">route not found</h1>
      <p className="max-w-sm text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist, or the endpoint moved. Try the
        command terminal (⌘K) instead.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-md border border-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-accent/40 hover:text-accent"
      >
        cd ~/home
      </Link>
    </main>
  );
}

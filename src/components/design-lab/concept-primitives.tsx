import Link from "next/link";

export function ReviewCaption({ children }: { children: React.ReactNode }) {
  return <small data-review-caption>{children}</small>;
}

export function DiscussProjectLink({ className }: { className?: string }) {
  return <Link className={className} href="/start-a-project">Discuss a project</Link>;
}

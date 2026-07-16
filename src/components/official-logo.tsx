import Image from "next/image";

export function OfficialLogo({ className = "" }: { className?: string }) {
  return <span className={`official-logo ${className}`} aria-label="Airix Media"><Image className="official-logo-light" src="/brand/airixmedia.png" alt="Airix Media" width={200} height={52} priority /><Image className="official-logo-dark" src="/brand/airixmedia-dark.png" alt="" width={500} height={129} priority /></span>;
}

import Image from "next/image";

export function OfficialLogo({ className = "" }: { className?: string }) {
  return <span className={`official-logo ${className}`} aria-label="Airix Media"><Image className="official-logo-light" src="/brand/airixmedia-r3.png" alt="Airix Media — Creative Technology Studio" width={1301} height={253} priority /><Image className="official-logo-dark" src="/brand/airixmedia-r3-dark.png" alt="" width={1301} height={253} priority /></span>;
}

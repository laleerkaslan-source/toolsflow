import { Link } from "@/i18n/navigation";
import { Building2 } from "lucide-react";

interface AuthorBioProps {
  locale: string;
}

export function AuthorBio({ locale }: AuthorBioProps) {
  const isTr = locale === "tr";

  return (
    <div className="mt-10 flex gap-4 rounded-xl border border-border bg-card p-5">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Building2 className="h-7 w-7" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {isTr ? "Yazan" : "Written by"}
        </p>
        <p className="mt-0.5 font-semibold text-foreground">Lale Dijital</p>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          {isTr
            ? "Türkiye mevzuatına göre finansal hesaplama araçları ve rehberler geliştiren bağımsız dijital yayın ekibi. 4857 sayılı İş Kanunu, 5510 sayılı SGK Kanunu, 193 sayılı Gelir Vergisi Kanunu ve 3065 sayılı KDV Kanunu kapsamındaki hesaplamalarda uzmandır."
            : "Independent digital publishing team building financial calculators and guides aligned with Turkish legislation — specializing in Labor Law No. 4857, SSI Law No. 5510, Income Tax Law No. 193 and VAT Law No. 3065."}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {isTr
            ? "Editöryel süreç: birincil kaynak doğrulaması (Resmî Gazete, GİB, SGK) → hesaplama testi → 6 ayda bir veya yeni mevzuat çıkınca güncelleme."
            : "Editorial process: primary source verification (Official Gazette, GİB, SSI) → calculation testing → 6-month or regulation-triggered refresh."}
        </p>
        <div className="mt-2 flex flex-wrap gap-3 text-xs">
          <Link href="/about" className="text-primary hover:underline">
            {isTr ? "Hakkımızda" : "About us"}
          </Link>
          <Link href="/contact" className="text-primary hover:underline">
            {isTr ? "İletişim" : "Contact"}
          </Link>
          <a
            href="mailto:info@laledijital.com"
            className="text-primary hover:underline"
          >
            info@laledijital.com
          </a>
        </div>
      </div>
    </div>
  );
}

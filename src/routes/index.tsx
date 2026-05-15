import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowUp, Copy, MapPin, Navigation, Search, Check, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Gujarat University Practical Exam Centres" },
      {
        name: "description",
        content:
          "Find your Gujarat University practical exam centre and open Google Maps navigation instantly.",
      },
    ],
  }),
});

type College = {
  code: string;
  short: string;
  name: string;
  address: string;
  maps: string;
};

const colleges: College[] = [
  { code: "072", short: "DCMBCA", name: "C M Desai Arts & Commerce College", address: "Mandal - Viramgam Rd, Axar Nagar, Viramgam - 382150", maps: "https://www.google.com/maps/search/?api=1&query=C+M+Desai+Arts+%26+Commerce+College+Viramgam+382150" },
  { code: "086", short: "BRACS", name: "Bhavan's R A College of Science", address: "Vidyagauri Marg, Old City, Khanpur, Ahmedabad - 1", maps: "https://www.google.com/maps/search/?api=1&query=Bhavan%27s+R+A+College+of+Science+Khanpur+Ahmedabad" },
  { code: "204", short: "APCC", name: "Arts & Commerce College", address: "Pulin Society Part 2, Naroda, Ahmedabad - 382325", maps: "https://www.google.com/maps/search/?api=1&query=Arts+%26+Commerce+College+Naroda+Ahmedabad+382325" },
  { code: "241", short: "SLICA", name: "Som Lalit Inst. of Computer Applications", address: "SLIMS Campus, University Road, Navrangpura, Ahmedabad - 9", maps: "https://www.google.com/maps/search/?api=1&query=Som+Lalit+Institute+of+Computer+Applications+Ahmedabad" },
  { code: "243", short: "NGCCA", name: "Navgujarat College of Computer Appln.", address: "Ashram Road, Opp. Gujarat Vidhyapith, Ahmedabad - 14", maps: "https://www.google.com/maps/search/?api=1&query=Navgujarat+College+of+Computer+Applications+Ahmedabad+14" },
  { code: "248", short: "LJCCA", name: "L J College of Computer Appln.", address: "IIM Rd, Mahavir Nagar Society, Vastrapur, Ahmedabad - 15", maps: "https://www.google.com/maps/search/?api=1&query=L+J+College+of+Computer+Applications+Vastrapur+Ahmedabad" },
  { code: "259", short: "LCCA", name: "Lokmanya College of Computer Applications", address: "Shivranjani Cross Rd, Satellite, Ahmedabad", maps: "https://www.google.com/maps/search/?api=1&query=Lokmanya+College+of+Computer+Applications+Ahmedabad" },
  { code: "267", short: "PDPICA", name: "Shri P D Pandya Insti. of Comp. Appln", address: "Pandya Education Campus, Vatva, Ahmedabad", maps: "https://www.google.com/maps/search/?api=1&query=Shri+P+D+Pandya+Institute+of+Computer+Applications+Vatva+Ahmedabad" },
  { code: "274", short: "SPMBCA", name: "SPV Mahila Vanijya Mahavidyalaya", address: "Patelwadi Ambar Cinema Road, Bapunagar, Ahmedabad - 45", maps: "https://www.google.com/maps/search/?api=1&query=S+P+V+Mahila+Vanijya+Mahavidyalaya+Bapunagar+Ahmedabad" },
  { code: "288", short: "JGBCA", name: "J G College of Comp. Appln", address: "ASIA Campus, Drive-in Rd., Ahmedabad - 54", maps: "https://www.google.com/maps/search/?api=1&query=J+G+College+of+Computer+Application+Drive-in+Rd+Ahmedabad" },
  { code: "492", short: "AAKMS", name: "AAKMS BCA College (Chaudhari College)", address: "Opp. S.T. Depot, Sector 7, Gandhinagar - 382007", maps: "https://www.google.com/maps/search/?api=1&query=Chaudhari+College+of+Computer+Application+Sector+7+Gandhinagar+382007" },
  { code: "510", short: "NDCBCA", name: "Neeldeep Colg. of Commerce", address: "Science City Rd, Sola, Ahmedabad - 380060", maps: "https://www.google.com/maps/search/?api=1&query=Neeldeep+College+of+Commerce+Sola+Science+City+Rd+Ahmedabad" },
  { code: "622", short: "SSCS", name: "Shree Sahajanand Colg. of Sci.", address: "Sokli - 382150, Ta-Viramgam", maps: "https://www.google.com/maps/search/?api=1&query=Shree+Sahajanand+College+of+Science+Sokli+Viramgam+382150" },
  { code: "721", short: "NAVGUJBCA", name: "Navgujarat BCA College", address: "Sector 28, Gandhinagar - 380060", maps: "https://www.google.com/maps/search/?api=1&query=Navgujarat+BCA+College+Sector+28+Gandhinagar" },
  { code: "722", short: "KICA", name: "Kalol Insti. of Computer Studies", address: "Kalol - 382721, Gandhinagar", maps: "https://www.google.com/maps/search/?api=1&query=Kalol+Institute+of+Computer+Studies+Kalol+Gandhinagar" },
  { code: "723", short: "KBCA", name: "Kameshwar BCA College", address: "Sargasan, Gandhinagar - 384221", maps: "https://www.google.com/maps/search/?api=1&query=Kameshwar+BCA+College+Sargasan+Gandhinagar" },
  { code: "724", short: "ASIABCA", name: "Asia Pacific BCA College", address: "Bhoyani - 382145, Dist. Ahmedabad", maps: "https://www.google.com/maps/search/?api=1&query=Asia+Pacific+BCA+College+Bhoyani+Ahmedabad" },
  { code: "725", short: "KHYATIBCA", name: "Khyati School of Computer Appli.", address: "Plot No. 116, Palodia, Ahmedabad - 58", maps: "https://www.google.com/maps/search/?api=1&query=Khyati+School+of+Computer+Application+Palodia+Ahmedabad" },
  { code: "730", short: "PRSDTBCA", name: "President Insti. of Comp. Appli.", address: "Shayona Study Campus, Ghatlodia, Ahmedabad - 61", maps: "https://www.google.com/maps/search/?api=1&query=President+Institute+of+Computer+Application+Ghatlodia+Ahmedabad" },
  { code: "761", short: "KKSICA", name: "Govt BCA Colg (Self Fin)", address: "KK Shastri Campus, Khokhra Rd, Maninagar, Ahmedabad - 08", maps: "https://www.google.com/maps/search/?api=1&query=Govt+BCA+College+Khokhra+Rd+Maninagar+Ahmedabad" },
  { code: "770", short: "KDPBCA", name: "Shri Kirithbai Dahyabhai Patel (Devgadh) Umiya B.C.A College", address: "Umiya Campus, Sola, Ahmedabad - 60", maps: "https://www.google.com/maps/search/?api=1&query=Shri+Kirithbai+Dahyabhai+Patel+Umiya+BCA+College+Sola+Ahmedabad" },
];

function Index() {
  const [query, setQuery] = useState("");
  const [showTop, setShowTop] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return colleges;
    return colleges.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.code.includes(q) ||
        c.short.toLowerCase().includes(q),
    );
  }, [query]);

  const copyAddress = async (c: College) => {
    try {
      await navigator.clipboard.writeText(`${c.name} — ${c.address}`);
      setCopiedCode(c.code);
      setTimeout(() => setCopiedCode((v) => (v === c.code ? null : v)), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14 text-center">
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-primary">
            Gujarat University Practical Exam Centres
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Select your exam centre to open navigation
          </p>
        </div>
      </header>

      {/* Sticky search */}
      <div className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              inputMode="search"
              placeholder="Search by college, area, or code…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-input bg-card pl-10 pr-4 py-3 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {filtered.length} centre{filtered.length === 1 ? "" : "s"} found
          </p>
        </div>
      </div>

      {/* Cards */}
      <main className="mx-auto max-w-5xl px-4 py-6">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            No exam centre matches “{query}”.
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {filtered.map((c, i) => (
              <li
                key={c.code}
                className="group animate-fade-in rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
                style={{ animationDelay: `${Math.min(i * 30, 300)}ms`, animationFillMode: "both" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="inline-block rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      Code {c.code}
                    </span>
                    <h2 className="mt-2 text-base sm:text-lg font-semibold leading-snug text-foreground">
                      {c.name}
                    </h2>
                    <a
                      href={c.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex items-start gap-2 text-sm text-muted-foreground hover:text-primary"
                    >
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{c.address}</span>
                    </a>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <a
                    href={c.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90 active:scale-[0.98]"
                  >
                    <Navigation className="h-4 w-4" />
                    Open in Google Maps
                  </a>
                  <button
                    type="button"
                    onClick={() => copyAddress(c)}
                    aria-label="Copy address"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                  >
                    {copiedCode === c.code ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="mx-auto max-w-5xl px-4 pb-10 pt-4 text-center text-xs text-muted-foreground">
        Tap any centre to launch navigation directly in Google Maps.
      </footer>

      {/* Back to top */}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105 animate-fade-in"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

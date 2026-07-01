/**
 * ChromaImpactGrid — demo page rendering a mixed grid of DonationCard and
 * VolunteerCard inside the pointer-tracked <ChromaGrid>. Each card carries a
 * different accent so the chroma variety shows. Saved state is kept in memory
 * only (no localStorage), lifted here to show the controlled bookmark pattern.
 */
import { useState } from "react";
import { ChromaGrid } from "./components/ChromaGrid";
import { DonationCard } from "./components/DonationCard";
import { VolunteerCard } from "./components/VolunteerCard";

const hero = (seed: string) =>
  `https://picsum.photos/seed/${seed}/800/600`;
const avatar = (name: string) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
    name
  )}&backgroundType=gradientLinear&fontWeight=600`;

type Donation = {
  kind: "donation";
  id: string;
  accent: string;
  image: string;
  title: string;
  location: string;
  raised: number;
  goal: number;
  organization: { name: string; avatarUrl: string };
};

type Volunteer = {
  kind: "volunteer";
  id: string;
  accent: string;
  image: string;
  title: string;
  location: string;
  volunteersJoined: number;
  volunteersNeeded: number;
  organization: { name: string; avatarUrl: string };
};

const ITEMS: Array<Donation | Volunteer> = [
  {
    kind: "donation",
    id: "rural-education",
    accent: "#10b981", // emerald
    image: hero("rural-education"),
    title: "Rural Education",
    location: "Napoli, Italy",
    raised: 2355,
    goal: 20000,
    organization: { name: "VEGA", avatarUrl: avatar("VEGA") },
  },
  {
    kind: "donation",
    id: "helping-street-dogs",
    accent: "#22c55e", // green
    image: hero("street-dogs"),
    title: "Helping Street Dogs",
    location: "Tetouan, Morocco",
    raised: 401,
    goal: 1000,
    organization: { name: "MBS ORG", avatarUrl: avatar("MBS ORG") },
  },
  {
    kind: "volunteer",
    id: "lettori-ospedale",
    accent: "#6366f1", // indigo
    image: hero("hospital-readers"),
    title: "Lettori ad alta voce in ospedale",
    location: "Napoli, Italy",
    volunteersJoined: 0,
    volunteersNeeded: 15,
    organization: { name: "Voce per Tutti", avatarUrl: avatar("Voce per Tutti") },
  },
  {
    kind: "donation",
    id: "zero-pollution",
    accent: "#14b8a6", // teal-green
    image: hero("zero-pollution"),
    title: "Zero Pollution",
    location: "Tetouan, Morocco",
    raised: 500,
    goal: 2000,
    organization: { name: "MBS ORG", avatarUrl: avatar("MBS ORG 2") },
  },
  {
    kind: "volunteer",
    id: "spesa-cuore",
    accent: "#0ea5e9", // sky-blue
    image: hero("grocery-help"),
    title: "La spesa che scalda il cuore",
    location: "Napoli, Italy",
    volunteersJoined: 0,
    volunteersNeeded: 30,
    organization: { name: "Mano Amica", avatarUrl: avatar("Mano Amica") },
  },
  {
    kind: "donation",
    id: "strada-campus",
    accent: "#16a34a", // green
    image: hero("campus-future"),
    title: "Dalla strada al Campus: il Futuro inizia sui banchi",
    location: "Firenze, Italia",
    raised: 250,
    goal: 30000,
    organization: { name: "Busajo Ngo Ets", avatarUrl: avatar("Busajo") },
  },
  {
    kind: "volunteer",
    id: "alfabetizzazione-digitale",
    accent: "#3b82f6", // blue
    image: hero("digital-literacy"),
    title: "Alfabetizzazione digitale per la terza età",
    location: "Roma, Italy",
    volunteersJoined: 0,
    volunteersNeeded: 15,
    organization: {
      name: "Digital Inclusion ODV",
      avatarUrl: avatar("Digital Inclusion"),
    },
  },
  {
    kind: "volunteer",
    id: "pulizia-urbana",
    accent: "#2563eb", // blue
    image: hero("urban-cleanup"),
    title: "Sabato di pulizia urbana",
    location: "Napoli, Italy",
    volunteersJoined: 0,
    volunteersNeeded: 25,
    organization: { name: "Green Warrior ODV", avatarUrl: avatar("Green Warrior") },
  },
];

export function ChromaImpactGrid() {
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [spotlight, setSpotlight] = useState(true);

  const toggle = (id: string) =>
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Ambient accent glow behind the grid. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 0%, rgba(16,185,129,0.10), transparent 60%), radial-gradient(50% 45% at 90% 10%, rgba(99,102,241,0.12), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <header className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
              Impact Platform
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Chroma Impact Grid
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
              Donazioni e volontariato in un&apos;unica griglia. Muovi il
              cursore sulla griglia: le card fuori dal riflettore restano
              desaturate, sotto al cursore tornano a colori pieni.
            </p>
          </div>

          <label className="inline-flex cursor-pointer select-none items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md">
            <input
              type="checkbox"
              className="h-4 w-4 accent-emerald-500"
              checked={spotlight}
              onChange={(e) => setSpotlight(e.target.checked)}
            />
            Spotlight
          </label>
        </header>

        <ChromaGrid spotlight={spotlight}>
          {ITEMS.map((item) =>
            item.kind === "donation" ? (
              <DonationCard
                key={item.id}
                image={item.image}
                title={item.title}
                accent={item.accent}
                organization={item.organization}
                location={item.location}
                raised={item.raised}
                goal={item.goal}
                href="#"
                isSaved={!!saved[item.id]}
                onToggleSave={() => toggle(item.id)}
              />
            ) : (
              <VolunteerCard
                key={item.id}
                image={item.image}
                title={item.title}
                accent={item.accent}
                organization={item.organization}
                location={item.location}
                volunteersJoined={item.volunteersJoined}
                volunteersNeeded={item.volunteersNeeded}
                href="#"
                isSaved={!!saved[item.id]}
                onToggleSave={() => toggle(item.id)}
              />
            )
          )}
        </ChromaGrid>
      </div>
    </main>
  );
}

export default ChromaImpactGrid;

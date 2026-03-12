import LinkPlayer from "@/components/ui/link-player";

type TimelineItem = {
  year: string;
  highlights: string[];
};

type StatItem = {
  label: string;
  value: string;
};

const stats: StatItem[] = [
  { label: "Episodes on-demand", value: "2,200+" },
  { label: "Facebook reach", value: "15M" },
  { label: "Minutes viewed", value: "1.7M" },
  { label: "S&T awareness growth", value: "6% to 35%" },
];

const timeline: TimelineItem[] = [
  {
    year: "2025",
    highlights: [
      "Green Zeal Award for Excellence in Effective Teaching Innovation",
      "Gawad Lasallianeta 2025",
    ],
  },
  {
    year: "2024",
    highlights: [
      "2024 Catholic Mass Media Award - Best Children and Youth Program (ExperTalk)",
      "UP ComBroadSoc Gandingan Awards - Most Development-oriented Platform",
      "UP ComBroadSoc's Choice for Gandingan ng Agrikultura",
      "Gandingan ng Kabataan",
      "GovMedia Awards - Philippines Campaign of the Year (Science and Technology)",
    ],
  },
  {
    year: "2023",
    highlights: [
      "Presidential Lingkod Bayan Awardee - Civil Service Commission",
      "Paragala Pangkaunlaran - Central Luzon Media Awards",
      "Special Citation - Catholic Mass Media Awards",
      "Major Award - Gandingan ng Kaunlaran",
      "Special Citation - Gandingan ng Agham at Teknolohiya",
    ],
  },
  {
    year: "2022",
    highlights: [
      "National Priority Program - NEDA",
      "Gandingan ng Kaunlaran - Most Development-Oriented Platform",
      "SINESIYENSYA - Most Development-Oriented Online Video",
      "ExperTalk - Most Development-Oriented Women's Program",
      "DOST Report - Most Development-Oriented Science Program",
    ],
  },
  {
    year: "2016",
    highlights: ["First airtime online via livestreaming on May 30, 2016."],
  },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-linear-to-b from-zinc-950  to-transparent from-0% to-30%  text-white">
      <div className="relative lg:pt-20 md:pt-18 pt-16">
        <LinkPlayer
          url="https://www.youtube.com/watch?v=Ztia1UwAAM4&list=TLGGnlpGzPHzVtgwOTAzMjAyNg&t=9s"
          platform="YouTube"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#050505] to-transparent md:h-48" />
      </div>
      <section className="relative z-10 mx-auto -mt-16 w-full   pb-10 md:-mt-24 md:pb-14">
        <div className="overflow-hidden border-y border-white/10 bg-zinc-950/80 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur">
          <div className="h-1 w-full bg-linear-to-r from-transparent via-[#0931e5] to-transparent" />
          <div className="grid gap-8 p-6 md:grid-cols-[1.15fr_1fr] md:p-10 lg:p-20">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-[#00aeef]/40 bg-[#004a95]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                About DOSTv
              </p>
              <h1 className="text-3xl font-black leading-tight md:text-5xl">
                Science for the People,
                <span className="block text-[#00aeef]">Streaming Impact Nationwide</span>
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-300 md:text-base md:leading-8">
                DOSTv transforms science communication into high-reach storytelling across TV,
                radio, and digital. Built by DOST-STII, it makes reliable science and technology
                content more accessible to Filipino communities.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-zinc-900/70 p-4 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <p className="text-2xl font-extrabold text-white md:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">
                    {stat.label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full px-4 pb-14 md:px-8 md:pb-15 border-b border-white/10">
        <div className=" p-6 md:p-10">
          <h2 className="text-2xl font-bold md:text-3xl">Who are we?</h2>
          <div className="mt-6 grid gap-5 text-sm leading-7 text-zinc-200 md:grid-cols-2 md:text-base md:leading-8 text-justify space-x-8 space-y-8">
            <p>
              {`              
              The Department of Science and Technology has often been referred to as the
              government's best-kept secret. Public awareness was historically centered on
              disaster-related information from DOST-PAGASA and DOST-PHIVOLCS, plus DOST-SEI
              scholarship programs.
              `}
            </p>
            <p>
              In May 2016, DOST-STII launched DOSTv as its official source of science-based
              news and updates. Through television, radio, and digital platforms, DOSTv
              expanded access to reliable science, technology, and innovation content.
            </p>
            <p>
              During the pandemic, DOSTv shifted quickly to digital-first productions,
              including DOST Report, Expertalk Online, and Bantay Bulkan, while sustaining
              programming growth with Animagham and renewed broadcast presence.
            </p>
            <p>
              Today, DOSTv has produced more than 2,200 episodes and continues to drive higher
              engagement across Facebook and YouTube, alongside measurable growth in public
              science and technology awareness.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-8 md:pb-24 pt-10">
        <div className="mb-10 text-center md:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00aeef]">
            Milestones
          </p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">Our Journey</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">
            We aim to bring science closer to people. DOSTv is a multi-platform channel
            that helps communities discover how science and technology improve everyday life.
          </p>
        </div>

        <div className="relative pl-6 md:pl-10">
          <div className="absolute left-3.5 top-0 h-full w-px bg-linear-to-b from-[#ffffff] via-zinc-500/40 to-transparent md:left-5" />
          <div className="space-y-5 md:space-y-6">
            {timeline.map((item) => (
              <article
                key={item.year}
                className="relative rounded-2xl border border-white/60  p-5 shadow-[0_10px_32px_rgba(0,0,0,0.42)] transition duration-300 hover:border-[#00aeef]/50 md:p-6"
              >
                <span className="absolute -left-[1.15rem] top-8 h-3.5 w-3.5 rounded-full border-2 border-zinc-900 bg-[#ffffff] shadow-[#fcfcfc] md:-left-[1.65rem]" />
                <h3 className="text-2xl font-black text-white">{item.year}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-200 marker:text-[#ffffff]">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

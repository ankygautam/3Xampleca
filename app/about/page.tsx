import { MagicText } from "@/components/ui/magic-text"
import { Navbar } from "@/components/Navbar"

const aboutText = `I’m a solo developer trying to make a place for myself in this world by building in public and sharing what I learn along the way. My goal with 3xample is not only to grow through daily application development, but also to help others see how accessible web development has become with AI-assisted and agentic tools. As I learn, build, and experiment each day, I want that progress to become useful for anyone watching the journey.

Over time, I started building web applications for both clients and my own personal projects, and I also began creating SaaS-style applications through my personal GitHub account.

My first goal was to build every day, improve through practice, and create better career opportunities for myself.

Later, I watched an interview with Alon and Orangie, where Alon talked about his idea around Pump.fun. That inspired me to think about a different way to support my work in public. I decided to connect a memecoin to this journey, hoping that creator fees could eventually help me become more financially independent and spend more time building applications.

This project is completely solo. No team, no secret partners, and no strings attached. I may know of people in the memecoin space like Alon, Cupsey, Gake, and Orangie, but they do not know me — so no, there is no secret master plan behind this. It is just me building in public.
`

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#040711] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.15),transparent_28%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.14),transparent_24%),radial-gradient(circle_at_bottom,rgba(56,189,248,0.08),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
      <div className="absolute left-[-10rem] top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-[120px]" />
      <div className="absolute right-[-8rem] top-40 h-80 w-80 rounded-full bg-violet-500/12 blur-[140px]" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sky-400/8 blur-[150px]" />

      <div className="relative z-10">
        <Navbar />
        <section className="section-shell min-h-[240vh] py-10 sm:py-12 lg:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="sticky top-0 flex min-h-[calc(100vh-4rem)] flex-col justify-center">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                About
              </h1>
              <div className="mt-10">
                <MagicText text={aboutText} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

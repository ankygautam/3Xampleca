import { MagicText } from "@/components/ui/magic-text"
import { Navbar } from "@/components/Navbar"

const visionText = `3xample is a public showcase of AI agentic web applications built as real examples.

The idea behind 3xample is simple: AI is making life easier, and building web applications is becoming faster, more accessible, and more creative than ever. With the right prompts, tools, and direction, ideas can quickly become working products.

On 3xample.ca, I create and share web application examples to demonstrate how AI-assisted and agentic development can turn concepts into live, usable experiences. Each project is built to show what is possible when AI is used not just for content, but as a real development partner in the application-building process.

Every application will be livestreamed on Pump.fun so the audience can watch the build happen in real time. Outside livestream hours, I’ll be working on concepts, refining ideas, and selecting what should be built next. Audience suggestions are appreciated and will help shape future examples.

New ideas will usually be posted first on X, along with the livestream time. Weekday streams will typically begin after 4:00 PM MST, following my regular work schedule from 7:30 AM to 4:00 PM MST. Weekend streams may begin earlier.
`

export default function VisionPage() {
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
                Vision
              </h1>
              <div className="mt-10">
                <MagicText text={visionText} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

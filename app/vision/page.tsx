import { MagicText } from "@/components/ui/magic-text"
import { DisclaimerFooter } from "@/components/DisclaimerFooter"
import { Navbar } from "@/components/Navbar"

const visionText = `3xample is a public showcase of AI agentic web applications built as real examples.

The idea behind 3xample is simple: AI is making life easier, and building web applications is becoming faster, more accessible, and more creative than ever. With the right prompts, tools, and direction, ideas can quickly become working products.

On 3xample.ca, I create and share web application examples to demonstrate how AI-assisted and agentic development can turn concepts into live, usable experiences. Each project is built to show what is possible when AI is used not just for content, but as a real development partner in the application-building process.

Every application will be livestreamed on Pump.fun so the audience can watch the build happen in real time. Outside livestream hours, I’ll be working on concepts, refining ideas, and selecting what should be built next. Audience suggestions are appreciated and will help shape future examples.

New ideas will usually be posted first on X, along with the livestream time. Weekday streams will typically begin after 4:00 PM MST, following my regular work schedule from 7:30 AM to 4:00 PM MST. Weekend streams may begin earlier.
`

export default function VisionPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_24%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.05),transparent_30%)]" />

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
        <DisclaimerFooter />
      </div>
    </main>
  )
}

import { DisclaimerFooter } from "@/components/DisclaimerFooter";
import { Navbar } from "@/components/Navbar";
import { PageIntro } from "@/components/PageIntro";
import { TokenInfo } from "@/components/TokenInfo";

export default function TokenInfoPage() {
  return (
    <main>
      <Navbar />
      <section className="section-shell pt-12 sm:pt-16">
        <PageIntro
          eyebrow="Token info"
          title="Official address references and support details"
          description="Use this page as the source of truth before interacting with anything related to the token."
        />
      </section>
      <TokenInfo />
      <DisclaimerFooter />
    </main>
  );
}

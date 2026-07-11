import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";
import { cafe } from "@/data/cafe";
import Container from "@/components/shared/Container";

export const metadata: Metadata = makeMetadata({
  title: "Terms of Use",
  path: "/terms",
  description: "Terms of use for the Saffron & Steam website.",
});

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-ivory py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="font-serif text-heading text-espresso">Terms of Use</h1>
        <p className="mt-2 text-sm text-olive">Last updated: January 2025</p>

        <div className="mt-12 space-y-10 text-body-lg text-olive editorial-text">
          <section>
            <h2 className="font-serif text-subheading text-espresso mb-4">Use of website</h2>
            <p>
              This website is provided by {cafe.name} for informational purposes. You may browse the site and use the contact and reservation features as intended. You agree not to use the website for any unlawful purpose, attempt to gain unauthorised access to any part of it, or interfere with its proper functioning.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-subheading text-espresso mb-4">Intellectual property</h2>
            <p>
              All content on this website — including text, images, logos, and design — is the property of {cafe.name} or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or use any content from this site without our prior written permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-subheading text-espresso mb-4">Limitation of liability</h2>
            <p>
              The information on this website is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind. While we strive to keep information accurate and up-to-date, we make no representations about the completeness or reliability of the content. {cafe.name} shall not be liable for any loss or damage arising from your use of this website.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-subheading text-espresso mb-4">Changes to terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the website after changes are posted constitutes your acceptance of the revised terms. We encourage you to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-subheading text-espresso mb-4">Contact</h2>
            <p>
              If you have any questions about these terms, please contact us at{" "}
              <a href={`mailto:${cafe.email}`} className="text-tangerine hover:underline">
                {cafe.email}
              </a>.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";
import { cafe } from "@/data/cafe";
import Container from "@/components/shared/Container";

export const metadata: Metadata = makeMetadata({
  title: "Privacy Policy",
  path: "/privacy",
  description: "Privacy policy for Saffron & Steam — how we handle your data when you visit our website or café.",
});

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-ivory py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="font-serif text-heading text-espresso">Privacy Policy</h1>
        <p className="mt-2 text-sm text-olive">Last updated: January 2025</p>

        <div className="mt-12 space-y-10 text-body-lg text-olive editorial-text">
          <section>
            <h2 className="font-serif text-subheading text-espresso mb-4">Information we collect</h2>
            <p>
              When you visit our website, we may collect basic usage information such as pages visited, time spent, and general location data through standard analytics tools. If you fill out our contact form or make a reservation, we collect the information you provide — typically your name, email, phone number, and any message or preferences you share.
            </p>
            <p>
              We do not collect payment information through this website. Any payment processing happens through third-party services with their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-subheading text-espresso mb-4">How we use information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1.5 mt-3">
              <li>Respond to your enquiries and reservation requests</li>
              <li>Improve our website and understand how visitors use it</li>
              <li>Send you updates only if you have explicitly opted in</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-3">
              We will never sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-subheading text-espresso mb-4">Cookies</h2>
            <p>
              Our website uses cookies to improve your browsing experience. These include essential cookies required for the site to function, and analytics cookies that help us understand how the site is being used. You can manage or disable cookies through your browser settings — note that this may affect some functionality.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-subheading text-espresso mb-4">Third-party services</h2>
            <p>
              Our website may embed or link to third-party services such as Google Maps, Instagram, and analytics providers. Each of these services has its own privacy policy, and we encourage you to review them. We do not control how these services handle your data.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-subheading text-espresso mb-4">Your rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal data at any time. To exercise these rights, or if you have any concerns about how your data is being handled, please contact us at{" "}
              <a href={`mailto:${cafe.email}`} className="text-tangerine hover:underline">
                {cafe.email}
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-subheading text-espresso mb-4">Contact</h2>
            <p>
              If you have questions about this privacy policy, please reach out:
            </p>
            <ul className="list-none space-y-1 mt-3">
              <li><strong className="text-espresso">{cafe.name}</strong></li>
              <li>{cafe.address.full}</li>
              <li>
                <a href={`mailto:${cafe.email}`} className="text-tangerine hover:underline">{cafe.email}</a>
              </li>
              <li>
                <a href={`tel:${cafe.phone.replace(/[^+\d]/g, "")}`} className="text-tangerine hover:underline">{cafe.phone}</a>
              </li>
            </ul>
          </section>
        </div>
      </Container>
    </main>
  );
}
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { contact } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.body,
};

export default function ContactPage() {
  return (
    <div>
      <ContactPageContent />
    </div>
  );
}

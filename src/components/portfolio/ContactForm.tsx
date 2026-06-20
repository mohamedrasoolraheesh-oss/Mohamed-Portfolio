import { useState } from "react";
import { Mail, Linkedin, Github, Send, Phone, MapPin } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div className="pointer-events-none absolute -top-32 -right-20 h-[400px] w-[400px] rounded-full bg-brand/30 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-[400px] w-[400px] rounded-full bg-brand/20 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-[1fr_1.1fr] md:px-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white/70">
            Contact
          </span>
          <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05]">
            Let's build something
            <br />
            <span className="text-brand">intelligent together.</span>
          </h2>
          <p className="mt-5 max-w-md text-white/70">
            Open to AI / ML engineering roles, collaborations and freelance projects.
            Drop a message — I respond within 24 hours.
          </p>

          <div className="mt-10 space-y-4">
            <a
              href="mailto:mohamedrasoolraheesh@gmail.com"
              className="flex items-center gap-3 text-sm text-white/80 hover:text-white"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/5">
                <Mail className="h-4 w-4" />
              </span>
              mohamedrasoolraheesh@gmail.com
            </a>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/5">
                <MapPin className="h-4 w-4" />
              </span>
              Chennai, India · Open to internships
            </div>
            <a href="tel:+919043507714" className="flex items-center gap-3 text-sm text-white/80 hover:text-white">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/5">
                <Phone className="h-4 w-4" />
              </span>
              +91 90435 07714
            </a>

          </div>

          <div className="mt-10 flex gap-3">
            <a
              href="https://www.linkedin.com/in/mohamed-rasool-raheesh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/mohamedrasoolraheesh-oss"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="mailto:mohamedrasoolraheesh@gmail.com"
              aria-label="Send email"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Mail className="h-4 w-4" />
            </a>

          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            const name = String(data.get("name") || "");
            const email = String(data.get("email") || "");
            const subject = String(data.get("subject") || "Portfolio enquiry");
            const message = String(data.get("message") || "");
            const body =
              `Hi Mohamed,\n\n` +
              `${message}\n\n` +
              `—\nFrom: ${name}\nEmail: ${email}`;
            const mailto = `mailto:mohamedrasoolraheesh@gmail.com?subject=${encodeURIComponent(
              subject
            )}&body=${encodeURIComponent(body)}`;
            window.location.href = mailto;
            setSent(true);
            setTimeout(() => setSent(false), 3000);
            form.reset();
          }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur md:p-8"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-medium text-white/60">Name</span>
              <input
                required
                name="name"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-brand"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-white/60">Email</span>
              <input
                required
                type="email"
                name="email"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-brand"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="text-xs font-medium text-white/60">Subject</span>
            <input
              name="subject"
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-brand"
              placeholder="What's it about?"
            />
          </label>
          <label className="mt-4 block">
            <span className="text-xs font-medium text-white/60">Message</span>
            <textarea
              required
              name="message"
              rows={5}
              className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-brand"
              placeholder="Tell me about your project..."
            />
          </label>
          <label className="mt-4 flex items-start gap-2 text-xs text-white/60">
            <input type="checkbox" required className="mt-0.5 accent-brand" />
            I agree to be contacted by email at mohamedrasoolraheesh@gmail.com.
          </label>
          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(255,46,46,0.6)] transition hover:bg-brand-deep sm:w-auto"
          >
            {sent ? "Opening email ✓" : "Send via Email"}
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      <footer className="relative mt-20 border-t border-white/10 pt-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-white/40 md:flex-row md:px-10">
          <span>© {new Date().getFullYear()} Mohamed Rasool · All rights reserved.</span>
          <span>Designed &amp; built with care.</span>
        </div>
      </footer>
    </section>
  );
}

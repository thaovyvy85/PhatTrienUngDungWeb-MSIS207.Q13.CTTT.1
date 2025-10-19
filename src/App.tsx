import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  Cat,
  PawPrint,
  Heart,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Share2,
} from "lucide-react";

// Pink brand palette
const brand = {
  bg: "from-pink-50 via-rose-50 to-pink-100",
  primary: "pink-500",
  primaryDark: "pink-600",
  accent: "rose-500",
};

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="py-20 scroll-mt-24">
    <div className="max-w-6xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-gray-800"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-2 text-gray-600 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = Math.max(0, new Date(targetDate).getTime() - now);
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  return timeLeft;
};

const Countdown = ({ date }) => {
  const t = useCountdown(date);
  const Stat = ({ label, value }) => (
    <div className="bg-white/70 backdrop-blur rounded-2xl shadow p-4 md:p-5 text-center">
      <div className="text-3xl md:text-4xl font-extrabold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
  return (
    <div className="grid grid-cols-4 gap-3 md:gap-4">
      <Stat label="Days" value={t.days} />
      <Stat label="Hours" value={t.hours} />
      <Stat label="Minutes" value={t.minutes} />
      <Stat label="Seconds" value={t.seconds} />
    </div>
  );
};

const Nav = () => {
  const [open, setOpen] = useState(false);
  const items = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "schedule", label: "Schedule" },
    { id: "gallery", label: "Gallery" },
    { id: "adopt", label: "Adopt" },
    { id: "contact", label: "Contact" },
  ];
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    setOpen(false);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-pink-100">
      <nav className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 select-none">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 grid place-items-center">
            <Cat className="text-white" size={20} />
          </div>
          <span className="font-extrabold tracking-tight text-xl text-gray-800">Purrfect Match</span>
        </div>
        <button
          className="md:hidden p-2 rounded-xl border border-pink-200"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle Menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          {items.map((it) => (
            <li key={it.id}>
              <button onClick={() => scrollTo(it.id)} className="hover:text-pink-600 transition-colors">
                {it.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {open && (
        <div className="md:hidden border-t border-pink-100">
          <ul className="px-6 py-3 space-y-3">
            {items.map((it) => (
              <li key={it.id}>
                <button onClick={() => scrollTo(it.id)} className="w-full text-left py-2 rounded-xl hover:bg-pink-50">
                  {it.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  const startDate = useMemo(() => {
    // Next month 1st @ 10am local
    const d = new Date();
    d.setMonth(d.getMonth() + 1, 1);
    d.setHours(10, 0, 0, 0);
    return d.toISOString();
  }, []);

  const share = async () => {
    const shareData = {
      title: "Purrfect Match – Adopt a Cat",
      text: "Join our adoption day and meet your purrfect companion!",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(
            shareData.url
          )}`,
          "_blank"
        );
      }
    } catch (err) {
      console.error("Sharing failed:", err);
    }
  };

  return (
    <section id="home" className={`relative overflow-hidden bg-gradient-to-br ${brand.bg}`}>
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_10%,#fbcfe8_0,transparent_40%),radial-gradient(circle_at_80%_0%,#fecdd3_0,transparent_35%)]" />
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 md:pt-28 md:pb-24 relative">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow text-pink-600 text-xs font-semibold">
              <PawPrint size={14} /> Cat Adoption Day • Next Month
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight text-gray-900">
              Find Your <span className="text-pink-600">Purrfect</span> Match
            </h1>
            <p className="mt-4 text-gray-600 md:text-lg max-w-xl">
              Lovely, healthy rescue cats are waiting for a family. Explore their profiles, learn about our mission, and register for the adoption event.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#adopt" className="px-5 py-3 rounded-2xl bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition">Meet Cats</a>
              <a href="#about" className="px-5 py-3 rounded-2xl bg-white text-pink-600 font-semibold shadow border border-pink-200 hover:bg-pink-50 transition">Why Adopt?</a>
              <button onClick={share} className="px-4 py-3 rounded-2xl bg-white shadow border border-pink-200 hover:bg-pink-50 inline-flex items-center gap-2">
                <Share2 size={18} /> Share
              </button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.6 }}>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl ring-1 ring-pink-200/60">
              <img
                alt="Cute cats collage"
                className="object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1800&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-rose-400/10" />
            </div>
            <div className="mt-6">
              <Countdown date={startDate} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <Section
    id="about"
    title="About the Camp… ahem, Cat Camp!"
    subtitle="We’re a community-driven rescue connecting wonderful humans with wonderful whiskers. Our team provides guidance, resources, and lifetime support after adoption."
  >
    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          icon: <Heart className="text-pink-600" />, 
          title: "Ethical & caring",
          text: "All cats are vet-checked, vaccinated, and fostered with love until they find a forever home.",
        },
        {
          icon: <PawPrint className="text-pink-600" />, 
          title: "Beginner‑friendly",
          text: "New to cats? We’ll help with supplies, training tips, and a smooth first week at home.",
        },
        {
          icon: <Calendar className="text-pink-600" />, 
          title: "Events & workshops",
          text: "Join our monthly meetups to learn cat care, enrichment, and bonding activities.",
        },
      ].map((c) => (
        <motion.div key={c.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl bg-white shadow-sm ring-1 ring-pink-100 p-6">
          <div className="h-10 w-10 rounded-xl bg-pink-50 grid place-items-center mb-3">{c.icon}</div>
          <h3 className="font-semibold text-gray-800">{c.title}</h3>
          <p className="text-gray-600 mt-2 text-sm">{c.text}</p>
        </motion.div>
      ))}
    </div>
  </Section>
);

const Schedule = () => (
  <Section id="schedule" title="Adoption Day Schedule" subtitle="Drop by anytime – we recommend arriving early to spend quality time with your future friend.">
    <ol className="relative border-l border-pink-200 pl-6 space-y-10">
      {[
        { time: "10:00", title: "Doors open + check‑in", text: "Grab a badge and meet our volunteers." },
        { time: "10:30", title: "Meet & greet", text: "One‑on‑one time with cats in playrooms." },
        { time: "12:00", title: "Care talk", text: "Nutrition, litter, enrichment, and vet basics." },
        { time: "13:30", title: "Adoption interviews", text: "We’ll help you find the best match for your lifestyle." },
        { time: "15:00", title: "Photo corner", text: "Celebrate your new family member!" },
      ].map((i) => (
        <li key={i.time} className="ml-2">
          <span className="absolute -left-2.5 mt-1 h-5 w-5 rounded-full bg-pink-500 ring-4 ring-pink-100" />
          <div className="grid md:grid-cols-[100px_1fr] gap-3">
            <div className="text-pink-700 font-semibold">{i.time}</div>
            <div>
              <div className="font-semibold text-gray-800">{i.title}</div>
              <p className="text-gray-600 text-sm">{i.text}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  </Section>
);

const kitties = [
  {
    name: "Mocha",
    age: "2y",
    traits: ["Cuddly", "Indoor", "Calm"],
    img: "https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Peach",
    age: "8m",
    traits: ["Playful", "Curious", "Great with kids"],
    img: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1600&auto=format&fit=crop",
  },

  {
    name: "Neko",
    age: "1y",
    traits: ["Active", "Explorer", "Smart"],
    img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1600&auto=format&fit=crop",
  },
];

const Gallery = () => (
  <Section id="gallery" title="Gallery" subtitle="A few faces you might meet at the event.">
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
      {kitties.map((k) => (
        <motion.figure key={k.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="group relative overflow-hidden rounded-3xl shadow ring-1 ring-pink-100">
          <img src={k.img} alt={k.name} className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white">
            <div className="font-semibold text-sm">{k.name} • {k.age}</div>
            <div className="text-xs opacity-90">{k.traits.join(" · ")}</div>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  </Section>
);

type FormData = {
  name: string;
  email: string;
  phone: string;
  cat: string;
  notes: string;
};

const Adopt = () => {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", cat: "Mocha", notes: "" });

  const [errors, setErrors] = useState<Partial<FormData>>({}); // if you store errors per field
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
     const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Please tell us your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!/^[0-9+\-()\s]{7,}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    return e;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSubmitted(true);
      // reset after a bit
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const Input = ({ label, id, type = "text", ...props }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <input id={id} type={type} className="mt-1 w-full rounded-xl border-pink-200 focus:ring-pink-300 focus:border-pink-400 placeholder-gray-400" {...props} />
      {errors[id] && <p className="text-sm text-rose-600 mt-1">{errors[id]}</p>}
    </div>
  );

  return (
    <Section id="adopt" title="Register to Adopt" subtitle="Complete the form and we’ll confirm your spot by email.">
      {submitted && (
        <div className="mb-6 rounded-2xl bg-green-50 border border-green-200 p-4 text-green-800">
          Thanks! Your registration was received. We just sent a confirmation email (simulated). See you soon!
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={onSubmit} className="rounded-3xl bg-white shadow ring-1 ring-pink-100 p-6 space-y-4">
          <Input id="name" label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nguyen Nguyen" />
          <Input id="email" type="email" label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
          <Input id="phone" label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+84 900 000 000" />
          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred cat</label>
            <select className="mt-1 w-full rounded-xl border-pink-200 focus:ring-pink-300 focus:border-pink-400" value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })}>
              {kitties.map((k) => (
                <option key={k.name}>{k.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea className="mt-1 w-full rounded-xl border-pink-200 focus:ring-pink-300 focus:border-pink-400" rows={4} placeholder="Tell us about your home, other pets, or questions…" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <button type="submit" className="w-full px-5 py-3 rounded-2xl bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition inline-flex items-center justify-center gap-2">
            <Heart size={18} /> Submit Registration
          </button>
          <p className="text-xs text-gray-500">By registering you agree to our friendly policies. We’ll never spam you.</p>
        </form>
        <aside className="space-y-4">
          <div className="rounded-3xl bg-pink-50 border border-pink-100 p-6">
            <h4 className="font-semibold text-gray-800">What to bring</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
              <li>Valid ID</li>
              <li>Pet carrier for a safe trip home</li>
              <li>Proof of address</li>
            </ul>
          </div>
          <div className="rounded-3xl bg-white shadow ring-1 ring-pink-100 p-6">
            <h4 className="font-semibold text-gray-800">Event location</h4>
            <div className="mt-2 flex items-start gap-3 text-sm text-gray-700">
              <MapPin className="mt-0.5 text-pink-600" size={18} />
              <span>123 Purr St, District 1, Ho Chi Minh City</span>
            </div>
            <div className="mt-2 flex items-start gap-3 text-sm text-gray-700">
              <Calendar className="mt-0.5 text-pink-600" size={18} />
              <span>Next month • 10:00 – 16:00</span>
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
};

const Contact = () => (
  <Section id="contact" title="Contact" subtitle="Questions? We’re happy to help.">
    <div className="grid md:grid-cols-3 gap-6">
      <div className="rounded-2xl bg-white shadow ring-1 ring-pink-100 p-6 flex items-start gap-3">
        <Phone className="text-pink-600" />
        <div>
          <div className="font-semibold text-gray-800">Phone</div>
          <a href="tel:+84900000000" className="text-pink-700 hover:underline">+84 900 000 000</a>
        </div>
      </div>
      <div className="rounded-2xl bg-white shadow ring-1 ring-pink-100 p-6 flex items-start gap-3">
        <Mail className="text-pink-600" />
        <div>
          <div className="font-semibold text-gray-800">Email</div>
          <a href="mailto:hello@purrfect.match" className="text-pink-700 hover:underline">hello@purrfect.match</a>
        </div>
      </div>
      <div className="rounded-2xl bg-white shadow ring-1 ring-pink-100 p-6 flex items-start gap-3">
        <MapPin className="text-pink-600" />
        <div>
          <div className="font-semibold text-gray-800">Location</div>
          <span className="text-gray-700">123 Purr St, HCMC</span>
        </div>
      </div>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="mt-16 border-t border-pink-100">
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <Cat size={18} className="text-pink-600" />
        <span>© {new Date().getFullYear()} Purrfect Match Rescue</span>
      </div>
      <div className="flex items-center gap-4">
        <a className="hover:text-pink-700" href="#home">Back to top</a>
        <span className="opacity-60">•</span>
        <a className="hover:text-pink-700" href="#adopt">Adopt</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="text-gray-800">
      <Nav />
      <Hero />
      <About />
      <Schedule />
      <Gallery />
      <Adopt />
      <Contact />
      <Footer />
    </div>
  );
}

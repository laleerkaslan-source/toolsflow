"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface ContactFormProps {
  locale: string;
}

export function ContactForm({ locale }: ContactFormProps) {
  const isTr = locale === "tr";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const labels = isTr
    ? {
        name: "Adınız",
        email: "E-posta",
        subject: "Konu",
        message: "Mesajınız",
        send: "Gönder",
        required: "*",
        placeholder: "Mesajınızı buraya yazın...",
      }
    : {
        name: "Your Name",
        email: "Email",
        subject: "Subject",
        message: "Your Message",
        send: "Send",
        required: "*",
        placeholder: "Write your message here...",
      };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = `${isTr ? "Ad" : "Name"}: ${name}\n${isTr ? "E-posta" : "Email"}: ${email}\n\n${message}`;
    const mailto = `mailto:info@laledijital.com?subject=${encodeURIComponent(
      subject || (isTr ? "Iletisim Formu" : "Contact Form"),
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="cf-name"
            className="mb-1.5 block text-sm font-medium"
          >
            {labels.name} <span className="text-primary">{labels.required}</span>
          </label>
          <input
            id="cf-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label
            htmlFor="cf-email"
            className="mb-1.5 block text-sm font-medium"
          >
            {labels.email} <span className="text-primary">{labels.required}</span>
          </label>
          <input
            id="cf-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      <div>
        <label htmlFor="cf-subject" className="mb-1.5 block text-sm font-medium">
          {labels.subject}
        </label>
        <input
          id="cf-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium">
          {labels.message} <span className="text-primary">{labels.required}</span>
        </label>
        <textarea
          id="cf-message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={labels.placeholder}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <Send className="h-4 w-4" />
        {labels.send}
      </button>
      <p className="text-xs text-muted-foreground">
        {isTr
          ? "Form göndererek e-posta istemciniz açılacaktır. Alternatif olarak doğrudan info@laledijital.com adresine yazabilirsiniz."
          : "Submitting will open your email client. You can also write directly to info@laledijital.com."}
      </p>
    </form>
  );
}

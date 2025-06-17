# 🧭 Pathfinder

Pathfinder is your AI-powered career companion. It helps people who feel **stuck**, **confused**, or simply curious — reflect deeply, discover their personality strengths, and receive **unique career niche suggestions**.

Whether you're a student, professional, or explorer of your next chapter, Pathfinder guides you from introspection to inspiration — one thoughtful reflection at a time.

---

## ✨ Features

- 🧠 **AI Personality Analysis** – Understand your core strengths and tendencies based on your reflections
- 🎯 **Niche Career Suggestions** – Get 3 creative and tailored career paths across diverse domains (not just tech!)
- 🧵 **Follow-Up Questions** – AI-generated prompts to go even deeper into self-discovery
- 💾 **Supabase Integration** – Save and retrieve your insights securely
- 🎨 **Clean UI** – Minimal, modern, distraction-free experience
- ⚙️ **Ollama (Llama3)** for local LLM inference (Gemini optional for production)
- 🚀 Built with **Next.js 15**, **Tailwind CSS**, **TypeScript**, and **Supabase**

---

## 🔍 Why Pathfinder?

> "I have so many interests but don’t know where to start."
>
> "I feel lost and don’t know what career direction fits me."
>
> "I want something that brings me both joy and meaning."

Pathfinder was born out of this universal stuckness. With AI, we turn vague feelings into clear insights, fast.

---

## 📸 Preview

![Pathfinder AI Personality Summary and Career Suggestions](./public/og.png)

---

## 🛠️ Tech Stack

| Layer        | Tech                              |
|--------------|-----------------------------------|
| Framework    | [Next.js 15](https://nextjs.org)  |
| Styling      | [Tailwind CSS](https://tailwindcss.com) |
| AI Model     | [LLaMA 3](https://ollama.com/library/llama3) via [Ollama](https://ollama.com) locally, or [Gemini Pro](https://makersuite.google.com/app) for cloud |
| DB & Auth    | [Supabase](https://supabase.com)  |
| Deployment   | [Vercel](https://vercel.com)      |

---

## 🧪 Local Setup

```bash
git clone https://github.com/yourusername/pathfinder.git
cd pathfinder
npm install
```

### 📦 Environment Variables

Create `.env.local` file:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
GEMINI_API_KEY=your_google_gemini_key (optional)
```

---

### 🧠 Run Ollama locally (optional)

```bash
ollama run llama3
```

---

## 🔐 Coming Soon

- 📜 Google login + reflection history
- 📤 PDF export of insights
- 🧭 Clickable learning paths
- 📊 Analytics dashboard
- 🌍 Public shareable reports
- ✨ Beautiful landing page and story

---

## 💡 Built With Purpose

Pathfinder isn’t just a tool — it’s a quiet revolution against confusion and stagnation. It helps you reconnect with yourself and confidently explore meaningful directions.

---

## 📣 Contributing

Coming soon — feel free to fork and star meanwhile ✨

---

## 🧑‍💻 Created By

**Krishna Nagpal**  
A builder exploring purpose-driven technology.  
[LinkedIn](https://www.linkedin.com/in/krishnanagpal/) • [GitHub](https://github.com/MurulKrishna4352)

---

## 🌟 License

[MIT](LICENSE)

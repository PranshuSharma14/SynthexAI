# 🧠 Synthex.AI – Your All-in-One AI Toolbox

Welcome to **Synthex.AI** – a powerful AI-powered web application that combines multiple tools into a single seamless platform. Whether you're generating images, editing them, or working with text content like resumes or articles, SynthexAI has you covered with just a few clicks.

> ⚡ Built with React, Node.js, PostgreSQL, Gemini, OpenAI, Cloudinary, and ClickDrop.

---

## ✨ Features

### 🎨 Image Tools
- ✅ **Image Generation** – Create images from text prompts using Gemini API (multiple styles: Realistic, Anime, Ghibli, etc.)
- ✅ **Remove Background** – Cleanly erase backgrounds from uploaded images via Cloudinary API.
- ✅ **Remove Object** – Upload an image and mask out unwanted objects using ClickDrop inpainting.

### 📄 Resume & Content Tools
- ✅ **Review Resume** – Upload or paste your resume to get AI-generated feedback, suggestions, and improvements.
- ✅ **Title Generation** – Input a paragraph or topic and receive engaging, click-worthy titles.
- ✅ **Article Generation** – Generate complete blog posts or articles from a given idea or heading using Gemini/OpenAI LLMs.

---

## 🛠 Tech Stack

| Category        | Tech Used                            |
|----------------|----------------------------------------|
| Frontend        | React.js, TailwindCSS, Vite            |
| Backend         | Node.js, Express.js                    |
| Database        | PostgreSQL (hosted with pg-pool)       |
| AI Services     | Gemini API, OpenAI API, ClickDrop API  |
| Image Handling  | Cloudinary                            |
| Auth            | Clerk Authentication                  |
| Deployment      | Vercel                                |

---

## 🔐 Authentication
This project uses **Clerk** for secure user authentication and stores user-specific image/text creations.



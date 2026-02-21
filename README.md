# 🧠 Synthex.AI – Your All-in-One AI Toolbox

Synthex.AI is a full-stack Generative AI–powered web application that brings together multiple AI tools into a single, seamless platform.
It enables users to generate, edit, and enhance images and text content using state-of-the-art AI models — all with secure authentication and user-specific storage.
> ⚡ Built with React, Node.js, PostgreSQL, Gemini, OpenAI, Cloudinary, and ClickDrop.


**🚀 What is Synthex.AI?**

Synthex.AI is a multi-modal Generative AI platform that allows users to:
 1.Generate AI images from text prompts
 2.Edit images using background removal and object inpainting
 3.Generate and improve text content such as resumes, titles, and articles
 4.Securely store AI-generated content per user

This project demonstrates real-world usage of LLMs and generative vision models integrated into a production-ready SaaS architecture.

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



⚙️ Run Locally
# Start the client
cd client

npm run dev

# Start the server
cd server

npm start server



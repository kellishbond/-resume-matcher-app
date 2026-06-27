🧠 AI Resume & JD Logic Matcher
A full-stack Node.js application that combines traditional algorithmic keyword matching with Groq LLM analysis to evaluate resume-to-job-description fit.

🔗 Live Demo: [Your Render Link Here]

🧩 The Architecture (Why I built it this way)
Instead of just asking an AI "is this a good match?", I split the logic:

Computational Logic (Backend): A custom JavaScript algorithm extracts core keywords from the Job Description, filters out stop-words, and calculates a hard mathematical match percentage against the Resume text.
AI Analysis (Groq): Llama-3 is used for what it's actually good at—reading context. It analyzes the texts to output missing soft/hard skills and a qualitative summary.
⚙️ Tech Stack
Backend: Node.js, Express
AI Engine: Groq API (Llama 3 8B)
Frontend: Vanilla HTML/JS (Focused on function over flair)
🚀 How to Run Locally
Clone the repo
npm install
Create a .env file and add GROQ_API_KEY=your_key
node server.js
Go to `localhost:3000
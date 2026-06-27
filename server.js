// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
const { calculateLogicScore } = require('./matcher');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // We will put our HTML in a 'public' folder

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/analyze', async (req, res) => {
    try {
        const { resumeText, jdText } = req.body;

        // 1. YOUR LOGIC (Computational Thinking Stat)
        const logicResult = calculateLogicScore(resumeText, jdText);

        // 2. GROQ AI (AI-Native Stat)
        const groqResponse = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an expert HR Tech AI. Analyze the resume against the job description. Return ONLY valid JSON in this exact format: { \"missing_skills\": [\"skill1\", \"skill2\"], \"summary\": \"A brief 2-sentence review of the candidate's fit.\" }"
                },
                {
                    role: "user",
                    content: `Resume: ${resumeText}\n\nJob Description: ${jdText}`
                }
            ],
            model: "llama-3.1-8b-instant", // Fastest model
            temperature: 0.3, // Keep it factual
        });

        // Groq returns a string, we need to parse it to JSON
        const aiAnalysis = JSON.parse(groqResponse.choices[0].message.content);

        // 3. COMBINE AND SEND TO FRONTEND
        res.json({
            logicScore: logicResult.score,
            matchedKeywords: logicResult.matchedKeywords,
            totalKeywords: logicResult.totalKeywords,
            aiMissingSkills: aiAnalysis.missing_skills,
            aiSummary: aiAnalysis.summary
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to analyze" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
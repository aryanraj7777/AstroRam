const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Error' });

    const { name, dob, tob, pob } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        You are a Master Vedic Sage from the Ramayan era. Use names like 'Jataka' for the user.
        Birth Data: ${name}, ${dob} at ${tob}, ${pob}.
        
        Provide a reading with 4 specific headers using 🕉️:
        1. 🕉️ THE DHARMIC PATH (Past & Character)
        2. 🕉️ THE CURRENT PHASE (Present Dasha)
        3. 🕉️ THE 2026 DESTINY (A specific prediction for 2026)
        4. 🕉️ DIVINE REMEDY (Suggested Mantra and Gemstone)

        Tone: Deeply spiritual, using metaphors of Lord Rama, Sita, and Hanuman. 
        Format: Use bold headers and clean spacing. Approx 250 words.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.status(200).json({ data: response.text() });
    } catch (error) {
        res.status(500).json({ error: "Oracle connection failed" });
    }
}

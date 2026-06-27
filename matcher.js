// matcher.js
// Common words we want to ignore (stop words)
const STOP_WORDS = new Set(['and', 'the', 'to', 'of', 'a', 'in', 'for', 'is', 'with', 'on', 'it', 'as', 'at', 'be', 'this', 'that', 'are', 'from', 'or', 'an', 'by', 'we', 'you', 'your', 'will', 'our', 'their', 'has', 'have', 'had', 'not', 'but', 'if', 'can']);

function extractKeywords(text) {
    // Convert to lowercase and split into words
    const words = text.toLowerCase().replace(/[^a-z0-9\s+]/g, '').split(/\s+/);
    
    // Filter out stop words and short words, then return unique keywords
    const keywords = new Set();
    words.forEach(word => {
        if (word.length > 2 && !STOP_WORDS.has(word)) {
            keywords.add(word);
        }
    });
    return Array.from(keywords);
}

function calculateLogicScore(resumeText, jdText) {
    const resumeLower = resumeText.toLowerCase();
    const jdKeywords = extractKeywords(jdText);
    
    let matchCount = 0;
    
    // Count how many JD keywords exist in the Resume
    jdKeywords.forEach(keyword => {
        if (resumeLower.includes(keyword)) {
            matchCount++;
        }
    });

    const scorePercentage = Math.round((matchCount / jdKeywords.length) * 100);
    
    return {
        score: scorePercentage,
        matchedKeywords: matchCount,
        totalKeywords: jdKeywords.length
    };
}

module.exports = { calculateLogicScore };
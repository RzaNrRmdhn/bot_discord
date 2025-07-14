import blacklist from '../data/toxicWords.js';

const substitutions = {
    a: 'a4@',
    i: 'i1!|',
    o: 'o0',
    e: 'e3',
    s: 's5$z',
    g: 'g9',
    b: 'b8',
    k: 'kq',
    t: 't7+',
    l: 'l1|!',
    u: 'uµ',
    w: 'wvv',
    y: 'y',
    f: 'fph',
    m: 'm',
    d: 'd',
    p: 'p',
    c: 'c',
    j: 'j',
    n: 'n'
};

const wordPatterns = blacklist.map(word => {
    const parts = [];
    for (const char of word) {
        if (substitutions[char]) {
            parts.push(`[${substitutions[char]}]`);
        } else {
            parts.push(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        }
    }
    return parts.join('[\\s\\.\\-_]*');
});

const toxicRegex = new RegExp(`\\b(${wordPatterns.join('|')})\\b`, 'i');

export default function checkToxicWord(text) {
    const lower = text.toLowerCase();
    const matched = lower.match(toxicRegex);
    return {
        isToxic: !!matched,
        matched: matched ? [matched[1]] : []
    };
}

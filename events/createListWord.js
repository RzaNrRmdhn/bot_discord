import blacklist from "../data/toxicWords.js";

export default async function handleListWord(message){
    if(message.author.bot) return;

    if(message.content == '!listMuted'){
        const list = blacklist.map(word => `- ${word}`).join('\n');

        await message.reply(`🧹 **Daftar kata toxic:**\n\`\`\`\n${list}\n\`\`\``);
    }
} 
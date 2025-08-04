import blacklist from "../data/toxicWords.js";

export default async function handleListWord(interaction){
    if(!interaction.isButton()) return;
    
    if(interaction.customId === 'btn_listword'){
        const toxicWords = blacklist.map(word => `- ${word}`).join('\n');

        const embed = {
            color: 0xFF0000,
            title: 'Daftar Kata Toxic',
            description: `Berikut adalah daftar kata toxic yang telah ditetapkan:\n\n${toxicWords}`,
            footer: {
                text: 'Harap gunakan kata-kata ini dengan bijak.',
            },
        };

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
} 
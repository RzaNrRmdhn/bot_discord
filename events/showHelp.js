import { EmbedBuilder } from "discord.js";

export default async function handleShowHelp(message){
    if(message.author.bot) return;

    if(message.content == '!nevasHelp'){
        const embed = new EmbedBuilder()
            .setTitle('📜 Nevas Bot Help')
            .setDescription('Berikut adalah daftar perintah yang bisa kamu gunakan:')
            .setColor('#00AAFF')
            .addFields(
                { 
                    name: '💬 Command Dasar', 
                    value: 
                        '- \`!nevasHelp\` untuk melihat daftar perintah\n' +
                        '- \`!send <#channel>\` untuk mengirim pesan ke channel tertentu(Admin Only)\n' +
                        '- \`!listMuted\` untuk melihat daftar kata yang diblokir\n', 
                    inline: false 
                },
            )
            .setFooter({ text: 'Nevas Bot • Stay Manizz!' })
            .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    }
}
import checkToxicWord from '../helpers/checkToxicWords.js';
import { EmbedBuilder } from 'discord.js';

const muteTimers = new Map();

export default async function handleMessageCreate(message) {
    if (message.author.bot) return;

    const { isToxic } = checkToxicWord(message.content);

    

    if (isToxic) {
        try {
            await message.delete();

            const muteRole = message.guild.roles.cache.find(
                role => role.name.toLowerCase() === 'muted'
            );

            if (!muteRole) {
                console.error('Role Muted tidak ditemukan!');
                    await message.channel.send(
                    `❌ Role **Muted** tidak ditemukan! Buat dulu dan blokir **Send Messages**.`
                );
                return;
            }

            const userId = message.author.id;
            await message.member.roles.add(muteRole);

            const embed = new EmbedBuilder()
                    .setTitle('🚫 Peringatan Otomatis')
                    .setDescription(`Heiii!! Pesan kamu terdeteksi mengandung kata kasar. Tolong Jangan Ngomong kasar ya Manizz!`)
                    .setColor('#FF0000')
                    .setThumbnail('https://cdn-icons-png.flaticon.com/512/726/726623.png')
                    .addFields(
                        { name: 'User', value: `<@${message.author.id}>`, inline: true },
                        { name: 'Status', value: 'Muted 1 menit', inline: true }
                    )
                    .setImage('https://media.tenor.com/OzM8E4EYEnwAAAAd/no-toxic-toxic.gif')
                    .setTimestamp();

            await message.channel.send(
                { embeds: [embed] }
            );

            if (muteTimers.has(userId)) {
                clearTimeout(muteTimers.get(userId));
            }

            const timeout = setTimeout(async () => {
            const freshMember = await message.guild.members.fetch(userId);
            if (freshMember.roles.cache.has(muteRole.id)) {
                await freshMember.roles.remove(muteRole).catch(console.error);
                console.log(`✅ Unmute ${freshMember.user.tag}`);
            }
                muteTimers.delete(userId);
            }, 60 * 1000);

            muteTimers.set(userId, timeout);

        } catch (err) {
            console.error('Gagal mute user:', err);
        }
    }
}
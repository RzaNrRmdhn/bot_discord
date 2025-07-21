import { EmbedBuilder } from 'discord.js';

export default async function handleNotifOpenChat(oldState, newState) {
    const member = newState.member;

    if (!member || member.user.bot) return;

    if (!oldState.channel && newState.channel) {
        const voiceChannel = newState.channel;
        console.log(`EVENT: ${member.user.tag} bergabung ke channel voice: ${voiceChannel.name}`);

        const sendNotif = new EmbedBuilder()
            .setColor('#2ECC71')
            .setDescription(`👋 **${member.displayName}** telah bergabung ke voice channel.`)
            .setAuthor({ name: member.displayName, iconURL: member.user.displayAvatarURL() })
            .setTimestamp();

        try {
            await voiceChannel.send({ embeds: [sendNotif] });
            console.log(`Notifikasi join terkirim ke "Open Chat" di channel ${voiceChannel.name}.`);
        } catch (error) {
            console.error(`Gagal mengirim notifikasi join ke ${voiceChannel.name}. Error: ${error.message}`);
            console.log('Pastikan bot memiliki izin "Send Messages" di dalam voice channel tersebut.');
        }
    }

    if (oldState.channel && !newState.channel) {
        const voiceChannel = oldState.channel;
        console.log(`EVENT: ${member.user.tag} meninggalkan channel voice: ${voiceChannel.name}`);

        const leaveEmbed = new EmbedBuilder()
            .setColor('#E74C3C')
            .setDescription(`**${member.displayName}** telah meninggalkan voice channel.`)
            .setAuthor({ name: member.displayName, iconURL: member.user.displayAvatarURL() })
            .setTimestamp();
            
        try {
            await voiceChannel.send({ embeds: [leaveEmbed] });
            console.log(`Notifikasi leave terkirim ke "Open Chat" di channel ${voiceChannel.name}.`);
        } catch (error) {
            console.error(`Gagal mengirim notifikasi leave ke ${voiceChannel.name}. Error: ${error.message}`);
            console.log('Pastikan bot memiliki izin "Send Messages" di dalam voice channel tersebut.');
        }
    }
}

export default async function handleSendMessage(message) {
    if (message.author.bot) return;

    if (message.content.startsWith('!send')) {

        if (!message.member.roles.cache.has('1340645874707071077')) {
            return message.reply('❌ Hanya admin yang boleh pakai command ini!');
        }

        const lines = message.content.split('\n');

        const header = lines[0].split(' ');
        const rawMention = header[1];

        if (!rawMention) {
            return message.reply('❌ Kamu harus mention channel!');
        }

        const channelId = rawMention.replace('<#', '').replace('>', '');

        lines.shift();
        const cleanContent = lines.join('\n').trim();

        if (!cleanContent) {
            return message.reply('❌ Pesan kosong!');
        }

        const targetChannel = message.guild.channels.cache.get(channelId);

        if (!targetChannel) {
            return message.reply(`❌ Channel dengan ID "${channelId}" tidak ditemukan.`);
        }

        try {
            await message.delete();
            await targetChannel.send(cleanContent);

            console.log(`✅ Pesan dikirim ke ${targetChannel.name}`);
        } catch (err) {
            console.error(err);
        }
    }
}

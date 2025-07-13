// handlers/sendMessages.js
import formatMessageText from '../helpers/formatMessagesText.js';

export default async function execute(interaction) {
    const message = interaction.options.getString('message');
    const formatted = formatMessageText(message);

    const targetChannel = interaction.options.getChannel('target_channel');
    const attachment = interaction.options.getAttachment('attachment');

    if (!targetChannel) {
        await interaction.reply({
            content: `❌ Channel tidak ditemukan!`,
            ephemeral: true,
        });
        return;
    }

    await interaction.deferReply({ ephemeral: true });

    await targetChannel.send({
        content: formatted,
        files: attachment ? [attachment.url] : [],
    });

    await interaction.editReply({
        content: `✅ Pesan berhasil dikirim ke #${targetChannel.name}!`,
    });
}

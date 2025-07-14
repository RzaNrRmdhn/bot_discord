import formatMessageText from '../helpers/formatMessagesText.js';
import checkChannel from '../middleware/checkChannels.js';

export default async function execute(interaction) {
    const isAllowed = checkChannel(interaction, 'command-log');
    if (!isAllowed) return;
    
    const messageId = interaction.options.getString('message_id');
    const replyText = interaction.options.getString('message');
    const targetChannel = interaction.options.getChannel('target_channel');
    const attachment = interaction.options.getAttachment('attachment');

    await interaction.deferReply({ ephemeral: true });

    try {
        const targetMessage = await targetChannel.messages.fetch(messageId);

        const formattedText = formatMessageText(replyText);

        const replyPayload = {
            content: formattedText,
            files: attachment ? [attachment.url] : [],
        };

        await targetMessage.reply(replyPayload);

        await interaction.editReply({
            content: `✅ Balasan terkirim ke [pesan ini](https://discord.com/channels/${interaction.guild.id}/${targetChannel.id}/${messageId})!`,
            ephemeral: true,
        });
    } catch (err) {
        console.error(err);
        await interaction.editReply({
            content: '❌ Gagal menemukan pesan. Pastikan ID benar & bot punya izin **Read Message History**!',
            ephemeral: true,
        });
    }
}

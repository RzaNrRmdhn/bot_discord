// handlers/replyMessage.js
export default async function execute(interaction) {
    const messageId = interaction.options.getString('message_id');
    const replyText = interaction.options.getString('message');
    const targetChannel = interaction.options.getChannel('target_channel');

    try {
        const targetMessage = await targetChannel.messages.fetch(messageId);

        await targetMessage.reply(replyText);

        await interaction.reply({
            content: `✅ Balasan terkirim ke [pesan ini](https://discord.com/channels/${interaction.guild.id}/${targetChannel.id}/${messageId})!`,
            ephemeral: true,
        });
    } catch (err) {
        console.error(err);
        await interaction.reply({
            content: '❌ Gagal menemukan pesan. Pastikan ID benar & bot punya izin **Read Message History**!',
            ephemeral: true,
        });
    }
}

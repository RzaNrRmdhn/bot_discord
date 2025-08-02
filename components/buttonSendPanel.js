import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} from 'discord.js';

export async function sendReportPanel(channel) {
    const reportButton = new ButtonBuilder()
        .setCustomId('openReportModal')
        .setLabel('🚨 Buat Report')
        .setStyle(ButtonStyle.Danger);

    const suggestButton = new ButtonBuilder()
        .setCustomId('openSuggestModal')
        .setLabel('💡 Buat Saran')
        .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder().addComponents(reportButton, suggestButton);

    const embed = new EmbedBuilder()
        .setColor('#00AAFF')
        .setTitle('📣 Panel Laporan & Saran')
        .setDescription('Gunakan tombol di bawah untuk membuat laporan masalah atau memberikan saran/Roles Baru.')
        .setFooter({ text: 'Nevas Bot • Stay Manizz!' })
        .setTimestamp();


    await channel.send({
        embeds: [embed],
        components: [row],
    });
}

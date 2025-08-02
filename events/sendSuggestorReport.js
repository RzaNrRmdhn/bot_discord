import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder} from 'discord.js';

const ADMIN_CHANNEL_ID = '1394199775305404456';

export default async function handleSuggestorReport(interaction) {
    if (interaction.isButton() && interaction.customId === 'openReportModal') {
        const modal = new ModalBuilder()
            .setCustomId('modalReport')
            .setTitle('🚨 Buat Laporan');

        const input = new TextInputBuilder()
            .setCustomId('reportText')
            .setLabel('Tulis laporanmu:')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        modal.addComponents(new ActionRowBuilder().addComponents(input));

        await interaction.showModal(modal);
    }

    if (interaction.isButton() && interaction.customId === 'openSuggestModal') {
        const modal = new ModalBuilder()
            .setCustomId('modalSuggest')
            .setTitle('💡 Buat Saran');

        const input = new TextInputBuilder()
            .setCustomId('suggestText')
            .setLabel('Tulis saranmu:')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        modal.addComponents(new ActionRowBuilder().addComponents(input));

        await interaction.showModal(modal);
    }

    if (interaction.isModalSubmit() && interaction.customId === 'modalReport') {
        const report = interaction.fields.getTextInputValue('reportText');

        const embed = new EmbedBuilder()
            .setTitle('🚨 Laporan Baru')
            .setDescription(report)
            .setColor('#ff0000ff')
            .setFooter({ text: `Dari: ${interaction.user.tag}` })
            .setTimestamp();

        const adminChannel = interaction.guild.channels.cache.get(ADMIN_CHANNEL_ID);
        await adminChannel.send({
            embeds: [embed],
        });

        await adminChannel.send({
            content: `<@&1340645874707071077>`,
            allowedMentions: {
                roles: ['1340645874707071077'],
            },
        });

        await interaction.reply({ content: '✅ Laporanmu sudah dikirim ke admin!', ephemeral: true });
    }

    if (interaction.isModalSubmit() && interaction.customId === 'modalSuggest') {
        const suggest = interaction.fields.getTextInputValue('suggestText');

        const embed = new EmbedBuilder()
            .setTitle('💡 Saran Baru')
            .setDescription(suggest)
            .setColor('#0000FF')
            .setFooter({ text: `Dari: ${interaction.user.tag}` })
            .setTimestamp();

        const adminChannel = interaction.guild.channels.cache.get(ADMIN_CHANNEL_ID);
        await adminChannel.send({
            embeds: [embed],
        });

        await adminChannel.send({
            content: `<@&1340645874707071077>`,
            allowedMentions: {
                roles: ['1340645874707071077'],
            },
        });

        await interaction.reply({ content: '✅ Terima kasih atas sarannya!', ephemeral: true });
    }
}

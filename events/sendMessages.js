import {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ButtonBuilder,
    ButtonStyle,
    InteractionType,
} from 'discord.js';

const activeSessions = new Map();
const allChannels = new Map();

export default async function handleSendMessages(interaction) {
    if (interaction.isButton()) {
        if (interaction.customId === 'btn_announcement') {
            const channels = interaction.guild.channels.cache
                .filter(ch => ch.type === 0 || ch.type === 5)
                .map(ch => ({
                    label: `#${ch.name}`,
                    value: ch.id,
                }));

            allChannels.set(interaction.user.id, channels);

            const page = 0;
            const pageOptions = channels.slice(0, 25);

            if (pageOptions.length === 0) {
                return interaction.reply({
                    content: 'Tidak ada channel tersedia.',
                    flags: 64,
                });
            }

            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId(`select_channel_page_${page}`)
                .setPlaceholder('Pilih channel')
                .addOptions(pageOptions);

            const nextPageOptions = channels.slice(25, 50);
            const row1 = new ActionRowBuilder().addComponents(selectMenu);
            const row2 = new ActionRowBuilder();

            if (nextPageOptions.length > 0) {
                const nextButton = new ButtonBuilder()
                    .setCustomId(`channel_page_next_${page}`)
                    .setLabel('Next ➡️')
                    .setStyle(ButtonStyle.Primary);
                row2.addComponents(nextButton);
            }

            await interaction.reply({
                content: 'Pilih channel (page 1)',
                components: [row1, row2],
                flags: 64,
            });
        }

        else if (interaction.customId.startsWith('channel_page_next_') || interaction.customId.startsWith('channel_page_prev_')) {
            const parts = interaction.customId.split('_');
            const action = parts[2];
            const oldPage = parseInt(parts.pop());
            const page = action === 'next' ? oldPage + 1 : oldPage - 1;

            const channels = allChannels.get(interaction.user.id);
            const pageOptions = channels.slice(page * 25, (page + 1) * 25);

            if (pageOptions.length === 0) {
                return interaction.reply({
                    content: 'Tidak ada channel di halaman ini!',
                    flags: 64,
                });
            }

            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId(`select_channel_page_${page}`)
                .setPlaceholder(`Pilih channel (page ${page + 1})`)
                .addOptions(pageOptions);

            const row1 = new ActionRowBuilder().addComponents(selectMenu);
            const row2 = new ActionRowBuilder();

            if (page > 0) {
                const prevButton = new ButtonBuilder()
                    .setCustomId(`channel_page_prev_${page}`)
                    .setLabel('⬅️ Prev')
                    .setStyle(ButtonStyle.Secondary);
                row2.addComponents(prevButton);
            }

            const nextPageOptions = channels.slice((page + 1) * 25, (page + 2) * 25);
            if (nextPageOptions.length > 0) {
                const nextButton = new ButtonBuilder()
                    .setCustomId(`channel_page_next_${page}`)
                    .setLabel('Next ➡️')
                    .setStyle(ButtonStyle.Primary);
                row2.addComponents(nextButton);
            }

            await interaction.update({
                content: `Pilih channel (page ${page + 1})`,
                components: [row1, row2],
            });
        }
    }

    if (interaction.isStringSelectMenu()) {
        if (interaction.customId.startsWith('select_channel_page_')) {
            const selectedChannelId = interaction.values[0];

            activeSessions.set(interaction.user.id, {
                targetChannelId: selectedChannelId,
            });

            const allRoles = interaction.guild.roles.cache
                .filter(role => !role.managed && role.name !== '@everyone')
                .map(role => ({
                    label: `@${role.name}`,
                    value: role.id,
                }));

            if (allRoles.length === 0) {
                allRoles.push({
                    label: 'Tanpa Role',
                    description: 'Tidak mention role apapun',
                    value: 'none',
                });
            }

            allChannels.set(`${interaction.user.id}_roles`, allRoles);

            const page = 0;
            const pageOptions = allRoles.slice(0, 25);

            const rolesMenu = new StringSelectMenuBuilder()
                .setCustomId(`select_roles_page_${page}`)
                .setPlaceholder('Pilih role untuk mention')
                .addOptions(pageOptions);

            const nextPageOptions = allRoles.slice(25, 50);
            const row1 = new ActionRowBuilder().addComponents(rolesMenu);
            const row2 = new ActionRowBuilder();

            if (nextPageOptions.length > 0) {
                const nextButton = new ButtonBuilder()
                    .setCustomId(`roles_page_next_${page}`)
                    .setLabel('Next ➡️')
                    .setStyle(ButtonStyle.Primary);
                row2.addComponents(nextButton);
            }

            await interaction.update({
                content: 'Pilih role untuk mention (page 1)',
                components: [row1, row2],
                flags: 64,
            });
        }

        else if (interaction.customId.startsWith('select_roles_page_')) {
            const selectedRoleId = interaction.values[0];
            const session = activeSessions.get(interaction.user.id) || {};
            session.targetRoleId = selectedRoleId === 'none' ? null : selectedRoleId;
            activeSessions.set(interaction.user.id, session);

            const modal = new ModalBuilder()
                .setCustomId('announcement_modal')
                .setTitle('Tulis Announcement');

            const titleInput = new TextInputBuilder()
                .setCustomId('title')
                .setLabel('Judul')
                .setStyle(TextInputStyle.Short)
                .setRequired(true);

            const bodyInput = new TextInputBuilder()
                .setCustomId('body')
                .setLabel('Isi Pesan (Markdown OK)')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);

            modal.addComponents(
                new ActionRowBuilder().addComponents(titleInput),
                new ActionRowBuilder().addComponents(bodyInput)
            );

            await interaction.showModal(modal);
        }
    }

    if (interaction.isButton()) {
        if (interaction.customId.startsWith('roles_page_next_') || interaction.customId.startsWith('roles_page_prev_')) {
            const parts = interaction.customId.split('_');
            const action = parts[2];
            const oldPage = parseInt(parts.pop());
            const page = action === 'next' ? oldPage + 1 : oldPage - 1;

            const allRoles = allChannels.get(`${interaction.user.id}_roles`);
            const pageOptions = allRoles.slice(page * 25, (page + 1) * 25);

            if (pageOptions.length === 0) {
                return interaction.reply({
                    content: 'Tidak ada roles di halaman ini!',
                    flags: 64,
                });
            }

            const rolesMenu = new StringSelectMenuBuilder()
                .setCustomId(`select_roles_page_${page}`)
                .setPlaceholder(`Pilih role (page ${page + 1})`)
                .addOptions(pageOptions);

            const row1 = new ActionRowBuilder().addComponents(rolesMenu);
            const row2 = new ActionRowBuilder();

            if (page > 0) {
                const prevButton = new ButtonBuilder()
                    .setCustomId(`roles_page_prev_${page}`)
                    .setLabel('⬅️ Prev')
                    .setStyle(ButtonStyle.Secondary);
                row2.addComponents(prevButton);
            }

            const nextPageOptions = allRoles.slice((page + 1) * 25, (page + 2) * 25);
            if (nextPageOptions.length > 0) {
                const nextButton = new ButtonBuilder()
                    .setCustomId(`roles_page_next_${page}`)
                    .setLabel('Next ➡️')
                    .setStyle(ButtonStyle.Primary);
                row2.addComponents(nextButton);
            }

            await interaction.update({
                content: `Pilih role (page ${page + 1})`,
                components: [row1, row2],
            });
        }
    }

    if (interaction.type === InteractionType.ModalSubmit) {
        if (interaction.customId === 'announcement_modal') {
            const session = activeSessions.get(interaction.user.id);

            if (!session) {
                return interaction.reply({
                    content: 'Session tidak ditemukan. Ketik `!setupNevas` lagi.',
                    flags: 64,
                });
            }

            const title = interaction.fields.getTextInputValue('title');
            const body = interaction.fields.getTextInputValue('body');

            const targetChannelId = session.targetChannelId;
            const targetChannel = interaction.guild.channels.cache.get(targetChannelId);

            if (!targetChannel) {
                return interaction.reply({
                    content: 'Channel tujuan tidak valid.',
                    flags: 64,
                });
            }

            let finalMessage = `# ${title}\n${body}`;

            if (session.targetRoleId) {
                finalMessage = `<@&${session.targetRoleId}>\n${finalMessage}`;
            }

            await targetChannel.send(finalMessage);

            await interaction.update({
                content: '✅ Announcement berhasil dikirim!',
                flags: 64,
            });

            setTimeout(async () => {
                await interaction.deleteReply().catch(() => {});
            }, 5000);

            activeSessions.delete(interaction.user.id);
        }
    }
}
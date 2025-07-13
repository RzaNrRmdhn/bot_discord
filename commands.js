import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const commands = [
    new SlashCommandBuilder()
        .setName('combo_send')
        .setDescription('Kirim pesan multi-line + lampiran ke channel.')
        .addChannelOption(option =>
            option.setName('target_channel')
            .setDescription('Channel tujuan')
            .setRequired(true))
        .addAttachmentOption(option =>
            option.setName('attachment')
            .setDescription('Lampiran opsional')
            .setRequired(false))
    .toJSON(),
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        if (process.env.GUILD_ID) {
            console.log('🔄 Registering GUILD Command...');
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: commands }
        );
        }else {
            console.log('🔄 Registering GLOBAL Command...');
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: commands }
            );
        }
        console.log('✅ Command registered.');
    } catch (err) {
        console.error(err);
    }
})();

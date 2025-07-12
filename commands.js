import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const commands = [
    new SlashCommandBuilder()
        .setName('pengumuman')
        .setDescription('Kirim pengumuman ke #announcements.')
        .addStringOption(option =>
            option.setName('message')
            .setDescription('Isi pengumuman')
            .setRequired(true))
    .toJSON(),
    new SlashCommandBuilder()
        .setName('update_rules')
        .setDescription('Update rules server.')
        .addStringOption(option =>
            option.setName('message')
            .setDescription('Isi rules baru')
            .setRequired(true)
    )
    .toJSON(),
    new SlashCommandBuilder()
        .setName('testing')
        .setDescription('Cek koneksi bot ke Discord.')
        .addStringOption(option =>
            option.setName('message')
            .setDescription('Pesan untuk dikirim')
            .setRequired(true))
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

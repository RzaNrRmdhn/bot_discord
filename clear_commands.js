import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log('⏳ Menghapus semua command GLOBAL...');
            await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
        { body: [] }
        );
        console.log('✅ Semua GLOBAL command dihapus.');

        console.log('⏳ Menghapus semua command GUILD...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: [] }
        );
        console.log('✅ Semua GUILD command dihapus.');
    } catch (err) {
        console.error(err);
    }
})();
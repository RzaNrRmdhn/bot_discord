import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

import sendMessages from './commands/sendMessages.js';

dotenv.config();

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        const sendMessagesCommand = sendMessages(); // Panggil fungsinya

        console.log('🔄 Registering slash command...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: [sendMessagesCommand.data.toJSON()] }
        );
        console.log('✅ Command registered.');
    } catch (err) {
        console.error(err);
    }
})();

import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

import sendMessages from './commands/sendMessages.js';
import replyMessage from './commands/replyMessages.js';
import helpCommand from './commands/help.js';

dotenv.config();

const commands = [replyMessage(), sendMessages(), helpCommand()];
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {


        console.log('🔄 Registering slash command...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands.map(cmd => cmd.data.toJSON()) }
        );
        console.log('✅ Command registered.');
    } catch (err) {
        console.error(err);
    }
})();

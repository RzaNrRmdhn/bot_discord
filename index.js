import { Client, GatewayIntentBits, Collection } from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';

import sendMessages from './commands/sendMessages.js';
import sendMessagesHandler from './handlers/sendMessages.js';

dotenv.config();

const app = express();
app.get('/', (_, res) => res.send('Bot is alive!'));
app.listen(3000, () => console.log('✅ Express server running...'));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const sendMessagesCommand = sendMessages();

client.commands.set(sendMessagesCommand.data.name, {
    data: sendMessagesCommand.data,
    execute: sendMessagesHandler,
});

client.once('ready', () => {
    console.log(`✅ Bot ready as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({
            content: '❌ Terjadi kesalahan!',
            ephemeral: true,
        });
    }
});

client.login(process.env.BOT_TOKEN);

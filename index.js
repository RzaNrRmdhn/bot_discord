import { Client, GatewayIntentBits} from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';
import events from './events/handlerEvents.js';

dotenv.config();

const app = express();
app.get('/', (_, res) => res.send('Bot is alive!'));
app.listen(3000, () => console.log('✅ Express server running...'));

const client = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log(`✅ Bot ready as ${client.user.tag}`);
});

events.forEach(({ event, handler }) => {
    client.on(event, handler);
    console.log(`Loaded handler for ${event}`);
});

client.login(process.env.BOT_TOKEN);

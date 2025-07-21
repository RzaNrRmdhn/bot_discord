import { Client, GatewayIntentBits} from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';
import events from './events/handlerEvents.js';
import { sendReportPanel } from './components/buttonSendPanel.js';

dotenv.config();

const app = express();
app.get('/', (_, res) => res.send('Bot is alive!'));
app.listen(3000, () => console.log('✅ Express server running...'));

const client = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.once('ready', () => {
    console.log(`✅ Bot ready as ${client.user.tag}`);
});

events.forEach(({ event, handler }) => {
    client.on(event, handler);
    console.log(`Loaded handler for ${event}`);
});

// client.once('ready', async () => {
//     console.log(`${client.user.tag} ready!`);

//     const reportChannel = client.channels.cache.get('1396768046101827655'); // #report
//     await sendReportPanel(reportChannel);
// });


client.login(process.env.BOT_TOKEN);

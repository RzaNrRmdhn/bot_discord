import { Client, GatewayIntentBits, Collection } from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';
import registry from './commands/index.js';
import handleMessageCreate from './events/createMessages.js';
import handleCreateChannel from './events/createChannel.js';
import handleOnboarding from './events/onboarding.js';
import blacklist from './data/toxicWords.js';

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

client.commands = new Collection();

for (const { command, handler } of registry) {
    client.commands.set(command.data.name, {
        data: command.data,
        execute: handler,
    });
}

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

client.on('messageCreate', handleMessageCreate);
client.on('channelCreate', handleCreateChannel);

client.on('messageCreate', async message => {

    if(message.author.bot) return;

    if(message.content == '!listMuted'){
        const list = blacklist.map(word => `- ${word}`).join('\n');

        await message.reply(`🧹 **Daftar kata toxic:**\n\`\`\`\n${list}\n\`\`\``);
    }
})

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // COMMAND TEST: !welcome
  if (message.content === '!welcome') {
    // Cari channel command-log
    const commandLogChannel = message.guild.channels.cache.find(
      ch => ch.name === 'command-log'
    );

    if (!commandLogChannel) {
      return message.reply('❌ Channel `command-log` tidak ditemukan!');
    }

   const hardcodedMessage = `
### 👋Haloow Welkam!! <@${member.id}>!
============================================
Salken Aku Nevas (≧∇≦)!
- Silakan kenalan di <#1392801305424171008>
- Kalau ambil role di <#1340643587041398876>!
=============================================
Moga Betah yawwww []~(￣▽￣)~*
`;

        await welcomeChannel.send({ content: hardcodedMessage });
    await message.reply('✅ Pesan welcome sudah dikirim ke #command-log');
  }
});

client.on('guildMemberAdd', handleOnboarding)

client.login(process.env.BOT_TOKEN);

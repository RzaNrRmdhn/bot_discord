import {
  Client,
  GatewayIntentBits,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  Events,
} from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
app.get("/", (req, res) => res.send("Bot is alive!"));
app.listen(3000, () => console.log("Express server running..."));

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('ready', () => {
  console.log(`✅ Bot ready as ${client.user.tag}`);
});

// Penyimpanan data Modal
const modalData = new Map();

// Format helper
const formatMessageText = (message) => {
  return message.replace(/(?<!\d)([.!?])\s+|\s+(?=[*#-]|__)/g, (match, p1) => {
    return p1 ? `${p1}\n` : '\n';
  });
};

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'combo_send') {
      const targetChannelId = interaction.options.getChannel('target_channel').id;
      const attachment = interaction.options.getAttachment('attachment');

      // Simpan ke Map
      modalData.set(interaction.id, {
        targetChannelId,
        attachmentUrl: attachment ? attachment.url : null,
      });

      // Buat Modal
      const modal = new ModalBuilder()
        .setCustomId(`comboModal_${interaction.id}`)
        .setTitle('Input Pesan Multi-line');

      const input = new TextInputBuilder()
        .setCustomId('messageInput')
        .setLabel('Isi pesan multi-line:')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const row = new ActionRowBuilder().addComponents(input);
      modal.addComponents(row);

      await interaction.showModal(modal);
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId.startsWith('comboModal_')) {
      const interactionId = interaction.customId.split('_')[1];
      const data = modalData.get(interactionId);

      if (!data) {
        await interaction.reply({ content: '❌ Data modal hilang!', ephemeral: true });
        return;
      }

      const targetChannel = await interaction.guild.channels.fetch(data.targetChannelId);
      const attachmentUrl = data.attachmentUrl;

      const message = interaction.fields.getTextInputValue('messageInput');
      const formattedMessage = formatMessageText(message);

      await targetChannel.send({
        content: formattedMessage,
        files: attachmentUrl ? [attachmentUrl] : [],
      });

      await interaction.reply({
        content: `✅ Pesan dikirim ke <#${targetChannel.id}>!`,
        ephemeral: true,
      });

      modalData.delete(interactionId);
    }
  }
});

client.login(process.env.BOT_TOKEN);

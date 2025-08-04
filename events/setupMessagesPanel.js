import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default async function handleSetupMessagePanel(message) {
  if (!message.content.startsWith('!setupNevas')) return;

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('btn_announcement')
      .setLabel('💬 Send Messages')
      .setStyle(ButtonStyle.Primary),

    
    new ButtonBuilder()
      .setCustomId('btn_listword')
      .setLabel('📃 List Toxic Words')
      .setStyle(ButtonStyle.Danger),

    // new ButtonBuilder()
    //   .setCustomId('btn_addword')
    //   .setLabel('⚙️ Tambah Toxic Word')
    //   .setStyle(ButtonStyle.Secondary)
  );

  await message.reply({
    content: 'Pilih fitur setup yang mau dijalankan:',
    components: [row],
  });
}

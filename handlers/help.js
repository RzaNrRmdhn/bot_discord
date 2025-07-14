export default async function execute(interaction) {
    const targetChannel = interaction.guild.channels.cache.find(
        c => c.name === 'command-log'
    );

    if (!targetChannel) {
        await interaction.reply({
            content: '❌ Channel `command-log` tidak ditemukan!',
            ephemeral: true,
        });
        return;
    }

  // Hardcode isi pesan
    const hardcodedMessage = `
# Penjelasan Bot 📌

Halo! Ini penjelasan mengenai Bot Nevas Origin.

- Gunakan perintah \`\/nevas_help\` untuk bantuan memunculkan pesan teks penjelasan ini.
- Gunakan perintah \`\/send_message\` untuk mengirim pesan.
- Gunakan perintah \`\/reply_message\` untuk membalas pesan.

### Penjelasan Pemakaian Bot
1. **\/send_message**: untuk mengirim pesan isi bagian message dan tujuan channel, bisa masukkan file(Opsional).
    - cara Penulisan seperti biasa namun agar pesan menjadi berbeda baris gunakan \\ pada setiap akhir kalimat untuk mengakhiri baris.
2. **\/reply_message**: untuk membalas pesan yang sudah ada, masukkan ID pesan
    - ID pesan didapatkan dengan mengklik kanan pada pesan yang ingin dibalas, lalu pilih "Salin ID Pesan". Pastikan bot memiliki izin untuk membaca riwayat pesan di channel tersebut.

### Jika ada Saran atau pertanyaan, silakan hubungi admin server.
Terima kasih telah menggunakan Bot Nevas Origin!😊
`;

    const sentMessage = await targetChannel.send({
        content: hardcodedMessage,
    });

    await interaction.reply({
        content: `✅ Pesan help terkirim ke channel ${targetChannel.name}!`,
        ephemeral: true,
    });
}

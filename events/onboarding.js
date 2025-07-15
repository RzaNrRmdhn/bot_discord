export default async function handleOnboarding(member) {
    console.log(`👋 Selamat datang ${member.user.tag}!`);

    const welcomeChannel = member.guild.channels.cache.get('1370350795781967922');

    if(welcomeChannel) {

        const hardcodedMessage = `
### 👋Haloow Welkam!! <@${member.id}>!
============================================
Salken Aku Nevas (≧∇≦)!
- Silahkan kenalan di <#1392801305424171008>
- Kalau ambil role di <#1340643587041398876>!
- Jangan lupa baca Rules di <#1330843237505830994>!
- dan Nantikan event seru dari kami lewat <#1352894276811362325> yaww!
=============================================
Thank u, Moga Betah yawwww []~(￣▽￣)~*
`;

        await welcomeChannel.send({ content: hardcodedMessage });
    }
}

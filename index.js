const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
});


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

client.on('ready', async () => {
  console.log(`Бот ${client.user.tag} включён!`);

  const guild = client.guilds.cache.get('GUILD_ID'); // Замените YOUR_GUILD_ID на актуальный ID вашего сервера

  try {
    const members = await guild.members.fetch();

    let processedCount = 0;
    let errorCount = 0;

    members.forEach(async (member) => {
      await delay(2000); // Задержка в 2 секунды

      try {
        await member.setNickname(member.user.username);
        console.log(`Изменяю никнейм для ${member.user.tag}`);
      } catch (error) {
        console.error(`Не удалось изменить никнейм ${member.user.tag}`);
        errorCount++;
      }

      processedCount++;

      if (processedCount === members.size) {
        console.log('Никнеймы успешно сброшены!');

        if (errorCount > 0) {
          console.log(`Произошло ${errorCount} ошибок при изменении никнеймов.`);
        }
      }
    });
  } catch (error) {
    console.error('Не удалось получить список участников:', error);
  }
});

client.login('TOKEN');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login('NTE3MjY5NTM1MDI0MzQ5MTk1.DuCUhg.c-YgUD-uwF6OCb-Au7VCTyvkdcs');
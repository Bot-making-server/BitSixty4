const Discord = require(`discord.js`);
const client = new Discord.Client();
const config = require(`./config.json`);

client.once(`ready`, () => {
    console.log(`Bit64ON`);
    client.user.setActivity(`bits to your Discord!`, {type: `STREAMING`});
});

client.on(`message`, message => {
    if(message.author.bot || !message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === `help`) message.channel.send(`No commands yet.`);
});


client.login(config.token);
const Discord = require(`discord.js`);
const client = new Discord.Client();
const config = require(`./config.json`);
const fs = require(`fs`);
const bits = require(`./bits.json`);
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once(`ready`, () => {
    console.log(`Bit64ON`);
    client.user.setActivity(`bits to your Discord!`, {type: `STREAMING`});
});

client.on(`message`, message => {
    if(message.author.bot || !message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(!bits[message.author.id])
    {
        bits[message.author.id] = {
            bits: 0,
            digibits: 0
        }
    }
    if (!client.commands.has(command)) return;

    try {
    	client.commands.get(command).execute(message, args);
    } catch (error) {
	    console.error(error);
	    message.reply(`Error:\n\`${error}\``);
    }
});


client.login(config.token);
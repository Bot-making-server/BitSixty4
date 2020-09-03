const Discord = require(`discord.js`);
const cooldowns = new Discord.Collection();
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
    const commandName = args.shift().toLowerCase();
    if(!bits[message.author.id])
    {
        bits[message.author.id] = {
            bits: 0,
            digibits: 0
        }
    }

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if(!command) return;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            let reply;
            if(!command.cooldownReply) reply = `Cool down, the bits need to recover!`; else reply = command.cooldownReply;
            const coolEmb = new Discord.MessageEmbed()
                .setTitle(`Cool down!`) 
                .setDescription(`${reply}\nPlease wait \`${timeLeft.toFixed(1)}\` more seconds!`)
                .setColor(`#003cff`);
            message.channel.send(coolEmb)
        }
    }

    try {
    	command.execute(message, args);
    } catch (error) {
	    console.error(error);
	    message.reply(`Error:\n\`${error}\``);
    }
});


client.login(config.token);
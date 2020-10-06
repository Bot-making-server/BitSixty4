const bits = require(`../bits.json`);
const Discord = require(`discord.js`);
const shop = require(`../shop.json`);

module.exports = {
	name: 'invite',
    description: 'Yeah, this is the invite.....',
    cooldown: 3,
    category: `miscellaneous`,
    cooldownReply: `A bit too entusiastic, we are.`,
	execute(message, args) {
        const invEmb = new Discord.MessageEmbed()
            .setTitle(`BitSixty4 Invite`)
            .setDescription(`You want to connect a flow to your server? Just [click me](https://discord.com/api/oauth2/authorize?client_id=746357321361260584&permissions=8&scope=bot) to establish one!`)
        message.channel.send(invEmb)
	},
};
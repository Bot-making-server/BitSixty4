const bits = require(`../bits.json`);
const Discord = require(`discord.js`);
const shop = require(`../shop.json`);

module.exports = {
	name: 'shop',
    description: 'View items in the shop!',
    cooldown: 3,
    cooldownReply: `uhh`,
    category: `economy`,
	execute(message, args) {
        if(!args[0] || !shop[args[0]])
        {
            const shopEmb = new Discord.MessageEmbed()
                .setTitle(`Shop`)
                .setDescription(`List coming soon! Use \`b64#shop <item>\` to view an item's stats!`);
            message.channel.send(shopEmb)
            return;
        }
        const shopEmb = new Discord.MessageEmbed()
            .setTitle(shop[args[0]].name)
            .addField(`Cost`, `${shop[args[0]].cost} ${shop[args[0]].currency}s`)
            .addField(`Description`, shop[args[0]].description);
        message.channel.send(shopEmb)
	},
};
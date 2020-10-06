const bits = require(`../bits.json`);
const Discord = require(`discord.js`);
const shop = require(`../shop.json`);

module.exports = {
	name: 'eval',
    description: 'secret',
    category: `developer`,
    aliases: [],
    cooldown: 2,
    cooldownReply: `Are you on a shopping spree?`,
	execute(message, args) {
        let code = args.join(` `);
        let evaluated = eval(code);
        message.channel.send(`Evaluated!\nInput: ${code}\nOutput: ${evaluated}`);  
	},
};
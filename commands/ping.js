module.exports = {
	name: 'ping',
	description: 'Ping!',
	category: `miscellaneous`,
	execute(message, args) {
		message.channel.send(`====== The flow is coming well. It is coming at a speed of \`${message.client.ws.ping}ms\``);
	},
};
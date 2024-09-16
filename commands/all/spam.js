const Discord = require('discord.js-selfbot-v13');

module.exports = {
  name: 'spam',
  description: 'Spam un message dans le canal d\'origine un certain nombre de fois.',
  run: async (message, args) => {
    if (!message || !message.channel) {
      console.error('Message ou canal non défini');
      return;
    }

    if (!Array.isArray(args)) {
      return message.author.send('Les arguments ne sont pas valides.');
    }
    if (args.length < 2) {
      return message.author.send('Veuillez spécifier un nombre de messages et le message à envoyer.');
    }
    const amount = parseInt(args[0], 10);
    const messageToSend = args.slice(1).join(' ');

    message.delete().catch(() => false);


    if (isNaN(amount) || amount <= 0) {
      return message.author.send('Veuillez spécifier un nombre valide de messages à envoyer.').catch(() => false);
    }
    if (!messageToSend) {
      return message.author.send('Veuillez spécifier le message à envoyer.').catch(() => false);
    }
    for (let i = 0; i < amount; i++) {
      try {
        await message.channel.send(messageToSend);
      } catch (error) {
        console.error(`Erreur lors de l'envoi du message : ${error.message}`);
      }
    }
  },
};

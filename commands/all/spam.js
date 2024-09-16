const Discord = require('discord.js-selfbot-v13');

module.exports = {
  name: 'spam',
  description: 'Spam un message dans le canal d\'origine un certain nombre de fois.',
  run: async (message, args) => {
    // Vérifiez que le message et le canal sont définis
    if (!message || !message.channel) {
      console.error('Message ou canal non défini');
      return;
    }

    // Assurez-vous que args est un tableau
    if (!Array.isArray(args)) {
      return message.author.send('Les arguments ne sont pas valides.');
    }

    // Vérifiez que nous avons au moins deux arguments : le nombre et le message
    if (args.length < 2) {
      return message.author.send('Veuillez spécifier un nombre de messages et le message à envoyer.');
    }

    // Le premier argument est le nombre de messages
    const amount = parseInt(args[0], 10);
    // Le reste des arguments constitue le message
    const messageToSend = args.slice(1).join(' ');

    // Supprime le message initial
    message.delete().catch(() => false);

    // Vérifiez si amount est un nombre valide
    if (isNaN(amount) || amount <= 0) {
      return message.author.send('Veuillez spécifier un nombre valide de messages à envoyer.').catch(() => false);
    }

    // Vérifiez si messageToSend n'est pas vide
    if (!messageToSend) {
      return message.author.send('Veuillez spécifier le message à envoyer.').catch(() => false);
    }

    // Spam le message
    for (let i = 0; i < amount; i++) {
      try {
        await message.channel.send(messageToSend);
      } catch (error) {
        console.error(`Erreur lors de l'envoi du message : ${error.message}`);
      }
    }
  },
};
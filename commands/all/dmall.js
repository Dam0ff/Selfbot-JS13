const Discord = require('discord.js-selfbot-v13');

module.exports = {
  name: 'dmall',
  description: 'Envoie un message privé spécifique à chaque ami.',
  run: async (message, args) => {

    if (!message || !message.author) {
      console.error('Message ou utilisateur non défini');
      return;
    }
    if (!Array.isArray(args)) {
      return message.author.send('Les arguments ne sont pas valides.');
    }
    const messageToSend = args.join(' ');
    if (!messageToSend) {
      return message.author.send('Veuillez spécifier le message à envoyer à vos amis.').catch(() => false);
    }
    const friends = message.client.users.cache.filter(user => user.bot === false);

    if (friends.size === 0) {
      return message.author.send('Vous n\'avez aucun ami dans votre liste.').catch(() => false);
    }
    for (const friend of friends.values()) {
      try {
        const dmChannel = await friend.createDM();
        await dmChannel.send(messageToSend);
        console.log(`Message envoyé à ${friend.tag}`);
      } catch (error) {
        console.error(`Erreur lors de l'envoi du message à ${friend.tag} : ${error.message}`);
      }
    }
    message.author.send('Le message a été envoyé à tous vos amis.').catch(() => false);
  },
};

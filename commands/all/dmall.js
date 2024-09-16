const Discord = require('discord.js-selfbot-v13');

module.exports = {
  name: 'dmall',
  description: 'Envoie un message privé spécifique à chaque ami.',
  run: async (message, args) => {
    // Vérifiez que le message et le canal sont définis
    if (!message || !message.author) {
      console.error('Message ou utilisateur non défini');
      return;
    }

    // Assurez-vous que args est un tableau
    if (!Array.isArray(args)) {
      return message.author.send('Les arguments ne sont pas valides.');
    }

    // Le message à envoyer à chaque ami
    const messageToSend = args.join(' ');

    // Vérifiez si messageToSend n'est pas vide
    if (!messageToSend) {
      return message.author.send('Veuillez spécifier le message à envoyer à vos amis.').catch(() => false);
    }

    // Obtenez la liste des amis
    const friends = message.client.users.cache.filter(user => user.bot === false);

    if (friends.size === 0) {
      return message.author.send('Vous n\'avez aucun ami dans votre liste.').catch(() => false);
    }

    // Envoyez le message à chaque ami
    for (const friend of friends.values()) {
      try {
        // Crée un canal de message direct avec l'ami
        const dmChannel = await friend.createDM();
        // Envoie le message
        await dmChannel.send(messageToSend);
        console.log(`Message envoyé à ${friend.tag}`);
      } catch (error) {
        console.error(`Erreur lors de l'envoi du message à ${friend.tag} : ${error.message}`);
      }
    }

    // Confirmez que la commande est terminée
    message.author.send('Le message a été envoyé à tous vos amis.').catch(() => false);
  },
};
const { Client, Collection } = require('discord.js-selfbot-v13');
const fs = require('fs');
const client = new Client({
    checkUpdate: false,
});
const config = require('./config.json');

const prefix = config.prefix;
const token = config.token;

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");


["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


client.on('ready', () => {
    client.user.setActivity('Selfboted by Dam', { type: 'PLAYING' }); 
    console.log(`${client.user.username} is running.`);
})


client.on('messageCreate', async message => {
    if(message.author.bot) return;
    if(message.author.id != client.user.id) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.members.fetch(message.author.id);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length == 0 ) return;

    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command){
        command.run(message, args, command, client);
        var d = new Date();
        console.log(`[${d.getHours()}.${d.getMinutes()}.${d.getSeconds()}] Command run : ${cmd}`);
    }
})

client.login(token);

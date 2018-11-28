var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `$`
    if (message.substring(0, 1) == '$') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
			
			case 'say':
                bot.sendMessage({
                    to: channelID,
                    message: 'no'
                });
            break;
			
			case 'scream':
                bot.sendMessage({
                    to: channelID,
                    message: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                });
            break;
			
			case 'lore':
                bot.sendMessage({
                    to: channelID,
                    message: '_This world is filled with Suspendium, it floats and not too much is known about it except that it\'s not healthy to be around. It is also often associated with magic._'
                });
            break;
			
			default:
				bot.sendMessage({
						to: channelID,
						message: 'ehm... sorry, I don\'t have anything to say about that, _yet_'
					});
			break;
         }
     }
});
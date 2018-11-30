var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./data/auth.json');

const ego = require('./data/ree_will');
const dice = require('./data/dicey');

const lore = 2;

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
    
    // shorten message function
    function speak(msg){
      bot.sendMessage({
        to: channelID,
        message: msg + ''
      });
    }
    
	// if (message.isMentioned(user)){
	//	speak('pong!');
	//}
    if (message.substring(0, 1) == '$') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
    	   
        args = args.splice(1);
        switch(cmd) {
            case 'ping':
                speak('pong!');
            break;
            
            case 'ree':
                speak('ReeEeEeEEE!');
            break;
			
			case 'Ubergrad':
                speak('_^ *`spingrad`_');
            break;
            
            case 'say':
                var cmd = args[0];
                if (cmd){
					var result = '';
                	for (II in args){
						result = result + ' ' + args[II];
					}
					speak(result);
                }else{
                        speak('what?');
                }
            break;
            
            case 'scream':
            	var aNumber = Math.floor(Math.random() * 10);
		if (aNumber >= 6){
                    speak('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!');
                }else if(aNumber <= 3){
                    speak('AaAaAaAaAaAaAaAaAAaAaAaAaAaAaAaAaAAaAaAa!');
                }else{
                    speak('_\*Incoherent screaming*_');
                }
            break;
            
            case 'lore':
                var cmd = args[0];
                if(cmd) {
                  speak('... you know, in this part i would bring up a topic but the function is not here yet');
                }else if (lore == 1){
                  speak('... please state \`lore\` and a \`topic\`');
                  const lore = 0;
                }else{
                  speak('That is a interesting topic, but there is simply too much of it to just speak about it in one sitting, how about we start with one subject first?');
                  const lore = 1;
                }
            break;
            
            default:
                speak('ehm... sorry, i\'m confused. halp!');
            break;
         }
     }
});

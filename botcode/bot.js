var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./data/auth.json');

const ego = require('./data/free_will.js');
const dice = require('./data/dicey.js');
const fs = require('fs');

const lore = 2;

let loredata = fs.readFileSync('./data/lore.json');  
let loreparsed = JSON.parse(loredata);  

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
    
    if (message.substring(0, 1) == '$') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
    	logger.info(message);
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
                if (cmd && cmd.substring(0, 1) !== '$'){
					var result = '';
                	for (II in args){
						result = result + ' ' + args[II];
					}
					speak(user + ' said: ' + result);
                }else{
					var aNumber = Math.floor(Math.random() * 10);
					if (aNumber >= 6){
						speak('you what?');
					}else if(aNumber <= 3){
						speak('are you daft?');
					}else{
						speak('nope, not saying that and you can\'t make me');
					}
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
					if(cmd == 'random'){
						
					}else{
						var find = args.toString().toUpperCase();
						speak(loreparsed[find]);
						logger.info("finding: " + find);
					}
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

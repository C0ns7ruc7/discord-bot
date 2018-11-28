var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var lore;

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
    
    // shorten message
    function speak(msg){
      bot.sendMessage({
        to: channelID,
        message: msg + ''
      });
    }
    
    if (message.substring(0, 1) == '$') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
    	   
        args = args.splice(1);
        switch(cmd) {
            case 'ping':
                speak('pong!');
            break;
            
            case 'ree':
                speak('https://youtu.be/7Jm_eUQSYAk');
            break;
            
            case 'say':
                var cmd = args[0];
                if (cmd){
                	speak(cmd);
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
                if(cmd == 'suspendium') {
                  speak('_This world is filled with Suspendium, it floats and not too much is known about it except that it\'s not healthy to be around. It is also often associated with magic._');
                }else if (lore == 1){
                  speak('... please state \`lore\` and a \`topic\`');
                  var lore = 0;
                }else{
                  speak('That is a interesting topic, but there is simply too much of it to just speak about it in one sitting, how about we start with one subject first?');
                  var lore = 1;
                }
            break;
            
            default:
                speak('ehm... sorry, I don\'t have anything to say about that, _yet_ @Vabese#9153 please fix this, i\'m confused. halp!');
            break;
         }
     }
});

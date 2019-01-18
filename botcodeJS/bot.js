// imported constants and vars
var Discord = require('discord.io');
var logger = require('winston');
var settings = require('./data/settings.json');
var modules = require('./data/modules.js');
function rNum(num){return modules.randomNum(num);}
const fs = require('fs');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot...
var bot = new Discord.Client({
   token: settings.token,
   autorun: true
});

// on start do the following...
bot.on('ready', function (evt) {
    logger.info	('Connected, logged in: ' + bot.username + ' -(' + bot.id + ')');
	fs.rename	('./logs/log.txt', './logs/log' + Date.now() + '.txt', (err) => {if (err) throw err;});
	fs.writeFile('./logs/log.txt', '', 'ascii', (err) => {if (err) throw err;});  
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `$`
    
    // shorten message function
    function speak(msg, chID){
		if (chID){
			bot.sendMessage({
				to: chID,
				message: msg + ''
			});
		}else{
			bot.sendMessage({
				to: channelID,
				message: msg + ''
			});
		}
    }
    
    if (message.substring(0, 1) == '$' || message.substring(0, 22) == '<@!517269535024349195>') {
        var args 		= message.substring(1).split(' ');
        var cmd  		= args[0].toUpperCase();
        var args 		= args.splice(1);
		var responce 	= ((rNum(10)) >= 5) ? '?' : '!';
		
        switch(cmd) {
			case 'HELP': speak(modules.helpText(userID)); break;
            case 'PING': speak('**\`Pong' + responce + '\`**'); break;
			case 'PONG': speak('**\`Ping' + responce + '\`**'); break;
			case 'BING': speak('**\`Bong' + responce + '\`**'); break;
			case 'BONG': speak('**\`Bing' + responce + '\`**'); break;
			case 'BEEP': speak('**\`Boop' + responce + '\`**'); break;
			case 'BOOP': speak('**\`Beep' + responce + '\`**'); break;
			
            case 'SAY'		: speak(modules.returnText(args, userID)); break;
			case 'WHATIS'	: speak(modules.whatIs(args, userID)); break;
			case 'LORE'		: speak(modules.getLore(args, userID, fs, logger)); break;
			case 'RLORE'	: speak("\`Random lore!:\` " + modules.randomLore(fs, logger)); break;
			case 'ADDLORE'	: speak(modules.setLore(args, userID, fs, logger)); break;
			
			case 'MAIL': 
				var intermediary = modules.sendText(args, channelID, userID); // TODO: make this nicer
				speak(intermediary[1], intermediary[2]); 
				speak(intermediary[0]); 
			break;
			
			case 'ROOTSAYTO':
				var sendto = args[0].replace(/<|#|>/g, '')
				args = args.splice(1);
                
				var result = '';
				for (II in args){
					result = result + ' ' + args[II];
				}
				bot.sendMessage({
					to: sendto + '',
					message: result + ''
				});
            break;
            
            case 'SCREAM':
				speak(modules.randomResponce([
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!',
					'$ree',
					'AaAaAaAaAaAaAaAaAAaAaAaAaAaAaAaAaAAaAaAa!',
					'***AAAAH!***',
					'_\*Incoherent screaming*_',
					'\"...\" _the sounds were so high only a dog can hear them_'
				]));
            break;
			
			case 'REE':
				speak(modules.randomResponce([
					'ReeEeEeEEE!',
					'rEeeeEEEE!',
					'$scream',
					'_\*explodes with \`ree\`\'s*_',
					'rrrreeeeeeeEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE!',
					'_\*Screaming frog sounds*_',
					'_Ribbit..._'
				]));
            break;
			
			case '-RMVLORE':
				fs.readFile('./data/lore.json', 'utf8', function (err,data) {
					if (err) {
						return logger.info(err);
					}
					var result = data.replace('\"\}', '\", \"'+ args[0].toUpperCase().replace(/,|\*|_|\`|:/gi, '') + '\": \"' + args.join(' ') + '\"\}').replace(/(?:\r\n|\r|\n)/g, ' ');

					fs.writeFile('./data/lore.json', result, 'utf8', function (err) {
						if (err) return logger.info(err);
					});
				});
				speak('I added... something related to ' + args[0]);  
			break;
			
			case 'DIE':
				if (channelID == settings.adminChanel)
				{
					die();
				}else{
					speak('You can only do that in the <#'+ settings.adminChanel +'> channel');
				}
			break;
			
			case 'ROLL':
				var cmd = args.join('');
				logger.info(cmd);
				cmd = cmd.split(''),
				logger.info(cmd);
				
				var num = [rNum(6) + 1, rNum(6) + 1];
				
				speak( '<@' + userID+ '> has rolled **' + (num[0] + num[1]) + '** ( \`' + num[0] + '\`, \`' + num[1] + '\` )');
			break;
            
            default:
                speak('Try running \`$help\`');
				logger.info(cmd);
            break;
        }
     }
	
	fs.appendFile("./logs/log.txt", Date.now() + ' UID: ' + userID + ' CID: ' + channelID + ' U: ' + user + ' Msg: ' + message + ' Evt: ' + evt + '\n', function(err) {
		if(err) {
			return logger.info(err);
		}
	}); 

	if (Math.floor(Math.random() * 30000) <= 100){
		bot.sendMessage({
			to: '481133060348182550',
			message: "\`Random lore!:\` " + modules.randomLore(fs, logger)
		});
	}
});



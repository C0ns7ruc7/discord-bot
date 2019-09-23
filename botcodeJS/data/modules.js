module.exports = {	
	helpText: function(userID){	
		return 'this is the help function of the molten bot, I have the following commands that you can use, <@' + userID + '>! \n\n' + 
			'Ok first up i\'m still being made so, be gentle... \n\n' + 
			'- I have \`Ping\`, \`pong\`, \`bing\`, \`bong\`, \`ree\`, \`scream\`, \`beep\` and \`boop\` they are what they are, use em an I will come back at you >=\) \n' + 
			'- then I have the \`say\` {msg} comand, it makes me repeat you... I don\'t know why that is here. \n' + 
			'- I also keep track of \`lore\` [lore name] things, do a empty command for a list. When I have too much lore you can do \'`\lore`\ \`$#\`\' for going between pages. \n' +
			'- you can add things with \`addlore\` the first word is used as search method, the owner of a word can overwrite with the same command \n' + 
			'- if you just want any lore, use \`rlore\` for random stuff.\n' +
			'- remove lore with \`rmvlore\` to get rid of it completely(not implimented). \n' + 
			'- there is also the \`mail\` [#channel(or when in DM a number)] {msg}  where you can send to a channel \n' + 
			'- a functional command is the \`whatis\` [@user/role OR #channel], it shows you the number needed for DM\'ing using the mail function \n' + 
			'- I also have the \`roll\` command, it works as a automatic 2d6 if you don\'t add comments \n' + 
			'- then there is the \`die\` command that can shut me down.\n' +
			'- If you feel lucky, There\'s also a random \`Mutate\` function, it has prety much all of the mutations you can think of\n' + 
			'\n' + 
			'there are a bunch of other things in the works \n' + 
			'don\'t forget I use \`$\`\'s to react';
		},
	
	randomNum: function(/* num */ max, min){
/*		var data = ((Math.random()*10)+'').replace('.', '').split('');
		var numb = data[data[0]] * 1;
		if (num <= num){
			numb = (numb + '' + data[data[1]]) * 1
		}
		while (numb >= num){
			numb = numb / 2.5;
		}
		numb = Math.floor(numb * 1);
		return numb;*/
		
		if(!min){ min = 0; }else{ min = min *1; }
		if(!max){ max = 0; }else{ max = max *1; }
		
		return Math.floor(Math.random() * (max - min) ) + min;
	},
	
	randomResponce: function(inputArray){
		var decider = this.randomNum(inputArray.length)
		return inputArray[decider];
	},
	
	whatIs: function(args, userID){
		if (args[0]){
			return (
				'_<@' 
				+ userID
				+ '>\` the deciphered things you said:\`_ ' 
				+ args.join(' ')
				.replace(/<|>|@/gi, '')
				.replace(/#/gi, ' Channel:')
				.replace(/&/gi, ' Role:')
				.replace(/!/gi, ' User:')
			);
		}else{
			return('\`you forgot everything...\`');
		}
	},
	
	returnText: function(args, userID){
		var cmd = args[0];
		if (cmd && cmd.substring(0, 1) !== '$'){
			var result = '';
			for (II in args){
				result = result + ' ' + args[II];
			}
			return('_<@' + userID + '> said:_ **' + result + '**');
		}else{
			return this.randomResponce([
				'\`you what?\`',
				'\`are you daft?\`',
				'\`nope, not saying that and you can\'t make me\`',
				'\`err... did you try not doing the \'thing\'?\`'
			]);
		}
	},
	
	sendText: function(args, channelID, userID){
		if(args[0]){
			var sendto = args[0].replace(/<|#|>/g, '')
			args = args.splice(1);
			
			var result = '';
			for (II in args){
				result = result + ' ' + args[II];
			}
			return[
				'\`your message has been sent!\`',
				'**\`[' + Math.floor((channelID - userID) / Date.now()) + ']\`**:' + result + '',
				sendto + '',
			];
		}else{
			return(['\`you broke the message... somehow.\`']);
		}	
	},
	
	getLore: function(args, userID, fs, logger, evt){
		let loredata = fs.readFileSync('./data/lore.json');  
		let loreparsed = JSON.parse(loredata); 
		var serverloc = evt["d"]["guild_id"]; // sets orgigen datastream for lore
		if(args[0] && !(args[0].substring(0, 1) == '$')) {
			var find = args.toString().toUpperCase();
			try {
				var listvar = Object.keys(loreparsed[serverloc]);
				
				var III, len;
				for (III = 0, len = listvar.length; III < len; ++III) {
					if(loreparsed[serverloc][III][0] === find){
						var result = loreparsed[serverloc][III][1];
					}
				}	
				if(result){}else{result = "\`not found, try adding it with `$addlore` '" + args.join(' ') + " + 'soemthing you wrote'\`";}
			}catch(err){
				result = "Something went horribly wrong...";
				logger.info(err);
			}
			return(result);
		}else{
			if(args[0]){
				var args = args[0].split('$');
				var cmd = (!isNaN(args[1])) ? args[1] : 0;
			}
			if(!loreparsed[serverloc]){return("\`no lore has been found, please make some first, try $help!\`");}
			var listvar = Object.keys(loreparsed[serverloc]);
			var listresult = [];

			var III, len;
			for (III = 0, len = listvar.length; III < len; ++III) {
				listresult.push(
					' ' + loreparsed[serverloc][III][0].toLowerCase().replace(',', ' ')
				);
			}		
			
			if(listresult.join(' ').length > 1800){
				var pages = Math.ceil(listresult.join(' ').length / 1800);
				var previousPage = [];
				
				if(cmd){
					while(previousPage.join(' ').length <= (1800 * cmd)){
						previousPage.push(listresult.shift());
					}
				}else{
					while(listresult.join(' ').length > 1800){
						listresult.pop();
					}
				}
				pages++;
				var page = (cmd) ? ((cmd * 1) + 1) : 1;
				return('_<@' + userID+ '>, \`I have the following topic(s) available:(page: ' + page + '/of/' + pages + ' )\`\n_ **' + listresult + '**');
			}else{
				return('_<@' + userID+ '>, \`I have the following topic(s) available:\`\n_ **' + listresult + '**');
			}
		}
	},
	
	randomLore: function(fs, logger, evt){
		let loredata = fs.readFileSync('./data/lore.json');  
		let loreparsed = JSON.parse(loredata);
		var result = "\`Something went horribly wrong...\`";
		var serverloc = evt["d"]["guild_id"]; // sets orgigen datastream for lore
		try {
			var listvar = Object.keys(loreparsed[serverloc]);
			result = loreparsed[serverloc][this.randomNum(listvar.length)][1]
		}catch(err){
			logger.info(err);
		}
		return(result.toString());
	},
	
	randommute: function(fs, logger, evt, args){
		if(args[1]){
			return ('..._ \n\`Er... hold on a bit, you gave too many things, try again\`_')
		}else{
			if(Number.isInteger(args[0] * 1)){
				if(args[0] <= 60){
					let mutedata = fs.readFileSync('./data/mutations.json');  
					let muteparsed = JSON.parse(mutedata);
					var result = "\`Something went horribly wrong...\`";
					
					var listvar = Object.keys(muteparsed["mutations"]);
					result = [];
					for(i = 0; i < args[0]; i++){
						loop = muteparsed["mutations"][this.randomNum(listvar.length)];
						result.push(loop);
					}
					return('_ \n>>> ' + (result.join(' \n')) + '_');
				}else{
					return('..._ \n\`Buddy, pall, I know you\'re eager, but keep it to 60 at a time.\`_');
				}
			}else{
				if(typeof(args[0]) === 'string'){
					return('..._ \n\`... what? you didn\'t give me a number, this lookup thing is not based on a 36 numbered system, don\'t be daft.\`_')
				}else{
					return('..._ \n\`You know I would, but you forgot to give a number...\`_');
				}
			}
		}
	},
	
	setLore: function(args, userID, fs, logger, evt){
		if(args[0]){
			var serverloc = evt["d"]["guild_id"]; // sets orgigen datastream for lore
			var objectKey = args[0]
				.toUpperCase()
				.replace(/,|\"|\*|\`|:/gi, '')
				.split('\n')[0]
				.replace(/_|-/g, ',');
			let data = fs.readFileSync('./data/lore.json', function (err) {
				if (err) { logger.info(err);}
			});
			var newdata = JSON.parse(data); 
			var listvar = (newdata[serverloc]) ? Object.keys(newdata[serverloc]) : [];
			var done = false;
			var III, len, loreResult;

			for (III = 0, len = listvar.length; III < len; ++III) {
				if(newdata[serverloc][III][0] === objectKey){
					if(newdata[serverloc][III][2] === userID){
						newdata[serverloc][III] = [
							objectKey,
							args.join(' '),
							userID
						];
						loreResult = "\`edited '" + objectKey.toLowerCase() + "' data\`";
						var done = true;
						break;
					}
					loreResult = "\`you don't own the lore about '" + objectKey.toLowerCase() + "'\`";
					var done = true;
					break;
				}
			}	
			if(!done){
				if(newdata[serverloc]){
					newdata[serverloc][(Object.keys(newdata[serverloc])).length] = [
						objectKey,
						args.join(' '),
						userID
					];
				}else{
					newdata[serverloc] = [[
						objectKey,
						args.join(' '),
						userID
					]];
				}
				loreResult = "\`I added: " + objectKey.toLowerCase().replace(/_|-|,/g, ' '); + '.\`';
			}
			fs.writeFile('./data/lore.json', JSON.stringify(newdata), 'utf8', function (err) {
				if (err){logger.info(err)};
			}); 
			
			return loreResult;
		}else{
			return '\`you eh... need to add some text, just start writing things after the \"$addlore\", you can add embellishments all you like too, by the way.\`';  
		}
	}
};
module.exports = {		
	helpText: function(args, userID){
		var result;
		if (args[0]){
			argsUpper = args.map(function(x){ return x.toUpperCase() });
			switch(argsUpper[0]){
				case 'PONG': result = "**`see Ping`**"; break;
				case 'PING': result = "**`see Pong`**"; break;
				case 'BING': result = "**`see Bong`**"; break;
				case 'BONG': result = "**`see Bing`**"; break;
				case 'REE': result = "**`Random frog or cat sounds`**"; break;
				case 'SCREAM': result = "**`Make it do that`**"; break;
				case 'SAY': result = "**`The` `'say'` _`{msg}`_ `comand, it makes me repeat you...`**"; break;
				case 'LORE': result = "**`I keep track of` `'lore'` _`[lore name]`_ `things, do a empty command for a list. When I have too much lore you can do` `'lore'` _`{$#}`_ `for going between pages.`**"; break;
				case 'ADDLORE': result = "**`you can add Lore with` `'addlore'` `the first word is used as search method, only the owner(first to set) of a word can overwrite with the same command`**"; break;
				case 'RLORE': result = "**`Randomly spits out any lore, use` `'rlore'` `for when you're feeling directionless.`**"; break;
				case 'RMVLORE': result = "**`Remove lore with` `'rmvlore'` _`[lore name]`_ `to get rid of it completely, only admin/mod or the word owner can use this.`**"; break;
				case 'MAIL': result = "**`the` `'mail'` `command, you use it as` `[#channel(or when in DM a number)]` _`{msg}`_ `where you can send messages to a chat across categories and servers`**"; break;
				case 'WHATIS': result = "**`When you need to know something,` `'whatis '` `[@user/role OR #channel OR LongNumber],` `it shows you the number needed for DM'ing using the` `'mail'` `function`**"; break;
				case 'ROLL': result = "**`The stereotypic` `'roll'` `{#D#}` `command, it works as a automatic 2d6 if you don't add comments`**"; break;
				case 'DIE': result = "**`... I can't do that, Dave`**"; break;
				case 'MUTATE': result = "**`For when you need a random physical trait that adds something crazy to your DNA, for use in RP/Writing lovecraftian works of fiction,` `'Mutate'` `{#}.` `Fair warining, there's some sensitive content in there that can be seen as NSFW or NSFL depending on how you view the internet as all things that can be changed are on the table, it can get wierd and may require periodic flamethrower.`**"; break;
				case 'HELP': result = "**`You're using it right now, but` `'Help'` `{word}` `for what you want more explantion on`**"; break;
//				case '': result = "**``**"; break;
				default: result = "**`'" + args + "' is what '" + args + "' is. You know more than I do`**"; break;
			}
			
		}else{
			result = "**Commands: <@" + userID + ">!\n" +
				">>> ```prolog\n" +
				"- Ping    - Pong \n" +
				"- Bing    - Bong \n" +
				"- Ree     - Scream\n" +
				"- Beep    - Boop \n" +
				"- Say     - Lore\n" +
				"- AddLore - RLore\n" +
				"- RmvLore - Mail\n" +
				"- WhatIs  - Roll\n" +
				"- Die     - Mutate\n" +
				"- Help    - ```**";
		}
		return result;
	}
};
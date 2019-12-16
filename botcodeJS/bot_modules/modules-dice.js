module.exports = {	
	dice: function(args, userID, fs, logger, evt){
		// require the dice-roller library
		const { DiceRoller } = require('rpg-dice-roller');

		// create a new instance of the DiceRoller
		const diceRoller = new DiceRoller();

		// roll the dice
		diceRoller.roll(args[0]);

		// get the latest dice rolls from the log
		let latestRoll = diceRoller.log.shift();

		// output the latest roll - it has a toString method for nice output
		return(latestRoll + '');
	}	
}
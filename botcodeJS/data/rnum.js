module.exports = {
	anum: function(num){
//		return Math.floor(Math.random() * num)
//		return (Math.round(((Math.random() * Math.random()) *10) * Math.random() * 1000)) % num
//		return Math.random()
		
		var data = ((Math.random()*10)+'').replace('.', '').split('');
		var numb = data[data[0]] * 1;
		if (numb >= num){
			numb = numb % num;
		}
		return numb;
	}
};
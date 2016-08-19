String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}


$(document).ready(function() {
	var wins = 0;
	var losses = 0;

	var correctGuesses = [];
	var incorrectGuesses = [];

	$("#game").hide();

	$("#start").click(function () {

		$("#game").show();

		var words = ["skynet", "shwarzenegger","cyberdyne","cyborg","nuclear"];

		var randomIndex = Math.floor(Math.random() * words.length); 
		var selectedWord = words[randomIndex];

		console.log(selectedWord);

		var hiddenWord = "";
		for (var i = 0; i < selectedWord.length; i++) {
			hiddenWord += "-";
		}

		$("#hiddenWord").text(hiddenWord);

		var maxFails = 9;
		var numFails = 0;
		var numCorrect = 0;
		var selectedLetter = "";

		correctGuesses = [];
		incorrectGuesses = [];
		$("#correctGuesses").text(correctGuesses);
		$("#incorrectGuesses").text(incorrectGuesses);

		$("#enter").click(function (e) {
			e.preventDefault();

			selectedLetter = $("#guess").val();
			selectedLetter = selectedLetter.toLowerCase();

			// correct
			if (selectedWord.indexOf(selectedLetter) > -1) {

				if (correctGuesses.indexOf(selectedLetter) > -1) {
					alert('letter is correct but already guessed');
				}
				else {

					var letterInWord = false;

					for (var i = 0; i < hiddenWord.length; i++) {
						if (selectedWord.charAt(i) == selectedLetter){
							hiddenWord = hiddenWord.replaceAt(i, selectedLetter);
							numCorrect ++;
							letterInWord = true;
						}
					}

					if( letterInWord ) {
						correctGuesses.push(selectedLetter);
					}

					$("#hiddenWord").text(hiddenWord);
				}
			}
			// fail
			else {
				// already in  incorrect guesses
				if (incorrectGuesses.indexOf(selectedLetter) > -1) {
					console.log('b');
					alert("You already guessed  " + selectedLetter + "!");
				}
				// new wrong guess
				else {
					console.log('c');
					numFails ++;
					incorrectGuesses.push(selectedLetter);
				}
			}

			$("#correctGuesses").text(correctGuesses);
			$("#incorrectGuesses").text(incorrectGuesses);
			$('#guess').val('');
			

			if (numFails === maxFails){
				losses ++;
				$('#losses').text(losses);

				alert('You are terminated.');
				$("#start").click();
			}
			else if (numCorrect === selectedWord.length){
				wins ++;
				$('#wins').text(wins);
				alert('You have stopped Judgement Day!!');
				$("#start").click();
			}
		});
	});
});
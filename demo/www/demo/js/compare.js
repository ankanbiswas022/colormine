$(document).ready(function() {

	var scoreDiv = $('#score');
	var colorA = $('#colorA');
	var colorB = $('#colorB');

	function normalize(color) {
		return parseInt(color.substring(1,3), 16) + '-' +
			parseInt(color.substring(3,5), 16) + '-' +
			parseInt(color.substring(5), 16);
	}

	function rgbToHex(R,G,B) {
		return toHex(R)+toHex(G)+toHex(B)
	}

	function toHex(n) {
 		n = parseInt(n,10);
 		if (isNaN(n)) return "00";
 		n = Math.max(0,Math.min(n,255));
 		return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
	}

	function updateScore(scoreData) {
		var score = scoreData.score;
		var description;

		if(score <= 10) {
			 scoreDiv.attr('class', 'goodMatch');
			 description = 'Great!';
		} else if(score <= 30) {
			 scoreDiv.attr('class', 'badMatch');
			 description = 'Getting closer';
		} else {
			scoreDiv.attr('class', 'terribleMatch');
			description = 'Terrible!';
		}
		scoreDiv.html(description + ' - ' + parseInt(score));
	}

	function setColor(item, color) {
		item.val(color);
		item.css('backgroundColor', color);
	}

	function compare() {
		var valueA = colorA.val();
		var valueB = colorB.val();
		
		if("" == valueA || "" == valueB) {
			alert('Please choose two colors to proceed');
			return;
		}

		var data = {
			method: 'compare',
			value1: valueA,
			value2: valueB
		};

		$.get('../../ColorMine', data, updateScore);
	}

	$('#colorPickerA').farbtastic(function(color) { setColor(colorA, color) });
	$('#colorPickerB').farbtastic(function(color) { setColor(colorB, color) });
	$('#update').bind('click', compare);
});

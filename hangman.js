var words = "Вода камень точит";
words = words.toUpperCase();

var len = words.length;
var mistakes = 0;

var words1 = "";

for (let i=0; i<len; i++)
{
	if (words.charAt(i)==" ") words1 = words1 + " ";
	else words1 = words1 + "-";
}

function write_words()
{
	document.getElementById("board").innerHTML = words1;
}

window.onload = start;

var letters = new Array(33);

letters[0] = "А";
letters[1] = "Б";
letters[2] = "В";
letters[3] = "Г";
letters[4] = "Д";
letters[5] = "Е";
letters[6] = "Ё";
letters[7] = "Ж";
letters[8] = "З";
letters[9] = "И";
letters[10] = "Й";
letters[11] = "К";
letters[12] = "Л";
letters[13] = "М";
letters[14] = "Н";
letters[15] = "О";
letters[16] = "П";
letters[17] = "Р";
letters[18] = "С";
letters[19] = "Т";
letters[20] = "У";
letters[21] = "Ф";
letters[22] = "Х";
letters[23] = "Ц";
letters[24] = "Ч";
letters[25] = "Ш";
letters[26] = "Щ";
letters[27] = "Ъ";
letters[28] = "Ы";
letters[29] = "Ь";
letters[30] = "Э";
letters[31] = "Ю";
letters[32] = "Я";


function start()
{
	var divContent ="";
	for (let i=0; i<=32; i++)
	{
		var element = "lit" + i;
		divContent = divContent + '<div class="letters" onclick="check('+i+')" id="'+element+'">'+letters[i]+'</div>';
		if ((i+1) % 7 ==0) divContent = divContent + '<div style="clear:both;"></div>';
	}
	document.getElementById("abc").innerHTML = divContent;
	write_words();
}

String.prototype.setSign = function(place, sign)
{
	if (place > this.length - 1) return this.toString();
	else return this.substr(0, place) + sign + this.substr(place+1);
}


function check(nr)
{	
	var hit = false;
	for(let i=0; i<len; i++)
	{
		if (words.charAt(i) == letters[nr]) 
		{
			words1 = words1.setSign(i,letters[nr]);
			hit = true;
		}
	}
	
	if(hit == true)
	{
		if (audio && isLoud) {
			yes.play();
		} else if (audio && !isLoud) {
			yes.pause();
		}
		var element = "lit" + nr;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";
		write_words();
	}
	else
	{
		if (audio && isLoud) {
			no.play();
		} else if (audio && !isLoud) {
			no.pause();
		}
	;
		var element = "lit" + nr;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";	
		document.getElementById(element).setAttribute("onclick",";");		
		
	
		mistakes++;
		var pic = "img/s"+ mistakes + ".svg";
		document.getElementById("hangman").innerHTML = '<img src="'+pic+'" alt="" />';
	}
	

	//угадано
	if (words == words1)
	document.getElementById("abc").innerHTML  = "Все верно! Правильный ответ: "+words+'<br /><br /><span class="reset" onclick="location.reload()">Еще раз?</span>';
	
	//проигрыш
	if (mistakes>=9) 
	document.getElementById("abc").innerHTML  = "Провал! Правильный ответ: "+words+'<br /><br /><span class="reset" onclick="location.reload()">Еще раз?</span>';
	

}



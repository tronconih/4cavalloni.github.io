	var prugna = "frutta/prugna.png";
	var mora = "frutta/mora.png";
	var berries = "frutta/berries.png";
	var orange = "frutta/orange.png";
	var ciliegia = "frutta/ciliegia.png";
	var limone = "frutta/limone.png";
	var uva = "frutta/uva.png";
	var pesca = "frutta/pesca.png";
	var mela = "frutta/mela.png";
	var banana = "frutta/banana.png";
	var fragola = "frutta/fragola.png"
	var pera = "frutta/pera.png";
	var resett ="frutta/trasparenza.png";
	var giorgio = "frutta/giorgio.gif";
	
	//MLTIPLICATORI
	let moltComune = 0.50;
	let moltNonComune = 0.75;
	let moltRaro = 1.5;
	let moltEpico = 2.25;
	let moltLeggendario = 10;

	let isAnimazione = false;
	
	const bgAudio = new Audio('crazy.mp3');
	const spearGoblin = new Audio('spear_goblin.mp3');
	const audio = new Audio('spinsound.mp3');
	const noo = new Audio('pierre.mp3');
	const crazyTime = new Audio("crazytime4l.mp3");
	audio.volume = 0.45;
	
	
	var arrayImg = [
					//COMUNI
					limone, limone, limone, limone, limone, limone, limone, limone, limone, limone, limone, limone, limone, limone, limone,
					orange, orange, orange, orange, orange, orange, orange, orange, orange, orange, orange, orange, orange, orange, orange,
					prugna, prugna, prugna, prugna, prugna, prugna, prugna, prugna, prugna, prugna, prugna, prugna, prugna, prugna, prugna,
					
					//NON COMUNI
					berries, berries, berries, berries, berries, berries, berries, berries, berries,
					pera, pera, pera, pera, pera, pera, pera, pera, pera,
					banana, banana, banana, banana, banana, banana, banana, banana, banana,
					
					//RARI
					ciliegia, ciliegia, ciliegia, ciliegia, ciliegia,
					mela, mela, mela, mela, mela, mela,
					mora, mora, mora, mora, mora, mora,
					
					//EPICI
					fragola, fragola, fragola, fragola,
					uva, uva, uva, uva,
					
					//LEGGENDARIO
					pesca, pesca, pesca,
					
					//BONUS
					giorgio, giorgio, giorgio, giorgio, giorgio, giorgio, giorgio, giorgio, giorgio, giorgio, giorgio, giorgio, giorgio, giorgio, giorgio
					
					];
	
	let xVar = -5;
	let yVar = 120;
	let indexX = 0;
	let indexY = 0;
	let stp; 
	
	document.getElementById('slot1').src = pesca;
	document.getElementById('slot2').src = pesca;
	document.getElementById('slot3').src = pesca;
	document.getElementById('slot4').src = pesca;
	document.getElementById('slot5').src = pesca;
	document.getElementById('slot6').src = pesca;
	document.getElementById('slot7').src = pesca;
	document.getElementById('slot8').src = pesca;
	document.getElementById('slot9').src = pesca;
	
	$(".imgRails").css('background-image', 'none');
	
	
	document.getElementById("btn1").onclick=animazione;
	
	//SALDO
	let saldo = $("#tuosaldo");
	let saldoSalvato;
	let puntata = $("#bets");
	let puntataSalvata;
	let vincitaSalvata;
	let mostraVincita;
	
	//BONUS
	let isBonus = false;
	let random = 115;
	
	$(document).ready(function(){
	
		$("#btnsaldo").click(function(){
			if(saldo.val()<=0)
			{
				saldo.css("border", "2px solid red");
			}
			else 
			{
				$("#cover").fadeOut();
				$(".saldo").animate({height: "toggle"});
				bgAudio.addEventListener('ended', function() {
					this.currentTime = 0;
					this.play();
				}, false);
				bgAudio.loop = true;
				bgAudio.play();
				saldo.css("border", "2px solid rgb(127, 248, 0)");
				saldoSalvato = saldo.val();
				document.getElementById("saldo").innerHTML = saldoSalvato + "€";
				saldoSalvato = parseFloat(saldoSalvato);
				saldoSalvato.toFixed(2);
			}
		});
	});
	
	//ROTAZIONE BOTTONE
	
	let tmpAnimation = 0;
	$("#btn1").click(function(){
		let element = $("#btn1");
		tmpAnimation = tmpAnimation + 360;
			$({degrees:tmpAnimation -360}).animate({degrees:tmpAnimation},{
				duration: 2400,
				step: function (now){
					element.css({
						transform:'rotate(' + now + 'deg)'
					});
				}
			});
	});
	
	//EHEHEHEH
	$("#spear").click(function(){
		spearGoblin.play();
	});
	
	//NOOOO
	$("#log").click(function(){
		noo.play();
	});
	
	//CODICE PER PUNTATA

	$("#btn2").click(function(){
			puntataSalvata = 100;	
			document.getElementById("bets").value = puntataSalvata;
	});
	$("#btn3").click(function(){
			if(puntataSalvata < 100)
			{
					puntataSalvata += 0.20;	
					document.getElementById("bets").value = puntataSalvata.toFixed(2);
			}
			
	});
	$("#btn4").click(function(){
		if(puntataSalvata > 0.20)
		{
			puntataSalvata -= 0.20;	
			document.getElementById("bets").value = puntataSalvata.toFixed(2);
		}
	});
	
	
	//FUNZIONI PER TRANSIZIONE E ANIMAZIONE
	function animazione()
	{
		puntataSalvata = puntata.val();
		puntataSalvata = parseFloat(puntataSalvata);
		mostraVincita=0;
		if(!isAnimazione && puntataSalvata <= saldoSalvato && puntataSalvata >= 0.20 && puntataSalvata <= 100){
				if(isBonus == false)
				{
					saldoSalvato = saldoSalvato - puntataSalvata;
					saldoSalvato.toFixed(2);
					document.getElementById("saldo").innerHTML = saldoSalvato.toFixed(2) + "€";
				}
				$(".imgRails").css("box-shadow", "none");
				isAnimazione = true;
				audio.play();
				$(".imgRails").css('background-image', 'url(sprite.png)');
				resettaimg();
				const s = setInterval(transition, 10);
				setTimeout(() =>
				{
					clearInterval(s);
					isAnimazione = false;
				}, 2400);
				start();
				document.getElementById("saldo").innerHTML = saldoSalvato.toFixed(2) + "€";	
		}
	}
	
	
	function start()
	{
		setTimeout(() =>
		{
			move(random);
			$(".imgRails").css('background-image', 'none');
		}, 2400);
	}
	
	function move(a)
	{
		for(i=1; i<10; i++)
		{
			j = Math.floor(Math.random()*a);
			document.getElementById('slot'+i).src = arrayImg[j];
		}
		controllovincite();
	}
	
	function resettaimg()
	{
			for(i=1; i<10; i++)
			{
				document.getElementById('slot'+i).src = resett;
			}
	}
	
	function transition()
	{
		for(i=1;i<10; i++)
		{
			if(indexY < 34)
			{
				document.getElementById("slot"+i).style.backgroundPositionY = (-yVar*indexY) + "px";	
				indexY ++;
			}
			else if(indexX >= 1)
			{
				indexX =0;
				indexY =0;
			}
			else
			{ 
				indexY =0;
				indexX++;
				document.getElementById("slot"+i).style.backgroundPositionX = (-xVar*indexX) + "px";	
				document.getElementById("slot"+i).style.backgroundPositionY = (-yVar*indexY) + "px";
			}	
		}
	}
	
	
	
	
	
	//FUNZIONI PER COMBINAZIONI VINCITA	
	function controllovincite()
	{
		var slot1 = $("#slot1").attr("src");
		var slot2 = $("#slot2").attr("src");
		var slot3 = $("#slot3").attr("src");
		var slot4 = $("#slot4").attr("src");
		var slot5 = $("#slot5").attr("src");
		var slot6 = $("#slot6").attr("src");
		var slot7 = $("#slot7").attr("src");
		var slot8 = $("#slot8").attr("src");
		var slot9 = $("#slot9").attr("src");
		
		//LINEE ORIZZONTALI
		if(slot1 === slot2 && slot2 === slot3)
		{
			multiplier($("#slot1").attr("src"));
			animazioneVincita($("#slot1"), $("#slot2"), $("#slot3"));
		}
		
		if(slot4 === slot5 && slot5 === slot6)
		{
			multiplier($("#slot4").attr("src"));
			animazioneVincita($("#slot4"), $("#slot5"), $("#slot6"));
		}
			
		if(slot7 === slot8 && slot8 === slot9)
		{
			multiplier($("#slot7").attr("src"));
			animazioneVincita($("#slot7"), $("#slot8"), $("#slot9"));
		}
		
		
		
		//LINEE DIAGONALI
		if(slot1 === slot5 && slot5 === slot9)
		{
			multiplier($("#slot1").attr("src"));
			animazioneVincita($("#slot1"), $("#slot5"), $("#slot9"));
		}
		
		
		if(slot7 === slot5 && slot5 === slot3)
		{
			multiplier($("#slot7").attr("src"));
			animazioneVincita($("#slot7"), $("#slot5"), $("#slot3"));
		}
		
		
		//LINEE SPEZZATE
		if(slot1 === slot5 && slot5 === slot3)
		{
			multiplier($("#slot1").attr("src"));
			animazioneVincita($("#slot1"), $("#slot5"), $("#slot3"));
		}
		
		if(slot4 === slot2 && slot2 === slot6)
		{
			multiplier($("#slot4").attr("src"));
			animazioneVincita($("#slot4"), $("#slot2"), $("#slot6"));
		}
		
		if(slot4 === slot8 && slot8 === slot6)
		{
			multiplier($("#slot8").attr("src"));
			animazioneVincita($("#slot4"), $("#slot8"), $("#slot6"));;
		}
		
		if(slot7 === slot5 && slot5 === slot9)
		{
			multiplier($("#slot7").attr("src"));
			animazioneVincita($("#slot7"), $("#slot5"), $("#slot9"));
		}
		
		//CONTROLLO BONUS
		{
			var conta = 0;
			for(i=1; i<10; i++)
				if($("#slot"+i).attr("src") == giorgio) conta ++;
				if (conta >= 3) bonus();
		}
		
	}
	

	
	//FUNZIONE MOLTIPLICATORE
	function multiplier(sl)
	{
		
		vincitaSalvata = 0;
		if(isBonus == false)
		{
			if(sl == prugna) 	{vincitaSalvata += (puntataSalvata * moltComune); }
			if(sl == mora)  	{vincitaSalvata += (puntataSalvata * moltRaro); }
			if(sl == berries)   {vincitaSalvata += (puntataSalvata * moltNonComune); }
			if(sl == orange)    {vincitaSalvata += (puntataSalvata * moltComune); }
			if(sl == ciliegia)  {vincitaSalvata += (puntataSalvata * moltRaro); }
			if(sl == limone)    {vincitaSalvata += (puntataSalvata * moltComune); }
			if(sl == uva)  		{vincitaSalvata += (puntataSalvata * moltEpico); }
			if(sl == pesca)  	{vincitaSalvata += (puntataSalvata * moltLeggendario); }
			if(sl == mela)  	{vincitaSalvata += (puntataSalvata * moltRaro); }
			if(sl == banana)  	{vincitaSalvata += (puntataSalvata * moltNonComune); }
			if(sl == fragola)  	{vincitaSalvata += (puntataSalvata * moltEpico); }
			if(sl == pera)  	{vincitaSalvata += (puntataSalvata * moltNonComune); }
			if(sl == giorgio)   {vincitaSalvata += (puntataSalvata * moltEpico);}
			mostraVincita += vincitaSalvata;
		}
		else if(isBonus == true)
		{
			if(sl == prugna) 	{vincitaSalvata += (puntataSalvata * moltComune * 3); }
			if(sl == mora)  	{vincitaSalvata += (puntataSalvata * moltRaro * 3); }
			if(sl == berries)   {vincitaSalvata += (puntataSalvata * moltNonComune * 3); }
			if(sl == orange)    {vincitaSalvata += (puntataSalvata * moltComune * 3); }
			if(sl == ciliegia)  {vincitaSalvata += (puntataSalvata * moltRaro * 3); }
			if(sl == limone)    {vincitaSalvata += (puntataSalvata * moltComune * 3); }
			if(sl == uva)  		{vincitaSalvata += (puntataSalvata * moltEpico * 3); }
			if(sl == pesca)  	{vincitaSalvata += (puntataSalvata * moltLeggendario * 3); }
			if(sl == mela)  	{vincitaSalvata += (puntataSalvata * moltRaro * 3); }
			if(sl == banana)  	{vincitaSalvata += (puntataSalvata * moltNonComune * 3); }
			if(sl == fragola)  	{vincitaSalvata += (puntataSalvata * moltEpico * 3); }
			if(sl == pera)  	{vincitaSalvata += (puntataSalvata * moltNonComune * 3); }
			mostraVincita += vincitaSalvata;
		}
		saldoSalvato = saldoSalvato + vincitaSalvata;
		$("#messWin").show();
		document.getElementById("messWin").innerHTML = "Hai vinto: " + mostraVincita.toFixed(2) + "€";
					
		$("#btn1").click( function(){
			$("#messWin").hide();
		});
			
	}
	
	
	function animazioneVincita(sl1, sl2, sl3)
	{
		sl1.css("box-shadow", "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de");
		sl2.css("box-shadow", "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de");
		sl3.css("box-shadow", "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de");
		
	}

	//BONUS GIORGIO
	function bonus()
	{
		random = 100;
		isBonus = true;
		let n;
		let i = 0;
		crazyTime.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
		}, false);
		crazyTime.loop = true;
		crazyTime.play();
		bgAudio.pause();
		n = setInterval(()  => {
				animazione();
				i++; 
				if(i == 10) 
			{
				clearInterval(n);
				isBonus = false;
				random = 115;
				crazyTime.pause();
				bgAudio.play();
			}
		}, 4000);
	}
	//PERSONAGGI
	let player1 = false;
	let player2 = false;
	let t1 = document.getElementById("testa"); //primo personaggio
	let t2 = document.getElementById("testa2"); //secondo personaggio
	let t3 = document.getElementById("testa3"); //terzo personaggio
	let choose = document.getElementById("scelta");
	
	t1.onclick = g1; 
	t2.onclick = g2;
	t3.onclick = g3;
	
	//AUDIO
	var davide = new Audio('audio/horse.mp3');
	var bertino = new Audio('audio/bertino.ogg');
	var giorgio = new Audio('audio/giorgio.ogg');

	/*IMPORTANTE: ho provaro a NON ripetere la funzione con gli event o passando un numero 
	che facesse capire quale degli elementi della lista fosse stato cliccato, 
	ma non ci sono riuscito e sono stato costretto a fare 2 funzioni uguali*/
	
	function nextMap(){
		location.replace("map.html");
	}
	
	function backHome(){
		location.replace("home.html");
	}
	
	let delta = 60 / 1000
	setInterval(() => {
		if(player1){
			if(player2){
				document.getElementById("nextChar").onclick = nextMap;
			}
		}
	}, delta)
	
	document.getElementById("indietroHome").onclick = backHome;
	
	
	function g1(){
		bertino.play();
		if(player1 == false)
		{
			choose.innerHTML = "Player 2 it's your turn!";
			t1.style.borderColor = "#008cff";
			document.getElementById("completo1").src = "images/berta/personaggio-1.png";
			document.getElementById("completo1").style.width="250px";
			document.getElementById("completo1").style.height="480px";
			player1 = true;
			localStorage.setItem("personaggio1", "berta");
		}
		else if(player2 == false){
			choose.innerHTML = "READY!";
			t1.style.borderColor = "#ff3939";
			document.getElementById("completo2").src = "images/berta/personaggio-2.png";
			document.getElementById("completo2").style.width="250px";
			document.getElementById("completo2").style.height="480px";
			player2 = true;
			//document.body.style.cursor = "wait";
			//cursor: url("cursor/WiiCursor.png"), auto;
			$("body").css("cursor: url('cursor/WiiCursor.png'), auto");
			localStorage.setItem("personaggio2", "berta");
		}
	}
	
	function g2(){
		davide.play();
		if(player1 == false)
		{
			choose.innerHTML = "Player 2 it's your turn!";
			t2.style.borderColor = "#008cff";
			document.getElementById("completo1").src = "images/davide/personaggio-1.png";
			document.getElementById("completo1").style.width="300px";
			document.getElementById("completo1").style.height="480px";
			player1 = true;
			localStorage.setItem("personaggio1", "davide");
		}
		else if(player2 == false){
			choose.innerHTML = "READY!";
			t2.style.borderColor = "#ff3939";
			document.getElementById("completo2").src = "images/davide/personaggio-2.png";
			document.getElementById("completo2").style.width="300px";
			document.getElementById("completo2").style.height="480px";
			player2 = true;
			//document.html.style.cursor = "url('cursor/WiiCursor.png')";
			localStorage.setItem("personaggio2", "davide");
			//cursor: url("cursor/WiiCursor.png"), auto;
			//$("html").css("cursor: url('cursor/WiiCursor.png'), auto");
		}
	}
	
	function g3(){
		giorgio.play();
		if(player1 == false){
			choose.innerHTML = "Player 2 it's your turn!";
			t3.style.borderColor = "#008cff";
			document.getElementById("completo1").src = "images/giorgio/personaggio-1.png";
			document.getElementById("completo1").style.width="330px";
			document.getElementById("completo1").style.height="480px";
			player1 = true;
			localStorage.setItem("personaggio1", "giorgio");
		}
		else if(player2 == false){
			choose.innerHTML = "READY!";
			t3.style.borderColor = "#ff3939";
			document.getElementById("completo2").src = "images/giorgio/personaggio-2.png";
			document.getElementById("completo2").style.width="330px";
			document.getElementById("completo2").style.height="480px";
			player2 = true;
			//document.html.style.cursor = "url('cursor/WiiCursor.png')";
			localStorage.setItem("personaggio2", "giorgio");
			//cursor: url("cursor/WiiCursor.png"), auto;
			//$("html").css("cursor: url('cursor/WiiCursor.png'), auto");
		}
	}
	
		div1 = document.getElementById("div1");
		div2 = document.getElementById("div2");
		eff1 = document.getElementById("vitaEffettiva1");
		eff2 = document.getElementById("vitaEffettiva2");
		generale = document.getElementById("generale");
		onload = backgroundDiv;
		document.onkeydown = ricominciaMusica;
		setTimeout(bloccaCountdown,4000);
		setInterval(enableVarMusica,50000);
		
		var countdownAudio = new Audio('audio/countdown.mp3');
		
		//dichiarazione variabili
		var x1=250, x2=1480, y1=534, y2=235, salta1=true, salta2=true, calcio1=false, tutto=true;
		var pugno1=false, calcio2=false, pugno2=false, abbassa1=false, abbassa2=false;
		var siPuoCambiareQ=true, siPuoCambiareE=true, siPuoCambiareU=true, siPuoCambiareO=true;
		var entrato11=true, entrato12=true, entrato13=true, entrato21=true, entrato22=true, entrato23=true;
		var contaThrustPlayer1 = 1, contaThrustPlayer2 = 1, contaShockPlayer1 = 1, contaShockPlayer2 = 1, scossa1 = false, scossa2 = false;
		const player1 = localStorage.getItem("personaggio1");
		const player2 = localStorage.getItem("personaggio2");
		const mappa = localStorage.getItem("mappa");
		var blocca = true, enableMusica = false;
		var movimentoPlayer1 = false, movimentoPlayer2 = false;
		
		//Struct player1
		const player1Input = {
			up: false,
			down: false,
			left: false,
			right: false,
			kick: false,
			punch: false,
			thrust: false,
			shock: false
		}
		
		//Struct player2
		const player2Input = {
			up: false,
			down: false,
			left: false,
			right: false,
			kick: false,
			punch: false,
			thrust: false,
			shock: false
		}
		
		function backgroundDiv(){
			$("#div1").css({"background-image": "url(images/"+player1+"/fermo_sx.gif)"});
			$("#div2").css({"background-image": "url(images/"+player2+"/fermo_dx.gif)"});
			$("#generale").css({"background-image": "url(images/sfondi/"+mappa+")"});
			generale.style.width=innerWidth+"px"; 
			generale.style.height=innerHeight+"px"; 
		}
		
		function bloccaCountdown(){
			$("#countdown").css("background-image","none");
			//countdownAudio.play();
			blocca = false;
		}
		
		var main = new Audio('audio/main.mp3');
		
		function enableVarMusica(){
			enableMusica = true;
		}
		
		function ricominciaMusica(){
			if(enableMusica){
				main.play();
				enableMusica = false;
			}
		}
		
		//setInterval per gestire tutti i movimenti
		const delta = 60 / 1000
		setInterval(() => {
			
			// player 1
			if (player1Input.left && !scossa1 && !calcio1 && !blocca) {
				x1 -= 15 * delta;
				movimento1("indietro");
			}
			if (player1Input.right && !scossa1 && !calcio1 && !blocca) {
				x1 += 15 * delta;
				movimento1("avanti");
			}
			if (player1Input.punch && !scossa1 && !calcio1 && !blocca && salta2) {
				cambia("E");
			}
			if (player1Input.kick && !scossa1 && !pugno1 && salta1 && !blocca) {
				cambia("Q");
			}
			if (player1Input.up && !scossa1 && !calcio1 && !blocca && !movimentoPlayer1 && !pugno1 && !abbassa1) {
				saltoPlayer1();
			}
			if (player1Input.down && !scossa1 && !calcio1 && !blocca) {
				abbassa("S");
			}
			if (player1Input.thrust && contaThrustPlayer1 == 1 && !scossa1 && !blocca) {
				spinta("player1");
				contaThrustPlayer1++;
			}
			if (player1Input.shock && contaShockPlayer1 == 1 && !blocca) {
				scossa("player1");
				contaShockPlayer1++;
			}
			
			// player 2
			if (player2Input.left && !scossa2 && !calcio2 && !blocca) {
				x2 -= 15 * delta;
				movimento2("avanti");
			}
			if (player2Input.right && !scossa2 && !calcio2 && !blocca) {
				x2 += 15 * delta;
				movimento2("indietro");
			}
			if (player2Input.punch && !scossa2 && !calcio2 && !blocca) {
				cambia("U");
			}
			if (player2Input.kick && !scossa2 && !pugno2 && !blocca && salta2) {
				cambia("O");
			}
			if (player2Input.up && !scossa2 && !blocca && !movimentoPlayer2 && !pugno2 && !calcio2 && !abbassa2) {
				saltoPlayer2();
			}
			if (player2Input.down && !scossa2 && !blocca) {
				abbassa("K");
			}
			if (player2Input.thrust && contaThrustPlayer2 == 1 && !scossa2 && !blocca) {
				spinta("player2");
				contaThrustPlayer2++;
			}
			if (player2Input.shock && contaShockPlayer2 == 1 && !blocca) {
				scossa("player2");
				contaShockPlayer2++;
			}
		}, delta)
	
	//Quando un pulsante viene premuto --> true il relativo flag
	document.addEventListener('keydown', (e) => {
		switch (e.key) {
			// player 1
			case "w": player1Input.up = true; break;
			case "a": player1Input.left = true; break;
			case "s": player1Input.down = true; break;
			case "d": player1Input.right = true; break;
			case "e": player1Input.punch = true; break;
			case "q": player1Input.kick = true; break;
			case "z": player1Input.thrust = true; break;
			case "x": player1Input.shock = true; break;

			// player 2
			case "i": player2Input.up = true; break;
			case "j": player2Input.left = true; break;
			case "k": player2Input.down = true; break;
			case "l": player2Input.right = true; break;
			case "u": player2Input.punch = true; break;
			case "o": player2Input.kick = true; break;
			case "m": player2Input.thrust = true; break;
			case "n": player2Input.shock = true; break;

			default: break;
		}
	});
	
	//Quando un pulsante viene mollato --> false il relativo flag
	document.addEventListener('keyup', (e) => {
		switch (e.key) {
			// player 1
			case "w": player1Input.up = false; break;
			case "a": player1Input.left = false; movimentoPlayer1 = false; $("#div1").css({"background-image": "url('images/"+player1+"/fermo_sx.gif')"}); break;
			case "s": player1Input.down = false; break;
			case "d": player1Input.right = false; movimentoPlayer1 = false; $("#div1").css({"background-image": "url('images/"+player1+"/fermo_sx.gif')"}); break;
			case "e": player1Input.punch = false; break;
			case "q": player1Input.kick = false; break;
			case "z": player1Input.thrust = false; break;
			case "x": player1Input.shock = false; break;

			// player 2
			case "i": player2Input.up = false; break;
			case "j": player2Input.left = false; movimentoPlayer2 = false; $("#div2").css({"background-image": "url('images/"+player2+"/fermo_dx.gif')"}); break;
			case "k": player2Input.down = false; break;
			case "l": player2Input.right = false; movimentoPlayer2 = false; $("#div2").css({"background-image": "url('images/"+player2+"/fermo_dx.gif')"}); break;
			case "u": player2Input.punch = false; break;
			case "o": player2Input.kick = false; break;
			case "m": player2Input.thrust = false; break;
			case "n": player2Input.shock = false; break;

			default: break;
		}
	});

	//funzione per il movimento del player1
	function movimento1(movimento){
		movimentoPlayer1 = true;
		
		if(movimento == "avanti"){
			$("#div1").css({"background-image": "url(images/"+player1+"/cammina_sx.gif)"});
		}
		
		if(movimento == "indietro"){
			$("#div1").css({"background-image": "url('images/"+player1+"/indietro_sx.gif')"});
		}
		
		if(parseInt(div1.style.left)+div1.offsetWidth>=generale.offsetWidth){
			x1-=10;
		}
		
		if(parseInt(div1.style.left)<65){
			x1+=10;
		}
			
		div1.style.left=x1+"px";
	}	
	
	//funzione per il movimento del player2
	function movimento2(movimento){
		movimentoPlayer2 = true;
		//musica.play();
		if(movimento == "avanti"){
			$("#div2").css({"background-image": "url('images/"+player2+"/cammina_dx.gif')"});
		}
		
		if(movimento == "indietro"){
			$("#div2").css({"background-image": "url('images/"+player2+"/indietro_dx.gif')"});
		}
		
		if(parseInt(div2.style.left)+div2.offsetWidth>=generale.offsetWidth){
			x2-=10;
		}
		
		if(parseInt(div2.style.left)<0){
			x2+=10;
		}
		
		div2.style.left=x2+"px";
		
	}
	
	//salto player1
	function saltoPlayer2(){ 
		if(salta2){
			salta2=false;
			$("#div2").css({"background-image": "url('images/"+player2+"/salto_dx.gif')"});
			
			//il delay serve per ritardare animation del salto per andare a tempo con la gif 
			$("#div2").delay(300).animate({"top": "-=80px"}, function (){
				$("#div2").animate({"top": "+=80px"}, function () {
					setTimeout(noDoppioSaltoPlayer2, 350);	
					$("#div2").css({"background-image": "url('images/"+player2+"/fermo_dx.gif')"});
				});
			});
		}
	}
	
	//salto player1
	function saltoPlayer1(){ 
		if(salta1){
			salta1=false;
			$("#div1").css({"background-image": "url('images/"+player1+"/salto_sx.gif')"});
			
			$("#div1").delay(300).animate({"top": "-=80px"}, function (){
				$("#div1").animate({"top": "+=80px"}, function () {
					setTimeout(noDoppioSaltoPlayer1, 350);
					$("#div1").css({"background-image": "url('images/"+player1+"/fermo_sx.gif')"});
				});
			});
		}
	}	
	
	function noDoppioSaltoPlayer1(){
		salta1=true;
	}
	
	function noDoppioSaltoPlayer2(){
		salta2=true;
	}
	
	var ab1 = true, ab2 = true;
	
	function abbassa(chiAbbasso){
	//si abbassa il personaggio
		if(ab2){
			if(chiAbbasso == 'K'){
				ab2 = false;
				abbassa2=true;
				$("#div2").css({"background-image": "url('images/"+player2+"/accovaccia_dx.gif')"});
				//alert($("#div2").height());  <-- controllo del cambio dimensionii div
				setTimeout(cambiaAb2, 1500);
				setTimeout(()=>alza("Secondo"),1000);
			}
		}
		
		if(ab1){
			if (chiAbbasso == "S") {
				ab1 = false;
				abbassa1=true;
				$("#div1").css({"background-image": "url('images/"+player1+"/accovaccia_sx.gif')"});
				//alert($("#div1").height()); <-- controllo del cambio dimensionii div
				setTimeout(cambiaAb1, 1500);
				setTimeout(()=>alza("Primo"),1000);
			}
		}
	}
	
	function cambiaAb1(){
		ab1 = true;
	}
	
	function cambiaAb2(){
		ab2 = true;
	}
	
	function alza(a){
	//si rimette in piedi
		if(a == "Primo"){
			abbassa1=false;
			$("#div1").css({"background-image": "url('images/"+player1+"/fermo_sx.gif')"});
		}
		if(a == "Secondo"){
			abbassa2=false;
			$("#div2").css({"background-image": "url('images/"+player2+"/fermo_dx.gif')"});
		}
	}
	var valDiv1, valDiv2;
	//cambia immagini per colpire (calcio/pugno)
	function cambia(chiCambia){
		
		if(siPuoCambiareQ){
			if(chiCambia == 'Q'){
				valDiv1= parseInt(div1.style.left);
				valDiv1-=80;
				//x1-=50;
				
				div1.style.left=valDiv1+"px";
				
				$("#div1").css({"background-image": "url('images/"+player1+"/calcio_sx.gif')"});
				
				calcio1=true;
				siPuoCambiareQ=false;
				setTimeout(()=>cambiaImmagine("Q"),900);
				setTimeout(()=>cambiaSiPuoCambiare("Q"),1300);
			}
		}
		
		if(siPuoCambiareE){
			if(chiCambia == 'E'){
				$("#div1").css({"background-image": "url('images/"+player1+"/pugno_sx.gif')"});
				pugno1=true;
				siPuoCambiareE=false;
				setTimeout(()=>cambiaImmagine("E"),700);
				setTimeout(()=>cambiaSiPuoCambiare("E"),1100);
			}
		}	
		
		if(siPuoCambiareU){
			if(chiCambia == 'U'){
				$("#div2").css({"background-image": "url('images/"+player2+"/pugno_dx.gif')"});
				pugno2=true;
				siPuoCambiareU=false;
				setTimeout(()=>cambiaImmagine("U"),800);
				setTimeout(()=>cambiaSiPuoCambiare("U"),1100);
			}
		}
		
		if(siPuoCambiareO){
			if(chiCambia == 'O'){
				valDiv2= parseInt(div2.style.left);
				valDiv2-=80;
				//x2-=50;
				
				div2.style.left=valDiv2+"px";
				$("#div2").css({"background-image": "url('images/"+player2+"/calcio_dx.gif')"});
				calcio2=true;
				siPuoCambiareO=false;
				setTimeout(()=>cambiaImmagine("O"),900);
				setTimeout(()=>cambiaSiPuoCambiare("O"),1300);
			}
		}
		
		controllo();
	}
	
	function spinta(spinta){
		if(spinta == "player1"){ div2.style.left=1750+"px"; x2=1750;}
		else if(spinta == "player2"){ div1.style.left=0+"px"; x1=0}
	}
	
	function scossa(scosse){
		if(scosse == "player1"){ scossa2 = true; setTimeout(()=> cambiaScossa(1), 3000);}
		else if(scosse == "player2"){ scossa1 = true; setTimeout(()=> cambiaScossa(2), 3000);}
	}
	
	function cambiaScossa(num){
		if(num == 1) scossa2 = false;
		if(num == 2) scossa1 = false;
	}
	
	//prima di 400 millesimi di secondo non è possibile colpire nuovamente
	function cambiaSiPuoCambiare(variabile){
		if(variabile == "Q") siPuoCambiareQ=true;
		if(variabile == "E") siPuoCambiareE=true;
		if(variabile == "U") siPuoCambiareU=true;
		if(variabile == "O") siPuoCambiareO=true;
	}
	
	function cambiaImmagine(s){
	//sistemare le immagini --> ritornano come prima dopo 200 millesimi
		if(s == "Q" || s == "E"){
			$("#div1").css({"background-image": "url('images/"+player1+"/fermo_sx.gif')"});
			if(s=='Q'){
				calcio1=false;
				valDiv1+=80;
				//x1+=50;
				if(!blocca){
					div1.style.left=valDiv1+"px";
				}
			}
			else pugno1=false;
		}
		
		if(s == "U" || s == "O"){
			$("#div2").css({"background-image": "url('images/"+player2+"/fermo_dx.gif')"});
			if(s=='U') pugno2=false;
			else{
				calcio2=false; 
				valDiv2+=80;
				//x2+=50;
				if(!blocca){
					div2.style.left=valDiv2+"px";
				}
			}
		}
	}
	
	//controllo contatto, possibile riduzione vita 0 player1, 1 player2, 2 player1 player2, 3 nessuno
	function controllo(){ 
		if (x2-x1 <= 180 && x2-x1 >= 35){
			//gestione calcio
			if(calcio1==true && calcio2==true && salta1==true && salta2==true) riduciVita(2);
			if(calcio1==true && calcio2==false && salta1==true && salta2==true) riduciVita(1);
			if(calcio1==false && calcio2==true && salta1==true && salta2==true) riduciVita(0);
			if(calcio1==false && calcio2==false && salta1==true && salta2==true) riduciVita(3);
			if(calcio1==true && calcio2==true && salta1==false && salta2==true) riduciVita(1);
			if(calcio1==true && calcio2==true && salta1==true && salta2==false) riduciVita(0);
			if(calcio1==true && calcio2==true && salta1==false && salta2==false) riduciVita(3);
			if(calcio1==true && calcio2==false && salta1==false && salta2==true) riduciVita(1);
			if(calcio1==true && calcio2==false && salta1==true && salta2==false) riduciVita(3);
			if(calcio1==false && calcio2==true && salta1==false && salta2==true) riduciVita(3);
			if(calcio1==false && calcio2==true && salta1==true && salta2==false) riduciVita(0);
		
			//gestione pugno
			if(pugno1==true && pugno2==true && abbassa1==false && abbassa2==false) riduciVita(2);
			if(pugno1==true && pugno2==true && abbassa1==true && abbassa2==true) riduciVita(3);
			if(pugno1==true && pugno2==true && abbassa1==true && abbassa2==false) riduciVita(1);
			if(pugno1==true && pugno2==true && abbassa1==false && abbassa2==true) riduciVita(0);
			if(pugno1==true && pugno2==false && abbassa1==false && abbassa2==false) riduciVita(1);
			if(pugno1==true && pugno2==false && abbassa1==true && abbassa2==false) riduciVita(1);
			if(pugno1==true && pugno2==false && abbassa1==false && abbassa2==true) riduciVita(3);
			if(pugno1==true && pugno2==false && abbassa1==true && abbassa2==true) riduciVita(1);
			if(pugno1==false && pugno2==false && abbassa1==true && abbassa2==false) riduciVita(3);
			if(pugno1==false && pugno2==false && abbassa1==false && abbassa2==false) riduciVita(3);
			if(pugno1==false && pugno2==true && abbassa1==false && abbassa2==false) riduciVita(0);
			if(pugno1==false && pugno2==true && abbassa1==true && abbassa2==false) riduciVita(3);
			
			return;
		}
		else return;
	}
	
	
	//riduzione vita
	function riduciVita(num){
	
		if(num == 0){
			$("#vitaEffettiva1").css("width", "-=0.25px");
		}
		
		if(num == 1){
			$("#vitaEffettiva2").css("width", "-=0.25px");
		}
		
		if(num ==2){
			$("#vitaEffettiva1").css("width", "-=0.25px");
			$("#vitaEffettiva2").css("width", "-=0.25px");
		}
		
		if(num ==3){
			$("#vitaEffettiva1").css("width", "-=0px");
			$("#vitaEffettiva2").css("width", "-=0px");
		}
		
		vittoria();
	}
	
	var conta1 = 0, conta2 = 0;
	
	//controllo vittoria
	function vittoria(){
	
		if(eff1.style.width == "0px"){
			var num1 = document.getElementById("round2").innerHTML; 
			
			if(num1 == 0 && entrato11){
				entrato11=false;
				document.getElementById("round2").innerHTML = ("1");
				reset();
			}
			else if(num1 == 1 && entrato12){
				entrato12=false;
				document.getElementById("round2").innerHTML = ("2");
				reset();
			}
			else if(num1 == 2 && entrato13){
				entrato13=false;
				document.getElementById("round2").innerHTML = ("3");
				$("*").hide(5000, function (){
					alert("Game finito. Vittoria player2");
				});
			}
		}
		else if(eff2.style.width == "0px"){
			var num2 = document.getElementById("round1").innerHTML; 
			
			if(num2 == 0 && entrato21){
				entrato21=false;
				document.getElementById("round1").innerHTML = ("1");
				reset();
			}
			else if(num2 == 1 && entrato22){
				entrato22=false;
				document.getElementById("round1").innerHTML = ("2");
				reset();
			}
			else if(num2 == 2 && entrato23){
				entrato23=false;
				document.getElementById("round1").innerHTML = ("3");
				$("*").hide(5000, function () {
					alert("Game finito. Vittoria player1");
				});
			}
		}
	}
	
	//reset dopo vittoria
	function reset(){
		blocca = true;
		$("#vitaEffettiva1").css("width", "600px");
		$("#vitaEffettiva2").css("width", "600px");
		div1.style.left = 250+"px";
		div2.style.left = 1480+"px";
		x1=250;
		x2=1480;
		entrato11=true;
		entrato12=true;
		entrato13=true;
		entrato21=true;
		entrato22=true;
		entrato23=true;
		contaThrustPlayer1 = 1;
		contaThrustPlayer2 = 1;
		contaShockPlayer1 = 1;
		contaShockPlayer2 = 1;
		$("#countdown").css("background-image","url('images/countdown.gif')");
		setTimeout(bloccaCountdown,4000);
	}
	
	
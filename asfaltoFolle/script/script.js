$(document).ready(function(){

    //------------------SELEZIONE MACCHINA------------------------
    var macchina = parseInt(localStorage.getItem("macchina"));
    var distanzaDalMargineAlto,distanzaDalMargineSx;

    macchina--;

    //Controllo se la macchina selezionata è nella prima o nella seconda riga
    if(macchina<3)	distanzaDalMargineAlto = 0;
    else	distanzaDalMargineAlto = 100;

    if(macchina%3==0)
        //Prima colonna
        distanzaDalMargineSx = 0;
    else if(macchina%3==1)
        //Seconda colonna
        distanzaDalMargineSx = 50;
    else
        //Terza colonna
        distanzaDalMargineSx = 100;

    $("#macchina span").css("background-position-x",(distanzaDalMargineSx)+"%")
    $("#macchina span").css("background-position-y", (distanzaDalMargineAlto)+"%")
   
    // ---------------------- SELEZIONE MAPPA E VISUALE --------------------------------
    // var vis = localStorage.getItem("Visuale");
    var map = localStorage.getItem("Mappa");

    if(map != 2)    $("body").css("background-image","url('images/gioco/circuito.png')");
    else $("body").css("background-image","url('images/gioco/citta.png')");

    // CORPO DEL GIOCO
    $(".content").hide();							
    $(".gameOver").hide();

    //inizioDelGioco();

    countDown();
})

function countDown(){
    var num = 3;

    n = $("#img-area");
    var r = document.getElementsByClassName("movimentoOst")[0];
    var r2 = document.getElementsByClassName("movimentoOst2")[0];
    var m = document.getElementsByClassName("movimentoMac")[0];

    $(".movimentoOst").hide();

    //COUNT DOWN
    countD = setInterval(function(){
        if(num==3){
            n.addClass("dx");
        }
        else if(num==2){
            n.addClass("sx");
            n.removeClass("dx");
        }
        else{
            n.removeClass("sx");
            n.addClass("ct");
        }

        $("#countDown").html("<p>"+num+"</p>");
        num--;

        if(num < 0){
            //FINITO --> INIZIA IL GIOCO
            clearInterval(countD);
            $("#countDown").css("display","none");
            n.removeClass("ct");
            inizioDelGioco();
            $(".movimentoOst").show();
        }  
    },1000);
}

function inizioDelGioco(){
    var r = document.getElementsByClassName("movimentoOst");
    var m = document.getElementsByClassName("movimentoMac");
    var r2 = document.getElementsByClassName("movimentoOst2");
    
    r = r[0];
    m = m[0];
    r2 = r2[0];

    r.style.setProperty('--inizio', 0);
    r.style.setProperty('--tempo', 1 + "s");

    //Creazione dilazionata del secondo ostacolo
    second = setTimeout(function(){
        if(!stop)   $("#img-area span:nth-child(3)").css("display","");
        else    setInterval(function(){
            if(!stop)    $("#img-area span:nth-child(3)").css("display","");
        })

        r2.style.setProperty("--inizio1","0px");
        r2.style.setProperty("--tempo", 1+"s");
        clearTimeout(second)
    },8500);

    //Accelerazione ostacoli
	var speed;
	speed = setInterval(function(){
		if(parseFloat(r.style.getPropertyValue('--tempo')) > 0.5){
            r.style.setProperty('--tempo', (parseFloat(r.style.getPropertyValue('--tempo')) - 0.001) + "s");
            r2.style.setProperty('--tempo', (parseFloat(r2.style.getPropertyValue('--tempo')) - 0.001) + "s");
        }	
		else	clearInterval(speed);
        
		// console.log(r.style.getPropertyValue('--tempo'))	
	},100)

    //***************VOLUME*********************
    var audio = new Audio('audio/canzone.mp3');
    var vPlay = true;
        
    $("#audio").click(function play() {
        if (vPlay) {
            $("#audio").attr("src", "images/gioco/audio.PNG");
            audio.play();
            audio.loop = true;
            vPlay = false;
        } 
        else {
            $("#audio").attr("src", "images/gioco/noAudio.PNG");
                audio.pause();
                                        
                //audio.currentTime = 0;//fa partire da capo l'audio
                vPlay = true;
            }
    })
    

            
    var ostacoloPos,ostacoloPos2, macchinaPos;
    var trovaPos;
    var trovaTempoTrascorso;
    var premuto;
    var stop = false;

    //*********************OPZIONI*************************
    $("#opzioni").click(function(){
        trovaPos = r.getBoundingClientRect(); //otteniamo la posizione dell'ostacolo
        trovaPos = trovaPos.top; //si assegna all'ostacolo la posizione dall'asse y(dove si ferma la macchina)

        trovaTempoTrascorso = (trovaPos * 2)/document.body.clientWidth; 

        $(".content").toggle();						
        
        //blocca il movimento la macchina
        document.onkeydown = function (event) 
        {
            return false;
        }
        
        stop = true;

        r.style.setProperty('--pos', trovaPos + "px");
        r2.style.setProperty('--pos', trovaPos + "px");

        $("#ostacolo img").addClass("posizioneAt");
        $("#ostacolo2 img").addClass("posizioneAt2");

        //ferma movimento dell'ostacolo
        $("#ostacolo img").removeClass("movimentoOst"); 
        $("#ostacolo2 img").removeClass("movimentoOst2");
        clearInterval(a);//ferma setInterval del movimento della strada
    })
    
    //***************************COLLISIONI*************************
    var coll1 = setInterval(controlloCollisione);

    function controlloCollisione(){
        ostacoloPos = r.getBoundingClientRect();
        ostacoloPos2 = r2.getBoundingClientRect();
        macchinaPos = m.getBoundingClientRect();

        scontro1 = (ostacoloPos.left == macchinaPos.left) && (macchinaPos.bottom>ostacoloPos.top) && (macchinaPos.top<ostacoloPos.bottom);
        scontro2 = (ostacoloPos2.left > (macchinaPos.left-40)) && (ostacoloPos2.left < (40+macchinaPos.right))  && (macchinaPos.bottom>ostacoloPos2.top) && (macchinaPos.top<ostacoloPos2.bottom);

        if(scontro1 || scontro2){
            $("#ostacolo img").removeClass("movimentoOst"); 
            $("#ostacolo2 img").removeClass("movimentoOst2"); 
            
            clearInterval(a);

            c=-parseInt(b);
            $(".pts").text(c+" pts");

            localStorage.setItem("ptsPartita",c)

            //Blocca il movimento degli ostacoli
            r.style.setProperty('--pos', ostacoloPos.top + "px");
            r2.style.setProperty('--pos', ostacoloPos2.top + "px");

            $("#ostacolo img").addClass("posizioneAt");
            $("#ostacolo2 img").addClass("posizioneAt");

            //blocca il movimento la macchina
            document.onkeydown = false

            fine = false;

            $(".gameOver").show();		
            clearInterval(coll1);
            $(".bordiSx").hide();
        }
    }

    //CONTROLLO PER FARE RIPARTIRE DALLA POSIZIONE IN CUI É STATA MESSA IN PAUSA LA MACCHINA, DOPO AVER SCHIACCIATO RIPRENDI
    function controllo(){
        var pos=r.getBoundingClientRect(); //otteniamo la posizione dell'ostacolo

        if(pos.top>(document.body.clientHeight-30))
        {
            clearInterval(premuto)	//stoppa il setInterval del controllo
            r.style.top = 0;	
            r.style.setProperty('--inizio', 0);						
            r.style.setProperty('--tempo', (1 + "s"));
        }

    }
    
    //*******************BOTTONE RIPRENDI************************
    $(".bottone1").click(function(){
        $(".content").hide();

        //riprende il movimento la macchina
        document.onkeydown = function (event) 
        {
            switch(event.key)
            {				
                case "ArrowLeft":
                        Freccia(-1)
                        break;
                
                case "ArrowRight":
                        Freccia(1)
                        break;						
            }	
        }

        $("#ostacolo img").removeClass("posizioneAt");
        r.style.setProperty('--inizio', trovaPos + "px");+
        r.style.setProperty('--tempo', (1-trovaTempoTrascorso) + "s");
                            
        $("#ostacolo img").addClass("movimentoOst");
        $("#ostacolo2 img").addClass("movimentoOst2");

        premuto=setInterval(controllo, 0);
        a = setInterval(movimento,vel);

        stop = false;

        if (!vPlay) {
            $("#audio").attr("src", "images/gioco/audio.PNG");
            audio.play();
            audio.loop = true;
            vPlay = false;
        } 
        else {
            $("#audio").attr("src", "images/gioco/noAudio.PNG");
            audio.pause();

            //audio.currentTime = 0;//fa partire da capo l'audio
            vPlay = true;
        }
    })			




    //***************************************MOVIMENTO STRADA*********************************************
    var vel = 10;
    a=setInterval(movimento,vel);
    var b=0;

    function movimento(){
        b=b-1;
        $("body").css("background-position-y",b+"%");
        sfondo.css("background-position-y", b+"%");
    }


    //************************************************MOVIMENTO DELLA MACCHINA******************************************************
    $("#img-area").addClass("ct");

    var car = document.getElementById("macchina");
    var sfondo = $("#img-area");
    var movimento;
    //var dimensione = document.getElementById("img-area").offsetWidth;
    var x = 0;
    /*alert(dimensione);
    var spostamento = parseInt(dimensione/3);*/


    document.onkeydown = move;

    function move(event)
    {
        switch(event.key)
        {				
            case "ArrowLeft":
                    Freccia(-1)
                    break;
            
            case "ArrowRight":
                    Freccia(1)
                    break;						
        }						
    }

    function Freccia(deltax){
        x+=deltax;

        //Controlli usati per evitare che la macchina non vada oltre i bordi
        if(x<-1) x++;
        else if(x>1) x--;
        
        //Spostamenti 
        if(x==-1){
            sfondo.removeClass("ct");
            sfondo.addClass("sx");
        } 
        else if(x==0){
            sfondo.removeClass("sx");
            sfondo.removeClass("dx");
            sfondo.addClass("ct")
        } 
        else if(x==1) {
            sfondo.removeClass("ct");
            sfondo.addClass("dx");
        }
    }	


    //****************************MOVIMENTO RANDOM OSTACOLO********************************
    // $("#img-area").addClass("ctR");
    let array = ['n1', 'n2', 'n3'];
    let ostacolo = document.getElementById("ostacolo");
    let ostacolo2 = document.getElementById("ostacolo2");

    let random,ost2;
				
    ostacolo.addEventListener("animationiteration",function(){

        random = array[Math.floor(Math.random() * 3)];

            var immagineRandom = parseInt(Math.floor(Math.random()*7));

            if(immagineRandom>2){
                //Prendo gli ostacoli "macchina"
                immagineRandom = Math.floor((Math.random()*6)+1);
                r.src="images/gioco/Ostacolo"+immagineRandom+".png";
            }
            else{
                immagineRandom = Math.floor((Math.random()*2));            
                r.src="images/gioco/Ostacolo2_"+immagineRandom+".png";
            }

            if(random == 'n1')  $(".movimentoOst").css({"left":"12%","right":""})

            if(random == 'n2') $(".movimentoOst").css({"left":"48%","right":"52%"})
            
            if(random == 'n3')  $(".movimentoOst").css({"right":"12%","left":""});        
    })

    ostacolo2.addEventListener("animationiteration",function(){
        var immagineRandom = parseInt(Math.floor(Math.random()*2));

        if(immagineRandom==0){
            //Prendo gli ostacoli "macchina"
            immagineRandom = Math.floor((Math.random()*6)+1);
            r2.src="images/gioco/Ostacolo"+immagineRandom+".png";
        }
        else{
            immagineRandom = Math.floor((Math.random()*2));            
            r2.src="images/gioco/Ostacolo2_"+immagineRandom+".png";
        }

        ost2 = array[Math.floor(Math.random() * 3)];

        while(ost2==random){
            ost2 = array[Math.floor(Math.random() * 3)];
        }
        if(ost2 == "n1") $(".movimentoOst2").css({"left":"12%","right":""})

        else if(ost2 == "n2")  $(".movimentoOst2").css({"left":"48%","right":"52%"})

        else $(".movimentoOst2").css({"right":"","left":"82%"});
    })


    //*****************LAMPEGGIAMENTO BORDI DEL BOTTONE RESTART***************
    function blink(btn) {
        blink1(btn);
    }
    function blink1(btn1) {
        btn1.removeClass();
        btn1.addClass("restart");
        setTimeout(function () { blink2(btn1); }, 500);
    }

    function blink2(btn2) {
        btn2.removeClass();
        btn2.addClass("restart1");
        setTimeout(function () { blink1(btn2); }, 500);
    }

    blink($("#restart"));
    blink($("#record"));

}
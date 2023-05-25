var a;

$("document").ready(function (){
    if(localStorage.getItem("Ingresso")!=2)	localStorage.setItem("Ingresso",1);

    //Generazione del titolo
    $("body").addClass("main");    
    a=setTimeout(spawnTitolo,1000)
    
    $("#wrapperMain").click(500,function(){
        cambioScena();
    })

    $("#wrapperSecond div p").click(function (event){
        //Blocco l'invio della nuova pagina
        event.preventDefault();
        //Riproduco l'audio
        $("#audio1")[0].pause();
        $("#audio1")[0].play();
        //Quando l'audio smette di venir riprodotto
        $("#audio1").on("ended", function() {
                window.location.href = 'preGame.html';
        });
        
    })

    
})

function spawnTitolo(){
    $("#titolo h1").fadeIn(3000);
    a=setInterval(illumina,0)
}

function illumina(){
    $("#bottom").fadeIn(1000,function(){
        $("#bottom").fadeOut(1000);
    });
}

function cambioScena(){
    clearInterval(a)
    daMainASeconda();
    a=setTimeout(daMainASeconda2,1000)
}

function daMainASeconda(){
    $("#nero").fadeIn(1000,function(){$("#nero").fadeOut(1000)});
}

function daMainASeconda2(){
    $("#wrapperMain").css("display","none");
    $("body").removeClass("main");
    $("#bottoni").children().css("display","inline-block");
    $("#wrapperSecond").show();
}
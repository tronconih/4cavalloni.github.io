$(document).ready(function(){
    $("#sx div div").addClass("backgrBott");

    generaCelle();

    //scomparsa div secondari
    $("#sx div div:not(div:first-child)").css("display","none");
    $("#car div,#map div").width("400px");
    $("#car div:not(.notAvaiable)").css("position","relative");
    $("#map div:not(.notAvaiable)").css("position","relative");

    //CAMBIO VISUALE
    incar=false;
    $("#car div").hover(function (){incar=true;});
    $("#car div").mouseleave(function (){incar=false;})

    $(document).keydown(function (e){
        if(incar){
            switch(e.key){
                case "ArrowLeft":{
                    switchSx("macchina");
                    break;
                }
                case "ArrowRight":{
                    switchDx("macchina");
                    break;
                }
            }
        }
    });

    //CAMBIO MAPPA
    inmap=false;
    $("#map div").hover(function (){inmap=true;});
    $("#map div").mouseleave(function (){inmap=false;})

    $(document).keydown(function (e){
        if(inmap){
            switch(e.key){
                case "ArrowLeft":{
                    switchSx("mappa");
                    break;
                }
                case "ArrowRight":{
                    switchSx("mappa");
                    break;
                }
            }
        }
    });


    $("#play").click(function (e){

        //Blocco l'invio della nuova pagina
        e.preventDefault();

        //CONTROLLO CHE LA MAPPA/VISUALE SCELTA SIA DISPONIBILE
        if($("#car div:nth-child("+vis+") p").hasClass("notAvaiable")){
            $("#car div:nth-child("+vis+")").animate({left: "-=50px"},"fast",function(){
                $("#car div:nth-child("+vis+")").animate({left: "+=100"},"fast",function(){
                    $("#car div:nth-child("+vis+")").animate({left:"-=75px"},"fast",function(){
                        $("#car div:nth-child("+vis+")").animate({left:"+=50"},"fast",function(){
                            $("#car div:nth-child("+vis+")").animate({left:"-=25"},"fast")
                        })
                    })
                })
            });
        }
        else if($("#map div:nth-child("+map+") p").hasClass("notAvaiable")){
            $("#map div:nth-child("+map+")").animate({left: "-=50px"},"fast",function(){
                $("#map div:nth-child("+map+")").animate({left: "+=100"},"fast",function(){
                    $("#map div:nth-child("+map+")").animate({left:"-=75px"},"fast",function(){
                        $("#map div:nth-child("+map+")").animate({left:"+=50"},"fast",function(){
                            $("#map div:nth-child("+map+")").animate({left:"-=25"},"fast")
                        })
                    })
                })
            });
        }
        else{
            //Invio alla pagina
            window.location.href = 'gioco.html';
            localStorage.setItem("Visuale",vis);
            localStorage.setItem("Mappa",map);
        }
    })
})

var vis = 1;
var map = 1;

function switchSx(tipo){
    if(tipo == "mappa"){
        //Controllo che non sia arrivato al limite sinistro, se ci arriva, lo faccio andare all'ultimo
        if(map==1){
            map=2;
            $("#map div:first-child").css("display","none");
            $("#map div:last-child").css("display","")
        }
        else {
            map=1;
            $("#map div:last-child").css("display","none");
            $("#map div:first-child").css("display","")
        }
    }
    else{
        $("#car div:nth-child("+vis+")").css("display","none")
        if(vis==1) vis = 3;
        else vis--;
        $("#car div:nth-child("+vis+")").css("display","");
    }
}

function switchDx(tipo){
    if(tipo == "mappa"){
        if(map==0){
            map=1;
            $("#map div:first-child").css("display","none");
            $("#map div:last-child").css("display","")
        }
        else {
            map=0;
            $("#map div:nth-child("+map+")").css("display","none");
            $("#map div:first-child").css("display","")
        }
    }
    else{
        $("#car div:nth-child("+vis+")").css("display","none")
        if(vis==3) vis = 1;
        else vis++;
        $("#car div:nth-child("+vis+")").css("display","");
    }
}

function generaCelle(){
    var app=document.getElementsByClassName("backgrBott");

    for(i=0;i<2;i++){

        for(j=0;j<3;j++){
            //Se i = 0, allora imposto le visuali
            if(i==0){
                //Controllo quale delle 3 visuali
                switch(j){
                    case 0:{
                        $(app[0]).append("<p>&lt;Dall'alto></p>");
                        break;
                    }
                    case 1:{
                        $(app[1]).append("<p class='notAvaiable'>&lt;Terza Persona></p>");
                        break;
                    }
                    case 2:{
                        $(app[2]).append("<p class='notAvaiable'>&lt;Prima Persona></p>");
                        break;
                    }
                }
            }
            else{
                //Se i = 1, imposto le mappe
                //j:0 circuito, j:1 citta'
                if(j==0){
                    //foto+='src="Immagini/Mappe/Circuito1.jpg">';
                    $(app[3]).append("<p>&lt;Circuito></p>");
                }	
                else if(j==1){
                    //foto+='src="Immagini/Mappe/Citta.jpg">';
                    $(app[4]).append("<p class='notAvaiable'>&lt;Citta'></p>");
                }
            }
            
        }
        
    }
}
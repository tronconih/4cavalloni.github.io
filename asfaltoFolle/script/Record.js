$("document").ready(function(){
    if(localStorage.getItem("Ingresso")==1){
        const vPunti = [1000,500,100];
        const vNomi = ["Captain Pancake","Ninja Taco","The Gaming Potato"];

        localStorage.setItem("Punti",vPunti);
        localStorage.setItem("Nomi",vNomi);
        localStorage.setItem("Ingresso",2);
    }

    else {
        var vetP = localStorage.getItem("Punti");
        vetP = vetP.split(",");
        var vetN = localStorage.getItem("Nomi");
        vetN = vetN.split(",");
    }

    $("table").append(creaTabella(vetP,vetN));
    
    vetPoint=getPoints();
    
    var pts = parseInt(localStorage.getItem("ptsPartita"));

    //Se il punteggio fatto è maggiore dei punteggi già presenti nella tabella
    if(!record(pts)){
        $("#HS").css("display","none");
        $("#SB").css("display","");
    }
    else $("b").prepend(pts);
    
    a=setTimeout(spawnSub,1000);

    $("#HS").dblclick(function (){
        clearInterval(b);
        $("#HS").fadeOut(2000,function(){
            $("#SB").fadeIn(2000);
        });

        if($("input").val()!="")    modificaClassifica(vetP,vetN,pts);
    });

})

function record(pts){
    v=$("table tr:not(tr:first-child) td:last-child").text();
    //A partire da 1, sono presenti i punteggi della tabella
    punti=v.split(" ");
    
    for(i=1;i<punti.length;i++)
        if(parseInt(punti[i])<parseInt(pts))    return true;
    return false;
}

function getPoints(){
    v=$("table tr:not(tr:first-child) td:last-child").text();
    punti=v.split(" ");
    delete punti[0];
}

function spawnSub(){
    b=setInterval(function(){
        $("#HS p:last-child").fadeIn(1000,function(){
            $("#HS p:last-child").fadeOut(1000);
        })
    },0);
}

function creaTabella(vetP,vetN){
    app="";

    for(i=0;i<3;i++){
        app+="<tr class='posiz'>";
        for(j=0;j<2;j++){
            app+="<td> ";
            if(j==1) app+=vetP[i];
            else app+=vetN[i];
            app+="</td>";
        }
        app+="</tr>";
    }

    return app;
}

function modificaClassifica(vetP,vetN,pts){

    const punt = [];
    const nom = [];

    var inserito = false;

    for(i=0;i<3;i++){
        if(!inserito){
            if(parseInt(vetP[i]) < parseInt(pts) && !inserito){
                punt.push(pts);
                nom.push($("input").val());
                inserito = !inserito;
            }
            else {
                punt.push(vetP[i]);
                nom.push(vetN[i]);
            }
        }
        else {
            punt.push(vetP[i-1]);
            nom.push(vetN[i-1]);
        }
    }

    localStorage.setItem("Punti",punt);
    localStorage.setItem("Nomi",nom);

    $("table").find("tr:not(:first)").remove();
    $("table").append(creaTabella(punt,nom));
}
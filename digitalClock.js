function addSegments(digitId){

    for(let i=0; i<7; i++){
        let seg = document.createElement("div");
        seg.classList.add("segment");
        seg.classList.add("segment" + i);
        seg.classList.add("off");
        document.getElementById(digitId).appendChild(seg);
    }
}


function updateDigit(digitId, value){

    let segmentStates = [
        [1, 1, 1, 0, 1, 1, 1], //0
        [0, 0, 1, 0, 0, 1, 0], //1
        [1, 0, 1, 1, 1, 0, 1], //2
        [1, 0, 1, 1, 0, 1, 1], //3
        [0, 1, 1, 1, 0, 1, 0], //4
        [1, 1, 0, 1, 0, 1, 1], //5
        [1, 1, 0, 1, 1, 1, 1], //6
        [1, 0, 1, 0, 0, 1, 0], //7
        [1, 1, 1, 1, 1, 1, 1], //8
        [1, 1, 1, 1, 0, 1, 1]  //9
    ];

    let j=0;
    let number = segmentStates[value]
    number.forEach(element => {
        let seg = document.getElementById(digitId).getElementsByTagName("div")[j]
        if (element == 1) {
            seg.classList.remove("off")
        }
        j++;
    })
}


function init(choice){
    if(choice == "clock"){
        addSegments("hours-tens");
        addSegments("hours-units");
        addSegments("minutes-tens");      
        addSegments("minutes-units");
        addSegments("second-tens");      
        addSegments("second-units");
    }else if(choice == "timer"){
        addSegments("minutes1");      
        addSegments("minutes2");
        addSegments("sec1");
        addSegments("sec2");
        addSegments("milli1");
        addSegments("milli2");
    }
}


//On récupère l'heure qu'on actualise toutes les 500 ms puis on l'affiche
function affichage(){
    
    colonInterval = setInterval(() =>{
        clean("clock");
        time = new Date().toLocaleTimeString('fr-FR');
        
        document.getElementById("colon").classList.toggle("off");
        document.getElementById("colon2").classList.toggle("off");
        document.getElementById("colon3").classList.toggle("off");
        document.getElementById("colon4").classList.toggle("off");
        
        updateDigit("hours-tens",time[0]);
        updateDigit("hours-units",time[1]);
        updateDigit("minutes-tens",time[3]);
        updateDigit("minutes-units",time[4]); 
        updateDigit("second-tens",time[6]);
        updateDigit("second-units",time[7]); 
    },500);
}


function increment(n){
    n++;
    return n;
}

//variables globales pour gérer le temps
let seconde = 0;
let minute = 0;
let milli = 0;

function timer(){
    //On change les couleurs/nom du bouton start/stop lorsqu'on click dessus
    let button = document.getElementById("start");

    if(document.getElementById("start").innerHTML == "stop"){
        stop();
        button.innerHTML = "start";
        button.style.color = "rgb(53, 201, 78)";
        button.style.borderColor = "rgb(53, 201, 78)";
        return;
    }

    button.innerHTML = "stop";
    button.style.color = "red";
    button.style.borderColor = "red";
    document.getElementById("reset").removeAttribute("disabled");
    

    //La boucle de temps de la fonction timer
    myInterval = setInterval(function (){

        clean("timer");

        milli = increment(milli);

        let temps = "0"+minute +":0"+ seconde +":0"+ milli;    

        if(milli > 99){
            milli = 0;
            seconde++;
        }
        
        if(seconde > 59){
            seconde = 0;
            minute++;
        }
        
        //condition pour gérer l'affichage
        if(milli > 9){
            temps = minute +":"+ seconde +":"+milli;
            if(seconde > 9){
                if(minute > 9){
                    temps = minute +":"+ seconde +":"+milli;
                }else{
                    temps = "0"+minute +":"+ seconde +":"+milli;
                }
            }else{
                if(minute > 9){
                    temps = minute +":0"+ seconde +":"+milli;
                }else{
                    temps = "0"+minute +":0"+ seconde +":"+milli;
                }
            }
        }else{
            if(seconde > 9){
                temps = "0"+minute +":"+ seconde +":0"+milli;
            }
        }
        
        updateDigit("minutes1",temps[0]);
        updateDigit("minutes2",temps[1]);
        updateDigit("sec1",temps[3]);
        updateDigit("sec2",temps[4]);
        updateDigit("milli1",temps[6]);
        updateDigit("milli2",temps[7]);
        
    },10);
}


function stop(){
    clearTimeout(myInterval);
}

//On arrête puis on efface le timer
function reset(){
    seconde = 0;
    minute = 0;
    stop();
    clean("timer");
    document.getElementById("reset").setAttribute("disabled","");
    document.getElementById("start").innerHTML = "start";
    document.getElementById("start").style.color = "rgb(53, 201, 78)";
    document.getElementById("start").style.borderColor = "rgb(53, 201, 78)";
}

//On ajoute "off" à la classe de tous les segments
function clean(choice){
    let numberStates;
    if(choice == "clock"){
        numberStates = ["hours-tens", "hours-units", "minutes-tens", "minutes-units","second-tens","second-units"];
    }else if(choice == "timer"){
        numberStates = ["minutes1", "minutes2","sec1","sec2","milli1","milli2"];
    }

    for(let i=0; i<numberStates.length; i++){
    
        let number = document.getElementById(numberStates[i]);
        let seg = number.getElementsByClassName("segment")

        for(let j=0; j<7; j++){
            if(seg[j].className.length < 20){   //20 longueur class avec off
                seg[j].classList.add("off");
            }
        }
    }
}

//On actualise l'apparence du boutton s'il est activé/désactivé
function buttonStatus(){

    let button = document.getElementById("reset");
    if(button.hasAttribute("disabled") == true){
        button.style.opacity = "0.2";
    }else{
        button.style.opacity = "1";
    }

}buttonStatus();


function main(){
    init("clock");
    affichage();
    
    init("timer");
} main();
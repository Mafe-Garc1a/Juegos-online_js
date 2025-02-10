// TARGET <-Es par modificar contenido
//se pon para que no sean iguales dede un inicio y deje jugar
let miMatriz=[
    ["a","b","c"],
    ["d","e","f"],
    ["g","j","k"]
];
const marcador = document.getElementById("centro");
let jugador1=0;
let jugador2= 0;
let general=1;
let caracter ="x";
//llamo la matriz del otro archivo
const matrizRecuperada = JSON.parse(localStorage.getItem('perfil'));
console.log(matrizRecuperada);
const caja =document.querySelector(".caja");
console.log(caja);
caja.addEventListener('click', (cajitaClick)=>{
    let posicion = cajitaClick.target.getAttribute("id");
    console.log(posicion);
 //es para que la letra que haya se almacene en+ la matriz y posicion
    if(cajitaClick.target.textContent ==="x" || cajitaClick.target.textContent ==="o"){
        alert("no sea tramposo....");
    }else{
        cajitaClick.target.textContent =caracter ;
        (posicion=="1")? miMatriz[0][0]=caracter:false ;
        (posicion=="2")? miMatriz[0][1]=caracter:false ;
        (posicion=="3")? miMatriz[0][2]=caracter:false ;
        (posicion=="4")? miMatriz[1][0]=caracter:false ;
        (posicion=="5")? miMatriz[1][1]=caracter:false ;
        (posicion=="6")? miMatriz[1][2]=caracter:false ;
        (posicion=="7")? miMatriz[2][0]=caracter:false ;
        (posicion=="8")? miMatriz[2][1]=caracter:false ;
        (posicion=="9")? miMatriz[2][2]=caracter:false ;
        validar();
        (caracter=="x") ? caracter="o" : caracter="x";
    };
    console.log(miMatriz);
    
        
});
function validar(){
    if (miMatriz[0][0] == miMatriz[0][1]  && miMatriz[0][0]== miMatriz[0][2]){
        alert(" HA GANADO "+miMatriz[0][0]); 
        (caracter=="x" ) ? jugador1++ :jugador2++;
    };
    if (miMatriz[1][0] == miMatriz[1][1]  && miMatriz[1][0]== miMatriz[1][2]){
        alert(" HA GANADO  "+miMatriz[1][0]); 
        (caracter=="x") ? jugador1++ :jugador2++;

    };
    if (miMatriz[2][0] == miMatriz[2][1]  && miMatriz[2][0]== miMatriz[2][2]){
        alert(" HA GANADO  "+miMatriz[2][0]); 
        (caracter=="x")? jugador1++ :jugador2++;

    };
    if (miMatriz[0][0] == miMatriz[1][0]  && miMatriz[0][0]== miMatriz[2][0]){
        alert(" HA GANADO  "+miMatriz[0][0]); 
        (caracter=="x") ? jugador1++ :jugador2++;
    };
    if (miMatriz[0][1] == miMatriz[1][1]  && miMatriz[0][1]== miMatriz[2][1]){
        alert(" HA GANADO  "+miMatriz[0][1]); 
        (caracter=="x") ? jugador1++ :jugador2++;

    };
    if (miMatriz[0][2] == miMatriz[1][2]  && miMatriz[0][2]== miMatriz[2][2]){
        alert(" HA GANADO  "+miMatriz[0][2]); 
        (caracter=="x") ? jugador1++ :jugador2++;

    };
    if (miMatriz[0][0] == miMatriz[1][1]  && miMatriz[0][0]== miMatriz[2][2]){
        alert(" HA GANADO  "+miMatriz[0][0]); 
        (caracter=="x") ? jugador1++ :jugador2++;

    };
    if (miMatriz[0][2] == miMatriz[1][1]  && miMatriz[0][2]== miMatriz[2][0]){
        alert(" HA GANADO  "+miMatriz[0][2]); 
        (caracter=="x") ? jugador1++ :jugador2++;
    };
    console.log(jugador1);
    const marcador1 =document.getElementById("marcador1");
    const marca1 = document.createElement("h2");
    marcador1.textContent="";
    marca1.textContent=jugador1;
    marcador1.appendChild(marca1);
    console.log(jugador2);
    const marcador2 =document.getElementById("marcador2");
    const marca2 = document.createElement("h2");
    marcador2.textContent="";
    marca2.textContent= jugador2;
    marcador2.appendChild(marca2);
    if(jugador1==5){
        const ganador1 = document.getElementById("perfil1");
        const gan1 = document.createElement("h3");
        gan1.textContent="WINNER";
        ganador1.appendChild(gan1);
        confetti({
            particleCount:150,
            spread:180,
        });
        
        
    }else{
        if(jugador2==5){
            const ganador2 = document.getElementById("perfil2");
            const gan2 = document.createElement("h3");
            gan2.textContent="WINNER";
            ganador2.appendChild(gan2);
            confetti({
                particleCount:150,
                spread:180,
            });
        }
        
    }
};

const usuario1 = document.getElementById("perfil1");
const h1 = document.createElement("h1") ;
h1.textContent=matrizRecuperada[0][0];
console.log(h1);
const h2 = document.createElement("h2");
h2.textContent=matrizRecuperada[0][1];
usuario1.appendChild(h1);
usuario1.appendChild(h2);
const usuario2 = document.getElementById("perfil2");
const h1_1 = document.createElement("h1") ;
h1_1.textContent=matrizRecuperada[1][0];
console.log(h1_1);
const h2_2 = document.createElement("h2");
h2_2.textContent=matrizRecuperada[1][1];
usuario2.appendChild(h1_1);
usuario2.appendChild(h2_2);


const reset =document.getElementById("reset");
//limpiar Tabla
reset.addEventListener("click" , ()=>{
    miMatriz=[
        ["a","b","c"],
        ["d","e","f"],
        ["g","j","k"],
    ];
    general=general+1;
    console.log(general);
    const centro =document.getElementById("centro");
    const numero = document.createElement("h3");
    centro.textContent="";
    numero.textContent=general;
    centro.appendChild(numero);
    const cuadros = document.querySelectorAll(".cajita");
    cuadros.forEach(cuadros =>{
        cuadros.textContent ="";
    });
});




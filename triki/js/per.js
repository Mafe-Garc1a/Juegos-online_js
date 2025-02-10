const perfil=[
    ["",""],
    ["",""],
];
const boton = document.getElementById("guardar1");
let caracter_perfil="x";
const funcion_perfil=document.querySelector(".row");
funcion_perfil.addEventListener("click" , (opcionClick)=>{
    opcionClick.target.textContent =caracter_perfil;
    let posicion = opcionClick.target.getAttribute("id");
    console.log(posicion);
    (posicion=="01")? perfil[0][0]=caracter_perfil:false ;
    (posicion=="02")? perfil[1][0]=caracter_perfil:false ;
    (caracter_perfil=="x") ? caracter_perfil="o" : caracter_perfil="x";
    
} );

boton.addEventListener("click" , ()=>{
    const user1=document.getElementById("user1");
    let us1 =user1.value;
    const user2=document.getElementById("user2");
    let  us2 = user2.value ;
    if(us1=="" && us2=="" ){
        alert("porfavor ingrese los nombres");
        
    }else{
        perfil[0][1]=us1;
        perfil[1][1]=us2;
        window.location.href="triki.html";
        localStorage.setItem('perfil', JSON.stringify(perfil));
    };
    console.log(perfil);
    
});
console.log(perfil);
//exporto la matriz a otro archivo


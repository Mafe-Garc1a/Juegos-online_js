const selectores = {
    boardContainer: document.querySelector('.board-container'), //se pone "," ya que se esta tomando varias clases como cuando se hace un arreglo
    board: document.querySelector('.board'),
    movimientos: document.querySelector('.movimientos'),
    tiempo: document.querySelector('.tiempo'),
    comenzar: document.querySelector('button'),
    ganar: document.querySelector('.ganar')
    // se pone "
    // en vez de "="
};

const estado = { //almacena el estado actual del juego
    juegoIniciado: false,
    cartasVolteadas: 0, //cartas volteadas
    volteretasTotales: 0,
    tiempoTotal: 0,
    bucle: null //propiedad o bucle no definido
};

const barajar = formacionArreglo => { //funcion mezcla aleatoriamente los elementos del arreglo
    const arregloClonado = [...formacionArreglo]; //crea una  copia del arreglo orginal
    //  cambia aleatoriamente  los elementos del arreglo
    for (let i = arregloClonado.length - 1; i > 0; i--) {//inicia desde el ukltimo indice del arreglo
        //el match.floor <-redondea el nunmero decimal al entero de abajo mas cercano
        //match.random <-genral un numero decimal aleatorio entre 1 y 0
        //*(i+1) <- multiplica un numero aleaotorio por i +1 para obtener un  numero decimal 
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const original = arregloClonado[i]; //guardar valor inicial antes de q cambie
        //se mueve lo q esta en randomindex a la posicion i ,(mueve el elemento aleaotio a la posicion actual)
        arregloClonado[i] = arregloClonado[randomIndex];
        arregloClonado[randomIndex] = original;//asignamos lo q estaba en la i a random index
        //esto hace el cambio
    };

    return arregloClonado; // devuelve el areglo mezclado
};

const elegirAzar = (formacionArreglo, elementos) => {
    const arregloClonado = [...formacionArreglo];
    const seleccionAleatoria = [];

    for (let i = 0; i < elementos; i++) {
        const randomIndex = Math.floor(Math.random() * arregloClonado.length);
        seleccionAleatoria.push(arregloClonado[randomIndex]);//elemento aleatorio seleccionado
        arregloClonado.splice(randomIndex, 1);//elimina 1 elemento del arreglo para que no haya mas duplicados
    }

    return seleccionAleatoria;
};

const generarjuego = () => { //GENERA EL TABLERO DE JUEGO
    const dimensiones = selectores.board.getAttribute('data-dimension');  

    if (dimensiones % 2 !== 0) {
        throw new Error("la dimension del tablero debe ser unnumero par.");
    }

    const emojis = ["🌽 ", "🍋 ","🍉" ,"🍍" ,"🍐", "🍎", "🍇", "🍒 ","🍈", '🥑'];
    //llama la funcion elegirAzar para seleccionar los emojis para el tablero
    const seleeccionesemojis = elegirAzar(emojis, (dimensiones * dimensiones) / 2) ;//se calcula
    const elementos = barajar([...seleeccionesemojis, ...seleeccionesemojis]);//contiene los emojis seleccionados duplicados

    //se crea una cadenaa de texto
    //bucle map para crear una tarjeta para cada emoji
    //.join <-unir todas las cartas en una sola cadena
    const cartas = `
        <div class="board" style="grid-template-columns: repeat(${dimensiones}, auto)">
            ${elementos.map(elemento => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${elemento}</div>
                </div>
            `).join('')}
        </div>
    `;
    //se usa para convertir la cadenqa de texto en documento html
    const parser = new DOMParser().parseFromString(cartas, 'text/html');
    //reenmplaza el html original con el nuevo tablero
    selectores.board.replaceWith(parser.querySelector('.board'));
};

const iniciarJuego = () => {
    estado.juegoIniciado = true;
    selectores.comenzar.classList.add('disabled');

    estado.bucle = setInterval(() => {
        estado.tiempoTotal++;

        selectores.movimientos.innerText = `${estado.volteretasTotales} movimientos`;
        selectores.tiempo.innerText = `Time: ${estado.tiempoTotal} sec`;
    }, 1000)
};

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped');
    });

    estado.cartasVolteadas = 0;
};

const flipCard = card => { // funvion voltear cartas 
    estado.cartasVolteadas++;
    estado.volteretasTotales++;

    if (!estado.juegoIniciado) {
        iniciarJuego();
    };

    if (estado.cartasVolteadas <= 2) {
        card.classList.add('flipped');// agrega esta clase pa voltar la carta hacia adelante 
    };

    if (estado.cartasVolteadas === 2) {
        const cartasVolteadas = document.querySelectorAll('.flipped:not(.matched)');//verifica si no tienen el mismo texto

        if (cartasVolteadas[0].innerText === cartasVolteadas[1].innerText) {
            //si las cartas estan emparejadas agrega matched a ambas para inbidicar q son pareja
            cartasVolteadas[0].classList.add('matched');
            cartasVolteadas[1].classList.add('matched');
        };

        setTimeout(() => {
            flipBackCards();
        }, 1000);
    };
    if (!document.querySelectorAll('.card:not(.flipped)').length) {//cuando la persona gana
        setTimeout(() => { // retrasa por 1 sec 
            selectores.boardContainer.classList.add('flipped')
            confetti({
                particleCount:150,
                spread:180,

            });
            selectores.ganar.innerHTML = `
                <span class="ganar-text">
                    felicidades ganaste!<br />
                        con<span class="highlight">${estado.volteretasTotales}</span> movimientos<br />
                    en <span class="highlight">${estado.tiempoTotal}</span> segundos
                </span>
            `

            clearInterval(estado.bucle);//detiene el bucle de intervalo creado por sttimeout
        }, 1000);
    };
};

const adjuntartodo = () => { //este espera q ocurran eventos
    document.addEventListener('click', event => {
        const objetivo = event.target; //evento dentro del tablero
        const eventoPadre = objetivo.parentElement;//apunta al evento padre(tablero)

        if (objetivo.className.includes('card') && !eventoPadre.className.includes('flipped')) {
            flipCard(eventoPadre);//se encar4ga de voltear la carta
        } else if (objetivo.nodeName === 'BUTTON' && !objetivo.className.includes('disabled')) {
            iniciarJuego();
        }
    });
};

generarjuego();
adjuntartodo();
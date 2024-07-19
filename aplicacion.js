// Selección de elementos del DOM
const textoEntrada = document.getElementById('textoEntrada');
const textoSalida = document.getElementById('textoSalida');
const botonEncriptar = document.getElementById('botonEncriptar');
const botonDesencriptar = document.getElementById('botonDesencriptar');
const botonCopiar = document.getElementById('botonCopiar');
const contenedorResultado = document.getElementById('contenedorResultado');
const imagenMuneco = document.getElementById('imagenMuneco');

// Definición de las reglas de encriptación
const clavesEncriptacion = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

// Función para encriptar el texto
function encriptar(texto) {
    return texto.replace(/[eiaou]/g, letra => clavesEncriptacion[letra]);
}

// Función para desencriptar el texto
function desencriptar(texto) {
    let desencriptado = texto;
    for (let [clave, valor] of Object.entries(clavesEncriptacion)) {
        desencriptado = desencriptado.replaceAll(valor, clave);
    }
    return desencriptado;
}

// Función para mostrar el resultado en la interfaz
function mostrarResultado(texto) {
    contenedorResultado.style.display = 'none';
    textoSalida.style.display = 'block';
    botonCopiar.style.display = 'block';
    textoSalida.value = texto;
}

// Función para validar que el texto solo contenga minúsculas y espacios
function validarEntrada(texto) {
    return /^[a-z\s]*$/.test(texto);
}

// Función para verificar si hay mayúsculas o caracteres especiales
function contieneMayusculasOEspeciales(texto) {
    return /[A-Z]/.test(texto) || /[^a-zA-Z\s]/.test(texto);
}

// Función para habilitar o deshabilitar los botones según el contenido del input
function alternarBotones() {
    const hayTexto = textoEntrada.value.trim().length > 0;
    botonEncriptar.disabled = !hayTexto;
    botonDesencriptar.disabled = !hayTexto;
    
    // Añadir o quitar clase para estilos visuales
    botonEncriptar.classList.toggle('deshabilitado', !hayTexto);
    botonDesencriptar.classList.toggle('deshabilitado', !hayTexto);
}

// Escucha de eventos para la entrada de texto
textoEntrada.addEventListener('input', alternarBotones);

// Escucha de eventos para el botón de encriptar
botonEncriptar.addEventListener('click', () => {
    const texto = textoEntrada.value;
    if (validarEntrada(texto)) {
        mostrarResultado(encriptar(texto));
    } else {
        if (contieneMayusculasOEspeciales(texto)) {
            alert("El texto contiene mayúsculas o caracteres especiales. Solo se aceptan letras minúsculas y espacios.");
        } else {
            alert("Texto inválido. Solo se aceptan letras minúsculas y espacios.");
        }
    }
});

// Escucha de eventos para el botón de desencriptar
botonDesencriptar.addEventListener('click', () => {
    const texto = textoEntrada.value;
    if (validarEntrada(texto)) {
        mostrarResultado(desencriptar(texto));
    } else {
        if (contieneMayusculasOEspeciales(texto)) {
            alert("El texto contiene mayúsculas o caracteres especiales. Solo se aceptan letras minúsculas y espacios.");
        } else {
            alert("Texto inválido. Solo se aceptan letras minúsculas y espacios.");
        }
    }
});

// Evento para el botón de copiar
botonCopiar.addEventListener('click', () => {
    textoSalida.select();
    document.execCommand('copy');
    alert('Texto copiado al portapapeles');
});

// Función para ajustar la visualización según el tamaño de la pantalla
function ajustarDiseno() {
    if (window.innerWidth >= 768) {
        imagenMuneco.style.display = 'block';
    } else {
        imagenMuneco.style.display = 'none';
    }
}

// Evento para ajustar el diseño cuando se cambia el tamaño de la ventana
window.addEventListener('resize', ajustarDiseno);

// Llamada inicial para ajustar el diseño
ajustarDiseno();

// Llamar a alternarBotones al cargar la página para establecer el estado inicial de los botones
alternarBotones();

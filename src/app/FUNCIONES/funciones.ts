export function generarOfset(){
    let cadena = "";
    for(let i = 0; i < 5; i++){
        cadena = cadena + Math.floor(Math.random() * 9);
    }
    return cadena;
}
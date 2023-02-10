export function generarOfset(){
    let cadena = "";
    for(let i = 0; i < 5; i++){
        cadena = cadena + Math.floor(Math.random() * 9);
    }
    return cadena;
}


export function generarMatriz(limit:number){
    const matriz:any = [];
    for(let i=0; i < limit; i++){
        for(let j=0; j<limit; j++){
            matriz[i][j] = 0;
        }
    }
    return matriz;
}

export function cambiarValorMatriz(matriz:any,x:number, y:number, colores:number){
    let aux = matriz[x][y] + 1;
    if(aux >= colores)
        aux = 0;
    const limit = matriz[0].length;
    for(let i=0; i < limit; i++){
        for(let j=0; j<limit; j++){
            if(x === i && y === j){
                matriz[i][j] = aux;
            }
        }
    }
    return matriz;
}
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
        const aux:any = [];
        for(let j=0; j<limit; j++){
            aux.push(0);
        }
        matriz.push(aux);
    }
    return matriz;
}


export function generarMatrizGuia(limit:number, colores:number){
    const matriz:any = [];
    for(let i=0; i < limit; i++){
        const aux:any=[];
        for(let j=0; j<limit; j++){
            aux.push(generarValor(0,colores));
        }
        matriz.push(aux);
    }
    return matriz;
}

export function cambiarValorMatriz(matriz:any,x:number, y:number, colores:number){
    let aux = matriz[x][y] + 1;
    if(aux > colores)
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


export function generarValor(min:number, max:number) {
    return Math.floor( Math.random() * (max - min) + min);
  }
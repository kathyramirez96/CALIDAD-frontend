import * as moment from 'moment-timezone';
import * as mom from 'moment';

export const HOY = mom().format('YYYY,MM,DD');
export const HORA_ACTUAL  = mom().format('hh,mm,ss');
export const HORA_NUEVA = mom().format('hh,mm,ss');
export const HORA_NORMAL = moment().tz("America/bogota").format('hh,mm,ss');
export const FECHA_ACTUAL = moment().tz("America/bogota").format('YYYY-MM-DD');
export const FECHA_NORMAL = moment().tz("America/bogota").format('YYYY-MM-DD-hh-mm-ss');
export const FECHA_CONSULTA = moment().tz("America/bogota").format('YYYY-MM-DD');
export const FECHA_MES_ATRAS = moment().tz("America/bogota").format('YYYY') +"-"+ (+moment().tz("America/bogota").format('MM')-1) + '-01' 


export function DIADIFERENCIA(diaUno:string,diaDos:string){
    try{
        const dateOne = moment(diaUno.split(','));
        const dateTwo = moment(diaDos.split(','));
        return   dateOne.diff(dateTwo, 'days');
    }catch(err){
        return 0;
    }    
}

export function DIADIFERENCIAHORA(horauno:string,horados:string){
    try{
        const h1 = horauno.split(",");
        const h2 = horados.split(",")
        let now  = "04/09/2013 "+h1[0]+":"+h1[1]+":"+h1[2]+"";
        let then = "02/09/2013 "+h2[0]+":"+h2[1]+":"+h2[2]+"";

        let ms = mom(now,"DD/MM/YYYY HH:mm:ss").diff(mom(then,"DD/MM/YYYY HH:mm:ss"));
        let d:any = mom.duration(ms);
        d = d._data.seconds;
        return d;

    }catch(err){
        return 0;
    }
}
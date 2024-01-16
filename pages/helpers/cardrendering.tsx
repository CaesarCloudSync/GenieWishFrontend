export const  ChangeColumnSize  = (quotacards:any) => {
    const quotapop2 = quotacards.length % 2 
    const quotapop3 = quotacards.length % 3
    const quotacolumn:any = (quotapop3 === 0 && 3) || (quotapop2 === 0 && 2) || (quotapop2 !== 0 && quotapop2 ) || (quotapop3 !== 0 && quotapop3 )
    return quotacolumn
}
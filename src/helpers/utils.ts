function randomKodeNumber (kode:string,rws:any) {
    const prefix = kode;
    const rw = rws;
    const randomNumber = Math.floor(Math.random() * 1000);
    const nomor = randomNumber.toString().padStart(4,'0');
    return prefix + rw + nomor
}
export function randomKodeNumberSampah (kode:string) {
    const prefix = kode;
    const randomNumber = Math.floor(Math.random() * 1000);
    const nomor = randomNumber.toString().padStart(4,'0');
    return prefix + nomor
}

export default randomKodeNumber;
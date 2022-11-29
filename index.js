const wa = require('@open-wa/wa-automate');

wa.create({
  sessionId: "COVID_HELPER",
  multiDevice: true, //required to enable multiDevice support
  authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: 'PT_BR',
  logConsole: false,
  popup: true,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));

function start(client) {
  client.onMessage(async message => {
    const angka = message.body;
    let arr = angka.split('/');
    const nama = message.sender.name;
    if(message.body == 'Hai' || message.body == 'hai'){
        await client.sendText(message.from, `Halo ` + nama + `
Selamat Datang di *Goodman Bot*

*_____Layanan_____*
        
*/laip* Laporan Akhir Indostation (BETA)
*/lhm* Laporan Harian Mogas (BETA)
        
Tutorial selengkapnya : https://imgoodman25.blogspot.com/2022/11/cara-menggunakan-bot-wa-goodman-bot.html`);
    }
    if (message.body === '/laip' || message.body === "/Laip" && message.isGroupMsg === false) {
        await client.sendText(message.from, `Gunakan Rumus: *#laip/hasil1/hasil2*`)
    }
    if (arr[0] === `#laip` || arr[0] === `#Laip` && message.isGroupMsg === false) {
        //per liter
        const rp = 14150;
        //harga
        let h1 = arr[1];
        let h2 = arr[2];
        let harga1 = parseInt(h1);
        let harga2 = parseInt(h2);
        //total harga
        let totalharga = harga1 + harga2;
        let final = parseInt(totalharga);
        //liter
        let shift1 = harga1 / rp;
        let shift2 = harga2 / rp;
        //total liter
        let totalLiter = shift1 + shift2;
        //tanggal bahasa Indonesia
        let hari = ["Ahad", 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        let bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus',
        'September', 'Oktober', 'November', 'Desember'];
    
        let tanggal = new Date().getDate();
        let _hari = new Date().getDay();
        let _bulan = new Date().getMonth();
        let _tahun= new Date().getFullYear();
    
        let day = hari[_hari];
        let month = bulan[_bulan]; 
        let tahun = (_tahun < 1000) ? _tahun + 1900 : _tahun;
        await client.sendText(message.from, ``+ day +`, ` + tanggal +` ` + month +` ` + tahun +`
=== MOGAS ===

=== Shift 01 === 
Liter keluar : `+shift1.toFixed(2)+`
Uang Tunai   : Rp `+ harga1.toFixed(0)+`
Voucher      : -
Total Uang   : Rp `+harga1.toFixed(0)+`
                             
=== Shift 02 ===
Liter keluar : `+shift2.toFixed(2)+`
Uang Tunai   : Rp `+harga2.toFixed(0)+`
Voucher      : -
Total Uang   : Rp `+harga2.toFixed(0)+`
                             
TOTAL LITER KELUAR  : `+totalLiter.toFixed(2)+` Liter
TOTAL UANG MOGAS    : Rp `+final.toFixed(0)+`
                             
=== Sparepart ===
Uang Tunai    : Rp -
Voucher       : -
Total Uang    : Rp -
                             
TOTAL UANG KESELURUHAN : Rp `+final.toFixed(0)+``)
    }
    if (message.body === '/lhm' || message.body === "/Lhm" && message.isGroupMsg === false) {
        await client.sendText(message.from, `Gunakan Rumus *#lhm/nama-site/totalmogas/sparepart/penyetor*

*Jika, salah satu dari list tidak ada, harap dikosongi saja
Contoh : #lhm/Melis/200.000/0/Asmaraloka`)
    }
    if (arr[0] === `#lhm` || arr[0] === `#Lhm` && message.isGroupMsg === false) {
        console.log('Hari Senin Tiba!!')
        //tanggal bahasa Indonesia
        let hari = ["Ahad", 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        let bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus',
        'September', 'Oktober', 'November', 'Desember'];
    
        let tanggal = new Date().getDate();
        let _hari = new Date().getDay();
        let _bulan = new Date().getMonth();
        let _tahun= new Date().getFullYear();
    
        let day = hari[_hari];
        let month = bulan[_bulan]; 
    
        let tahun = (_tahun < 1000) ? _tahun + 1900 : _tahun;
        //site
        const namasite = arr[1];
        const mogas = arr[2];
        const sparepart = arr[3];
        const penyetor = arr[4];
        //code
        if(day == "Senin"){
            let t1 = tanggal - 1;
            let t2 = tanggal - 2;
            let t3 = tanggal - 3;
            let asd = [t3, t2, t1];
            asd.splice(1, 1);
            let d = asd.toString();
            let a = d.replace(',', '-')
            let hasiltgl = a+` `+month+` `+tahun;
            await client.sendText(message.from, `Nama Site : *` +namasite+`*

Tanggal : ` +hasiltgl+`
Mogas : ` +mogas+`
Sparepart : `+sparepart+`
Penyetor : ` +penyetor+``);
        }
        if(day !== "Senin"){
            console.log('Transfer Seperti Biasa!')
            let t1 = tanggal - 1;
            let hasiltgl =  t1+` `+month+` `+tahun;
            client
            .sendText(message.from, `Nama Site : *` +namasite+`*

Tanggal : ` +hasiltgl+`
Mogas : ` +mogas+`
Sparepart : `+sparepart+`
Penyetor : ` +penyetor+``);
        }
    
       }
  });
}

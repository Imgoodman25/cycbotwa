// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require("venom-bot");

venom
  .create({
    session: "session-name", //name of session
    multidevice: true, // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    const nama = message.notifyName;
    //laip
    const angka = message.body;
    let arr = angka.split("/");
    // console.log('asd')
    if (
      message.body === "Hai" ||
      (message.body === "hai" && message.isGroupMsg === false)
    ) {
      //   console.log('asd2')
      client.sendText(
        message.from,
        `Hai ` +
          nama +
          `
Selamat Datang di *Goodman Bot*

*_____Layanan_____*

*/laip* Laporan Akhir Indostation (BETA)
*/lhm* Laporan Harian Mogas (BETA)

Tutorial selengkapnya : https://imgoodman25.blogspot.com/2022/11/cara-menggunakan-bot-wa-goodman-bot.html`
      );
    }

    if (
      message.body === "/laip" ||
      (message.body === "/Laip" && message.isGroupMsg === false)
    ) {
      client.sendText(message.from, `Gunakan Rumus: *#laip/hasil1/hasil2*`);
    }
    if (
      arr[0] === `#laip` ||
      (arr[0] === `#Laip` && message.isGroupMsg === false)
    ) {
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
      let hari = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      let bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      let tanggal = new Date().getDate();
      let _hari = new Date().getDay();
      let _bulan = new Date().getMonth();
      let _tahun = new Date().getFullYear();

      let day = hari[_hari];
      let month = bulan[_bulan];

      let tahun = _tahun < 1000 ? _tahun + 1900 : _tahun;
      client.sendText(
        message.from,
        `` +
          day +
          `, ` +
          tanggal +
          ` ` +
          month +
          ` ` +
          tahun +
          `
=== MOGAS ===

Harga per liter: ` +
          rp +
          `

=== Shift 01 === 
Liter keluar : ` +
          shift1.toFixed(2) +
          `
Uang Tunai   : Rp ` +
          harga1.toFixed(0) +
          `
Voucher      : -
Total Uang   : Rp ` +
          harga1.toFixed(0) +
          `
                             
=== Shift 02 ===
Liter keluar : ` +
          shift2.toFixed(2) +
          `
Uang Tunai   : Rp ` +
          harga2.toFixed(0) +
          `
Voucher      : -
Total Uang   : Rp ` +
          harga2.toFixed(0) +
          `
                             
TOTAL LITER KELUAR  : ` +
          totalLiter.toFixed(2) +
          ` Liter
TOTAL UANG MOGAS    : Rp ` +
          final.toFixed(0) +
          `
                             
=== Sparepart ===
Uang Tunai    : Rp -
Voucher       : -
Total Uang    : Rp -
                             
TOTAL UANG KESELURUHAN : Rp ` +
          final.toFixed(0) +
          ``
      );
    }
    if (
      message.body === "/lhm" ||
      (message.body === "/Lhm" && message.isGroupMsg === false)
    ) {
      client.sendText(
        message.from,
        `Gunakan Rumus *#lhm/nama-site/totalmogas/sparepart/penyetor*

*Jika, salah satu dari list tidak ada, harap dikosongi saja
Contoh : #lhm/Melis/200.000/0/Asmaraloka`
      );
    }
    if (
      arr[0] === `#lhm` ||
      (arr[0] === `#Lhm` && message.isGroupMsg === false)
    ) {
      console.log("asdisis");
      //tanggal bahasa Indonesia
      let hari = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      let bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      let tanggal = new Date().getDate();
      let _hari = new Date().getDay();
      let _bulan = new Date().getMonth();
      let _tahun = new Date().getFullYear();

      let day = hari[_hari];
      let month = bulan[_bulan];

      let tahun = _tahun < 1000 ? _tahun + 1900 : _tahun;
      //site
      const namasite = arr[1];
      const mogas = arr[2];
      const sparepart = arr[3];
      const penyetor = arr[4];
      //code
      if (day == "Senin") {
        let t1 = tanggal - 1;
        let t2 = tanggal - 2;
        let t3 = tanggal - 3;
        let asd = [t3, t2, t1];
        asd.splice(1, 1);
        let d = asd.toString();
        let a = d.replace(",", "-");
        let hasiltgl = a + ` ` + month + ` ` + tahun;
        client.sendText(
          message.from,
          `Nama Site : *` +
            namasite +
            `*

Tanggal : ` +
            hasiltgl +
            `
Mogas : ` +
            mogas +
            `
Sparepart : ` +
            sparepart +
            `
Penyetor : ` +
            penyetor +
            ``
        );
      }
      if (day !== "Senin") {
        console.log("asdka");
        let t1 = tanggal - 1;
        let hasiltgl = t1 + ` ` + month + ` ` + tahun;
        client.sendText(
          message.from,
          `Nama Site : *` +
            namasite +
            `*

Tanggal : ` +
            hasiltgl +
            `
Mogas : ` +
            mogas +
            `
Sparepart : ` +
            sparepart +
            `
Penyetor : ` +
            penyetor +
            ``
        );
      }
    }
  });
}

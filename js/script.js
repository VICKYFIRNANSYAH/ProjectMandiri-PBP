// Buka undangan dan kontrol audio
const cover = document.getElementById("cover");
const btnBuka = document.getElementById("btn-buka");
const btnMusik = document.getElementById("btn-musik");
const musik = document.getElementById("musik");
let musikJalan = false;

btnBuka.addEventListener("click", () => {
    cover.classList.add("d-none");                       // sembunyikan cover
    document.body.classList.remove("overflow-hidden");   // scroll aktif lagi
    btnMusik.classList.remove("d-none");                 // munculkan tombol musik
    putarMusik();
});

btnMusik.addEventListener("click", () => {
    if (musikJalan) {
        musik.pause();
    } else {
        putarMusik();
    }
});

musik.addEventListener("play", () => {
    musikJalan = true;
    btnMusik.innerHTML = '<i class="bi bi-pause-fill fs-5"></i>';
});

musik.addEventListener("pause", () => {
    musikJalan = false;
    btnMusik.innerHTML = '<i class="bi bi-play-fill fs-5"></i>';
});

function putarMusik() {
    const playPromise = musik.play();
    if (playPromise !== undefined) {
        playPromise.catch((err) => {
            console.log("Audio play dicegah atau menunggu interaksi:", err);
        });
    }
}

// Hitung mundur tanggal pernikahan
const tanggalAcara = new Date(2026, 11, 12, 8, 0); // bulan 0-11, jadi 11 = Desember

function hitungMundur() {
    const selisih = tanggalAcara - new Date(); // dalam milidetik

    if (selisih <= 0) {
        return;
    }

    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisih / (1000 * 60 * 60)) % 24);
    const menit = Math.floor((selisih / (1000 * 60)) % 60);
    const detik = Math.floor((selisih / 1000) % 60);

    document.getElementById("hari").textContent = hari;
    document.getElementById("jam").textContent = jam;
    document.getElementById("menit").textContent = menit;
    document.getElementById("detik").textContent = detik;
}

hitungMundur();
setInterval(hitungMundur, 1000);

// Salin nomor rekening atau kode pembayaran digital
function salinRekening(label, nomor) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(nomor);
    }
    const info = label.toUpperCase() === "NMID" ? "NMID: " : "Nomor rekening " + label + ": ";
    alert(info + nomor + "\n(Berhasil disalin ke clipboard)");
}

// Data ucapan dan Buku Tamu
// Array of object berisi ucapan tamu
let daftarUcapan = [
    { nama: "Fikri Ramadhan", pesan: "Barakallahu lakum! Semoga sakinah mawaddah warahmah." },
    { nama: "Anisa Putri", pesan: "Selamat Vicky dan Reina, bahagia selalu!" }
];

const formRsvp = document.getElementById("form-rsvp");
const wadahUcapan = document.getElementById("daftar-ucapan");

function tampilkanUcapan() {
    wadahUcapan.innerHTML = "";

    daftarUcapan.forEach(item => {
        const kartu = document.createElement("div");
        kartu.className = "card card-body mb-2 shadow-sm border-0 kartu-ucapan";

        const nama = document.createElement("strong");
        nama.className = "text-dark d-block mb-1";
        nama.textContent = item.nama;

        const pesan = document.createElement("p");
        pesan.className = "mb-0 text-secondary small";
        pesan.textContent = item.pesan;

        kartu.append(nama, pesan);
        wadahUcapan.appendChild(kartu);
    });

    document.getElementById("jumlah").textContent = daftarUcapan.length;
}

formRsvp.addEventListener("submit", (e) => {
    e.preventDefault(); // cegah halaman reload

    const nama = document.getElementById("nama").value.trim();
    const pesan = document.getElementById("pesan").value.trim();

    // Validasi: nama dan pesan wajib diisi
    if (nama === "" || pesan === "") {
        alert("Nama dan pesan wajib diisi!");
        return;
    }

    daftarUcapan.unshift({ nama: nama, pesan: pesan }); // tambah di paling atas
    tampilkanUcapan();
    formRsvp.reset();
    alert("Terima kasih, " + nama + "! Doa restu Anda telah terkirim.");
});

tampilkanUcapan();

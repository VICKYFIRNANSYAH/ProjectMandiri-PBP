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

// Data ucapan dan RSVP
// Array of object berisi ucapan tamu
let daftarUcapan = [
    { nama: "Fikri Ramadhan", status: "Hadir", pesan: "Barakallahu lakum! Semoga sakinah mawaddah warahmah." },
    { nama: "Anisa Putri", status: "Hadir", pesan: "Selamat Vicky dan Reina, bahagia selalu!" },
    { nama: "Rian Pratama", status: "Masih Ragu", pesan: "Selamat bro! Insya Allah diusahakan hadir." }
];

const formRsvp = document.getElementById("form-rsvp");
const wadahUcapan = document.getElementById("daftar-ucapan");

function tampilkanUcapan() {
    wadahUcapan.innerHTML = "";

    daftarUcapan.forEach(item => {
        const kartu = document.createElement("div");
        kartu.className = "card card-body mb-2 shadow-sm border-0 kartu-ucapan";

        const barisAtas = document.createElement("div");
        barisAtas.className = "d-flex justify-content-between align-items-center mb-1";

        const nama = document.createElement("strong");
        nama.className = "text-dark";
        nama.textContent = item.nama;

        const status = document.createElement("span");
        let badgeClass = "bg-secondary-subtle text-secondary";
        if (item.status === "Hadir") badgeClass = "bg-success-subtle text-success";
        else if (item.status === "Masih Ragu") badgeClass = "bg-warning-subtle text-warning-emphasis";
        else if (item.status === "Tidak Hadir") badgeClass = "bg-danger-subtle text-danger";
        status.className = "badge rounded-pill " + badgeClass;
        status.textContent = item.status;

        barisAtas.append(nama, status);

        const pesan = document.createElement("p");
        pesan.className = "mb-0 text-secondary small";
        pesan.textContent = item.pesan;

        kartu.append(barisAtas, pesan);
        wadahUcapan.appendChild(kartu);
    });

    document.getElementById("jumlah").textContent = daftarUcapan.length;
}

formRsvp.addEventListener("submit", (e) => {
    e.preventDefault(); // cegah halaman reload

    const nama = document.getElementById("nama").value.trim();
    const status = document.getElementById("status").value;
    const pesan = document.getElementById("pesan").value.trim();

    // Validasi: nama dan pesan wajib diisi
    if (nama === "" || pesan === "") {
        alert("Nama dan pesan wajib diisi!");
        return;
    }

    daftarUcapan.unshift({ nama: nama, status: status, pesan: pesan }); // tambah di paling atas
    tampilkanUcapan();
    formRsvp.reset();
    alert("Terima kasih, " + nama + "! Ucapan Anda sudah ditambahkan.");
});

tampilkanUcapan();

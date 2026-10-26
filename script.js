
const comfortMessages = {
  kram: [
    "Aduh, sini kalau bisa aku bantu bikin kamu nyaman. Coba istirahat dan kompres hangat perutmu, ya. Nggak perlu maksa beraktivitas kalau lagi sakit. 💙",
    "Hari ini kita nggak perlu buru-buru, Nad. Cari posisi paling nyaman, minum sedikit air hangat, terus istirahat dulu. Semoga kramnya cepat mereda. 🫂",
    "Kalau bisa, sekarang selimut, bantal, dan posisi rebahan yang nyaman dulu. Kamu nggak harus menyelesaikan semuanya hari ini, kok. ♡"
  ],

  capek: [
    "Nggak apa-apa kalau hari ini energimu tinggal sedikit. Kamu boleh mengurangi kegiatan, istirahat, dan melanjutkan semuanya nanti. Aku dukung kamu. 💙",
    "Hari ini nggak ada lomba siapa yang paling produktif. Kalau badanmu minta istirahat, dengarkan dulu, ya, Nad.",
    "Anggap saja hari ini waktunya mengisi ulang baterai. Nggak perlu merasa bersalah cuma karena kamu butuh jeda. 🩵"
  ],

  sensitif: [
    "Kalau hari ini semuanya terasa lebih menyebalkan dari biasanya, kamu nggak perlu buru-buru memaksa diri buat baik-baik aja. Tarik napas dulu, ya. ♡",
    "Kalau kamu tiba-tiba pengen nangis, nggak apa-apa. Kamu nggak perlu menjelaskan semua perasaanmu sekarang. Pelan-pelan aja, Nad.",
    "Aku nggak akan menyuruhmu berhenti sedih atau langsung tersenyum. Kalau kamu mau cerita, aku mau dengerin. Kalau mau diam dulu, itu juga boleh. 🫂"
  ],

  manja: [
    "Mode manja hari ini resmi dibuka. Boleh minta perhatian lebih, boleh minta ditemani, dan boleh bilang kalau kamu lagi butuh peluk. ♡",
    "Sini, peluk virtual dulu yang lama. 🫂 Nggak ada nasihat panjang hari ini, cuma pengingat kalau kamu pantas diperlakukan dengan lembut.",
    "Kalau aku ada di dekatmu, mungkin aku bakal nemenin kamu rebahan dan nanya, 'Mau ditemenin atau mau istirahat dulu?' Kamu tinggal pilih, Nad. 💙"
  ]
};

const moodButtons = document.querySelectorAll(".mood-option");
const comfortButton = document.getElementById("comfortBtn");
const comfortMessage = document.getElementById("comfortMessage");
const messageBox = document.getElementById("messageBox");
const audio = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicBtn");

let selectedMood = "kram";
let lastMessageIndex = -1;

moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedMood = button.dataset.mood;

    moodButtons.forEach((item) => {
      const isActive = item === button;

      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
  });
});

comfortButton.addEventListener("click", () => {
  const messages = comfortMessages[selectedMood];

  let nextIndex = Math.floor(Math.random() * messages.length);

  // Hindari pesan yang sama dua kali berturut-turut.
  if (messages.length > 1 && nextIndex === lastMessageIndex) {
    nextIndex = (nextIndex + 1) % messages.length;
  }

  lastMessageIndex = nextIndex;

  messageBox.classList.remove("show");
  comfortButton.disabled = true;

  window.setTimeout(() => {
    comfortMessage.textContent = messages[nextIndex];
    messageBox.classList.add("show");
    comfortButton.disabled = false;
  }, 140);
});

musicButton.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicButton.textContent = "Ⅱ";
      musicButton.setAttribute("aria-label", "Jeda musik");
      musicButton.setAttribute("aria-pressed", "true");
    } catch {
      musicButton.textContent = "!";
      musicButton.setAttribute(
        "aria-label",
        "Musik belum bisa diputar"
      );
    }
  } else {
    audio.pause();
    musicButton.textContent = "▶";
    musicButton.setAttribute("aria-label", "Putar musik");
    musicButton.setAttribute("aria-pressed", "false");
  }
});

audio.addEventListener("ended", () => {
  musicButton.textContent = "▶";
  musicButton.setAttribute("aria-label", "Putar musik");
  musicButton.setAttribute("aria-pressed", "false");
});

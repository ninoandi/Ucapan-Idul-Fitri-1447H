// ===== AUDIO PLAYER DENGAN POSISI LANJUTAN =====
document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('backsound');
  const playBtn = document.getElementById('playPauseBtn');
  const volumeSlider = document.getElementById('volumeSlider');
  
  if (audio && playBtn && volumeSlider) {
    // ===== RESTORE SEMUA STATE =====
    
    // 1. Restore volume
    const savedVolume = localStorage.getItem('audioVolume');
    if (savedVolume !== null) {
      audio.volume = parseFloat(savedVolume);
      volumeSlider.value = savedVolume;
    } else {
      audio.volume = 0.5; // default
    }
    
    // 2. Restore posisi lagu (PALING PENTING)
    const savedTime = localStorage.getItem('audioTime');
    if (savedTime !== null) {
      audio.currentTime = parseFloat(savedTime);
      console.log(`⏱️ Melanjutkan lagu dari detik: ${savedTime}`);
    }
    
    // 3. Cek apakah sebelumnya sedang play
    const wasPlaying = localStorage.getItem('audioPlaying') === 'true';
    
    // Update tampilan tombol
    function updateButton(isPlaying) {
      if (isPlaying) {
        playBtn.innerHTML = '<i class="fas fa-pause"></i><span>Pause Musik</span>';
        playBtn.classList.add('playing');
      } else {
        playBtn.innerHTML = '<i class="fas fa-play"></i><span>Play Musik</span>';
        playBtn.classList.remove('playing');
      }
    }
    
    // ===== AUTOPLAY DENGAN POSISI YANG TEPAT =====
    if (wasPlaying) {
      // Coba play (mute dulu biar browser allowed)
      audio.muted = true;
      
      audio.play()
        .then(() => {
          console.log('✅ Autoplay berhasil, melanjutkan lagu');
          updateButton(true);
          
          // Unmute setelah 0.5 detik
          setTimeout(() => {
            audio.muted = false;
          }, 500);
        })
        .catch(error => {
          console.log('❌ Autoplay diblokir:', error);
          updateButton(false);
          localStorage.setItem('audioPlaying', 'false');
        });
    } else {
      updateButton(false);
    }
    
    // ===== PLAY/PAUSE BUTTON =====
    playBtn.addEventListener('click', function() {
      if (audio.paused) {
        audio.muted = false;
        audio.play()
          .then(() => {
            updateButton(true);
            localStorage.setItem('audioPlaying', 'true');
          })
          .catch(error => {
            console.log('Playback failed:', error);
            alert('Maaf, audio tidak dapat diputar. Pastikan file audio ada di folder audio/');
          });
      } else {
        audio.pause();
        updateButton(false);
        localStorage.setItem('audioPlaying', 'false');
      }
    });
    
    // ===== VOLUME CONTROL =====
    volumeSlider.addEventListener('input', function() {
      audio.volume = this.value;
      localStorage.setItem('audioVolume', this.value);
    });
    
    // ===== AUTO-SAVE POSISI LAGU SETIAP DETIK =====
    // Ini penting agar posisi selalu terupdate
    setInterval(() => {
      if (!audio.paused && audio.currentTime > 0) {
        localStorage.setItem('audioTime', audio.currentTime);
        // Optional: tampilkan di console untuk debugging
        // console.log('Menyimpan posisi:', audio.currentTime);
      }
    }, 1000);
    
    // ===== SAVE SAAT AUDIO DI-PAUSE =====
    audio.addEventListener('pause', function() {
      localStorage.setItem('audioTime', audio.currentTime);
    });
    
    // ===== ERROR HANDLING =====
    audio.addEventListener('error', function() {
      console.log('Audio file not found');
      const volumeControl = document.querySelector('.volume-control');
      if (volumeControl && !document.querySelector('.audio-error')) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'audio-error';
        errorDiv.style.cssText = 'font-size:0.7rem; color:#ff9999; margin-top:5px;';
        errorDiv.innerHTML = '⚠️ File audio tidak ditemukan';
        volumeControl.appendChild(errorDiv);
      }
    });
    
    // ===== DEBUG INFO =====
    console.log('🎵 Audio player siap dengan fitur lanjut lagu');
    if (savedTime) {
      console.log(`📌 Lagu akan lanjut dari menit ${Math.floor(savedTime/60)}:${Math.floor(savedTime%60).toString().padStart(2,'0')}`);
    }
  }
});

// ===== UCAPAN PAGE FUNCTIONS =====
function showUcapan(element) {
  const ucapan = element.getAttribute('data-ucapan');
  const selectedDiv = document.getElementById('selectedUcapan');
  
  if (selectedDiv) {
    selectedDiv.innerHTML = `<p><i class="fas fa-quote-right"></i> ${ucapan} <i class="fas fa-quote-left"></i></p>`;
    selectedDiv.style.background = 'rgba(212, 175, 55, 0.2)';
    
    // Add animation
    selectedDiv.style.animation = 'fadeIn 0.5s';
    setTimeout(() => {
      selectedDiv.style.animation = '';
    }, 500);
  }
}

function sendCustomMessage() {
  const customMessage = document.getElementById('customMessage');
  const selectedDiv = document.getElementById('selectedUcapan');
  
  if (customMessage && selectedDiv) {
    if (customMessage.value.trim() !== '') {
      selectedDiv.innerHTML = `<p><i class="fas fa-pen"></i> ${customMessage.value}</p>`;
      selectedDiv.style.background = 'rgba(44, 90, 44, 0.15)';
      
      // Clear textarea
      customMessage.value = '';
      
      // Show success notification
      alert('Ucapan berhasil disimpan!');
    } else {
      alert('Silakan tulis ucapan terlebih dahulu');
    }
  }
}

// Add fadeIn animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ===== AUTO UPDATE YEAR =====
function updateYear() {
  const dateElement = document.querySelector('.date');
  if (dateElement) {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.innerHTML = `📅 ${currentDate.toLocaleDateString('id-ID', options)}`;
  }
}

// Uncomment to enable auto year update
// updateYear();

// ===== LOG CONSOLE =====
console.log('🌙 Eid Mubarak! Website Islami dengan 3 halaman ✨');
console.log('🕌 Selamat Hari Raya Idul Fitri 1447 H');
console.log('🤲 Taqabbalallahu minna wa minkum');
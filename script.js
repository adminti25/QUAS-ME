document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("card");
  const flipArrow = document.getElementById("flip-arrow");
  const acceptCheckbox = document.getElementById("acceptTerms");
  const btnContinuar = document.getElementById("btnContinuar");

  // Wallet Buttons
  const walletButtons = document.getElementById("wallet-buttons");
  const btnGoogleWallet = document.getElementById("btnGoogleWallet");
  const btnAppleWallet = document.getElementById("btnAppleWallet");

  // FLIP TARJETA
  if (flipArrow) {
    flipArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      card.classList.toggle("flipped");
    });
  }

  // CHECKBOX
  acceptCheckbox.addEventListener("change", () => {
    if (acceptCheckbox.checked) {
      btnContinuar.classList.add("enabled");
      btnContinuar.disabled = false;
    } else {
      btnContinuar.classList.remove("enabled");
      btnContinuar.disabled = true;
    }
  });

  // MOSTRAR BOTONES WALLET (Siempre visibles)
  function mostrarBotonesWallet() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && 'ontouchend' in document);
    const isAndroid = /Android/.test(navigator.userAgent);

    if (walletButtons) {
      walletButtons.style.display = "flex";

      if (isIOS) {
        btnAppleWallet.style.display = "block";
        btnGoogleWallet.style.display = "none";
      } else if (isAndroid) {
        btnGoogleWallet.style.display = "block";
        btnAppleWallet.style.display = "none";
      } else {
        btnGoogleWallet.style.display = "block";
        btnAppleWallet.style.display = "block";
      }
    }
  }

  mostrarBotonesWallet();   // Se muestran desde el inicio

  // CONTINUAR
  btnContinuar.addEventListener("click", async (e) => {
    e.preventDefault();
    // ... (tu lógica de envío actual) ...
    alert("Registro guardado correctamente!");
  });

  // MODAL (mantener tu código actual)
  const modal = document.getElementById("termsModal");
  const modalBody = document.getElementById("modal-body");
  const modalDownloadContainer = document.getElementById("modal-download-container");
  const btnDescargarDesdeModal = document.getElementById("btnDescargarDesdeModal");
  const closeModal = document.querySelector(".close-modal");

  document.querySelectorAll("#openTerms, #openPrivacy, #footerTerms, #footerPrivacy").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      modalBody.innerHTML = '<iframe src="aviso.html" width="100%" height="520px" style="border:none;"></iframe>';
      modalDownloadContainer.style.display = "none";
      modal.style.display = "block";
    });
  });

  closeModal.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});

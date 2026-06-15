document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("card");
  const flipArrow = document.getElementById("flip-arrow");
  const acceptCheckbox = document.getElementById("acceptTerms");
  const btnContinuar = document.getElementById("btnContinuar");

  // Wallet Buttons
  const walletButtons = document.getElementById("wallet-buttons");
  const btnGoogleWallet = document.getElementById("btnGoogleWallet");
  const btnAppleWallet = document.getElementById("btnAppleWallet");

  // ==================== FLIP TARJETA ====================
  if (flipArrow) {
    flipArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      card.classList.toggle("flipped");
    });
  }

  // ==================== CHECKBOX ====================
  acceptCheckbox.addEventListener("change", () => {
    if (acceptCheckbox.checked) {
      btnContinuar.classList.add("enabled");
      btnContinuar.disabled = false;
    } else {
      btnContinuar.classList.remove("enabled");
      btnContinuar.disabled = true;
    }
  });

  // ==================== BOTONES WALLET - ACCIONES ====================
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

  // Mostrar botones desde el inicio
  mostrarBotonesWallet();

  // Acción al hacer clic en Google Wallet
  if (btnGoogleWallet) {
    btnGoogleWallet.addEventListener("click", () => {
      alert("🔄 Función Google Wallet en desarrollo.\n\nEn la versión final se agregará el pase real.");
      // Aquí iría el código real para Google Wallet API
    });
  }

  // Acción al hacer clic en Apple Wallet
  if (btnAppleWallet) {
    btnAppleWallet.addEventListener("click", () => {
      alert("🍎 Función Apple Wallet en desarrollo.\n\nEn la versión final se descargará el archivo .pkpass.");
      // Aquí iría la descarga del archivo .pkpass
    });
  }

  // ==================== BOTÓN CONTINUAR ====================
  btnContinuar.addEventListener("click", async (e) => {
    e.preventDefault();

    const empresa = document.getElementById("empresa").value.trim();
    const empleado = document.getElementById("empleado").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();

    if (!empresa || !empleado || !telefono || !correo) {
      alert("Por favor completa todos los campos.");
      return;
    }

    alert("¡Registro guardado correctamente!");
    // Aquí puedes mantener tu fetch al backend si lo deseas
  });

  // ==================== MODAL (mínimo) ====================
  const closeModal = document.querySelector(".close-modal");
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      document.getElementById("termsModal").style.display = "none";
    });
  }
});

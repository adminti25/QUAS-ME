document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("card");
  const flipArrow = document.getElementById("flip-arrow");
  const acceptCheckbox = document.getElementById("acceptTerms");
  const btnContinuar = document.getElementById("btnContinuar");

  // Elementos Wallet
  const walletButtons = document.getElementById("wallet-buttons");
  const btnGoogleWallet = document.getElementById("btnGoogleWallet");
  const btnAppleWallet = document.getElementById("btnAppleWallet");

  // ==================== FLIP DE LA TARJETA ====================
  if (flipArrow) {
    flipArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      card.classList.toggle("flipped");
    });
  }

  // ==================== CHECKBOX TÉRMINOS ====================
  acceptCheckbox.addEventListener("change", () => {
    if (acceptCheckbox.checked) {
      btnContinuar.classList.add("enabled");
      btnContinuar.disabled = false;
    } else {
      btnContinuar.classList.remove("enabled");
      btnContinuar.disabled = true;
    }
  });

  // ==================== MOSTRAR BOTONES WALLET SIEMPRE ====================
  function mostrarBotonesWallet() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && 'ontouchend' in document);
    
    const isAndroid = /Android/.test(navigator.userAgent);

    if (walletButtons) {
      walletButtons.style.display = "flex";

      if (isIOS) {
        if (btnAppleWallet) btnAppleWallet.style.display = "block";
        if (btnGoogleWallet) btnGoogleWallet.style.display = "none";
      } else if (isAndroid) {
        if (btnGoogleWallet) btnGoogleWallet.style.display = "block";
        if (btnAppleWallet) btnAppleWallet.style.display = "none";
      } else {
        // Desktop o otros
        if (btnGoogleWallet) btnGoogleWallet.style.display = "block";
        if (btnAppleWallet) btnAppleWallet.style.display = "block";
      }
    }
  }

  // Mostrar los botones Wallet al cargar la página
  mostrarBotonesWallet();

  // ==================== CONTINUAR + ENVIAR A FASTAPI ====================
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

    const datosMembresia = { empresa, empleado, telefono, correo };
    const urlBackend = "https://frown-uneven-uptake.ngrok-free.dev/membresia/registro";

    try {
      const respuesta = await fetch(urlBackend, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(datosMembresia)
      });

      if (respuesta.ok) {
        alert("¡Registro guardado correctamente!");
      } else {
        alert("Error al registrar.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error de conexión con el servidor.");
    }
  });

  // ==================== MODAL ====================
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

  // Cerrar modal
  closeModal.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});

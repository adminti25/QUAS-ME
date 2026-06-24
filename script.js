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

  // ==================== BOTONES WALLET - DESCARGAR IMÁGENES ====================
  function descargarTarjetas() {
    const empresa = document.getElementById("empresa").value.trim() || "Empresa";
    const empleado = document.getElementById("empleado").value.trim() || "Empleado";

    // Abre tme.html para que descargue las imágenes automáticamente
    const url = `tme.html?empresa=${encodeURIComponent(empresa)}&empleado=${encodeURIComponent(empleado)}`;
    window.open(url, "_blank");
  }

  // Acción Google Wallet
  if (btnGoogleWallet) {
    btnGoogleWallet.addEventListener("click", () => {
      alert("📲 Descargando tarjeta para Google Wallet...\n\nSe abrirá la membresía en una nueva pestaña.");
      descargarTarjetas();
    });
  }

  // Acción Apple Wallet
  if (btnAppleWallet) {
    btnAppleWallet.addEventListener("click", () => {
      alert("📲 Descargando tarjeta para Apple Wallet...\n\nSe abrirá la membresía en una nueva pestaña.");
      descargarTarjetas();
    });
  }

  // Mostrar los botones Wallet desde el inicio
  if (walletButtons) {
    walletButtons.style.display = "flex";
  }

  // ==================== CONTINUAR ====================
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

    // Aquí puedes mantener tu código de envío al backend si lo deseas
    alert("¡Registro guardado correctamente!");
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

  if (closeModal) {
    closeModal.addEventListener("click", () => modal.style.display = "none");
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});
  // ==================== GOOGLE WALLET API ====================
  const btnGoogleWallet = document.getElementById("btnGoogleWallet");

  if (btnGoogleWallet) {
    btnGoogleWallet.addEventListener("click", () => {
      addToGoogleWallet();
    });
  }

  function addToGoogleWallet() {
    // Datos de ejemplo (cámbialos por los reales del usuario)
    const passData = {
      employeeName: document.getElementById("empleado").value.trim() || "Empleado",
      company: document.getElementById("empresa").value.trim() || "Empresa",
      membershipId: "MEM-" + Math.floor(Math.random() * 100000)
    };

    alert(`🔄 Intentando agregar a Google Wallet...\n\nNombre: ${passData.employeeName}\nEmpresa: ${passData.company}`);

    // Código real de Google Wallet (requiere backend para generar JWT)
    // Ejemplo básico:
    // const jwt = "TU_JWT_FIRMADO_AQUÍ";
    // window.location.href = `https://pay.google.com/gp/v/save/${jwt}`;
    
    console.log("Datos para Google Wallet:", passData);
  }

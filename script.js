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

  // ==================== FUNCIÓN PARA MOSTRAR BOTONES WALLET ====================
  function mostrarBotonesWallet() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && 'ontouchend' in document);
    
    const isAndroid = /Android/.test(navigator.userAgent);

    if (walletButtons) {
      walletButtons.style.display = "flex";

      if (isIOS) {
        // Solo Apple Wallet en iOS
        if (btnAppleWallet) btnAppleWallet.style.display = "block";
        if (btnGoogleWallet) btnGoogleWallet.style.display = "none";
      } else if (isAndroid) {
        // Solo Google Wallet en Android
        if (btnGoogleWallet) btnGoogleWallet.style.display = "block";
        if (btnAppleWallet) btnAppleWallet.style.display = "none";
      } else {
        // En desktop mostrar ambos
        if (btnGoogleWallet) btnGoogleWallet.style.display = "block";
        if (btnAppleWallet) btnAppleWallet.style.display = "block";
      }
    }
  }

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

    // ←←← ACTUALIZA ESTA URL CUANDO REINICIES NGROK ←←←
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

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        console.log("Registro exitoso:", resultado);
        alert("¡Registro guardado correctamente!\n\nAhora puedes agregar tu membresía a Wallet.");
        mostrarBotonesWallet();   // Mostrar botones Wallet
      } else {
        alert("Error del servidor: " + (resultado.detail || "No se pudo registrar."));
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error de conexión con el servidor.\nVerifica que Ngrok esté activo.");
    }
  });

  // ==================== MODAL (TÉRMINOS + TARJETA) ====================
  const modal = document.getElementById("termsModal");
  const modalBody = document.getElementById("modal-body");
  const modalDownloadContainer = document.getElementById("modal-download-container");
  const btnDescargarDesdeModal = document.getElementById("btnDescargarDesdeModal");
  const closeModal = document.querySelector(".close-modal");

  // Abrir Aviso de Privacidad
  document.querySelectorAll("#openTerms, #openPrivacy, #footerTerms, #footerPrivacy").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      modalBody.innerHTML = '<iframe src="aviso.html" width="100%" height="520px" style="border:none;"></iframe>';
      modalDownloadContainer.style.display = "none";
      modal.style.display = "block";
    });
  });

  // Abrir Tarjeta Empresarial
  const btnVerTarjeta = document.getElementById("btnVerTarjeta"); // Si aún lo tienes
  if (btnVerTarjeta) {
    btnVerTarjeta.addEventListener("click", () => {
      const empresa = document.getElementById("empresa").value.trim() || "Nombre de la Empresa";
      const empleado = document.getElementById("empleado").value.trim() || "Nombre del Empleado";

      modalBody.innerHTML = `
        <iframe id="tarjetaFrame" 
                src="tme.html?empresa=${encodeURIComponent(empresa)}&empleado=${encodeURIComponent(empleado)}" 
                width="100%" height="580px" style="border:none; border-radius:12px;">
        </iframe>
      `;
      modalDownloadContainer.style.display = "block";
      modal.style.display = "block";
    });
  }

  // Descargar desde modal
  btnDescargarDesdeModal.addEventListener("click", () => {
    const iframe = document.getElementById("tarjetaFrame");
    if (iframe && iframe.contentWindow && typeof iframe.contentWindow.descargarComoJPG === "function") {
      iframe.contentWindow.descargarComoJPG();
    } else {
      alert("Espera un momento mientras carga la tarjeta...");
    }
  });

  // Cerrar modal
  closeModal.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});

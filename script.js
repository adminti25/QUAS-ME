document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("card");
  const flipArrow = document.getElementById("flip-arrow");
  const acceptCheckbox = document.getElementById("acceptTerms");
  const btnContinuar = document.getElementById("btnContinuar");
  const btnVerTarjeta = document.getElementById("btnVerTarjeta");

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

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        console.log("Registro exitoso:", resultado);
        alert("¡Registro guardado correctamente!\n\nAhora puedes ver tu tarjeta.");
        
        if (btnVerTarjeta) btnVerTarjeta.disabled = false;
      } else {
        console.error("Error del servidor:", resultado);
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

  document.querySelectorAll("#openTerms, #openPrivacy, #footerPrivacy, #footerTerms").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      modalBody.innerHTML = '<iframe src="aviso.html" width="100%" height="520px" style="border:none;"></iframe>';
      modalDownloadContainer.style.display = "none";
      modal.style.display = "block";
    });
  });

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

  btnDescargarDesdeModal.addEventListener("click", () => {
    const iframe = document.getElementById("tarjetaFrame");
    if (iframe && iframe.contentWindow && typeof iframe.contentWindow.descargarComoJPG === "function") {
      iframe.contentWindow.descargarComoJPG();
    } else {
      alert("Espera un momento mientras carga la tarjeta...");
    }
  });

  closeModal.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // ==================== GOOGLE WALLET API ====================
  const btnGoogleWallet = document.getElementById("btnGoogleWallet");

  if (btnGoogleWallet) {
    btnGoogleWallet.addEventListener("click", () => {
      addToGoogleWallet();
    });
  }

  function addToGoogleWallet() {
    const employeeName = document.getElementById("empleado").value.trim() || "Empleado";
    const company = document.getElementById("empresa").value.trim() || "Empresa";

    const passObject = {
      "id": `3388000000023165612.${Date.now()}`,
      "classId": `3388000000023165612.membership-class`,
      "state": "active",
      "barcode": {
        "type": "QR_CODE",
        "value": "MEM-" + Date.now()
      },
      "textModulesData": [
        { "header": "Empleado", "body": employeeName },
        { "header": "Empresa", "body": company }
      ]
    };

    alert(`🔄 Preparando pase para Google Wallet...\n\nEmpleado: ${employeeName}\nEmpresa: ${company}`);
    
    console.log("Pass Object para Google Wallet:", passObject);
    
    // En producción aquí iría la generación del JWT usando tu archivo JSON
  }
});

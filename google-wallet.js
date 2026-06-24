// google-wallet.js
async function addToGoogleWallet() {
  const employeeName = document.getElementById("empleado").value.trim() || "Empleado";
  const company = document.getElementById("empresa").value.trim() || "Empresa";

  // Datos del pase
  const passObject = {
    "id": `${YOUR_ISSUER_ID}.${Date.now()}`,   // Reemplaza YOUR_ISSUER_ID
    "classId": `${YOUR_ISSUER_ID}.membership-class`, // Reemplaza
    "state": "active",
    "barcode": {
      "type": "QR_CODE",
      "value": "MEM-" + Date.now()
    },
    "textModulesData": [
      {
        "header": "Empleado",
        "body": employeeName
      },
      {
        "header": "Empresa",
        "body": company
      }
    ]
  };

  console.log("Pass Object:", passObject);

  alert("🔄 Generando pase para Google Wallet...\nEmpleado: " + employeeName);

  // Aquí iría el código real de generación de JWT (necesita backend)
}

// Exponer para usarlo desde HTML
window.addToGoogleWallet = addToGoogleWallet;

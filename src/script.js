async function fetchSensorData() {
  try {
    const res = await fetch("/api/lectura-actual"); // Ajusta si tu API es diferente
    const data = await res.json();

    document.getElementById("mq135-value").textContent = data.mq135 ?? "N/A";
    document.getElementById("co2-value").textContent = data.co2 ?? "N/A";
    document.getElementById("tvoc-value").textContent = data.tvoc ?? "N/A";
    document.getElementById("last-update").textContent = new Date().toLocaleTimeString();
  } catch (err) {
    console.error("Error al obtener datos", err);
  }
}

// Inicial y cada 10 segundos
fetchSensorData();
setInterval(fetchSensorData, 10000);

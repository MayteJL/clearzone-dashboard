console.log("JS cargado");

async function fetchSensorData() {
  try {
    const res = await fetch("https://clearzoneapi.onrender.com/ver");
    const data = await res.json();

    console.log("Datos recibidos:", data);

    let mq135 = data.find(d => d.tipo_sensor === "MQ135");
    let co2 = data.find(d => d.tipo_sensor === "CO2");
    let tvoc = data.find(d => d.tipo_sensor === "TVOC");

    document.getElementById("mq135-value").textContent = mq135?.valor ?? "N/A";
    document.getElementById("co2-value").textContent = co2?.valor ?? "N/A";
    document.getElementById("tvoc-value").textContent = tvoc?.valor ?? "N/A";
    document.getElementById("last-update").textContent = new Date().toLocaleTimeString();
  } catch (err) {
    console.error("Error al obtener datos:", err);
  }
}

// Ejecutar al cargar y luego cada 10 segundos
fetchSensorData();
setInterval(fetchSensorData, 10000);
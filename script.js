async function obtenerDatos() {
  try {
    const response = await fetch("https://clearzoneapi.onrender.com/datos");
    const data = await response.json();
    const ultimo = data[data.length - 1];

    // Muestra los datos en el dashboard
    document.getElementById("mq135").textContent = ultimo.mq135;
    document.getElementById("co2").textContent = ultimo.co2 + " ppm";
    document.getElementById("tvoc").textContent = ultimo.tvoc + " ppb";
    document.getElementById("fecha").textContent = new Date(ultimo.fecha).toLocaleString();

    // Actualiza gráficos si quieres
    labels.push(new Date(ultimo.fecha).toLocaleTimeString());
    mq135Data.push(ultimo.mq135);

    if (labels.length > 15) {
      labels.shift();
      mq135Data.shift();
    }
    mq135Chart.update();

    // ⚠️ Alerta por niveles altos de humo
    if (ultimo.mq135 > 300 || ultimo.co2 > 1000 || ultimo.tvoc > 300) {
      alert("⚠️ ¡Niveles peligrosos detectados!");
    }

  } catch (e) {
    console.error("Error obteniendo datos:", e);
  }
}

async function loadData() {
  try {
    const response = await fetch("https://api.example.com/datos"); // tu endpoint real
    const data = await response.json();

    document.getElementById("mq135").textContent = data.mq135;
    document.getElementById("co2").textContent = data.co2;
    document.getElementById("tvoc").textContent = data.tvoc;
    document.getElementById("last-reading").textContent = new Date(data.fecha).toLocaleString();

    // Verifica alerta
    if (data.mq135 > 50) {
      document.getElementById("alert").hidden = false;
    } else {
      document.getElementById("alert").hidden = true;
    }

    // Aquí podrías actualizar gráficas con Chart.js
  } catch (error) {
    console.error("Error cargando datos:", error);
  }
}

// Llama a la función al cargar la página
window.onload = loadData;

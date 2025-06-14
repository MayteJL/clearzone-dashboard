console.log("JS cargado"); // Asegúrate de que esta línea esté al inicio.

async function fetchSensorData() {
    try {
        // VERIFICA ESTA LÍNEA CRÍTICA
        const res = await fetch("https://clearzoneapi.onrender.com/ver");
        const data = await res.json();

        console.log("Datos recibidos:", data); // Esto debería mostrar el JSON de tu API

        // Asegurarse de que data sea un array y no esté vacío
        if (Array.isArray(data) && data.length > 0) {
            const ultimaLectura = data[data.length - 1];

            document.getElementById("mq135-value").textContent = ultimaLectura.mq135 ?? "N/A";
            document.getElementById("co2-value").textContent = ultimaLectura.co2 ?? "N/A";
            document.getElementById("tvoc-value").textContent = ultimaLectura.tvoc ?? "N/A";

            let fechaDisplay = "N/A";
            if (ultimaLectura.fecha) {
                if (typeof ultimaLectura.fecha === 'string') {
                    const fechaObj = new Date(ultimaLectura.fecha);
                    if (!isNaN(fechaObj.getTime())) {
                        fechaDisplay = fechaObj.toLocaleString();
                    }
                } else if (typeof ultimaLectura.fecha === 'object' && ultimaLectura.fecha.seconds) {
                    const timestampInMs = ultimaLectura.fecha.seconds * 1000 + ultimaLectura.fecha.nanoseconds / 1_000_000;
                    const fechaObj = new Date(timestampInMs);
                     if (!isNaN(fechaObj.getTime())) {
                        fechaDisplay = fechaObj.toLocaleString();
                    }
                }
            }
            document.getElementById("last-update").textContent = fechaDisplay;

        } else {
            console.warn("No se recibieron datos o el formato no es el esperado.");
            document.getElementById("mq135-value").textContent = "N/A";
            document.getElementById("co2-value").textContent = "N/A";
            document.getElementById("tvoc-value").textContent = "N/A";
            document.getElementById("last-update").textContent = "N/A";
        }

    } catch (err) {
        console.error("Error al obtener datos:", err);
        document.getElementById("mq135-value").textContent = "Error";
        document.getElementById("co2-value").textContent = "Error";
        document.getElementById("tvoc-value").textContent = "Error";
        document.getElementById("last-update").textContent = "Error";
    }
}

fetchSensorData();
setInterval(fetchSensorData, 10000);
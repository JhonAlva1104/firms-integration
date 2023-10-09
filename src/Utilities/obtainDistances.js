import { useCallback } from 'react';

export function useObtainDistances() {
  const obtainDistances = useCallback((e, obtainDistance, setNotifications) => {
    const notifications = [];
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const contenido = e.target.result;
      const lineas = contenido.split('\n');
      const datos = [];

      lineas.forEach(function (linea) {
        const columnas = linea.split(',');
        if (columnas.length >= 2) {
          const columna1 = columnas[0].trim();
          const columna2 = columnas[1].trim();
          datos.push([columna1, columna2]);
        }
      });

      datos.push([obtainDistance[0].lat, obtainDistance[0].long]);
      console.log(datos);
      obtainDistance.forEach((item) => {
        datos.forEach((dato, index) => {
          if (index !== 0) {
            const [latitude, longitude] = dato;
            const distance = getDistanceBetweenPoints(parseFloat(latitude), parseFloat(longitude), parseFloat(item.lat), parseFloat(item.long), 'kilometers');

            if (distance <= 8) {
              notifications.push({ id: item.id, dist: distance });
            }
          }
        });
      });

      // Llamada a la función de retorno de llamada para notificar al componente
      setNotifications(notifications);
    };
    reader.readAsText(file);
  }, []);

  return obtainDistances;
}

function getDistanceBetweenPoints(latitude1, longitude1, latitude2, longitude2) {
  const theta = longitude1 - longitude2;
  const distance = 60 * 1.1515 * 1.609344 * (180 / Math.PI) * Math.acos(Math.sin(latitude1 * (Math.PI / 180)) * Math.sin(latitude2 * (Math.PI / 180)) + Math.cos(latitude1 * (Math.PI / 180)) * Math.cos(latitude2 * (Math.PI / 180)) * Math.cos(theta * (Math.PI / 180)));
  return Math.round(distance, 2);
}
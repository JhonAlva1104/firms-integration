
import "./App.css";
import { useObtainDistances } from "./Utilities/obtainDistances";
import React, { useState, useEffect } from 'react';
import { sendPostInformation } from "./Utilities/sendPostInformation";


function App() {
  const [data, setData] = useState([]);
  const [notificat, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const obtainDistances = useObtainDistances();

  useEffect(() => {
    fetch('https://7a9a-2800-e2-c380-c80-6c4d-8d88-6750-5a3a.ngrok.io/obtain/users')
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        const credentials = [];
        data.body.forEach((item) => {
          const latitud = item.Localitation.latitud;
          const longitud = item.Localitation.longuitud;
          const email = item.Email;
          const credencialesData = {
            lat: latitud,
            long: longitud,
            id: email
          };
          credentials.push(credencialesData);
        });
        setData(credentials);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []); 

  useEffect(() => {
    console.log(notificat);
  }, [notificat]);
  
  const [variablesAMostrar, setVariablesAMostrar] = useState(null);

  const mostrarVariables = () => {
    setVariablesAMostrar({
      variable1: notificat.id,
      variable2: notificat.dist,
    });
  };
  
  return (
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Importar archivo CSV</title>
      </head>
      <body className="fondo">
        <h1 className="title">Importar archivo CSV</h1>
        <div className="conteiner">
        <form action="#" method="post" enctype="multipart/form-data">
          <input 
            className="button"
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                obtainDistances(e, data, (receivedNotifications) => {
                  console.log(receivedNotifications);
                  setNotifications(receivedNotifications);
                  receivedNotifications.forEach(async (item)=>{
                    const enviarDatos = async () => {
                      try {
                        const response = await sendPostInformation({
                          url: 'https://7a9a-2800-e2-c380-c80-6c4d-8d88-6750-5a3a.ngrok.io/points', // Reemplaza con la ruta correcta de la API
                          body: {
                            id: item.id,
                            distance: parseFloat(item.dist)
                          }
                        });
                    
                        console.log('Respuesta de la solicitud POST:', response);
                        // Hacer algo con la respuesta, si es necesario
                      } catch (error) {
                        console.error('Error al enviar la solicitud POST:', error.message);
                        // Hacer algo en caso de error
                      }
                    };
                    
                    // Llama a la función para enviar los datos
                    await enviarDatos();
                  });
                });
              }
            }}
          />  
        </form>
        </div>
        {/* Mostrar las notificaciones */}
        {notificat.length > 0 && (
          <div className="notify">
            <h2 className="users">Usuarios notificados:</h2>
            {notificat.map((notification, index) => (
              <div key={index} className="table">
                <p>ID: {notification.id}</p>
                <p>Distancia: {notification.dist}</p>
              </div>
            ))}
          </div>
        )}
      </body>
    </html>
  );
}

export default App;
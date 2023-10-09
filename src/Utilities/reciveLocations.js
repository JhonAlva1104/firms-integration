export default async function reciveLocations ()
{
    // URL a la que deseas hacer la solicitud GET
    const url = 'https://e171-191-156-52-109.ngrok.io/puntos';
    console.log("Sesion iniciada",url);

    // Realiza la solicitud GET utilizando fetch
    fetch(url)
    .then(response => {
        // Verifica si la respuesta tiene un estado exitoso (código 200)
        if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.status);
        }
        // Parsea la respuesta como JSON
        console.log("Respuesta 1",response.json());
        return response.json();
    })
    .then(data => {
        // La variable 'data' contiene los datos de la respuesta
        console.log(data);
    })
    .catch(error => {
        // Captura y maneja errores en caso de que ocurran
        console.error('Ocurrió un error:', error);
    });
}
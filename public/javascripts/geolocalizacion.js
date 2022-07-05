const map = L.map('map-template').setView([20.4936715,-100.8125695], 11);//coordenadas y zoom que tendrá el mapa

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{attribution: '&copy;  Mulberry'}).addTo(map);//
//API es openstreetmap es gratis de llave
//Estilo de mapa muy similar al que ofrece google maps


map.locate({enableHighAccuracy: true});//método para la localización, usa la API del navegador para localizar mejor al usuario
map.on('locationfound', e => {
    const coords = [e.latlng.lat, e.latlng.lng];//serán las coordenadas del usuario
    const marker = L.marker(coords);//se usa la constante coords
    marker.bindPopup('¡¡Tú aquí estás!!');
    map.addLayer(marker);//se agrega el marcador
});//con este evento se pedirá acceso a la ubicación del usuario generando un nuevo marcador

//Genere el marcador principal
const marker = L.marker([20.4936715,-100.8125695]);
marker.bindPopup('Aquí puedes encontrarnos!!');
map.addLayer(marker);
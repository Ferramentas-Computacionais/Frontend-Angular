// let map: L.Map;
// const latitude = -8.0592530792899;
// const longitude = -34.90333667809201;

// function mostraMapa(pos: GeolocationPosition) {
//     console.log(pos.coords.latitude, pos.coords.longitude);
//     if (map === undefined) {
//         map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 20);
//     } else {
//         map.remove();
//         map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 20);
//     }

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);

//     L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
//         .bindPopup('Eu estou aqui!')
//         .openPopup();
//     L.marker([latitude, longitude]).addTo(map)
//         .bindPopup('A Poli esta aqui')
//         .openPopup();
// }

// function error(err: GeolocationPositionError) {
//     console.log(err);
// }

// const watchID = navigator.geolocation.watchPosition(mostraMapa, error, {
//     enableHighAccuracy: true,
//     timeout: 5000
// });

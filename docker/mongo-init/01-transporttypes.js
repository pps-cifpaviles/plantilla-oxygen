// Datos iniciales de Oxygen: tipos de transporte y su factor de emisión.
// MongoDB ejecuta este script solo la primera vez que arranca con el volumen vacío.
db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE || "oxygen");

db.transporttypes.insertMany([
  { name: "Coche", factor: 1.5 },
  { name: "Autobús", factor: 0.4 },
  { name: "Tren", factor: 0.1 },
  { name: "Bicicleta", factor: 0.05 },
  { name: "Caminar", factor: 0.06 }
]);

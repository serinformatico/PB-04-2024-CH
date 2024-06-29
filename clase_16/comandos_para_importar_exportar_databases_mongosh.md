## Comando para importar/exportar databases con Mongo Shell

1. Comando para importar una base de datos de MongoDB
   ```sh
      mongodump --uri="mongodb+srv://cluster0.4i0l5oa.mongodb.net/" -u tuUsuario -p tuPassword --db="nombreDeLaBaseDeDatos" --out="./backups" --gzip
   ```
2. Comando para importar una base de datos de MongoDB
   ```sh
      mongorestore --uri="mongodb+srv://cluster0.4i0l5oa.mongodb.net/" -u tuUsuario -p tuPassword --db="nombreDeLaBaseDeDatos" --gzip "./backups"
   ```
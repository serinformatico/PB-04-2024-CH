## Comandos de MongoDB

- En primer lugar, ingresar a la CLI de MongoDB con el siguiente comando:
  - **mongosh**
- Mostrar la lista de bases de datos
  - **show databases**
  - **show dbs**
- Crea una nueva base de datos
  - **use prueba**
- Crear una colección (tener seleccionada una DB)
  - **db.createCollection("users")**
- Mostrar la lista de colecciones de una DB
  - **show collections**
- Insertar un documento en la colección users
  - **db.users.insertOne({ id: 1, name: "Juan" })**
- Obtener todos los documentos de la colección users
  - **db.users.find()**
- Eliminar la colección users
  - **db.users.drop()**
- Eliminar una base de datos seleccionada
  - **db.dropDatabase()**
- Salir de la CLI de MongoDB (ctrl + D)
  - **exit**
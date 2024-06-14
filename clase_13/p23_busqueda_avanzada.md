## Búsqueda avanzada

- **db.coll.distinct( val )** Devuelve un array con los distintos valores
  que toma un determinado campo en los documentos de la colección.
- **db.coll.ﬁnd({doc.subdoc:value})** Se utiliza para filtrar sub-documentos.
- **db.coll.ﬁnd({name: /^Max$/i})** Filtra utilizando expresiones regulares

### Resolución
- En primer lugar, ingresar a la CLI de MongoDB con el siguiente comando:
  - **mongosh**
- Lista de comandos/consultas:
  - use colegio
  1. db.estudiantes.distinct("curso")
  2. db.estudiantes.find({ apellido: "Flores" })
  3. db.estudiantes.find({ nombre: /^Ju/i })
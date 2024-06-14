## FindTheBug

### Consigna
1. Insertar múltiples mascotas:
 - db.pets.insertOne([{name:"aletas",specie:"ﬁsh"},{name:"Doby",{specie:"dog"}])
2. Obtener sólo las últimas 5 mascotas que sean peces
 - db.pets.find({specie:"ﬁsh}).limit(5)
3. Obtener sólo el nombre de las últimas 5 mascotas cuya edad sea menor de 10 años:
 - db.pets.find(age:{ $gte:{10}}},{name:1}).sort(age:1).limit(5)

### Resolución
1. El comando debería ser insertMany y le falta la llave de cierre de la segunda
   propiedad en el segundo objeto. Ejemplo correcto: db.mascotas.insertOne({ nombre: "Aletas", especie: "Pez" })
2. Le faltan las comillas de cierre en el valor. Ejemplo correcto: db.mascotas.find({especie:"Perro"}).limit(2)
3. Hay varios errores. Ejemplo correcto: db.mascotas.find({edad:{ $gte: 1}}).sort({edad: 1}).limit(5)
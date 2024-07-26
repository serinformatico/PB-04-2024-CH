## Hash VS Cifrado

### Hash
- Propósito: Se utiliza para verificar la integridad de los datos. Comúnmente se aplica en contraseñas, firmas digitales y comprobaciones de integridad.
- Unidireccional: Un hash es un proceso unidireccional; no se puede revertir para obtener el valor original.
- Salida fija: Independientemente del tamaño de la entrada, la salida (el hash) tiene un tamaño fijo (por ejemplo, SHA-256 produce un hash de 256 bits).
- Colisiones: Aunque es raro, es posible que diferentes entradas generen el mismo hash (esto se llama colisión). Los algoritmos de hash están diseñados para minimizar esta posibilidad.

### Cifrado
- Propósito: Se utiliza para proteger la confidencialidad de los datos. Permite que la información sea leída solo por aquellos que tienen la clave adecuada.
- Bidireccional: El cifrado es un proceso bidireccional; los datos cifrados se pueden descifrar para recuperar la información original, siempre que se tenga la clave correcta.
- Salida variable: El tamaño de la salida puede variar dependiendo del algoritmo y del tamaño de la entrada.
- Claves: Utiliza claves para cifrar y descifrar los datos. Existen dos tipos de cifrado: simétrico (la misma clave se usa para cifrar y descifrar) y asimétrico (se utilizan dos claves diferentes).

#### Resumen
- Hash: Unidireccional, se usa para verificar la integridad, no se puede revertir.
- Cifrado: Bidireccional, se usa para proteger la confidencialidad, se puede revertir con la clave adecuada.
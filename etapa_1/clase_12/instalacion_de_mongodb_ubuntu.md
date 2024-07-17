## MongoDB Community Server v7.0.11


#### INSTRUCCIONES (Ubuntu v22.04):
1. Instalar complementos requeridos
   - sudo apt-get install gnupg curl
2. Importar la clave pública de MongoDB
   - curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
3. Crear el archivo del repositorio de MongoDB
   - echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
4. Descargar el repositorio de MongoDB
   - sudo apt-get update
5. Instalar MongoDB
   - sudo apt-get install -y mongodb-org
6. Comprobar que esté instalado MongoDB y MongoDB Shell
   - mongod --version
   - mongosh --version
7. Habilitar el servicio de MongoDB para que inicie automáticamente al arrancar el SO
   - sudo systemctl enable mongod
8. Reiniciar PC
9. Comprobar que el servicio de MongoDB se está ejecutando correctamente (debe figurar como "active (running)").
   - sudo systemctl status mongod
10. Acceder a la CLI de MongoDB
    - mongosh


#### Guía de instalación de MongoDB *(Documentación Oficial)*
- [Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)
- [Ubuntu](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)
- [MacOS](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)
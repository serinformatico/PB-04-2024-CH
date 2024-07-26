## Estrategias Principales de Passport
### Local Strategy
- Descripción: Autenticación mediante un nombre de usuario y una contraseña.
- Uso: Aplicaciones que gestionan sus propias credenciales de usuario.

### OAuth 2.0
- Descripción: Permite a los usuarios autenticarse utilizando cuentas de terceros (como Google, Facebook, etc.).
- Uso: Aplicaciones que desean ofrecer inicio de sesión a través de redes sociales.

### Facebook Strategy
- Descripción: Estrategia específica para autenticar a los usuarios a través de Facebook.
- Uso: Aplicaciones que desean que los usuarios inicien sesión usando sus cuentas de Facebook.

### JWT (JSON Web Tokens)
- Descripción: Utiliza tokens firmados para autenticar usuarios en aplicaciones RESTful.
- Uso: Aplicaciones SPA (Single Page Applications) y servicios que requieren autenticación sin sesiones en el servidor.

### Custom Strategy
- Descripción: Puedes crear estrategias personalizadas según las necesidades específicas de tu aplicación.
- Uso: Útil si tienes un método de autenticación único que no se ajusta a las estrategias existentes.

#### Breve comparación de estrategias
- OAuth 1.0: Más seguro pero complicado; usa firmas de solicitudes.
- OAuth 2.0: Más simple y flexible pero puede ser menos seguro en algunos casos (no requiere firmas).
- Facebook Strategy: Basada en OAuth 2.0; permite la autenticación específica a través de Facebook, facilitando el inicio de sesión para los usuarios.
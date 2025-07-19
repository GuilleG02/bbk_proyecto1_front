Proyecto E-Commerce Frontend
Introducción
Este proyecto corresponde al desarrollo del frontend para una tienda online (e-commerce), que permite a los usuarios registrarse, iniciar sesión, explorar productos, gestionar su carrito y realizar pedidos. La aplicación está conectada y sincronizada con un backend independiente, desarrollado en un proyecto aparte, que proporciona la API REST para el manejo de datos, autenticación y lógica de negocio.

Funcionalidades principales
Registro de usuarios: Los usuarios pueden crear una cuenta para acceder al sistema.

Login de usuarios: Inicio de sesión seguro para acceder a funcionalidades personalizadas.

Exploración de productos: Navegación y visualización detallada de productos con funcionalidades de búsqueda y filtros por precio.

Carrito de compras: Añadir y eliminar productos con actualización dinámica del total.

Gestión de pedidos: Creación y seguimiento de pedidos realizados.

Perfil de usuario: Visualización y edición de datos personales, además del historial de pedidos.

Favoritos y opiniones: Los usuarios pueden marcar productos como favoritos, dejar reviews con fotos y dar likes a opiniones.

Diseño responsive: Adaptación completa para dispositivos móviles y tablets.

Protección de rutas: Implementación de guards para asegurar accesos según autenticación.

Tecnologías utilizadas
React con hooks y Context API para la gestión global de estado.

React Router para la navegación entre diferentes vistas.

SASS para estilos organizados y escalables.

React Icons para iconografía moderna y accesible.

Slick Carousel para presentación dinámica en móviles.

Consumo de API RESTful externa proporcionada por el backend.

Estructura del proyecto
Los componentes principales incluyen:

Register: Formulario para crear una nueva cuenta.

Login: Autenticación de usuarios existentes.

Home: Página de bienvenida con acceso a novedades.

Products: Listado completo con buscador y filtros.

Product: Detalle individual de producto.

Cart: Carrito de compra y gestión de productos seleccionados.

Profile: Vista de perfil con datos y pedidos del usuario.

Header y Footer: Navegación consistente y pie de página en toda la aplicación.

Requisitos y buenas prácticas
Código modular y limpio, con componentes no mayores a 400 líneas y funciones no mayores a 75 líneas.

Uso de control de versiones con ramas main o master y develop.

Documentación clara y completa para facilitar mantenimiento y escalabilidad.

Enfoque en diseño, usabilidad y accesibilidad.

Nota importante sobre backend
El backend es un proyecto independiente que proporciona la API REST que consume esta aplicación frontend. Ambos proyectos están diseñados para trabajar juntos, garantizando una separación clara de responsabilidades entre cliente y servidor, y facilitando el mantenimiento y evolución de la plataforma.

Conclusión
Este frontend está diseñado para ofrecer una experiencia de compra online intuitiva, rápida y segura, preparada para integrarse con un backend robusto. Su diseño responsive y modularidad aseguran compatibilidad y facilidad de uso en cualquier dispositivo.
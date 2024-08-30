# Missing

Esta aplicación permite publicar anuncios de perros perdidos, indicando la última ubicación conocida.
Sin necesidad de estar registrado, se podrán ver los anuncios en su zona.

![Página de inicio](/capturas/inicio.png)

## Funcionalidades

### Búsqueda de perros perdidos
Los usuarios verán en la página de inicio los anuncios que se encuentran en un radio de 2 Km respecto a su ubicación actual.
También podrán afinar la búsqueda mediante diversos filtros.

### Publicación de anuncios.
Los usuarios registrados podrán publicar anuncios indicando el nombre, la ubicación, diversos datos de interés y una imagen de su mascota.
Una vez publicados podrán editarlos si es necesario.

## Backend

Está desarrollado en `Spring Boot` y se encarga de generar una `API REST` que consume el _frontend_. Esta `API REST` sirve de intermediaria entre la base de datos y el _frontend_.

### Modelos
El _backend_ de este proyecto cuenta con los siguentes modelos (se detallan tal y como se muestran en la base de datos): 
#### Usuario

| Campo         | Descripción                             |
|---------------|-----------------------------------------|
| `email`       | Correo electrónico identificador        |
| `nombre`      | Nombre del usuario                      |
| `apellidos`   | Apellidos del usuario                   |
| `telefono`    | Número de teléfono                      |
| `pword`       | Contraseña                              |

#### Anuncio

| Campo          | Descripción                                 |
|----------------|---------------------------------------------|
| `id`           | Identificador único del anuncio             |
| `titulo`       | Título del anuncio (nombre del perro)       |
| `descripcion`  | Breve descripción del anuncio               |
| `imagen`       | Imagen asociada al anuncio                  |
| `fecha`        | Fecha del último avistamiento               |
| `raza`         | Raza del perro                              |
| `color`        | Color del perro                             |
| `tamano`       | Tamaño del perro                            |
| `collar`       | Indica si el perro tiene collar             |
| `vacunado`     | Indica si el perro está vacunado            |
| `latitud`      | Latitud de la ubicación                     |
| `longitud`     | Longitud de la ubicación                    |
| `nom_usuario`  | Usuario asociado al anuncio                 |

### Controladores
Los controladores son los responsables de generar la `API REST` que consume el _frontend_ de la aplicación.

#### UsuarioController

| Método                | Mapping                         | Descripción                                                                            |
|-----------------------|---------------------------------|----------------------------------------------------------------------------------------|
| `crearUsuario`        | `@PostMapping("/usuario/registro")` | Registra un nuevo usuario con los detalles proporcionados (`email`, `nombre`, `apellidos`, `telefono`, `pword`). Verifica que el nombre de usuario no exista y lo guarda. |
| `login`               | `@PostMapping("/usuario/login")`    | Autentica a un usuario con el correo (`email`) y la contraseña (`pword`). Genera y devuelve un token JWT si la verificación es exitosa. |
| `getAnunciosUsuario`  | `@GetMapping("/usuario/anuncios")`  | Recupera los anuncios asociados a un usuario específico identificado por su `email`. Devuelve una lista de objetos `AnuncioDTO` con los detalles de cada anuncio. |

#### AnuncioController

| Método             | Mapping                           | Descripción                                                                            |
|--------------------|-----------------------------------|----------------------------------------------------------------------------------------|
| `getAnuncios`      | `@GetMapping("/anuncios")`        | Recupera una lista de anuncios dentro de un radio especificado, según las coordenadas (`latitude`, `longitude`, `radius`). Devuelve una lista de objetos `AnuncioDTO` con detalles de los anuncios. |
| `postAnuncio`      | `@PostMapping("/anuncio")`        | Publica un nuevo anuncio con los campos proporcionados (`titulo`, `descripcion`, `imagen`, `fecha`, `raza`, `color`, `tamano`, `collar`, `vacunado`, `latitude`, `longitude`, `email`). Asocia el anuncio con un usuario existente. |
| `getAnuncioById`   | `@GetMapping("/anuncio/{id}")`    | Recupera un anuncio específico por su `id` y devuelve sus detalles en un `AnuncioDTO`. |
| `editAnuncio`      | `@PutMapping("/anuncio")`         | Edita un anuncio existente con los nuevos valores proporcionados (`id`, `titulo`, `descripcion`, `fecha`, `raza`, `color`, `tamano`, `collar`, `vacunado`, `email`). Requiere validación del token JWT. |
| `deleteAnuncio`    | `@DeleteMapping("/anuncio")`      | Elimina un anuncio existente identificado por su `id`. Requiere validación del token JWT. |

#### ImagenController

| Método     | Mapping                     | Descripción                                                                 |
|------------|-----------------------------|-----------------------------------------------------------------------------|
| `getImage` | `@GetMapping("/{id}")`      | Recupera la imagen asociada a un anuncio específico por su `id`. Devuelve la imagen en formato byte y establece los encabezados de respuesta para el tipo de contenido y la longitud de la imagen. |


## Frontend

Desarrollado en `Angular`. Consume la `API REST` generada por el _backend_ para funcionar. Para su correcto funcionamiento es necesario activar la ubicación en el navegador.

### Página inicial

Se muestra independientemente de si el usuario ha iniciado sesión. Presenta una barra (del componente `filtros`) que permite filtrar la búsqueda.
Una vez se haya permitido el uso de la ubicación en el navegador y se haya realizado la llamada necesaria al _backend_, se muestran los anuncios cuya ubicación esté en un radio de 2 Km.

![Página de inicio](/capturas/inicio.png)

### Inicio de sesión

Formulario para iniciar sesión. En caso de no estar registrado, el usuario puede registrarse pinchando en el enlace que le redirige al `registro`.

![Inicio de sesión](/capturas/login.png)

### Registro

Formulario para crear una cuenta en la aplicación. Son necesarios el nombre de la cuenta, el nombre del usuario, los apellidos, el email, el teléfono y la contraseña.
Una vez generado, redirige a la sección personal del usuario (sus anuncios publicados).

![Registro](/capturas/registro.png)

### Publicar

En este formulario, se deberá introducir el nombre del perro a modo de título del anuncio, así como una breve descripción, raza, color, tamaño, la última vez que se le ha visto, última ubicación conocida y una imagen reciente.

![Publicar anuncio](/capturas/publicar.png)

Para la última ubicación conocida se hace uso de [Leaflet](https://leafletjs.com/), mostrando un mapa para seleccionar la ubicación.

Respecto a la imagen, se usa [el recortador de imágenes de Alyle UI](https://alyle.io/components/image-cropper) para guardar todas las imágenes con una relación de aspecto cuadrada.

![Recorte de imagen para el anuncio](/capturas/publicar2.png)

### Editar

Permite editar un anuncio. Para ello recoge el anuncio existente a través del método `getAnuncio` (que realiza la correspondiente llamada `get` al _backend_) y efectúa los cambios cuando se envía el formulario. También permite eliminar el anuncio mediante el método `deleteAnuncio`.
![Editar anuncio](/capturas/editar.png)

### Detalles

Muestra la imagen con detalle, presentando los datos de interés a su izquierda y la información de contacto a la derecha, así como la fecha de su último avistamiento y una breve descripción.

![Detalles del anuncio](/capturas/detalles.png)

## Puesta en funcionamiento

Para el uso de esta aplicación es necesario `Java 17`, `Maven`, `Spring Boot` y `Angular`. También es necesario tener la base de datos creada en `MySQL` acorde con las especificaciones del fichero `application.properties`.

### Ejecución del _backend_

> [!IMPORTANT]
> Antes de ejecutar el _backend_ es necesario tener la base de datos en funcionamiento.

Para ejecutar de forma local el servidor, se debe ejecutar el siguiente comando en su raíz:

```
mvn spring-boot:run
```

Esto desplegará el servidor en `http://localhost:8080`.



### Ejecución del _frontend_

> [!IMPORTANT]
> Para el correcto funcionamiento del _frontend_ es necesario que el _backend_ esté en ejecución.

Para iniciar de forma local el cliente, se debe ejecutar el siguiente comando en la raíz del proyecto (en el directorio `frontend/missing-frontend`):

```
ng serve
```

De esta forma, se desplegará el cliente en `http://localhost:4200`.

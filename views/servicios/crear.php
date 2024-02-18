<h1 class="nombre-pagina">Nuevo Servicios</h1>
<p class="descripcion-pagina">Llena todos los campos para añadir un nuevo servicios</p>

<?php

    include_once __DIR__ . '/../template/barra.php';
    include_once __DIR__ . '/../template/alertas.php';


?>

<form action="/servicios/crear" method="post" class="formulario">

    <?php
    include_once __DIR__ . '/formulario.php';

    ?>
    <input type="submit" class="boton" value="Guardar Servicio">

</form>
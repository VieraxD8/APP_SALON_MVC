<h1 class="nombre-pagina">Olvidaste tu Contraseña</h1>
<p class="descripcion-pagina">Coloca tu correo Electronico para Recuperar tu Password</p>

<?php 

include_once __DIR__ . "/../template/alertas.php";

?>


<form class="formulario" method="POST"  action="/olvide-password">


    <div class="campo">
        <label for="email">E-mail</label>
        <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="tu Email">
    </div>

    <input type="submit" class="boton" value="Enviar Instrucciones">
</form>

<div class="acciones">
    <a href="/">¿Ya Tienes una Cuenta? Inicia Sesion</a>
    <a href="/crear">¿Aun no tienes una cuenta? Crea una</a>
</div>

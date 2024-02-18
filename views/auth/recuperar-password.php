<h1 class="nombre-pagina">Recuperar Password</h1>
<p class="descripcion-pagina">Coloca tu nuevo password a continuacion</p>
<?php 

include_once __DIR__ . "/../template/alertas.php";

?>

<?php if($error) return; ?>

<form class="formulario" method="POST" action="" >

    <div class="campo">
        <label for="password">Password</label>
        <input 
            type="password"
            name="password"
            id="password"
            placeholder="Tu nuevo Password"
            >
    </div>

    <input type="submit" class="boton" value="Guardar Nuevo Password">

</form>

<div class="acciones">
    <a href="/">¿Ya Tienes una Cuenta? Inicia Sesion</a>
    <a href="/crear">¿Aun no tienes una cuenta? Crea una</a>
</div>

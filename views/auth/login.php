<h1 class="nombre-pagina">Login</h1>
<p class="descripcion-pagina">Inicia Sesion con tus Datos</p>

<?php 

include_once __DIR__ . "/../template/alertas.php";

?>

<form class="formulario" method="POST"  action="/">
    <div class="campo">
        <label for="email">Email</label>
        <input 
            type="email" 
            placeholder="Tu Email" 
            id="email"
            name="email"
            value="<?php echo s($auth->email); ?>"
            >
    </div>

    <div class="campo">
        <label for="password">Password</label>
        <input 
            type="password"
            placeholder="Password"
            id="password"
            name="password"
        >
    </div>

  <input type="submit" class="boton" value="Iniciar Sesion">
</form>

<div class="acciones">
    <a href="/crear">¿Aun no tienes una cuenta? Crea una</a>
    <a href="/olvide-password">¿Olvidaste Tu password?</a>
</div>
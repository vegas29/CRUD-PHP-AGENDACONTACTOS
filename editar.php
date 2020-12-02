<?php
    include 'inc/layouts/header.php';
    include 'inc/functions/funciones.php';
    $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);

    if(!$id){
        die('No es valido');
    }

    $resultado = obtenerContacto($id);
    $contacto = $resultado->fetch_assoc();
?>
<div class="contenedor-barra">
    <div class="contenedor barra">
        <a href="index.php" class="btn volver">Volver</a>
        <h1>Editar Contacto</h1>
    </div>
</div>

<div class="bg-amarillo contenedor sombra">
    <form action="#" id="contacto">
        <legend>
            Edita el contacto
        </legend>
        <?php include 'inc/layouts/formulario.php' ?> 
    </form>
</div>

<?php include 'inc/layouts/footer.php' ?> 

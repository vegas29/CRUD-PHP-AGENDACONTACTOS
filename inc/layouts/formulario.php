<div class="campos">
            <div class="campo">
                <label for="nombre">Nombre:</label>
                <input 
                    type="text" 
                    name="nombre"
                    placeholder="Nombre del contacto"
                    id="nombre"
                    value="<?php echo (isset($contacto['nombre'])) ? $contacto['nombre'] : ''; ?>">
            </div>

            <div class="campo">
                <label for="nombre">Empresa:</label>
                <input 
                    type="text"
                    name="empresa"
                    placeholder="Nombre de la empresa"
                    id="empresa"
                    value="<?php echo (isset($contacto['empresa'])) ? $contacto['empresa'] : ''; ?>">
            </div>

            <div class="campo">
                <label for="nombre">Telefono:</label>
                <input
                    type="tel"
                    name="telefono"
                    placeholder="Telefono del contacto"
                    id="telefono"
                    value="<?php echo (isset($contacto['telefono'])) ? $contacto['telefono'] : ''; ?>">
            </div>

            
</div>

<div class="campo enviar">
<?php
    if(isset($contacto['telefono'])){
        $textoBtn = 'Guardar';
    }else{
        $textoBtn = 'Añadir';
    }

    if(isset($contacto['telefono'])){
        $accion = 'editar';
    }else{
        $accion = 'crear';
    }

?>
    <input type="hidden" id="accion" value="<?php echo $accion ?>">
    <?php if ( isset($contacto['id'])) { ?>
        <input type="hidden" id="id" value="<?php echo $contacto['id']; ?>">
    <?php } ?>
    <input type="submit" value="<?php echo $textoBtn ?>">
</div>
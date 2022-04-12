////////////        FUNCION PARA TRAER TODOS LOS MENSAJES      /////////////////////
function getInfoMessage() {
    $.ajax({
        url: "http://localhost:8080/api/Message/all",
        //url:"http://155.248.195.219:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            showInfoMessage(respuesta);
        }
    });
}

////////////        FUNCION PARA MOSTRAR EN LA TABLA TODOS LOS MENSAJES      /////////////////////
function showInfoMessage(items) {
    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<th>Cliente</th>";
    myTable += "<th>Juego</th>";
    myTable += "<th>Mensage</th>";
    myTable += "<th>Editar</th>";
    myTable += "<th>Borrar</th>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].client.name + "</td>";
        myTable += "<td>" + items[i].game.name + "</td>";
        myTable += "<td>" + items[i].messageText + "</td>";
        myTable += "<td> <button onclick='preUpdateMessage(" + items[i].idMessage + ")'>Editar</button>";
        myTable += "<td> <button onclick='deleteInfoMessage(" + items[i].idMessage + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoMensajes").html(myTable);
}

////////////        FUNCION PARA GUARDAR UN MENSAJE      /////////////////////
function saveInfoMessage() {
    if ($("#msMensaje").val().length == 0 || $("#msClId").val() == null || $("#msGameId").val() == null) {
        alert("Todos los campos son obligatorios");
    } else {
        let myData = {
            messageText: $("#msMensaje").val(),
            client: { idClient: + $("#msClId").val() },
            game: { id: + $("#msGameId").val() },
        };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "http://localhost:8080/api/Message/save",
            //url:"http://155.248.195.219:8080/api/Message/save",
            datatype: "JSON",
            data: JSON.stringify(myData),

            success: function (respuesta) {
                $("#resultadoMensajes").empty();
                $("#msMensaje").val("");
                $("#msClId").val(0);
                $("#msGameId").val(0);
                getInfoMessage();
                alert("Se ha GUARDADO el MENSAJE en la base de datos")
            }
        });
    }
}

////////////        FUNCION PARA LLENAR LAS CAJAS ANTES DE ACTUALIZAR      /////////////////////
function preUpdateMessage(idMensaje) {
    $.ajax({
        url: "http://localhost:8080/api/Message/" + idMensaje,
        //url:"http://155.248.195.219:8080/api/Message/"+idMensaje, 
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#msId").val(respuesta.idMessage);
            $("#msMensaje").val(respuesta.messageText);
            //$("#gameCatId").val(respuesta.category.id);
            $("#msClId").val(respuesta.client.idClient);
            $("#msGameId").val(respuesta.game.id);
            $("#resultadoMensajes").empty();
            $("#btnCrearMensaje").css('visibility', 'hidden');
            $("#btnActualizarMensaje").css('visibility', 'visible');
            alert("ACTUALIZA la informacion del mensaje en el formulario")
        }
    });

}

////////////        FUNCION PARA ACTUALIZAR UN MENSAJE      /////////////////////
function updateInfoMessage() {
    if ($("#msMensaje").val().length == 0 || $("#msClId").val() == null || $("#msGameId").val() == null) {
        alert("Todos los campos son obligatorios");
    } else {
        let myData = {
            idMessage: $("#msId").val(),
            client: { idClient: + $("#msClId").val() },
            game: { id: + $("#msGameId").val() },
            messageText: $("#msMensaje").val(),
        };
        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://localhost:8080/api/Message/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#resultadoMensajes").empty();
                $("#msId").val("");
                $("#msClId").val(0);
                $("#msGameId").val(0);
                $("#msMensaje").val("");
                $("#btnCrearMensaje").css('visibility', 'visible');
                $("#btnActualizarMensaje").css('visibility', 'hidden');
                getInfoMessage();
                alert("Se ha ACTUALIZADO los datos del mensaje")
            }
        });
    }
}

////////////        FUNCION PARA BORRAR UN MENSAJE      /////////////////////
function deleteInfoMessage(idMensaje) {
    $.ajax({
        url: "http://localhost:8080/api/Message/" + idMensaje,
        //url:"http://155.248.195.219:8080/api/Message/"+idMensaje, 
        type: "DELETE",

        success: function (respuesta) {
            $("#resultadoMensajes").empty();
            getInfoMessage();
            alert("Se ha ELIMINADO el mensaje de la base de datos.")
        }
    });
}

////////////        FUNCION PARA INICIAR EL SELECT DE CLIENTE      /////////////////////
function autoInitClient() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        //url:"http://155.248.195.219:8080/api/Client/all
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            let $select = $("#msClId");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.idClient + '>' + name.name + '</option>');
                console.log("select " + name.idClient);
            });
        }

    })
}

////////////        FUNCION PARA INICIAR EL SELECT DE JUEGO      /////////////////////
function autoInitGame() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://localhost:8080/api/Game/all",
        //url:"http://155.248.195.219:8080/api/Game/all
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            let $select = $("#msGameId");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
                console.log("select " + name.id);
            });
        }

    })
}
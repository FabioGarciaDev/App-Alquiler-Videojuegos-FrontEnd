////////////        FUNCION PARA TRAER TODO LOS JUEGOS      /////////////////////
function getInfoGame() {
    $.ajax({
        url: "http://localhost:8080/api/Game/all",
        //url:"http://155.248.195.219:8080/api/Game/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            showInfoGame(respuesta);
        }
    });
}

////////////        FUNCION PARA DIBUJAR LA TABLA DE JUEGOS      /////////////////////
function showInfoGame(items) {
    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<th>Nombre</th>";
    myTable += "<th>Desarrolladora</th>";
    myTable += "<th>Categoria</th>";
    myTable += "<th>Edad Minima</th>";
    myTable += "<th>Descripcion</th>";
    myTable += "<th>Editar</th>";
    myTable += "<th>Borrar</th>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].developer + "</td>";
        myTable += "<td>" + items[i].category.name + "</td>";
        myTable += "<td>" + items[i].year + "</td>";
        myTable += "<td>" + items[i].description + "</td>";
        myTable += "<td> <button onclick='preUpdateGame(" + items[i].id + ")'>Editar</button>";
        myTable += "<td> <button onclick='deleteInfoGame(" + items[i].id + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoJuegos").html(myTable);
}

////////////        FUNCION PARA GUARDAR LOS JUEGOS      /////////////////////
function saveInfoGame() {
    if ($("#gameName").val().length == 0 || $("#gameDeveloper").val().length == 0 || $("#gameCatId").val() == null
        || $("#gameMinage").val().length == 0 || $("#gameDescription").val().length == 0) {
        alert("Todos los campos son obligatorios");
    } else {
        let myData = {
            name: $("#gameName").val(),
            developer: $("#gameDeveloper").val(),
            year: $("#gameMinage").val(),
            category: { id: + $("#gameCatId").val() },
            description: $("#gameDescription").val(),
        };
        console.log(myData);
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "http://localhost:8080/api/Game/save",
            //url:"http://155.248.195.219:8080/api/Game/save",
            datatype: "JSON",
            data: JSON.stringify(myData),

            success: function (respuesta) {
                $("#resultadoJuegos").empty();
                $("#gameName").val("");
                $("#gameDeveloper").val("");
                $("#gameMinage").val("");
                $("#gameDescription").val("");
                $("#gameCatId").val(0);
                getInfoGame();
                alert("Se ha GUARDADO el juego en la base de datos")
            }
        });
    }
}

////////////        FUNCION PARA LLENAR LAS CAJAS ANTES DE EDITAR      /////////////////////
function preUpdateGame(idJuego) {
    console.log(idJuego);
    $.ajax({
        url: "http://localhost:8080/api/Game/" + idJuego,
        //url:"http://155.248.195.219:8080/api/Game/"+idJuego, 
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#gameId").val(respuesta.id);
            $("#gameName").val(respuesta.name);
            $("#gameDeveloper").val(respuesta.developer);
            $("#gameMinage").val(respuesta.year);
            $("#gameCatId").val(respuesta.category.id);
            $("#gameDescription").val(respuesta.description);
            $("#resultadoGame").empty();
            $("#btnCrearGame").css('visibility', 'hidden');
            $("#btnActualizarGame").css('visibility', 'visible');
            alert("ACTUALIZA la informacion del juego en el formulario")
        }
    });

}

////////////        FUNCION PARA ACTUALIZAR DATOS DE LOS JUEGOS      /////////////////////
function updateInfoGame() {
    if ($("#gameName").val().length == 0 || $("#gameDeveloper").val().length == 0
        || $("#gameMinage").val().length == 0 || $("#gameDescription").val().length == 0) {
        alert("Todos los campos son obligatorios");
    } else {
        let myData = {
            id: $("#gameId").val(),
            name: $("#gameName").val(),
            developer: $("#gameDeveloper").val(),
            year: $("#gameMinage").val(),
            category: { id: +$("#gameCatId").val() },
            description: $("#gameDescription").val(),
        };
        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://localhost:8080/api/Game/update",
            //url: "http://155.248.195.219:8080/api/Game/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#resultadoJuegos").empty();
                $("#catId").val("");
                $("#gameName").val("");
                $("#gameDeveloper").val("");
                $("#gameMinage").val("");
                $("#gameDescription").val("");
                $("#gameCatId").val(0);
                $("#btnCrearGame").css('visibility', 'visible');
                $("#btnActualizarGame").css('visibility', 'hidden');
                getInfoGame();
                alert("Se ha ACTUALIZADO los datos del juego")
            }
        });
    }
}

////////////        FUNCION PARA BORRAR UN JUEGO      /////////////////////
function deleteInfoGame(idJuego) {
    $.ajax({
        url: "http://localhost:8080/api/Game/" + idJuego,
        //url:"http://155.248.195.219:8080/api/Game/"+idJuego", 
        type: "DELETE",

        success: function (respuesta) {
            $("#resultadoJuegos").empty();
            getInfoGame();
            alert("Se ha ELIMINADO el juego de la base de datos.")
        }
    });
}

////////////        FUNCION PARA TRARE Y LLENAR LA CASILLA CATEGORIA      /////////////////////
function autoInitCategory() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://localhost:8080/api/Category/all",
        //url:"http://155.248.195.219:8080/api/Category/all
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            let $select = $("#gameCatId");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
                console.log("select " + name.id);
            });
        }

    })
}

////////////        FUNCION PARA TRAER TODAS LAS CATEGORIAS      /////////////////////
function getInfoCategory() {
    $.ajax({
        url: "http://localhost:8080/api/Category/all",
        //url:"http://155.248.195.219:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            showInfoCategory(respuesta);
        }
    });
}

////////////        FUNCION PARA PINTAR LA TABLA CON LAS CATEGORIAS      /////////////////////
function showInfoCategory(items) {
    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<th>Categoria</th>";
    myTable += "<th>Descripcion</th>";
    myTable += "<th>Editar</th>";
    myTable += "<th>Borrar</th>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].description + "</td>";
        myTable += "<td> <button onclick='preUpdateCategory(" + items[i].id + ")'>Editar</button>";
        myTable += "<td> <button onclick='deleteInfoCategory(" + items[i].id + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoCategoria").html(myTable);
}

////////////        FUNCION PARA GUARDAR UNA CATEGORIA       /////////////////////
function saveInfoCategory() {
    if ($("#catName").val().length == 0 || $("#catDescription").val().length == 0) {
        alert("Todos los campos son obligatorios");
    } else {
        let myData = {
            name: $("#catName").val(),
            description: $("#catDescription").val(),
        };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "http://localhost:8080/api/Category/save",
            //url:"http://155.248.195.219:8080/api/Category/save",
            datatype: "JSON",
            data: JSON.stringify(myData),

            success: function (respuesta) {
                $("#resultadoCategoria").empty();
                $("#catName").val("");
                $("#catDescription").val("");
                getInfoCategory();
                alert("Se ha GUARDADO la categoria en la base de datos")
            }
        });
    }
}

////////////        FUNCION PARA LLENAR LA CAJAS ANTES DE ACTUALIZAR      /////////////////////
function preUpdateCategory(idCat) {
    console.log(idCat);
    $.ajax({
        url: "http://localhost:8080/api/Category/" + idCat,
        //url:"http://155.248.195.219:8080/api/Category/"+idCat, 
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#catId").val(respuesta.id);
            $("#catName").val(respuesta.name);
            $("#catDescription").val(respuesta.description);
            $("#resultadoMensajes").empty();
            $("#btnCrearCategoria").css('visibility', 'hidden');
            $("#btnActualizarCategoria").css('visibility', 'visible');
            alert("ACTUALIZA la informacion de la categoria en el formulario")
        }
    });

}

////////////        FUNCION PARA ACTUALIZAR LOS DATOS DE UNA CATEGORIA      /////////////////////
function updateInfoCategory() {
    if ($("#catName").val().length == 0 || $("#catDescription").val().length == 0) {
        alert("Todos los campos son obligatorios");
    } else {
        let myData = {
            id: $("#catId").val(),
            name: $("#catName").val(),
            description: $("#catDescription").val()
        };
        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://localhost:8080/api/Category/update",
            //url:"http://155.248.195.219:8080/api/Category/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#resultadoCategoria").empty();
                $("#catId").val("");
                $("#catName").val("");
                $("#catDescription").val("");
                $("#btnCrearCategoria").css('visibility', 'visible');
                $("#btnActualizarCategoria").css('visibility', 'hidden');
                getInfoCategory();
                alert("Se ha ACTUALIZADO los datos de la categoria")
            }
        });
    }

}

////////////        FUNCION PARA BORRAR UNA CATEGORIA      /////////////////////
function deleteInfoCategory(idCat) {
    $.ajax({
        url: "http://localhost:8080/api/Category/" + idCat,
        //url:"http://155.248.195.219:8080/api/Category/", 
        type: "DELETE",

        success: function (respuesta) {
            $("#resultadoCategoria").empty();
            getInfoCategory();
            alert("Se ha ELIMINADO la categoria de la base de datos.")
        }
    });
}

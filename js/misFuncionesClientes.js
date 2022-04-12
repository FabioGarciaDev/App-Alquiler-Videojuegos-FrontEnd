////////////        FUNCION PARA TRAER TODOS LOS CLIENTES      /////////////////////
function getInfoClient() {
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        //url:"http://155.248.195.219:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            showInfoClient(respuesta);
        }
    });
}

////////////        FUNCION PARA MOSTAR LOS DATOS DE LOS CLIENTES EN LA TABLA     /////////////////////
function showInfoClient(items) {
    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<th>Nombre</th>";
    myTable += "<th>Email</th>";
    myTable += "<th>Edad</th>";
    myTable += "<th>Editar</th>";
    myTable += "<th>Borrar</th>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].email + "</td>";
        myTable += "<td>" + items[i].age + "</td>";
        myTable += "<td> <button onclick='preUpdateClient(" + items[i].idClient + ")'>Editar</button>";
        myTable += "<td> <button onclick='deleteInfoClient(" + items[i].idClient + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoClientes").html(myTable);
}

////////////        FUNCION PARA GUARDAR LOS DATOS DE UN CLIENTE      /////////////////////
function saveInfoClient() {
    if ($("#clEmail").val().length == 0 || $("#clPassword").val().length == 0
        || $("#clName").val().length == 0 || $("#clAge").val().length == 0) {
        alert("Todos los campos son obligatorios");
    } else {
        let myData = {
            name: $("#clName").val(),
            email: $("#clEmail").val(),
            age: $("#clAge").val(),
            password: $("#clPassword").val(),
        };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "http://localhost:8080/api/Client/save",
            //url:"http://155.248.195.219:8080/api/Client/save",
            datatype: "JSON",
            data: JSON.stringify(myData),

            success: function (respuesta) {
                $("#resultadoClientes").empty();
                $("#clName").val("");
                $("#clEmail").val("");
                $("#clAge").val("");
                $("#clPassword").val("");
                getInfoClient();
                alert("Se ha GUARDADO el cliente en la base de datos")
            }
        });
    }
}

////////////        FUNCION PARA LLENAR LOS DEL CLIENTE ANTES DE ACTUALIZAR      /////////////////////
function preUpdateClient(idCliente) {
    console.log(idCliente);
    $.ajax({
        url: "http://localhost:8080/api/Client/" + idCliente,
        //url:"http://155.248.195.219:8080/api/Client/"+idCliente, 
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#clId").val(respuesta.idClient);
            $("#clName").val(respuesta.name);
            $("#clEmail").val(respuesta.email);
            $("#clAge").val(respuesta.age);
            $("#clPassword").val(respuesta.password);
            $("#resultadoClientes").empty();
            $("#btnCrearCliente").css('visibility', 'hidden');
            $("#btnActualizarCliente").css('visibility', 'visible');
            alert("ACTUALIZA la informacion del cliente en el formulario")
        }
    });
}

////////////        FUNCION PARA ACTUALIZAR LOS DATOS DE UN CLIENTE      /////////////////////
function updateInfoClient() {
    if ($("#clEmail").val().length == 0 || $("#clPassword").val().length == 0
        || $("#clName").val().length == 0 || $("#clAge").val().length == 0) {
        alert("Todos los campos son obligatorios");
    } else {
        let myData = {
            idClient: $("#clId").val(),
            email: $("#clEmail").val(),
            password: $("#clPassword").val(),
            name: $("#clName").val(),            
            age: $("#clAge").val(),
            
        };
        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://localhost:8080/api/Client/update",
            //url:"http://155.248.195.219:8080/api/Client/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#resultadoCliente").empty();
                $("#clId").val("");
                $("#clEmail").val("");
                $("#clPassword").val("");
                $("#clName").val("");
                $("#clAge").val("");
                $("#btnCrearCliente").css('visibility', 'visible');
                $("#btnActualizarCliente").css('visibility', 'hidden');
                getInfoClient();
                alert("Se ha ACTUALIZADO los datos del cliente")
            }
        });
    }

}

////////////        FUNCION PARA BORRAR LOS DATOS DE UN CLIENTE      /////////////////////
function deleteInfoClient(idCliente) {
    $.ajax({
        url: "http://localhost:8080/api/Client/" + idCliente,
        //url:"http://155.248.195.219:8080/api/Client/"+idCliente, 
        type: "DELETE",
        success: function (respuesta) {
            $("#resultadoCliente").empty();
            getInfoClient();
            alert("Se ha ELIMINADO el cliente de la base de datos.")
        }
    });
}
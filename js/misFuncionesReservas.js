function getInfoReservation() {
    $.ajax({
        url: "http://localhost:8080/api/Reservation/all",
        //url:"http://155.248.195.219:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            showInfoReservation(respuesta);
        }
    });
}
function showInfoReservation(items) {
    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<th>Cliente</th>";
    myTable += "<th>Juego</th>";
    myTable += "<th>Fecha Inicio</th>";
    myTable += "<th>Fecha Devolucion</th>";
    myTable += "<th>Editar</th>";
    myTable += "<th>Borrar</th>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].client.name + "</td>";
        myTable += "<td>" + items[i].game.name + "</td>";
        myTable += "<td>" + items[i].startDate.substring(0, 10) + "</td>";
        myTable += "<td>" + items[i].devolutionDate.substring(0, 10) + "</td>";
        myTable += "<td> <button onclick='preUpdateReservation(" + items[i].idReservation + ")'>Editar</button>";
        myTable += "<td> <button onclick='deleteInfoReservation(" + items[i].idReservation + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoReservas").html(myTable);
}
function saveInfoReservation() {
    let myData = {
        client: { idClient: + $("#rsClId").val() },
        game: { id: + $("#rsGameId").val() },
        startDate: $("#rsStartDate").val(),
        devolutionDate: $("#rsDevolutionDate").val(),
    };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "http://localhost:8080/api/Reservation/save",
        //url:"http://155.248.195.219:8080/api/Reservation/save",
        datatype: "JSON",
        data: JSON.stringify(myData),

        success: function (respuesta) {
            $("#resultadoReservas").empty();
            $("#rsStartDate").val("");
            $("#rsDevolutionDate").val("");
            getInfoReservation();
            alert("Se ha GUARDADO la reservacion en la base de datos")
        }
    });
}
function preUpdateReservation(idReserva) {
    console.log(idReserva);
    $.ajax({
        url: "http://localhost:8080/api/Reservation/" + idReserva,
        //url:"http://155.248.195.219:8080/api/Reservation/"+idReserva, 
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#rsId").val(respuesta.idReservation);
            let fechaIni = respuesta.startDate.substring(0, 10);
            $("#rsStartDate").val(fechaIni);
            let fechaFin = respuesta.devolutionDate.substring(0, 10);
            $("#rsDevolutionDate").val(fechaFin);
            $("#resultadoReservas").empty();
            $("#btnCrearReserva").css('visibility', 'hidden');
            $("#btnActualizarReserva").css('visibility', 'visible');
            alert("ACTUALIZA la informacion de la reserva en el formulario")
        }
    });
}
function updateInfoReservation() {
    if ($("#rsStartDate").val().length == 0 || $("#rsDevolutionDate").val().length == 0) {
        alert("Todos los campos son obligatorios");
    } else {
        let myData = {
            idReservation: $("#rsId").val(),
            startDate: $("#rsStartDate").val(),
            devolutionDate: $("#rsDevolutionDate").val()
        };
        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://localhost:8080/api/Reservation/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#resultadoReservas").empty();
                $("#rsId").val("");
                $("#rsStartDate").val("");
                $("#rsDevolutionDate").val("");
                $("#btnCrearReserva").css('visibility', 'visible');
                $("#btnActualizarReserva").css('visibility', 'hidden');
                getInfoReservation();
                alert("Se ha ACTUALIZADO los datos de la reserva")
            }
        });
    }
}
function deleteInfoReservation(idReserva) {
    console.log(idReserva);
    $.ajax({
        url: "http://localhost:8080/api/Reservation/" + idReserva,
        //url:"http://155.248.195.219:8080/api/Reservation/"+idReserva, 
        type: "DELETE",

        success: function (respuesta) {
            $("#resultadoReservas").empty();
            getInfoReservation();
            alert("Se ha ELIMINADO la reserva de la base de datos.")
        }
    });
}

function autoInitClient() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        //url:"http://155.248.195.219:8080/api/Client/all
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            let $select = $("#rsClId");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.idClient + '>' + name.name + '</option>');
                console.log("select " + name.idClient);
            });
        }

    })
}
function autoInitGame() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://localhost:8080/api/Game/all",
        //url:"http://155.248.195.219:8080/api/Game/all
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            let $select = $("#rsGameId");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
                console.log("select " + name.id);
            });
        }

    })
}
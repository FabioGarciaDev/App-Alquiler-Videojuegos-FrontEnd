///////////////     REPORTE STATUS          /////////////////////////////////
function getStatusReport() {
    console.log("test");
    $.ajax({
        url: "http://localhost:8080/api/Reservation/report-status",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            showStatusReport(respuesta);
        }
    });
}
function showStatusReport(respuesta) {
    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<th>Completadas</th>";
    myTable += "<th>Canceladas</th>";
    myTable += "</tr>";
    myTable += "<tr>";
    myTable += "<td>" + respuesta.completed + "</td>";
    myTable += "<td>" + respuesta.cancelled + "</td>";
    myTable += "</tr>";
    myTable += "</table>";
    $("#resultadoStatus").html(myTable);
}

//////////////      REPORTE CLIENTES        /////////////////////////////////////
function getClientReport() {
    $.ajax({
        url: "http://localhost:8080/api/Reservation/report-clients",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            showClientReport(respuesta);
        }
    });
}
function showClientReport(respuesta) {

    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<th>Total Reservas</th>";
    myTable += "<th>Cliente</th>";
    myTable += "<th>Email</th>";
    myTable += "<th>Edad</th>";
    myTable += "</tr>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].total + "</td>";
        myTable += "<td>" + respuesta[i].client.name + "</td>";
        myTable += "<td>" + respuesta[i].client.email + "</td>";
        myTable += "<td>" + respuesta[i].client.age + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoClients").html(myTable);
}


//////////////      REPORTES STATUS RESERVA     //////////////////////////////////////////////
function getDateReport() {
    if ($("#rpStarDate").val().length == 0 || $("#rpDevolutionDate").val().length == 0) {
        alert("Todos los campos son obligatorios");
    } else {
        var fechaInicio = document.getElementById("rpStarDate").value;
        var fechaCierre = document.getElementById("rpDevolutionDate").value;
        console.log(fechaInicio);
        console.log(fechaCierre);
        $.ajax({
            url: "http://localhost:8080/api/Reservation/report-dates/" + fechaInicio + "/" + fechaCierre,
            type: "GET",
            datatype: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                showDateReport(respuesta);
            }
        });
    }
}
function showDateReport(respuesta) {
    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<th>Fecha Inicio</th>";
    myTable += "<th>Fecha Devolucion</th>";
    myTable += "<th>Status Reserva</th>";
    myTable += "</tr>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].startDate + "</td>";
        myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
        myTable += "<td>" + respuesta[i].status + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoDate").html(myTable);
}

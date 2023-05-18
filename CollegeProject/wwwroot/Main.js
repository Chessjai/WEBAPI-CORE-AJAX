var StdId = '';
$(document).ready(function () {
    showStudents();
    $("#btnUpdateStd").click(function () {

        if (StdId != '') {
            updateStudent(StdId)
        }
        else {
            alert("No proper std id found for update!")
        }

    });
});

function createStudent() {
    var url = "/api/Student";
    var student= {};

    if ($('#txtName').val() === '' || $('#txtAddress').val() === '' || $('#txtPhoneNumber').val() === '')
    {
        alert("No filed can be left blank");
    }
    else {
        student.Name = $('#txtName').val();
        student.Address = $('#txtAddress').val();
        student.PhoneNumber = $('#txtPhoneNumber').val();
        

        if (student) {
            $.ajax({
                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(student),
                type: "Post",
                success: function (result) {
                    clearForm();
                    showStudents();
                },
                error: function (msg) {
                    alert(msg);
                }

            });
        }
    }
}

function showStudents() {
    var url = "/api/Student";

    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            if (result) {
                $("#tblStdBody").html('');
                var row = '';
                for (var i = 0; i < result.length; i++) {
                    row = row
                        + "<tr>"
                        + "<td>" + result[i].name + "</td>"
                        + "<td>" + result[i].address + "</td>"
                        + "<td>" + result[i].phoneNumber + "</td>"
                        + "<td><button class='btn btn-primary' onClick='editStudents(" + result[i].id + ")'>Edit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-danger' onClick='deleteStudents(" + result[i].id + ")'>Delete</button></td>"
                }
                if (row != '') {
                    $("#tblStdBody").append(row);
                }
            }
        },
        error: function (msg) {
            alert(msg);
        }

    });
}

function deleteStudents(id) {
    var url = "/api/Student/" + id;
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
         type: "Delete",
        success: function (result) {
            clearForm();
           // alert(JSON.stringify(result));
            showStudents();
        },
        error: function (xhr, status, error) {
            alert(status);
        }

    });
}

function editStudents(id) {
    var url = "/api/Student/" + id;
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            if (result) {
                StdId = result.id;
                $('#txtName').val(result.name);
                $('#txtAddress').val(result.address);
                $('#txtPhoneNumber').val(result.phoneNumber);
                
            }
            $("#btnCreateStd").prop('disabled', true);
            $("#btnUpdateStd").prop('disabled', false);

        },
        error: function (msg) {
            alert(msg);
        }

    });
}

function updateStudent(id) {
    var url = "/api/Student/" + id;
    var student = {};
    student.id = id;
    student.name = $('#txtName').val();
    student.address = $('#txtAddress').val();
    student.phoneNumber = $('#txtPhoneNumber').val();
    

    if (student) {
        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(student),
            type: "Put",
            success: function (result) {
                clearForm();
                showStudents();
                $("#btnCreateStd").prop('disabled', false);
                $("#btnUpdateStd").prop('disabled', true);
            },
            error: function (msg) {
                alert(msg);
            }

        });
    }
}


function clearForm() {
    $('#txttName').val('');
    $('#txtAddress').val('');
    $('#txtPhoneNumber').val('');
   
}
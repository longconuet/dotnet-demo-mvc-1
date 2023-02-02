//Load Data in Table when documents is ready  
$(document).ready(function () {
    loadData();
});

//Load Data function  
function loadData(txtSearch = "", page = 1) {
    $.ajax({
        url: "/Student/List",
        type: "GET",
        data: { keyword: txtSearch, page: page },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result.students, function (key, item) {
                html += '<tr>';
                html += '<td>' + (key + 1) + '</td>';
                html += '<td>' + item.name + '</td>';
                html += '<td>' + item.age + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.id + ')">Edit</a> | <a href="#" onclick="Delele(' + item.id + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);

            //create pagination
            var pagination_string = "";
            var pageCurrent = result.pageCurrent;
            var totalPage = result.totalPage;

            //create button previous 
            if (pageCurrent > 1) {
                var pagePrevious = pageCurrent - 1;
                pagination_string += '<li class="page-item"><a href="" class="page-link" data-page=' + pagePrevious + '>Previous</a></li>';
            }

            for (i = 1; i <= totalPage; i++) {
                if (i == pageCurrent) {
                    pagination_string += '<li class="page-item active"><a href="" class="page-link" data-page=' + i + '>' + pageCurrent + '</a></li>';
                } else {
                    pagination_string += '<li class="page-item"><a href="" class="page-link" data-page=' + i + '>' + i + '</a></li>';
                }
            }

            //create button next
            if (pageCurrent > 0 && pageCurrent < totalPage) {
                var pageNext = pageCurrent + 1;
                pagination_string += '<li class="page-item"><a href="" class="page-link"  data-page=' + pageNext + '>Next</a></li>';
            }

            //load pagination
            $("#load-pagination").html(pagination_string);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}  

//click event pagination
$("body").on("click", ".pagination li a", function (event) {
    event.preventDefault();
    var page = $(this).attr('data-page');

    //load event pagination
    var txtSearch = $(".txtSearch").val();
    if (txtSearch != "") {
        loadData(txtSearch, page)
    }
    else {
        loadData(null, page);
    }

});

// search event
$("body").on("click", "#search", function (event) {
    event.preventDefault();

    //load event pagination
    var txtSearch = $(".txtSearch").val();
    if (txtSearch != "") {
        loadData(txtSearch, 1)
    }
    else {
        loadData(null, 1);
    }

});


//Add Data Function   
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var stdObj = {
        Name: $('#Name').val(),
        Age: $('#Age').val()
    };

    //var stdObj = {
    //    request: {
    //        Name: $('#Name').val(),
    //        Age: $('#Age').val()
    //    }
    //};

    $.ajax({
        url: "/Student/Create",
        data: JSON.stringify(stdObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: true,
        processData: false,
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function getbyID(id) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Student/GetById/" + id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.id);
            $('#Name').val(result.name);
            $('#Age').val(result.age);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }

    var stdObj = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        Age: $('#Age').val()
    };

    var std = new Object;
    std.Id = $('#Id').val();
    std.Name = $('#Name').val();
    std.Age = $('#Age').val();

    $.ajax({
        url: "/Student/Update",
        data: JSON.stringify(std),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#Id').val("");
            $('#Name').val("");
            $('#Age').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting
function Delele(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Student/Delete/" + Id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}  


//Function for clearing the textboxes  
function clearTextBox() {
    $('#Id').val("");
    $('#Name').val("");
    $('#Age').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
}

function showAddModal() {
    clearTextBox();
    $('#myModal').modal('show');
}

//Valdidation using jquery  
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#Age').val().trim() == "") {
        $('#Age').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Age').css('border-color', 'lightgrey');
    }

    return isValid;
}  
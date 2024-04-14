
window.onload = function queryProductList(){
    $.ajax({
        url:"queryProductList",
        dataType:"json",
        type:"GET",
        success:function (res) {
            console.log(res)
            var tbody = document.getElementById('itemList');
            for(var i = 0; i<res.length;i++){
                var newRow = document.createElement("tr");
                newRow.setAttribute('class','table-light');
                newRow.innerHTML = '<th scope="row">'+res[i].pid+'</th>\n' +
                    '            <td> <img style="height: 70px" src="'+res[i].mainimage+'"> </td>\n'+
                    '            <td>'+res[i].prodName+'</td>\n' +
                    '            <td>'+res[i].price+'\n' +
                    '            <td>'+res[i].catid+'</td>\n' +
                    '            <td>'+res[i].description+'</td>\n' +
                    '            <td><button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" onclick="showQueryProductById(this)">Update</button>&nbsp;' +
                    '<button class="btn btn-danger btn-sm" onclick="deleteProd(this)">Delete</button></td>\n'
                tbody.appendChild(newRow)
            }
        } ,
        error:function () {
            alert("查询失败");
        }
    });
}

function queryProductById(id){
    $.ajax({
        url:"queryProductById/"+id,
        dataType:"json",
        type:"GET",
        async:false,
        success:function (data) {
            console.log(data)
            return data
        } ,
        error:function () {
            alert("查询失败");
        }
    });
}

function showQueryProductById(obj){
    var id = obj.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    data = queryProductById(id)
    document.getElementById("pid").value = data.pid
    document.getElementById("updatecatid").value=data.catid;
    document.getElementById("updateprodName").value = data.prodName;
    document.getElementById("updateprice").value = data.price;
    document.getElementById("updatedescription").value = data.description;
    document.getElementById("updatecustomFile").value = data.mainimage;
}

function updateProd(){
    var inputData =  {"pid":$("#pid").val(), "catid" : $("#updatecatid").val(),"prodName" : $("#updateprodName").val(),
        "price" : $("#updateprice").val(),"description" :  $("#updatedescription").val(), "mainimage":$("#mainimage").val()}

    $.ajax({
        type: "GET",
        url: "deleteProdById/"+$("#pid").val(),
        success: function() {
            console.log("删除成功，pid为"+$("#pid").val());
        }
    });

    console.log(JSON.stringify(inputData))
    $.ajax({
        type: "POST",
        url: "addProd",
        contentType:"application/json",
        dataType: 'json',
        data: JSON.stringify(inputData),
        success: function(data) {
            console.log(data)
        }
    });
    location.reload();
}

function addProd(){
    let _csrf = $.cookie('XSRF-TOKEN');
    var inputData =  {"catid" : $("#catid").val(),"prodName" : $("#prodName").val(),
        "price" : $("#price").val(),"description" :  $("#description").val() ,"mainimage":$("#customFile").val(),
        "_csrf" : _csrf
    }
    console.log(JSON.stringify(inputData))
    $.ajax({
        type: "POST",
        url: "addProd",
        contentType:"application/json",
        dataType: 'json',
        data: JSON.stringify(inputData),
        success: function(data) {
            console.log(data)
        }
    });
    return false;
    location.reload();
}

function deleteProd(obj){
    var id = obj.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    console.log(id)
    $.ajax({
        type: "GET",
        url: "deleteProdById/"+id,
        success: function() {
            console.log("删除成功，pid为"+id);
        }
    });
    location.reload();
}
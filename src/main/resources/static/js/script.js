
window.addEventListener('unhandledrejection', (event) => {
    console.log(event.reason);
});

// update total value when change the good's number
function updateTotal(){
    var objArray = document.getElementsByClassName("price");
    var numArray = document.getElementsByClassName("item_num")
    // console.log(objArray)
    // console.log(numArray)
    var _total = 0;
    for(let i=0;i<objArray.length;i++){
        var obj = objArray[i];
        var price = Number(obj.innerText.substring(obj.innerText.indexOf("$")+1));
        var num = Number(document.getElementById(numArray[i].id).value);
        // console.log(price)
        // console.log(num)
        _total += price*num;
    }
    document.getElementById("total").innerText="Price:$"+_total;
}
document.addEventListener('DOMContentLoaded', function() {
    // 获取url
    var params = new URLSearchParams(window.location.search);
    console.log(params)
    // 获取"name"参数
    var role = params.get('role');
    var username = params.get('username')
    console.log(username)

    setTimeout(function (){
        document.getElementById("user_role").innerText = "Welcome,"+ username
    },1000)
});


window.onload = function queryProductList(){
    $.ajax({
        url:"queryProductList",
        dataType:"json",
        type:"GET",
        success:function (res) {
            console.log(res)
            var tbody = document.getElementById('itemList');
            for(var i = 0; i<res.length;i++){
                var newRow = document.createElement("div");
                newRow.setAttribute('class','col-6 col-sm-3 proditem');
                newRow.innerHTML =
                    '<a class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" href="item.html?pid='+res[i].pid+'">' +
                    '<img class="bd-placeholder-img" width="100%" height="96" src="'+res[i].mainimage+'"/>' +
                    '<div class="col-lg-8">' +
                    '<p style="font-size: 0.8em">'+res[i].prodName+'</p>' +
                    '<small class="text-body-secondary item_price">$'+res[i].price+'</small>' +
                    '</div>' +
                    '</a>' +
                    '<div class="button_class">'+
                    '<button type="button" class="btn btn-warning btn-sm" style="width: 200px;" onclick="addProdToCart('+res[i].pid+')">add</button>'+
                    '</div>'
                tbody.appendChild(newRow)
            }
        } ,
        error:function () {
            alert("查询失败");
        }
    });
}



function queryProductById(id){
    var res = new Object()
    $.ajax({
        url:"queryProductById/"+id,
        dataType:"json",
        type:"GET",
        async:false,
        success:function (data) {
            // console.log(data)
            res = data
        } ,
        error:function () {
            res = "queryProductById error"
        }
    });
    // console.log(res)
    return res
}

function addProdToCart(pid, num=1){
    var data = queryProductById(pid)
    var existingProduct = document.getElementById('itemDiv_'+data.pid);

    if(existingProduct){
        var quantityInput = existingProduct.querySelector('#itemButton_'+data.pid);
        var quantity = parseInt(quantityInput.value)+1;
        quantityInput.value = quantity;
        window.localStorage.setItem(data.pid,quantity)
        alert("add product successfully.")
    }else{
        // console.log(data)
        var tbody = document.getElementById('cartList');
        var newRow = document.createElement("div");
        newRow.setAttribute('class','cart-item');
        newRow.setAttribute('id','itemDiv_'+data.pid);
        newRow.innerHTML =
            '<input class="form-check-input" type="checkbox" checked="checked" id="select_item_'+data.pid+'">' +
            '<a href="#">'+data.prodName+'</a>' +
            '<div class="item_operation">' +
            '<p class="price">Price:$'+
            data.price+
            '</p>'+
            '<button class="btn btn-danger btn-sm delete_button" onclick="deleteProductFromCart('+data.pid+')">delete</button>'+
            '<input class="item_num" id="itemButton_'+data.pid+'" type="number" onClick="updateQuantity('+data.pid+')" value="'+num+'" min="0" max="999">' +
            '</div>'
        tbody.appendChild(newRow)
        window.localStorage.setItem(data.pid,num)
        alert("add product successfully.")
    }

}

function updateQuantity(productId) {
    quantity = document.getElementById("itemButton_"+productId).value
    // Update the quantity in the localStorage
    localStorage.setItem(productId, quantity);
    updateTotal()
    // calculateTotal();
}

// Function to delete a product from the shopping list
function deleteProductFromCart(productId) {
    var row = document.getElementById(`itemDiv_${productId}`);
    row.remove();
    localStorage.removeItem(productId);
    updateTotal()
    // calculateTotal();
}

function restoreCartList(){
    var tbody = document.getElementById('cartList');
    for (var i = 0; i < localStorage.length; i++) {
        var productId = localStorage.key(i);
        var quantity = localStorage.getItem(productId);
        addProdToCart(productId,quantity);
        // updateQuantity(productId);
    }
}
// Restore the shopping list when the page is loaded
document.addEventListener('DOMContentLoaded', restoreCartList);

function validate(value) {
    var pattern = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
    if (value === '' || value === null) return false;
    if (pattern.test(value)) {
        alert("非法字符！");
        return false;
    }
    return true;
}

function filterSqlStr(value) {
    var str = "and,delete,or,exec,insert,select,union,update,count,*,',join,>,<";
    var sqlStr = str.split(',');
    var flag = true;

    for (var i = 0; i < sqlStr.length; i++) {
        if (value.toLowerCase().indexOf(sqlStr[i]) != -1) {
            flag = false;
            break;
        }
    }
    alert(flag);
    return flag;
}

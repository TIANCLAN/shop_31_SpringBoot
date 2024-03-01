window.addEventListener('unhandledrejection', (event) => {
    console.log(event.reason);
});

// update total value when change the good's number
function updateTotal(){
    var objArray = document.getElementsByClassName("price");
    var _total = 0;
    for(let i=0;i<objArray.length;i++){
        var obj = objArray[i];
        var price = Number(obj.innerText.substring(obj.innerText.indexOf("$")+1));
        var num = document.getElementById("item_"+(i+1)).value;
        _total += price*num;
    }
    document.getElementById("total").innerText="Price:$"+_total;
}

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
                newRow.setAttribute('class','col-6 col-sm-3');
                newRow.innerHTML =
                    '<a class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" href="item.html?pid='+res[i].pid+'">' +
                    '<img class="bd-placeholder-img" width="100%" height="96" src="'+res[i].mainimage+'"/>' +
                    '<div class="col-lg-8">' +
                    '<p style="font-size: 0.8em">'+res[i].prodName+'</p>' +
                    '<small class="text-body-secondary item_price">$'+res[i].price+'</small>' +
                    '<button type="button" class="btn btn-warning btn-sm" href="item.html?pid='+res[i].pid+'" >add</button>' +
                    '</div>' +
                    '</a>' +
                    '</div>'
                tbody.appendChild(newRow)
            }
        } ,
        error:function () {
            alert("查询失败");
        }
    });
}



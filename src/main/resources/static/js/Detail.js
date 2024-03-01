function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if(r != null) return unescape(r[2]);
    return null; //返回参数值
}
var id = getUrlParam('pid');
//获取url中的参数
//接收URL中的参数goodsId
window.onload = function queryProductById(){
    console.log(id)
    $.ajax({
        url:"queryProductById/"+id,
        dataType:"json",
        type:"GET",
        success:function (data) {
            console.log(data)
            var tbody = document.getElementById('ItemInfo');
            tbody.innerHTML = '<div class="col-auto d-none d-lg-block">' +
                '<img class="bd-placeholder-img"  width="270" height="300" src="'+data.mainimage+'" role="img" preserveAspectRatio="xMidYMid slice" focusable="false" />' +
                '</div>' +
                '<div class="col p-4 d-flex flex-column position-static">' +
                '<strong class="d-inline-block mb-2 text-primary-emphasis">Digital Product'+data.catid+'</strong>' +
                '<h3 class="mb-0">'+data.prodName+'</h3>' +
                '<div class="mb-1 text-body-secondary">5w+ reviews</div>' +
                '<div class="mb-1 text-body-secondary">Color: Blue</div><br><br>' +
                '<h2 class="card-text mb-auto">Price:\t'+data.price+'</h2><br>' +
                '<button type="button" class="btn btn-warning ">Add to CART</button>' +
                '</div>' +
                '</div>';
            document.getElementById('item_description').innerText = data.description;
        } ,
        error:function () {
            alert("查询失败");
        }
    });
}

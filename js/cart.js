/*
	Jethwa, Mittal
	Class Account #jadrn020
	Project #4
	Fall 2017
*/


var all_products = new Array();
$(document).ready(function() {

	var cart = new shopping_cart("jadrn020");
    $('#cart-count').text(cart.size());

    $.get('/perl/jadrn020/proj4/get_products.cgi', storeData);

    var cart_html = display_cart();
    $('#cart-body').html(cart_html);
    
    function display_cart() {
        var mycart = get_cart();
        var html_content = "";
        if (mycart.length === 0) {
            html_content = "<h4>No items to show in the cart</h4>";
        } else {
            // for (i = 0; i < mycart; i++) {

            // }
            html_content =
                "                <div class=\"row header\"> " +
                "                    <div class=\"col-md-6\"> " +
                "                        Item " +
                "                    </div> " +
                "                    <div class=\"col-xs-1\"> " +
                "                        Quantity " +
                "                    </div> " +
                "                    <div class=\"col-md-2 col-xs-offset-1\"> " +
                "                        Price " +
                "                    </div> " +
                "                    <div class=\"col-md-2 text-center\"> " +
                "                        Action " +
                "                    </div> " +
                "                </div> " +
                "                <hr> " +
                "                <div class=\"row\"> " +
                "                    <div class=\"col-md-2 item-thumbnail\"> " +
                "                     <img src='http://www.sees.com/dw/image/v2/AATS_PRD/on/demandware.static/-/Sites-sees-catalog/default/" +
                "dw58719efb/images/christmas/assorted-chocolates-321-candy-xm-box-alt1.jpg?sw=1036&sh=1036' width=\"50px\" height=\"auto\" /> " +
                "                    </div> " +
                "                    <div class=\"col-md-4\"> " +
                "                        <div class=\"product-title\">Classic Dark Chocolate Assortment</div> " +
                "                        <div class=\"product-number\"> " +
                "                            <small> " +
                "                            <span>Item #</span> " +
                "                            <span class=\"product-sku\">84X99B43C</span> " +
                "                        </small> " +
                "                        </div> " +
                "                    </div> " +
                "                    <div class=\"col-xs-1\"> " +
                "                        <input type=\"text\" class=\"form-control product-qty text-center\" id=\"qty_84X99B43C\" value=\"3\"> " +
                "                    </div> " +
                "                    <div class=\"col-md-2 col-xs-offset-1\"> " +
                "                        <strong>$<span class=\"product-price\">15.99</span></strong> " +
                "                    </div> " +
                "                    <div class=\"col-md-2\"> " +
                "                        <input type=\"button\" class=\"product-remove btn btn-default\" id=\"rm_84X99B43C\" value=\"Update\"> " +
                "                        <input type=\"button\" class=\"product-remove btn btn-link\" id=\"rm_84X99B43C\" value=\"Remove\"> " +
                "                    </div> " +
                "                </div> " +
                "                <hr> " +
                "                <div class=\"row\"> " +
                "                    <div class=\"col-md-2 col-md-offset-8\"> " +
                "                        <h4>Subtotal</h4> " +
                "                    </div> " +
                "                    <div class=\"col-md-2 text-right\"> " +
                "                        <h4>$<span id=\"subtotal\">200.99</span></h4> " +
                "                    </div> " +
                "                </div> " +
                "                <div class=\"row\"> " +
                "                    <div class=\"col-md-2 col-md-offset-8\"> " +
                "                        <h4>Estimated Tax <span class=\"glyphicon glyphicon-info-sign\" tabindex=\"-1\" data-toggle=\"popover\" " +
                "                      data-trigger=\"focus\" title=\"\" data-placement=\"bottom\" data-content=\"Standard 8% taxes are applied " +
                "for all purchases.\"></span></h4> " +
                "                    </div> " +
                "                    <div class=\"col-md-2 text-right\"> " +
                "                        <h4>$<span id=\"taxes\">16.00</span></h4> " +
                "                    </div> " +
                "                </div> " +
                "                <div class=\"row\"> " +
                "                    <div class=\"col-md-2 col-md-offset-8\"> " +
                "                        <h4>Shipping charges</h4> " +
                "                    </div> " +
                "                    <div class=\"col-md-2 text-right\"> " +
                "                        <h4>$2.00</h4> " +
                "                    </div> " +
                "                </div> " +
                "                <hr class=\"col-md-4 col-md-offset-8\"> " +
                "                <div class=\"row\"> " +
                "                    <div class=\"col-md-2 col-md-offset-8\"> " +
                "                        <h2>Total</h2> " +
                "                    </div> " +
                "                    <div class=\"col-md-2 text-right\"> " +
                "                        <h2>$<span id=\"total\">218.99</span></h2> " +
                "                    </div> " +
                "                </div> " +
                "            </div> ";
        }
       return html_content;
        //$('#cart-body').html(html_content);
    }


    function get_cart() {
        var mycart_items = cart.getCartArray();
        var final_cart = new Array();
    	console.log(mycart_items.length);
    	console.log(all_products.length);
        for (var i = 0; i < mycart_items.length; i++) {
            for (var j = 0; j < all_products.length; j++) {
            	console.log(mycart_items[i][0]);
    			console.log(all_products[j][0][0]);
    			console.log("printing");
                if (mycart_items[i][0] == all_products[j][0][0]) {
                    final_cart[i] = new Array();
                    final_cart[i] = all_products[j][0];
                    break;
                }
            }
        }
        return final_cart;
    } 	

});

function storeData(response) {
    var tmpArray = explodeArray(response, ';');
    for (i = 0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i], '|');
       	all_products[i] = innerArray;
    }
}

// from http://www.webmasterworld.com/forum91/3262.htm            
function explodeArray(item, delimiter) {
    tempArray = new Array(1);
    var Count = 0;
    var tempString = new String(item);

    while (tempString.indexOf(delimiter) > 0) {
        tempArray[Count] = tempString.substr(0, tempString.indexOf(delimiter));
        tempString = tempString.substr(tempString.indexOf(delimiter) + 1, tempString.length - tempString.indexOf(delimiter) + 1);
        Count = Count + 1
    }

    tempArray[Count] = tempString;
    return tempArray;
}



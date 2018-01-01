/*
	Jethwa, Mittal
	Class Account #jadrn020
	Project #4
	Fall 2017
*/
var proj4_data = new Array();

$(document).ready(function() {
	
	$.get('/perl/jadrn020/proj4/get_products.cgi', storeData);

	var cart = new shopping_cart("jadrn020");
    
    $('#cart-count').text(cart.size());

    $('#cart').on('click', function() {
    	console.log("Cart Clicked");
        var cart_html = display_cart();

        if($('body').is('.home-page')) {
        	$('div.jumbotron').first().remove();
        	$('footer').remove();
        	$('nav').removeAttr('data-spy data-offset-top').removeClass('affix-top').addClass('navbar-fixed-top');
        	$('.container').css('margin-top','100px');
        }
        $('.container').html(cart_html);
        $("[data-toggle=popover]").popover();   
    });

    $(document).on('input', ".product-qty", function() {
        var sku = this.id.replace("qty_","");
        console.log(this);
        var input_handle = $(this);
        var prod_total_handle = $("#total_"+sku);
        var price_handle = $("#price_"+sku);
        var subtotal_handle = $('#subtotal');
        var taxes_handle = $('#taxes');
        var total_handle = $('#total');
        
        var subtotal =0.00;
		var total=0.00;
		var taxes=0.00;
    	
        var price = price_handle.text();
        var quantity = (input_handle.val() == "") ? 1 : input_handle.val().replace(/\D/g,'');
        var curr_prod_total;

        input_handle.val(quantity);
        cart.setQuantity(sku, quantity);
        console.log(cart.size());
        curr_prod_total = Math.round(quantity*price * 100)/100; 
		
		subtotal = get_subtotal();
		taxes = Math.round(subtotal * 0.08 * 100) / 100;
    	total = subtotal + taxes + 2.00;
    	total = Math.round(total * 100) / 100;

    	console.log(subtotal);
    	console.log(taxes);
    	console.log(total);
		
        setTimeout(function(){
				$('#cart-count').text(cart.size());
				prod_total_handle.text(curr_prod_total.toFixed(2));
				// taxes = subtotal * 0.08;
				// total = subtotal + taxes + 2.00; 
				subtotal_handle.text((Math.round(subtotal*100)/100).toFixed(2));
				taxes_handle.text((Math.round(taxes*100)/100).toFixed(2));
				total_handle.text((Math.round(total*100)/100).toFixed(2));

            }, 1000);

        console.log("Updated Size: " + cart.size());
    });

    $( ".product-qty").keypress(function( event ) {
    	var charcode = event.which;
		if ( charCode > 31 && (charCode < 48 || charCode > 57)) {
		     event.preventDefault();
		}
	});

    $(document).on('click', ".product-remove", function() {
        var sku = this.id.replace("rm_","");
        cart.delete(sku);
        $('#cart-count').text(cart.size());
        var cart_html = display_cart();
        $('.container').html(cart_html);
    });

    function display_cart() {
        var mycart = get_cart();
        var html_content = "";
        console.log(mycart);
        if (mycart.length === 0) {
            html_content = "<div>" +
                "<h4 id=\"empty-msg\" class=\"text-danger\"><span class=\"glyphicon glyphicon-warning-sign\"> </span><strong>No items in your cart. Please add items to your cart.</strong></h4>"+
            "</div>";
        } else {

        	var subtotal =0.00;
        	var total=0.00;
        	var taxes=0.00;
            html_content = "<h2>Your Shopping Cart</h2>"+
                "<hr>"+
                "                <div class=\"row header\"> " +
                "                    <div class=\"col-md-6 text-center\"> " +
                "                        Item " +
                "                    </div> " +
                // "                    <div class=\"col-xs-1\"> " +
                // "                        Quantity " +
                // "                    </div> " +
                // "                    <div class=\"col-md-2 col-xs-offset-1\"> " +
                // "                        Price " +
                // "                    </div> " +
                "                   <div class=\"col-md-2 text-center\"> " +
                "                        Price " +
                "                    </div> " +
                "                    <div class=\"col-md-1 text-center\"> " +
                "                        Quantity " +
                "                    </div> " +
                "                   <div class=\"col-md-2 text-center\"> " +
                "                        Total " +
                "                    </div> " +
                "                    <div class=\"col-md-1 text-center\"> " +
                "                        Action " +
                "                    </div> " +
                "                </div> " ;

            for (i = 0; i < mycart.length; i++) {

                html_content+=
                "                <hr> " +
                "                <div class=\"row\"> " +
                "                    <div class=\"col-md-2 text-center\"> " +
                "                     <img src=\"/~jadrn000/PROJ4_IMAGES/" +
                                         mycart[i][0] + ".jpg\" alt=\"" + mycart[i][2] + "\" width=\"100px\" height=\"100px\" /> " +
                "                    </div> " +
                "                    <div class=\"col-md-4\"> " +
                "                        <div class=\"product-title\">"+ mycart[i][2] +"</div> " +
                "                        <div class=\"product-number\"> " +
                "                            <small> " +
                "                            <span>Item #</span> " +
                "                            <span class=\"product-sku\">"+mycart[i][0] +"</span> " +
                "                        </small> " +
                "                        </div> " +
                "                    </div> " +
                "                    <div class=\"col-md-2 text-center\"> " +
                "                        <strong>$<span class=\"product-price\" id=\"price_"+ mycart[i][0] +"\">"+mycart[i][6]+"</span></strong> " +
                "                    </div> " +
                "                    <div class=\"col-md-1 text-center\"> " +
                "                        <input type=\"text\" class=\"form-control product-qty text-center\" id=\"qty_"+ mycart[i][0] +"\" value=\""+mycart[i][8]+"\"> " +
                "                    </div> " +
                "                    <div class=\"col-md-2 text-center\"> " +
                "                        <strong>$<span class=\"product-total\" id=\"total_"+ mycart[i][0] + "\">"+(Math.round(mycart[i][6]*mycart[i][8] * 100) / 100).toFixed(2) +"</span></strong> " +
                "                    </div> " +
                "                    <div class=\"col-md-1 text-center\"> " +
                // "                        <input type=\"button\" class=\"product-remove btn btn-default\" id=\"update_"+ mycart[i][0] +"\" value=\"Update\"> " +
                "                        <input type=\"button\" class=\"product-remove btn btn-link\" id=\"rm_"+ mycart[i][0] +"\" value=\"Remove\"> " +
                "                    </div> " +
                "                </div> " ;

                subtotal += (mycart[i][6]*mycart[i][8]);
            }

            taxes = subtotal * 0.08;
            total = subtotal + taxes + 2.00; 

                html_content+= 

                "                <hr> " +
                "                <div class=\"row\"> " +
                "                    <div class=\"col-md-2 col-md-offset-8\"> " +
                "                        <h4>Subtotal</h4> " +
                "                    </div> " +
                "                    <div class=\"col-md-2 text-right\"> " +
                "                        <h4>$<span id=\"subtotal\">"+(Math.round(subtotal * 100) / 100).toFixed(2)+"</span></h4> " +
                "                    </div> " +
                "                </div> " +
                "                <div class=\"row\"> " +
                "                    <div class=\"col-md-2 col-md-offset-8\"> " +
                "                        <h4>Estimated Tax <span class=\"glyphicon glyphicon-info-sign\" tabindex=\"-1\" data-toggle=\"popover\" " +
                "                      data-trigger=\"focus\" title=\"\" data-placement=\"bottom\" data-content=\"Standard 8% taxes are applied " +
                "for all purchases.\"></span></h4> " +
                "                    </div> " +
                "                    <div class=\"col-md-2 text-right\"> " +
                "                        <h4>$<span id=\"taxes\">"+(Math.round(taxes * 100) / 100).toFixed(2)+"</span></h4> " +
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
                "                        <h2>$<span id=\"total\">"+(Math.round(total * 100) / 100).toFixed(2)+"</span></h2> " +
                "                    </div> " +
                "                </div> " +
                "                <div class=\"row text-center\"> " +
                "                    <div class=\"col-md-4 col-md-offset-8\"> " +
				"						<a href=\"order_online.html\" class=\"btn btn-lg btn-default btn-checkout\"><span class=\"glyphicon glyphicon-check\"></span>Checkout</a>" +
                "                    </div> " +
                "                </div> " +
                "            </div> ";
        }
       return html_content;
    }

    function get_subtotal() {
    	var mycart_items = cart.getCartArray();
    	var subtotal = 0.00;
    	console.log("cart :" + mycart_items);
    	for (var i = 0; i < mycart_items.length; i++) {
    		subtotal += parseFloat(mycart_items[i][1])*parseFloat(mycart_items[i][2]);    		
    	}
    	
    	return Math.round(subtotal * 100) / 100;
    }

    function get_cart() {
        var mycart_items = cart.getCartArray();
        var  final_cart = new Array();
        console.log(mycart_items.length);
        console.log(proj4_data.length);
        for (var i = 0; i < mycart_items.length; i++) {
            for (var j = 0; j < proj4_data.length; j++) {
                console.log(mycart_items[i][0]);
                console.log(proj4_data[j][0]);
                console.log("printing");
                if (mycart_items[i][0] == proj4_data[j][0]) {
                    final_cart[i] = proj4_data[j];
                    final_cart[i][8]=mycart_items[i][1]; //Pushing quantity in the cart
                    break;
                }
            }
        }
        console.log("final cart"+final_cart);
        return final_cart;
    }

    $(document).on('click', ".btn-shop", function() {
    	console.log("clicked");
    	var sku = this.id;
        var btn_handle = $(this);
        var category = btn_handle.data("category");
        switch(category) {
			case "Brittles and toffies":
			    category = "#brittle";
			    break;
			case "Dark chocolate":
			    category = "#dark-choc";
			    break;
		   	case "Gifts":
		    	category = "#gifts";
		    	break;
		    case "Holiday assortments":
		    	category = "#holiday-assort";
		    	break;
		    case "Milk chocolate":
		    	category = "#milk-choc";
		    	break;
		    case "Nuts and chews":
		    	category = "#nuts";
		    	break;
		    case "Truffles":
		    	category = "#truffles";
		    	break;
		}

		location.href = "http://jadran.sdsu.edu/~jadrn020/proj4/products.html?scrollTo=#"+sku+"="+category;
		// $(category).click();
		// alert("Category clicked:"+category);
		// var offsetSize = $(".nav").innerHeight();
		// setTimeout(function() {
		// 	$("html, body").animate({scrollTop:$('#'+sku).parent().parent().parent().offset().top-20-offsetSize }, 500);
		// 	},500);
    });
    // $(window).scroll(function() {    
 //    var scroll = $(window).scrollTop();
 //       if (scroll >= 240) {
 //          $("#nav").addClass("navbar-fixed-top");
 //          $("#nav").attr('margin-bottom','50px');
 //        } else {
 //          $("#nav").removeClass("navbar-fixed-top");
 //          $("#nav").removeAttr('margin-bottom');
 //        }
	// });
});


function storeData(response) {
    var tmpArray = explodeArray(response, ';');
    for (var i = 0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i], '|');
        proj4_data[i] = innerArray;
    }

    if($('body').is('.products-page')) {
    	// $("#brittle").trigger('click');
    	var random_arr = get_random_array(proj4_data.length-1,proj4_data.length-1); //Get 6 random indexes between 0 to proj4_data.length
    	console.log(random_arr);
    	display_random_products_productpage(random_arr);
    }

	if($('body').is('.home-page')) {
		console.log(proj4_data.length);
    	var random_arr = get_random_array(proj4_data.length-1,3); //Get 3 random indexes between 0 to proj4_data.length
    	console.log(random_arr);
    	display_random_products_homepage(random_arr);
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

// Citation: https://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100
function get_random_array(dataset_count,random_items_count) {
	var arr = new Array();
	while(arr.length < random_items_count) {
	    var randomnumber = Math.floor(Math.random()*dataset_count);
	    if(arr.indexOf(randomnumber) > -1) continue;
	    arr[arr.length] = randomnumber;
	}
	return arr;
}

function display_random_products_productpage(random_index_arr) {
	var products_html = "";
	var random_index;
	var item_count = 1;
	for (var i = 0;	i < random_index_arr.length; i++) {
		random_index = random_index_arr[i];
		if (item_count % 2 == 1)
	        products_html += "<div class=\"row\">";    
	    products_html +=    "<div class=\"card col-lg-5\">" +
	                    "       <img class=\"card-img-top\" src=\"/~jadrn000/PROJ4_IMAGES/" +
	                            proj4_data[random_index][0] + ".jpg\" alt=\"" + proj4_data[random_index][2] + "\"" +
	                            "/>";
	    products_html +=    "<div class=\"card-block\">" +
	                    "<h4 class=\"card-title text-center\">"+proj4_data[random_index][2]+"</h4>" +
	                    "<p class=\"card-text\">"+proj4_data[random_index][3]+"</p>" +
	                    "</div>";
	    products_html +=    "<div class=\"card-footer\">" +
	                    "<button class=\"btn btn-default add-cart pull-left\" id=" + proj4_data[random_index][0] + " data-price=" + proj4_data[random_index][6] + "><span class=\"glyphicon glyphicon-shopping-cart\"></span></button>" +
	                    "<span class=\"text-success item-added-msg\">Added to cart</span>" +
	                    "<p class=\"price pull-right\">$" + proj4_data[random_index][6] + "</p>" +
	                    "</div>" +
	                    "</div>";   
	    if (item_count % 2 == 0 || item_count == proj4_data.length)
	        products_html += "</div>";          
	    item_count++;
	}
	$('#product-details').html(products_html);
}

function display_random_products_homepage(random_index_arr) {
	var products_html = "";
	var random_index;
	for (var i = 0;	i < random_index_arr.length; i++) {
		random_index = random_index_arr[i];
		products_html += 
		"<div class=\"item\"> "+
		"    <div class=\"carousel-img-wrapper\"> "+
		        "<img src=\"/~jadrn000/PROJ4_IMAGES/"+ proj4_data[random_index][0] +".jpg\" class=\"carousel-img pull-left\" alt=\""+ proj4_data[random_index][2] +"\">"+
		"    </div> "+
		"    <div class=\"item-details\"> "+
		"        <div class=\"item-header\"> "+
		"            <h3>"+proj4_data[random_index][2]+"</h3> "+
		"            <small>Item #: "+ proj4_data[random_index][0] +"</small> "+
		"        </div> "+
		"        <div class=\"item-details\"> "+
		            "<p>"+ proj4_data[random_index][3] +"</p>"+
		"        </div> "+
		"        <div class=\"item-footer\"> "+
		"            <h4 class=\"pull-left\"><strong>Price: $"+ proj4_data[random_index][6] +"</strong></h4> "+
		            "<button class=\"btn btn-lg btn-default btn-shop pull-right\" id=\""+proj4_data[random_index][0]+"\" data-price=\""+ proj4_data[random_index][6] +"\" data-category=\""+ proj4_data[random_index][1] +"\">Shop Now</ button>"+
		"        </div> "+
		"    </div> "+
		"</div> ";
    } 
    console.log(proj4_data);
    $('.carousel-inner').html(products_html);
    $('.carousel-inner').children(':first').addClass('active');

}
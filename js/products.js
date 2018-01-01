/*
    Jethwa, Mittal
    Class Account #jadrn020
    Project #4
    Fall 2017
*/



// var proj4_data = new Array();

$(document).ready(function(e) {
    // $.get('/perl/jadrn020/proj4/get_products.cgi', storeData);

    var cart = new shopping_cart("jadrn020");

    $('#cart-count').text(cart.size());

    var param = window.location.href.split('?').pop();
    if(param.startsWith('scrollTo')) {
        var paramArr = param.split('=');
        var id = paramArr[1];
        var category = paramArr[2];
        // $(category).trigger('click');
        console.log("Categor:+"+category+" id:"+id);
        // jQuery('#dark-choc')[0].click();
        var offsetSize = $(".nav").innerHeight();
        setTimeout(function() {
            $("html, body").animate({scrollTop:$(id).parent().parent().parent().offset().top-20-offsetSize }, 500);
            },500);
        setTimeout(function() {
            $(id).parent().parent().addClass('highlighted');
            },900);
        setTimeout(function() {
           $(id).parent().parent().removeClass("highlighted");
           },3000);
    }

    $(document).on('click', ".btn-shop", function() {
        
    });

    console.log("Proj 4 length: " + proj4_data.length);
    console.log("Proj 4 data: " + proj4_data);

    $('#all_prod').on('click', function() {
       // $(this).parent().siblings('.active').removeClass('active');
       // $(this).parent().addClass('active');
       location.reload();

    });

    $('#brittle').on('click', function() {
       $(this).parent().siblings('.active').removeClass('active');
       $(this).parent().addClass('active');
       tmpString = "";
        var item_count = 1;
        for (var i = 0; i < proj4_data.length; i++) {
            if (proj4_data[i][1] == "Brittles and toffies") {
                if (item_count % 2 == 1)
                    tmpString += "<div class=\"row\">";    
                tmpString +=    "<div class=\"card col-lg-5\">" +
                                "       <img class=\"card-img-top\" src=\"/~jadrn000/PROJ4_IMAGES/" +
                                        proj4_data[i][0] + ".jpg\" alt=\"" + proj4_data[i][2] + "\"" +
                                        "/>";
                tmpString +=    "<div class=\"card-block\">" +
                                "<h4 class=\"card-title text-center\">"+proj4_data[i][2]+"</h4>" +
                                "<p class=\"card-text\">"+proj4_data[i][3]+"</p>" +
                                "</div>";
                tmpString +=    "<div class=\"card-footer\">" +
                                "<button class=\"btn btn-default add-cart pull-left\" id=" + proj4_data[i][0] + " data-price=" + proj4_data[i][6] + "><span class=\"glyphicon glyphicon-shopping-cart\"></span></button>" +
                                "<span class=\"text-success item-added-msg\">Added to cart</span>" +
                                "<p class=\"price pull-right\">$" + proj4_data[i][6] + "</p>" +
                                "</div>" +
                                "</div>";   
                if (item_count % 2 == 0 || item_count == proj4_data.length)
                    tmpString += "</div>";          
                item_count++;
            }
        }
        var handle = document.getElementById('product-details');
        handle.innerHTML = tmpString;
    });

    $('#dark-choc').on('click', function() {
        $(this).parent().siblings('.active').removeClass('active');
        $(this).parent().addClass('active');
        tmpString = "";
        var item_count = 1;
            for (var i = 0; i < proj4_data.length; i++) {
                if (proj4_data[i][1] == "Dark chocolate") {
                    if (item_count % 2 == 1)
                        tmpString += "<div class=\"row\">";    
                    tmpString +=    "<div class=\"card col-lg-5\">" +
                                    "       <img class=\"card-img-top\" src=\"/~jadrn000/PROJ4_IMAGES/" +
                                            proj4_data[i][0] + ".jpg\" alt=\"" + proj4_data[i][2] + "\"" +
                                            "/>";
                    tmpString +=    "<div class=\"card-block\">" +
                                    "<h4 class=\"card-title text-center\">"+proj4_data[i][2]+"</h4>" +
                                    "<p class=\"card-text\">"+proj4_data[i][3]+"</p>" +
                                    "</div>";
                    tmpString +=    "<div class=\"card-footer\">" +
                                    "<button class=\"btn btn-default add-cart pull-left\" id=" + proj4_data[i][0] + " data-price=" + proj4_data[i][6] + "><span class=\"glyphicon glyphicon-shopping-cart\"></span></button>" +
                                    "<span class=\"text-success item-added-msg\">Added to cart</span>" +
                                    "<p class=\"price pull-right\">$" + proj4_data[i][6] + "</p>" +
                                    "</div>" +
                                    "</div>";   
                    if (item_count % 2 == 0 || item_count == proj4_data.length)
                        tmpString += "</div>";          
                    item_count++;
                    // for (var j = 0; j < proj4_data[i].length; j++)
                    //     tmpString += proj4_data[i][j] + "<br />";
                }
            }
        var handle = document.getElementById('product-details');
        handle.innerHTML = tmpString;
    });

    $('#gifts').on('click', function() {
        $(this).parent().siblings('.active').removeClass('active');
        $(this).parent().addClass('active');
        tmpString = "";
        var item_count = 1;
        for (var i = 0; i < proj4_data.length; i++) {
                if (proj4_data[i][1] == "Gifts") {
                    if (item_count % 2 == 1)
                        tmpString += "<div class=\"row\">";    
                    tmpString +=    "<div class=\"card col-lg-5\">" +
                                    "       <img class=\"card-img-top\" src=\"/~jadrn000/PROJ4_IMAGES/" +
                                            proj4_data[i][0] + ".jpg\" alt=\"" + proj4_data[i][2] + "\"" +
                                            "/>";
                    tmpString +=    "<div class=\"card-block\">" +
                                    "<h4 class=\"card-title text-center\">"+proj4_data[i][2]+"</h4>" +
                                    "<p class=\"card-text\">"+proj4_data[i][3]+"</p>" +
                                    "</div>";
                    tmpString +=    "<div class=\"card-footer\">" +
                                    "<button class=\"btn btn-default add-cart pull-left\" id=" + proj4_data[i][0] + " data-price=" + proj4_data[i][6] + "><span class=\"glyphicon glyphicon-shopping-cart\"></span></button>" +
                                    "<span class=\"text-success item-added-msg\">Added to cart</span>" +
                                    "<p class=\"price pull-right\">$" + proj4_data[i][6] + "</p>" +
                                    "</div>" +
                                    "</div>";   
                    if (item_count % 2 == 0 || item_count == proj4_data.length)
                        tmpString += "</div>";          
                    item_count++;
                    // for (var j = 0; j < proj4_data[i].length; j++)
                    //     tmpString += proj4_data[i][j] + "<br />";
                }
            }
        var handle = document.getElementById('product-details');
        handle.innerHTML = tmpString;
    })

    $('#holiday-assort').on('click', function() {
        $(this).parent().siblings('.active').removeClass('active');
        $(this).parent().addClass('active');
        tmpString = "";
        var item_count = 1;
        for (var i = 0; i < proj4_data.length; i++) {
            if (proj4_data[i][1] == "Holiday assortments") {
                if (item_count % 2 == 1)
                    tmpString += "<div class=\"row\">";    
                tmpString +=    "<div class=\"card col-lg-5\">" +
                                "       <img class=\"card-img-top\" src=\"/~jadrn000/PROJ4_IMAGES/" +
                                        proj4_data[i][0] + ".jpg\" alt=\"" + proj4_data[i][2] + "\"" +
                                        "/>";
                tmpString +=    "<div class=\"card-block\">" +
                                "<h4 class=\"card-title text-center\">"+proj4_data[i][2]+"</h4>" +
                                "<p class=\"card-text\">"+proj4_data[i][3]+"</p>" +
                                "</div>";
                tmpString +=    "<div class=\"card-footer\">" +
                                "<button class=\"btn btn-default add-cart pull-left\" id=" + proj4_data[i][0] + " data-price=" + proj4_data[i][6] + "><span class=\"glyphicon glyphicon-shopping-cart\"></span></button>" +
                                "<span class=\"text-success item-added-msg\">Added to cart</span>" +
                                "<p class=\"price pull-right\">$" + proj4_data[i][6] + "</p>" +
                                "</div>" +
                                "</div>";   
                if (item_count % 2 == 0 || item_count == proj4_data.length)
                    tmpString += "</div>";          
                item_count++;
                // for (var j = 0; j < proj4_data[i].length; j++)
                //     tmpString += proj4_data[i][j] + "<br />";
            }
        }
        var handle = document.getElementById('product-details');
        handle.innerHTML = tmpString;
    });

    $('#milk-choc').on('click', function() {
        $(this).parent().siblings('.active').removeClass('active');
        $(this).parent().addClass('active');
        tmpString = "";
        var item_count = 1;
        for (var i = 0; i < proj4_data.length; i++) {
            if (proj4_data[i][1] == "Milk chocolate") {
                if (item_count % 2 == 1)
                    tmpString += "<div class=\"row\">";    
                tmpString +=    "<div class=\"card col-lg-5\">" +
                                "       <img class=\"card-img-top\" src=\"/~jadrn000/PROJ4_IMAGES/" +
                                        proj4_data[i][0] + ".jpg\" alt=\"" + proj4_data[i][2] + "\"" +
                                        "/>";
                tmpString +=    "<div class=\"card-block\">" +
                                "<h4 class=\"card-title text-center\">"+proj4_data[i][2]+"</h4>" +
                                "<p class=\"card-text\">"+proj4_data[i][3]+"</p>" +
                                "</div>";
                tmpString +=    "<div class=\"card-footer\">" +
                                "<button class=\"btn btn-default add-cart pull-left\" id=" + proj4_data[i][0] + " data-price=" + proj4_data[i][6] + "><span class=\"glyphicon glyphicon-shopping-cart\"></span></button>" +
                                "<span class=\"text-success item-added-msg\">Added to cart</span>" +
                                "<p class=\"price pull-right\">$" + proj4_data[i][6] + "</p>" +
                                "</div>" +
                                "</div>";   
                if (item_count % 2 == 0 || item_count == proj4_data.length)
                    tmpString += "</div>";          
                item_count++;
                // for (var j = 0; j < proj4_data[i].length; j++)
                //     tmpString += proj4_data[i][j] + "<br />";
            }
        }
        var handle = document.getElementById('product-details');
        handle.innerHTML = tmpString;
    });

    $('#nuts').on('click', function() {
        $(this).parent().siblings('.active').removeClass('active');
        $(this).parent().addClass('active');
        tmpString = "";
        var item_count = 1;
        for (var i = 0; i < proj4_data.length; i++) {
            if (proj4_data[i][1] == "Nuts and chews") {
                if (item_count % 2 == 1)
                    tmpString += "<div class=\"row\">";    
                tmpString +=    "<div class=\"card col-lg-5\">" +
                                "       <img class=\"card-img-top\" src=\"/~jadrn000/PROJ4_IMAGES/" +
                                        proj4_data[i][0] + ".jpg\" alt=\"" + proj4_data[i][2] + "\"" +
                                        "/>";
                tmpString +=    "<div class=\"card-block\">" +
                                "<h4 class=\"card-title text-center\">"+proj4_data[i][2]+"</h4>" +
                                "<p class=\"card-text\">"+proj4_data[i][3]+"</p>" +
                                "</div>";
                tmpString +=    "<div class=\"card-footer\">" +
                                "<button class=\"btn btn-default add-cart pull-left\" id=" + proj4_data[i][0] + " data-price=" + proj4_data[i][6] +  "><span class=\"glyphicon glyphicon-shopping-cart\"></span></button>" +
                                "<span class=\"text-success item-added-msg\">Added to cart</span>" +
                                "<p class=\"price pull-right\">$" + proj4_data[i][6] + "</p>" +
                                "</div>" +
                                "</div>";   
                if (item_count % 2 == 0 || item_count == proj4_data.length)
                    tmpString += "</div>";          
                item_count++;
                // for (var j = 0; j < proj4_data[i].length; j++)
                //     tmpString += proj4_data[i][j] + "<br />";
            }
        }
        var handle = document.getElementById('product-details');
        handle.innerHTML = tmpString;
    });

    $('#truffles').on('click', function() {
        $(this).parent().siblings('.active').removeClass('active');
        $(this).parent().addClass('active');
        tmpString = "";
        var item_count = 1;
        for (var i = 0; i < proj4_data.length; i++) {
            if (proj4_data[i][1] == "Truffles") {
                if (item_count % 2 == 1)
                    tmpString += "<div class=\"row\">";    
                tmpString +=    "<div class=\"card col-lg-5\">" +
                                "       <img class=\"card-img-top\" src=\"/~jadrn000/PROJ4_IMAGES/" +
                                        proj4_data[i][0] + ".jpg\" alt=\"" + proj4_data[i][2] + "\"" +
                                        "/>";
                tmpString +=    "<div class=\"card-block\">" +
                                "<h4 class=\"card-title text-center\">"+proj4_data[i][2]+"</h4>" +
                                "<p class=\"card-text\">"+proj4_data[i][3]+"</p>" +
                                "</div>";
                tmpString +=    "<div class=\"card-footer\">" +
                                "<button class=\"btn btn-default add-cart pull-left\" id=" + proj4_data[i][0] + " data-price=" + proj4_data[i][6] + "><span class=\"glyphicon glyphicon-shopping-cart\"></span></button>" +
                                "<span class=\"text-success item-added-msg\">Added to cart</span>" +
                                "<p class=\"price pull-right\">$" + proj4_data[i][6] + "</p>" +
                                "</div>" +
                                "</div>";   
                if (item_count % 2 == 0 || item_count == proj4_data.length)
                    tmpString += "</div>";          
                item_count++;
                // for (var j = 0; j < proj4_data[i].length; j++)
                //     tmpString += proj4_data[i][j] + "<br />";
            }
        }
        var handle = document.getElementById('product-details');
        handle.innerHTML = tmpString;
    }); 

    // $('#product-details').on('click', $('input[type="button"]'), function(e) {
    //     if ($(e.target).val() != 'Add to Cart') return;
    //     alert("The SKU is " + $(e.target).attr("name"));
    // });

    $(document).on('click', ".add-cart", function() {
        var sku = this.id;
        var btn_handle = $(this);
        var price = btn_handle.data("price");
        cart.add(sku, 1, price);
        $(this).next().fadeIn(50).fadeOut(2000);
        $('#cart-count').text(cart.size());
        console.log(cart.size());
    });

    /*

    $('#cart').on('click', function() {
        var cart_html = display_cart();
        $('.container').html(cart_html);
        $("[data-toggle=popover]").popover();   
    });

    $(document).on('input', ".product-qty", function() {
        var sku = this.id.replace("qty_","");
        console.log(this);
        var input_handle = $(this);
        var total_handle = $("#total_"+sku);
        var price_handle = $("#price_"+sku);
        var quantity = (input_handle.val() == "") ? 0 : input_handle.val();
        var price = price_handle.text();
        cart.setQuantity(sku, quantity);
        setTimeout(function(){
              $('#cart-count').text(cart.size());
              total_handle.text((Math.round(quantity*price * 100)/100).toFixed(2));
            }, 1000);

        console.log("Updated Size: " + cart.size());
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
            html_content = "<h4>No items to show in the cart</h4>";
        } else {

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
            }

                html_content+= 

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
    }


    function get_cart() {
        var mycart_items = cart.getCartArray();
        var  final_cart= new Array();
        console.log(mycart_items.length);
        console.log(proj4_data.length);
        for (var i = 0; i < mycart_items.length; i++) {
            for (var j = 0; j < proj4_data.length; j++) {
                console.log(mycart_items[i][0]);
                console.log(proj4_data[j][0]);
                console.log("printing");
                if (mycart_items[i][0] == proj4_data[j][0]) {
                    final_cart[i] = proj4_data[j];
                    final_cart[i].push(mycart_items[i][1]); //Pushing quantity in the cart
                    break;
                }
            }
        }
        console.log("final cart"+final_cart);
        return final_cart;
    }

    */


});



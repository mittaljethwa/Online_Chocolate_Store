/*
	Jethwa, Mittal
	Class Account #jadrn020
	Project #4
	Fall 2017
*/
$(document).ready(function() {

    $('form').each(function() { this.reset() });

    var cart = new shopping_cart("jadrn020");
    $('#cart-count').text(cart.size());

    if (cart.size() == 0)
    {
    	$('#place-order').prop("disabled",true);
    	$('#empty-msg').show();
    	$('#form-container').hide();
    }

    // Check if same address is to be used
    $('#same-address').change(function() {
        if (this.checked) {
            $('input[name="bill_first_name"]').val($('input[name="ship_first_name"]').val());
            $('input[name="bill_last_name"]').val($('input[name="ship_last_name"]').val());
            $('input[name="bill_address"]').val($('input[name="ship_address"]').val());
            $('input[name="bill_address2"]').val($('input[name="ship_address2"]').val());
            $('input[name="bill_city"]').val($('input[name="ship_city"]').val());
            $('input[name="bill_state"]').val($('input[name="ship_state"]').val());
            $('input[name="bill_zip_code"]').val($('input[name="ship_zip_code"]').val());
            $('input[name="bill_phone_number"]').val($('input[name="ship_phone_number"]').val());
            $('input[name="bill_email_address"]').val($('input[name="ship_email_address"]').val());

            $("input[name^='bill_']").trigger("keypress");

            //Skip Billing section and Scroll to Payment details
            setTimeout(function() {
                $('html,body').animate({ scrollTop: $('#payment-panel').offset().top - $('#nav').height() - 10 });
            }, 500);
        }
    });

    $("#place-order").click(function(e) {
        e.preventDefault();
        // populate_confirmation();
        // $('#confirmation_modal').modal('show');
        console.log("in place order");
        console.log(valid_data());
        if (valid_data()) {
            var mycart_items = cart.getCartArray();
            $.ajax({
                type: 'POST',
                url: '/perl/jadrn020/proj4/log_order.cgi',
                data: { items: mycart_items },
                success: function(res) {
                    console.log("CGI called" + mycart_items);
                    if (res.startsWith("Success")) {
                        populate_confirmation();
                        cart.emptyCart();
                        $('#confirmation_modal').modal('show');
                    }
                    $('#cart-count').text(cart.size());
                    console.log(cart.size());

                },
                error: function() { alert("did not work"); }
            });
        }
    });

    $('input[name="ship_phone_number"]').on('keypress', function() {
        $('input[name="ship_phone_number"]').val($('input[name="ship_phone_number"]').val().replace(/\D/g, ''));
    });

    $('input[name="ship_phone_number"]').on('keyup', function() {
        $('input[name="ship_phone_number"]').val($('input[name="ship_phone_number"]').val().replace(/\D/g, ''));
    });

    $('input[name="bill_phone_number"]').on('keypress', function() {
        $('input[name="bill_phone_number"]').val($('input[name="bill_phone_number"]').val().replace(/\D/g, ''));
    });

    $('input[name="bill_phone_number"]').on('keyup', function() {
        $('input[name="bill_phone_number"]').val($('input[name="bill_phone_number"]').val().replace(/\D/g, ''));
    });

    $('input[name="card_number"]').on('keypress', function() {
        $('input[name="card_number"]').val($('input[name="card_number"]').val().replace(/\D/g, ''));
    });

    $('input[name="card_number"]').on('keyup', function() {
        $('input[name="card_number"]').val($('input[name="card_number"]').val().replace(/\D/g, ''));
    });

    $('input[name="cvv"]').on('keypress', function() {
        $('input[name="cvv"]').val($('input[name="cvv"]').val().replace(/\D/g, ''));
    });

    $('input[name="cvv"]').on('keyup', function() {
        $('input[name="cvv"]').val($('input[name="cvv"]').val().replace(/\D/g, ''));
    });

    $('input[name="ship_first_name"]').on('change', function() {
        $('input[name="ship_first_name"]').parent().removeClass('has-error');
        $('input[name="ship_first_name"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="ship_first_name"]').siblings('.invalid-feedback').hide();
    });

    $('input[name="ship_last_name"]').on('change', function() {
        $('input[name="ship_last_name"]').parent().removeClass('has-error');
        $('input[name="ship_last_name"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="ship_last_name"]').siblings('.invalid-feedback').hide();
    });

    $('input[name="ship_address"]').on('change', function() {
        $('input[name="ship_address"]').parent().removeClass('has-error');
        $('input[name="ship_address"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="ship_address"]').siblings('.invalid-feedback').hide();
    });

    $('input[name="ship_city"]').on('change', function() {
        $('input[name="ship_city"]').parent().removeClass('has-error');
        $('input[name="ship_city"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="ship_city"]').siblings('.invalid-feedback').hide();
    });

    $('input[name="ship_state"]').on('change', function() {
        $('input[name="ship_state"]').parent().removeClass('has-error');
        $('input[name="ship_state"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="ship_state"]').siblings('.invalid-feedback').hide();
    });

    $('input[name="ship_zip_code"]').on('change', function() {
        $('input[name="ship_zip_code"]').parent().removeClass('has-error');
        $('input[name="ship_zip_code"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="ship_zip_code"]').siblings('.invalid-feedback').hide();
    });

    $('input[name="ship_phone_number"]').on('change', function() {
        $('input[name="ship_phone_number"]').parent().removeClass('has-error');
        $('input[name="ship_phone_number"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="ship_phone_number"]').siblings('.invalid-feedback').hide();
    });

    $('input[name="ship_email_address"]').on('change', function() {
        $('input[name="ship_email_address"]').parent().removeClass('has-error');
        $('input[name="ship_email_address"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="ship_email_address"]').siblings('.invalid-feedback').hide();
    });

    $('input[name="bill_first_name"]').on('change', function() {
        $('input[name="bill_first_name"]').parent().removeClass('has-error');
        $('input[name="bill_first_name"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="bill_first_name"]').siblings('.invalid-feedback').hide();
    });

    $('input[name="bill_last_name"]').on('change', function() {
        $('input[name="bill_last_name"]').parent().removeClass('has-error');
        $('input[name="bill_last_name"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="bill_last_name"]').siblings('.invalid-feedback').hide();
    });

    $('input[name="bill_address"]').on('change', function() {
        $('input[name="bill_address"]').parent().removeClass('has-error');
        $('input[name="bill_address"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="bill_address"]').siblings('.invalid-feedback').hide();
    });

    $('input[name="bill_city"]').on('change', function() {
        $('input[name="bill_city"]').parent().removeClass('has-error');
        $('input[name="bill_city"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="bill_city"]').siblings('.invalid-feedback').hide();
    });

    $('input[name="bill_state"]').on('change', function() {
        $('input[name="bill_state"]').parent().removeClass('has-error');
        $('input[name="bill_state"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="bill_state"]').siblings('.invalid-feedback').hide();
    });

    $('input[name="bill_zip_code"]').on('change', function() {
        $('input[name="bill_zip_code"]').parent().removeClass('has-error');
        $('input[name="bill_zip_code"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="bill_zip_code"]').siblings('.invalid-feedback').hide();
    });

    $('input[name="bill_phone_number"]').on('change', function() {
        $('input[name="bill_phone_number"]').parent().removeClass('has-error');
        $('input[name="bill_phone_number"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="bill_phone_number"]').siblings('.invalid-feedback').hide();
    });

    $('input[name="bill_email_address"]').on('change', function() {
        $('input[name="bill_email_address"]').parent().removeClass('has-error');
        $('input[name="bill_email_address"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="bill_email_address"]').siblings('.invalid-feedback').hide();
    });

    $('input[name="card_number"]').on('change', function() {
        $('input[name="card_number"]').parent().removeClass('has-error');
        $('input[name="card_number"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="card_number"]').siblings('.invalid-feedback').hide();
    });

    $('input[name="cvv"]').on('change', function() {
        $('input[name="cvv"]').parent().removeClass('has-error');
        $('input[name="cvv"]').siblings('.invalid-feedback').removeClass('text-danger');
        $('input[name="cvv"]').siblings('.invalid-feedback').hide();
    });

    function get_cart() {
        var mycart_items = cart.getCartArray();
        var final_cart = new Array();
        console.log(mycart_items.length);
        console.log(proj4_data.length);
        for (var i = 0; i < mycart_items.length; i++) {
            for (var j = 0; j < proj4_data.length; j++) {
                console.log(mycart_items[i][0]);
                console.log(proj4_data[j][0]);
                console.log("printing");
                if (mycart_items[i][0] == proj4_data[j][0]) {
                    final_cart[i] = proj4_data[j];
                    final_cart[i][8] = mycart_items[i][1]; //Pushing quantity in the cart
                    break;
                }
            }
        }
        console.log("final cart" + final_cart);
        return final_cart;
    }

    function get_final_cart() {
        var mycart = get_cart();
        var html_content = "";
        console.log(mycart);
        if (mycart.length === 0) {
            html_content = "<h4>No items to show in the cart</h4>";
        } else {

            var subtotal = 0.00;
            var total = 0.00;
            var taxes = 0.00;
            html_content =
                "                <div class=\"row header\"> " +
                "                    <div class=\"col-md-6 text-center\"> " +
                "                        Item " +
                "                    </div> " +
                "                   <div class=\"col-md-2 text-center\"> " +
                "                        Price " +
                "                    </div> " +
                "                    <div class=\"col-md-2 text-center\"> " +
                "                        Quantity " +
                "                    </div> " +
                "                   <div class=\"col-md-2 text-center\"> " +
                "                        Total " +
                "                    </div> " +
                "                </div> ";

            for (i = 0; i < mycart.length; i++) {

                html_content +=
                    "                <hr> " +
                    "                <div class=\"row\"> " +
                    "                    <div class=\"col-md-2 text-center\"> " +
                    "                     <img src=\"/~jadrn000/PROJ4_IMAGES/" +
                    mycart[i][0] + ".jpg\" alt=\"" + mycart[i][2] + "\" width=\"100px\" height=\"100px\" /> " +
                    "                    </div> " +
                    "                    <div class=\"col-md-4\"> " +
                    "                        <div class=\"product-title\">" + mycart[i][2] + "</div> " +
                    "                        <div class=\"product-number\"> " +
                    "                            <small> " +
                    "                            <span>Item #</span> " +
                    "                            <span class=\"product-sku\">" + mycart[i][0] + "</span> " +
                    "                        </small> " +
                    "                        </div> " +
                    "                    </div> " +
                    "                    <div class=\"col-md-2 text-center\"> " +
                    "                        <strong>$<span>" + mycart[i][6] + "</span></strong> " +
                    "                    </div> " +
                    "                    <div class=\"col-md-2 text-center\"> " +
                    "                        <strong><span>" + mycart[i][8] + "</span></strong>" +
                    "                    </div> " +
                    "                    <div class=\"col-md-2 text-center\"> " +
                    "                        <strong>$<span>" + (Math.round(mycart[i][6] * mycart[i][8] * 100) / 100).toFixed(2) + "</span></strong> " +
                    "                    </div> " +
                    "                </div> ";

                subtotal += (mycart[i][6] * mycart[i][8]);
            }

            taxes = subtotal * 0.08;
            total = subtotal + taxes + 2.00;

            html_content +=

                "                <hr> " +
                "                <div class=\"row\"> " +
                "                    <div class=\"col-md-2 col-md-offset-8\"> " +
                "                        <h4>Subtotal</h4> " +
                "                    </div> " +
                "                    <div class=\"col-md-2 text-right\"> " +
                "                        <h4>$<span id=\"subtotal\">" + (Math.round(subtotal * 100) / 100).toFixed(2) + "</span></h4> " +
                "                    </div> " +
                "                </div> " +
                "                <div class=\"row\"> " +
                "                    <div class=\"col-md-2 col-md-offset-8\"> " +
                "                        <h4>Estimated Tax <span class=\"glyphicon glyphicon-info-sign\" tabindex=\"-1\" data-toggle=\"popover\" " +
                "                      data-trigger=\"focus\" title=\"\" data-placement=\"bottom\" data-content=\"Standard 8% taxes are applied " +
                "for all purchases.\"></span></h4> " +
                "                    </div> " +
                "                    <div class=\"col-md-2 text-right\"> " +
                "                        <h4>$<span id=\"taxes\">" + (Math.round(taxes * 100) / 100).toFixed(2) + "</span></h4> " +
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
                "                <div class=\"row\"> " +
                "                    <div class=\"col-md-2 col-md-offset-8\"> " +
                "                        <h3><strong>Total</strong></h3> " +
                "                    </div> " +
                "                    <div class=\"col-md-2 text-right\"> " +
                "                        <h3><strong>$<span>" + (Math.round(total * 100) / 100).toFixed(2) + "</span></strong></h3> " +
                "                    </div> " +
                "                </div> " +
                "            </div> ";
        }
        return html_content;
    }

    function populate_confirmation() {
        console.log("Modal populated");
        $('#ship_name').text($('input[name="ship_first_name"]').val() + " " + $('input[name="ship_last_name"]').val());
        $('#ship_address').text($('input[name="ship_address"]').val());
        $('#ship_address2').text($('input[name="ship_address2"]').val());
        $('#ship_city').text($('input[name="ship_city"]').val());
        $('#ship_state').text($('input[name="ship_state"]').val());
        $('#ship_zip_code').text($('input[name="ship_zip_code"]').val());
        $('#ship_phone_number').text($('input[name="ship_phone_number"]').val());
        $('#ship_email_address').text($('input[name="ship_email_address"]').val());

        $('#bill_name').text($('input[name="bill_first_name"]').val() + " " + $('input[name="bill_last_name"]').val());
        $('#bill_address').text($('input[name="bill_address"]').val());
        $('#bill_address2').text($('input[name="bill_address2"]').val());
        $('#bill_city').text($('input[name="bill_city"]').val());
        $('#bill_state').text($('input[name="bill_state"]').val());
        $('#bill_zip_code').text($('input[name="bill_zip_code"]').val());
        $('#bill_phone_number').text($('input[name="bill_phone_number"]').val());
        $('#bill_email_address').text($('input[name="bill_email_address"]').val());

        var cc_last_digits = $.trim($('input[name="card_number"]').val()).slice(-4);
        $('#cc_number').text(cc_last_digits);

        var cart_html = get_final_cart();
        console.log("html:" + cart_html);
        $('.cart_details').html(cart_html);
        $("[data-toggle=popover]").popover();
    }

    function valid_data() {

        var isValid = true;
        //Shipping First Name
        if ($.trim($('input[name="ship_first_name"]').val()) == "") {
            $('input[name="ship_first_name"]').parent().addClass('has-error');
            $('input[name="ship_first_name"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="ship_first_name"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('input[name="ship_first_name"]').on('keypress', function() {
            $('input[name="ship_first_name"]').parent().removeClass('has-error');
            $('input[name="ship_first_name"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="ship_first_name"]').siblings('.invalid-feedback').hide();
        });

        //Shipping Last Name
        if ($.trim($('input[name="ship_last_name"]').val()) == "") {
            $('input[name="ship_last_name"]').parent().addClass('has-error');
            $('input[name="ship_last_name"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="ship_last_name"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('input[name="ship_last_name"]').on('keypress', function() {
            $('input[name="ship_last_name"]').parent().removeClass('has-error');
            $('input[name="ship_last_name"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="ship_last_name"]').siblings('.invalid-feedback').hide();
        });

        //Shipping Address
        if ($.trim($('input[name="ship_address"]').val()) == "") {
            $('input[name="ship_address"]').parent().addClass('has-error');
            $('input[name="ship_address"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="ship_address"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('input[name="ship_address"]').on('keypress', function() {
            $('input[name="ship_address"]').parent().removeClass('has-error');
            $('input[name="ship_address"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="ship_address"]').siblings('.invalid-feedback').hide();
        });

        //Shipping City
        if (($.trim($('input[name="ship_city"]').val()) == "") || (!(isValidCity($.trim($('input[name="ship_city"]').val()))))) {
            $('input[name="ship_city"]').parent().addClass('has-error');
            $('input[name="ship_city"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="ship_city"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }


        $('input[name="ship_city"]').on('keypress', function() {
            $('input[name="ship_city"]').parent().removeClass('has-error');
            $('input[name="ship_city"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="ship_city"]').siblings('.invalid-feedback').hide();
        });

        //Shipping State
        if (($.trim($('input[name="ship_state"]').val()) == "") || !(isValidState($.trim($('input[name="ship_state"]').val())))) {
            $('input[name="ship_state"]').parent().addClass('has-error');
            $('input[name="ship_state"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="ship_state"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('input[name="ship_state"]').on('keypress', function() {
            $('input[name="ship_state"]').parent().removeClass('has-error');
            $('input[name="ship_state"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="ship_state"]').siblings('.invalid-feedback').hide();
        });

        //Shipping Zip Code
        if (($.trim($('input[name="ship_zip_code"]').val()) == "") || !(isValidZip($.trim($('input[name="ship_zip_code"]').val())))) {
            $('input[name="ship_zip_code"]').parent().addClass('has-error');
            $('input[name="ship_zip_code"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="ship_zip_code"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('input[name="ship_zip_code"]').on('keypress', function() {
            $('input[name="ship_zip_code"]').parent().removeClass('has-error');
            $('input[name="ship_zip_code"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="ship_zip_code"]').siblings('.invalid-feedback').hide();
        });

        //Shipping Phone
        if (($.trim($('input[name="ship_phone_number"]').val()) == "") || !(isValidPhone($.trim($('input[name="ship_phone_number"]').val())))) {
            $('input[name="ship_phone_number"]').parent().addClass('has-error');
            $('input[name="ship_phone_number"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="ship_phone_number"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('input[name="ship_phone_number"]').on('keypress', function() {
            $('input[name="ship_phone_number"]').parent().removeClass('has-error');
            $('input[name="ship_phone_number"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="ship_phone_number"]').siblings('.invalid-feedback').hide();
        });

        //Shipping Email Address
        if (($.trim($('input[name="ship_email_address"]').val()) == "") || !(isValidEmail($.trim($('input[name="ship_email_address"]').val())))) {
            console.log(isValidEmail($.trim($('input[name="ship_email_address"]').val())));
            $('input[name="ship_email_address"]').parent().addClass('has-error');
            $('input[name="ship_email_address"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="ship_email_address"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('input[name="ship_email_address"]').on('keypress', function() {
            $('input[name="ship_email_address"]').parent().removeClass('has-error');
            $('input[name="ship_email_address"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="ship_email_address"]').siblings('.invalid-feedback').hide();
        });

        //Billing First Name
        if ($.trim($('input[name="bill_first_name"]').val()) == "") {
            $('input[name="bill_first_name"]').parent().addClass('has-error');
            $('input[name="bill_first_name"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="bill_first_name"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('input[name="bill_first_name"]').on('keypress', function() {
            $('input[name="bill_first_name"]').parent().removeClass('has-error');
            $('input[name="bill_first_name"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="bill_first_name"]').siblings('.invalid-feedback').hide();
        });


        //Billing Last Name
        if ($.trim($('input[name="bill_last_name"]').val()) == "") {
            $('input[name="bill_last_name"]').parent().addClass('has-error');
            $('input[name="bill_last_name"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="bill_last_name"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('input[name="bill_last_name"]').on('keypress', function() {
            $('input[name="bill_last_name"]').parent().removeClass('has-error');
            $('input[name="bill_last_name"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="bill_last_name"]').siblings('.invalid-feedback').hide();
        });

        //Shipping Address
        if ($.trim($('input[name="bill_address"]').val()) == "") {
            $('input[name="bill_address"]').parent().addClass('has-error');
            $('input[name="bill_address"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="bill_address"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('input[name="bill_address"]').on('keypress', function() {
            $('input[name="bill_address"]').parent().removeClass('has-error');
            $('input[name="bill_address"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="bill_address"]').siblings('.invalid-feedback').hide();
        });

        //billping City
        if (($.trim($('input[name="bill_city"]').val()) == "") || (!(isValidCity($.trim($('input[name="bill_city"]').val()))))) {
            $('input[name="bill_city"]').parent().addClass('has-error');
            $('input[name="bill_city"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="bill_city"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }


        $('input[name="bill_city"]').on('keypress', function() {
            $('input[name="bill_city"]').parent().removeClass('has-error');
            $('input[name="bill_city"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="bill_city"]').siblings('.invalid-feedback').hide();
        });

        //billing State
        if (($.trim($('input[name="bill_state"]').val()) == "") || !(isValidState($.trim($('input[name="bill_state"]').val())))) {
            $('input[name="bill_state"]').parent().addClass('has-error');
            $('input[name="bill_state"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="bill_state"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('input[name="bill_state"]').on('keypress', function() {
            $('input[name="bill_state"]').parent().removeClass('has-error');
            $('input[name="bill_state"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="bill_state"]').siblings('.invalid-feedback').hide();
        });

        //billping Zip Code
        if (($.trim($('input[name="bill_zip_code"]').val()) == "") || !(isValidZip($.trim($('input[name="bill_zip_code"]').val())))) {
            $('input[name="bill_zip_code"]').parent().addClass('has-error');
            $('input[name="bill_zip_code"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="bill_zip_code"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('input[name="bill_zip_code"]').on('keypress', function() {
            $('input[name="bill_zip_code"]').parent().removeClass('has-error');
            $('input[name="bill_zip_code"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="bill_zip_code"]').siblings('.invalid-feedback').hide();
        });

        //billping Phone
        if (($.trim($('input[name="bill_phone_number"]').val()) == "") || !(isValidPhone($.trim($('input[name="bill_phone_number"]').val())))) {
            $('input[name="bill_phone_number"]').parent().addClass('has-error');
            $('input[name="bill_phone_number"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="bill_phone_number"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('input[name="bill_phone_number"]').on('keypress', function() {
            $('input[name="bill_phone_number"]').parent().removeClass('has-error');
            $('input[name="bill_phone_number"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="bill_phone_number"]').siblings('.invalid-feedback').hide();
        });

        //billping Email Address
        if (($.trim($('input[name="bill_email_address"]').val()) == "") || !(isValidEmail($.trim($('input[name="bill_email_address"]').val())))) {
            $('input[name="bill_email_address"]').parent().addClass('has-error');
            $('input[name="bill_email_address"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="bill_email_address"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('input[name="bill_email_address"]').on('keypress', function() {
            $('input[name="bill_email_address"]').parent().removeClass('has-error');
            $('input[name="bill_email_address"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="bill_email_address"]').siblings('.invalid-feedback').hide();
        });

        //Credit Card Type
        if ($('#cc-type').val() == "") {
            $('#cc-type').parent().addClass('has-error');
            $('#cc-type').siblings('.invalid-feedback').addClass('text-danger');
            $('#cc-type').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('#cc-type').on('change', function() {
            $('#cc-type').parent().removeClass('has-error');
            $('#cc-type').siblings('.invalid-feedback').removeClass('text-danger');
            $('#cc-type').siblings('.invalid-feedback').hide();
        });

        //Credit Card Number
        if (!(isValidCard($.trim($('input[name="card_number"]').val())))) {
            $('input[name="card_number"]').parent().addClass('has-error');
            $('input[name="card_number"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="card_number"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('input[name="card_number"]').on('keypress', function() {
            $('input[name="card_number"]').parent().removeClass('has-error');
            $('input[name="card_number"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="card_number"]').siblings('.invalid-feedback').hide();
        });

        //Credit Card Number CVV Code
        if (!(isValidCVV($.trim($('input[name="cvv"]').val())))) {
            $('input[name="cvv"]').parent().addClass('has-error');
            $('input[name="cvv"]').siblings('.invalid-feedback').addClass('text-danger');
            $('input[name="cvv"]').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('input[name="cvv"]').on('keypress', function() {
            $('input[name="cvv"]').parent().removeClass('has-error');
            $('input[name="cvv"]').siblings('.invalid-feedback').removeClass('text-danger');
            $('input[name="cvv"]').siblings('.invalid-feedback').hide();
        });

        //Credit Card Expiration Date
        var month = $('#exp_month').val();
        var year = $('#exp_year').val();
        if ((month == "" && year == "")) {
            $('#exp_month').parent().addClass('has-error');
            $('#exp_year').parent().addClass('has-error');
            $('#exp_month').siblings('.invalid-feedback').addClass('text-danger');
            $('#exp_year').siblings('.invalid-feedback').addClass('text-danger');
            $('#exp_month').siblings('.invalid-feedback').show();
            $('#exp_year').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        } else if (month == "") {
            $('#exp_month').parent().addClass('has-error');
            $('#exp_month').siblings('.invalid-feedback').addClass('text-danger');
            $('#exp_month').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        } else if (year == "") {
            $('#exp_year').parent().addClass('has-error');
            $('#exp_year').siblings('.invalid-feedback').addClass('text-danger');
            $('#exp_year').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        } else if (!(isValidExpiration(month, year))) {
            $('#exp_month').parent().addClass('has-error');
            $('#exp_year').parent().addClass('has-error');
            $('#exp_month').siblings('.invalid-feedback').addClass('text-danger');
            $('#exp_year').siblings('.invalid-feedback').addClass('text-danger');
            $('#exp_month').siblings('.invalid-feedback').show();
            $('#exp_year').siblings('.invalid-feedback').show();
            isValid = isValid && false;
        }

        $('#exp_month').on('change', function() {
            $('#exp_month').parent().removeClass('has-error');
            $('#exp_month').siblings('.invalid-feedback').removeClass('text-danger');
            $('#exp_month').siblings('.invalid-feedback').hide();
        });

        $('#exp_year').on('change', function() {
            $('#exp_year').parent().removeClass('has-error');
            $('#exp_year').siblings('.invalid-feedback').removeClass('text-danger');
            $('#exp_year').siblings('.invalid-feedback').hide();
        });

        if (!isValid) {
            $('.has-error').first().children('.form-control').focus();
            return false;
        } else return true;
    }


    //Validate City
    function isValidCity(city) {
        return /^[a-zA-Z\s]+$/.test(city);
    }

    //Make the state code upper case when user inputs in the textfield
    $('input[name="ship_state"]').oninput = function() {
        $('#inputState').val(this.value.toUpperCase());
    };
    $('input[name="bill_state"]').oninput = function() {
        $('#inputState').val(this.value.toUpperCase());
    };

    function isValidState(state) {
        var stateList = new Array("AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC",
            "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA",
            "MD", "ME", "MH", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ",
            "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX",
            "UT", "VA", "VT", "WA", "WI", "WV", "WY");
        for (var i = 0; i < stateList.length; i++)
            if (stateList[i] == $.trim(state).toUpperCase())
                return true;
        return false;
    }

    function isValidZip(zip) {
        return $.isNumeric(zip) && zip.length == 5;
    }

    function isValidEmail(emailAddress) {
        console.log(emailAddress);
        var re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return re.test(emailAddress.toLowerCase());
    }

    function isValidPhone(number) {
        return ($.isNumeric(number)) && (number.length == 10);
    }

    function isValidCard(number) {
        return (number != "") && ($.isNumeric(number)) && (number.length == 16);
    }

    function isValidCVV(number) {
        return (number != "") && ($.isNumeric(number)) && (number.length == 3);
    }

    function isValidExpiration(month, year) {
        var today = new Date();
        var exp_date = new Date(year, month, 0);
        if (exp_date < today)
            return false;
        return true;
    }

});
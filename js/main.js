jQuery(document).ready(function($){
  // jQuery sticky Menu

  $(".mainmenu-area").sticky({ topSpacing:0 });

  $('.product-carousel').owlCarousel({
    loop: true,
    nav: true,
    margin: 20,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      }
    }
  });

  $('.related-products-carousel').owlCarousel({
    loop: true,
    nav: true,
    margin: 20,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 2,
      },
      1200: {
        items: 3,
      }
    }
  });

  $('.brand-list').owlCarousel({
    loop: true,
    nav: true,
    margin: 20,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      }
    }
  });


  // Bootstrap Mobile Menu fix
  $(".navbar-nav li a").click(function(){
    $(".navbar-collapse").removeClass('in');
  });

  // jQuery Scroll effect
  $('.navbar-nav li a, .scroll-to-up').bind('click', function(event) {
    var $anchor = $(this);
    var headerH = $('.header-area').outerHeight();
    $('html, body').stop().animate({
      scrollTop : $($anchor.attr('href')).offset().top - headerH + "px"
    }, 1200, 'easeInOutExpo');

    event.preventDefault();
  });

  // Bootstrap ScrollPSY
  $('body').scrollspy({
    target: '.navbar-collapse',
    offset: 95
  })

  // Bootstrap Mobile Menu fix
  $(".navbar-nav li a").click(function(){
    $(".navbar-collapse").removeClass('in');
  });

  // add product to cart
  $('.add_to_cart_button').bind('click', function(event) {
    event.preventDefault();

    var codProduto = document.getElementById("codProduto").innerHTML
    var qtdProduto = document.getElementById("qtdProduto").value

    $.ajax('http://7882d28e.ngrok.io/carts', {
      method: 'POST',
      data: {
        product_id: codProduto,
        quantity: qtdProduto
      },
      xhrFields: {
        withCredentials: true
      }
    }).then(function(data){
      console.log(data);

      var total_price = data["total_price"]
      var total_quantity = data["total_quantity"]

      $("#valorTotal").html(total_price);
      $("#quantidadeCarrinho").html(total_quantity);
    })
  });

  // edit product to cart
  $('.edit_cart_button').bind('click', function(event) {
    event.preventDefault();
    $.ajax('http://7882d28e.ngrok.io/carts',{
      method: 'PATCH',
      data: {
        product_id: '',
        quantity: 'bar'
      },
      xhrFields: {
        withCredentials: true
      }
    }).then(function(data){
      console.log(data);

      var total_price = data["total_price"]
      var total_quantity = data["total_quantity"]

      $("#valorTotal").html(total_price);
      $("#quantidadeCarrinho").html(total_quantity);
    })
  });

  // Bootstrap ScrollPSY
  $('body').scrollspy({
    target: '.navbar-collapse',
    offset: 95
  })


  //carrregar elemento carrinho
  $.ajax('http://7882d28e.ngrok.io/carts',{
    method: 'GET',
    xhrFields: {
      withCredentials: true
    }
  }).then(function(data) {
    console.log(data)

    var total_price = data["total_price"]
    var total_quantity = data["total_quantity"]

    //var total_price = 300
    //var total_quantity = 1

    $("#valorTotal").html(total_price);
    $("#quantidadeCarrinho").html(total_quantity);
  })
});

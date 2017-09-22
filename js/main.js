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

  $('#place_order').click(function (e) {
    e.preventDefault()
    $.ajax('http://75a250af.ngrok.io/orders', {
      method: 'POST',
      data: {
        name: '',
        cc_number: '',
        cc_cvv: '',
        email: 'user@example.com'
      },
      xhrFields: {
        withCredentials: true
      }
    }).then(function(data){
      console.log(data)
    })
  })

  $("input[value='Pagamento']").click(function() {
    window.location.href = '/checkout.html'
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

    $.ajax('http://75a250af.ngrok.io/carts', {
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
  
  // delete product from cart
   $(document).ready(function(){
    $(document).on('click', '.delete_cart_button', function(){
	
    event.preventDefault();
	
	var codProduto = event.target.dataset.id;
	console.log(codProduto);
	
    $.ajax('http://77083b84.ngrok.io/carts', {
      method: 'delete',
      data: {
        product_id: codProduto
      },
      xhrFields: {
        withCredentials: true
      }
    }).then(function(data){
      console.log(data);

    })
	
	location.reload();
	
	})
	
  });

  // edit product to cart
  $('.quantidadeProdutoCarrinho').bind('keyup mouseup', function(event) {	 
  
	 alert("ERoooooouuu");
  
    event.preventDefault();

    $.ajax('http://75a250af.ngrok.io/carts',{
		
      method: 'PATCH',
      data: {
        product_id: '1',
        quantity: '200'
      },
      xhrFields: {
        withCredentials: true
      }
    }).then(function(data){
	
	 
      alert(data);
		/*
      var total_price = data["total_price"]
      var total_quantity = data["total_quantity"]

      $("#valorTotal").html(total_price);
      $("#quantidadeCarrinho").html(total_quantity);*/
    })
  });

  // Bootstrap ScrollPSY
  $('body').scrollspy({
    target: '.navbar-collapse',
    offset: 95
  })


  //carrregar elemento carrinho
  $.ajax('http://75a250af.ngrok.io/carts',{
    method: 'GET',
    xhrFields: {
      withCredentials: true
    }
  }).then(function(data) {
    console.log(data)

    var total_price = data["total_price"]
    var total_quantity = data["total_quantity"]

    $("#valorTotal").html(total_price);
    $("#quantidadeCarrinho").html(total_quantity);
  })
  
   //carrregar lista dos produtos no carrinho
  $.ajax('http://75a250af.ngrok.io/carts',{
    method: 'GET',
    xhrFields: {
      withCredentials: true
    }
  }).then(function(data) {
    console.log(data)

    var products = data["products"]
	var quantidadeProdutos = products.length;
	
	var produtoLista = [];
	var totalCarrinho = 0;
	//Carregar a lista do carrinho formantando numa tabela
	for(var i=0; i < quantidadeProdutos; i++){
		
		var id = products[i].id
		var nome = products[i].name
		var preco = products[i].price
		var quantidade = products[i].quantity
		var subtotal = products[i].price * products[i].quantity;
		totalCarrinho += subtotal;
		
		var strHtml = 
					'<tr class="cart_item" id='+id+'>'+ 
					'<td class="product-remove">'+
						'<a title="Remover do carrinho" class="delete_cart_button" data-id="'+id+'" href="#">×</a>' +
					'</td>'+
					'<td class="product-name">'+
						'<a href="single-product.html" id="nomeProdutoCarrinho">' + nome + '</a>'+ 
					'</td>'+											                                                              
					
					'<td class="product-price">'+
						'<span class="amount" id="precoProdutoCarrinho">R$ ' + preco + '</span>'+ 
					'</td>'+

					'<td class="product-quantity">'+
						'<div class="quantity buttons_added">'+                                                    
							'<input type="number" size="2" id="quantidadeProdutoCarrinho" value="'+quantidade+'" class="input-text qty text" title="Qty" min="0" step="1">'+                                       
						'</div>'+
					'</td>'+

					'<td class="product-subtotal">'+
						'<span class="amount" id="subtotalProduto">R$ '+ subtotal + '</span>'+ 
					'</td>'+
					
					'</tr>'
					
				produtoLista.push(strHtml);
		
	}
	
	var linhaTotalizada = 
					'<tr class="cart_item">'+ 
					'<td class="product-remove">'+
						
					'</td>'+

					'<td class="product-name">'+
						
					'</td>'+											                                                              
					
					'<td class="product-price">'+
						
					'</td>'+

					'<td class="product-quantity">'+						
						'<th class="product-subtotal">R$ '+ totalCarrinho + '</th>'
					'</td>'+					
					
					'</tr>';
					
	produtoLista.push(linhaTotalizada);
	
	//Enviar tabela para html
	$("#lista").html(produtoLista);	
			
   
  })
  
});

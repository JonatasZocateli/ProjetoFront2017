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
    $.ajax('http://f6b704a3.ngrok.io/orders', {
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

  /*
  $("input[value='Pagamento']").click(function() {
    window.location.href = '/checkout.html'
  });
  */
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

    $.ajax('http://f6b704a3.ngrok.io/carts', {
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

      $("#valorTotal").html(total_price.toFixed(2).replace('.',',') );
      $("#quantidadeCarrinho").html(total_quantity);
    })
  });

  // finish
  $('.finish').bind('click', function(event) {

    event.preventDefault();

    alert("Finalizou");

    $.ajax('http://f6b704a3.ngrok.io/confirm', {
      method: 'POST',
      xhrFields: {
        withCredentials: true
      }
    }).then(function(data){
      window.location.href = '/final.html';
    })
  });

  // add address to cart
  $(document).ready(function(){
    $(document).on('click', '.add_address', function(){

      event.preventDefault();

      if(validar()){

        $.ajax('http://f6b704a3.ngrok.io/orders', {
          method: 'POST',
          data: {
            nome: document.getElementById("txtNome").value,
              logradouro: document.getElementById("txtLogradouro").value,
              numero: document.getElementById("txtNumero").value,
              cep: document.getElementById("txtCep").value,
              cidade: document.getElementById("txtCidade").value,
              email: document.getElementById("txtEmail").value,
              telefone: document.getElementById("txtTelefone").value
          },
          xhrFields: {
            withCredentials: true
          }
      }).then(function(data){

        console.log(data);
        window.location.href = '/checkout.html';

      })


    } else {

      alert("Todos os campos devem ser preenchidos.")

    }

  });
});

  // delete product from cart
  $(document).ready(function(){
    $(document).on('click', '.delete_cart_button', function(){

      event.preventDefault();

      var codProduto = event.target.dataset.id;
      console.log(codProduto);

      $.ajax('http://f6b704a3.ngrok.io/carts', {
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

  //Mostra produto selecionado: início

  $(document).ready(function(){
    $(document).on('click', '.novatentativa', function(){

      event.preventDefault();

      var codProduto = event.target.dataset.id;
      console.log(codProduto);

      $.ajax(`http://f6b704a3.ngrok.io/products/${codProduto}`, {
        method: 'get',
        data: {
          id: codProduto
        },
        xhrFields: {
          withCredentials: true
        }
    }).then(function(data){
      // alert(JSON.stringify(data))
      var codigoProduto = data["id"];
      var nomeProduto = data["name"];
      var descricaoProduto = data["description"];
      var valorProduto = data["price"];
      var pagina = data["page_name"];

      // $("#codigoProduto").html(codigoProduto);
      //$("#nomeProduto").html(nomeProduto);
      // $("#descricaoProduto").html(descricaoProduto);
      // $("#valorProduto").html(valorProduto);
      // location.href = "produto.html?" +"nomeProduto=" +nomeProduto;
      location.href = `/${pagina}.html`
    });

    //location.reload();
    //location.href = "produto.html";

    //   $("h2").html("Carregado"); 
  })

});

//Mostra produto selecionado: fim


// edit product to cart
$('.quantidadeProdutoCarrinho').bind('keyup mouseup', function(event) {	 


  event.preventDefault();
  var codProduto = event.target.dataset.id;

  $.ajax('http://f6b704a3.ngrok.io/carts',{

    method: 'PATCH',
    data: {
      product_id: codProduto,
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

function validar() {

  var nome = document.getElementById("txtNome").value;
  var logradouro = document.getElementById("txtLogradouro").value;
  var numero = document.getElementById("txtNumero").value;
  var cep = document.getElementById("txtCep").value;
  var cidade = document.getElementById("txtCidade").value;
  var email = document.getElementById("txtEmail").value;
  var telefone = document.getElementById("txtTelefone").value;

  alert(nome);

  if(nome == ""){
    return false;
  }

  if(logradouro == ""){
    return false;
  }

  if(numero == ""){
    return false;
  }

  if(cep == ""){
    return false;
  }

  if(cidade == ""){
    return false;
  }

  if(email == ""){
    return false;
  }

  if(telefone == ""){
    return false;
  }

  return true;
}

//carrregar elemento carrinho
$.ajax('http://f6b704a3.ngrok.io/carts',{
  method: 'GET',
  xhrFields: {
    withCredentials: true
  }
}).then(function(data) {
  console.log(data)

  var total_price = data["total_price"]
  var total_quantity = data["total_quantity"]

  $("#valorTotal").html(total_price.toFixed(2).replace('.',',') );
  $("#quantidadeCarrinho").html(total_quantity);
})





//Carregar Produtos na tela de shopping:início
$.ajax('http://f6b704a3.ngrok.io/products',{
  method: 'GET',
  xhrFields: {
    withCredentials: true
  }
}).then(function(data){
  console.log(data)

  var produtos = data;   

  var quantidadeProdutos = produtos.length;

  var produtoLista = [];


  for(var i=0; i < quantidadeProdutos; i++){
    var id = produtos[i].id;
    var nome = produtos[i].name;
    var preco = produtos[i].price;
    var precodesconto = (produtos[i].price * 0.9)

    var strHtml = '<div class="col-md-3 col-sm-6" id="'+id+'" >'+
      '<div class="single-shop-product">'+
      '<div class="product-upper">'+
      '<img class="novatentativa" style="cursor: pointer;" data-id="'+id+'" src="img/'+ nome +'s.jpg" alt="">'+ 
      '</div>'+
      '<h2><a class="novatentativa" href="produto.html" data-id="'+id+'" >'+ nome +'</a></h2>'+
      '<div class="product-carousel-price">' +
      '<ins>R$'+ precodesconto.toFixed(2).replace('.',',') +'</ins> <del>+ R$'+ preco.toFixed(2).replace('.',',') + '</del>'+
      '</div>' +                     
      '</div>'+
      '</div>';  

    produtoLista.push(strHtml);    
  }

  $("#listaProdutos").html(produtoLista); 
}) 
//Carregar Produtos na tela de shopping:fim



//carrregar lista dos produtos no carrinho
$.ajax('http://f6b704a3.ngrok.io/carts',{
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
      '<input type="number" size="2" id="quantidadeProdutoCarrinho"  value="'+quantidade+'" class="input-text qty text" title="Qty" min="0" step="1">'+                                       
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

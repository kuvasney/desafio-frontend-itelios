
var xhr = new XMLHttpRequest();
//CHECK IF DESKTOP
var mq = window.matchMedia( "(min-width: 1019px)" );
if (mq.matches) {
	isDesktop = true;
} else {
	isDesktop = false;
};

function configRequest() {
	xhr.open("GET", "produtos.json", true);
	xhr.send();
}

function processRequest(e) {
	if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        var prdata = response[0].data;
        var recommendation = prdata.recommendation;
        var reference = prdata.reference.item;        
        fillRecommendation(recommendation, "#recommendation_wrap");
        fillRecommendation(reference, "#reference_wrap");
    };
};

function fillRecommendation(product, wrapper) {
	if (typeof(product) != 'undefined' && product != null) {
		var wr = document.querySelector(wrapper),
			prodLimit = product.length, //configuravel caso a vitrine de sugestoes tenha limite de itens
			html = "",
			htmlTemplate = ''+
			'<div class="product">'+
			'	<div class="product-boxImg">'+
			'		<img src="HTML_PRODIMAGE" alt="HTML_PRODNAME" class="prodImg">'+
			'	</div>'+
			'	<h2 class="prodName">HTML_PRODNAME</h2>'+
			'	<p class="prodPrice">Por: <span class="price">HTML_PRODPRICE</span></p>	'+
			'	<p class="prodPrice">ou <span class="priceCondition">HTML_PRODPRICONDITION</span> sem juros</p>	'+
			'	<div class="prodBuyHolder"><a href="HTML_PRODURL" class="prodBuy"><span>adicionar ao carrinho</span> <i class="icon-cart-plus"></i></a></div>	'+
			'</div>';
			wr.classList.add("preload");
			if (product.length > 0) {
				for (var i=0;i<prodLimit;i++) {
					var paymentCondition = product[i].productInfo.paymentConditions.replace(".",",").replace("ou","").replace("X","x").replace("de", "de R$"); //CORRIGE O "." NO VALOR
					productName = product[i].name;
					if(productName.length > 85) {
					    productName = productName.substring(0,85)+"...";
					}
					html += htmlTemplate
								.replace(/HTML_PRODIMAGE/g,product[i].imageName)
								.replace(/HTML_PRODNAME/g,productName)
								.replace(/HTML_PRODPRICE/g,product[i].price)
								.replace(/HTML_PRODPRICONDITION/g,paymentCondition)
								.replace(/HTML_PRODURL/g,product[i].detailUrl);

				};
				wr.innerHTML = html;
				carousel("carrousel");

			} else {
				var paymentCondition = product.productInfo.paymentConditions.replace(".",",").replace("ou","").replace("X","x").replace("de", "de R$"); //CORRIGE O "." NO VALOR
				productName = product.name;
				if(productName.length > 85) {
				    productName = productName.substring(0,85)+"...";
				}
				html += htmlTemplate
							.replace(/HTML_PRODIMAGE/g,product.imageName)
							.replace(/HTML_PRODNAME/g,productName)
							.replace(/HTML_PRODPRICE/g,product.price)
							.replace(/HTML_PRODPRICONDITION/g,paymentCondition)
							.replace(/HTML_PRODURL/g,product.detailUrl);	
			wr.innerHTML = html;
			};
			
			wr.classList.remove("preload");
	};
};
function carousel(el) {

	
	//MONTA O CARROSSEL
	var crrBase = document.querySelector("."+el+""),
		crrWrap = document.querySelector(".carrousel_wrap"),
		crrItem = crrBase.getElementsByClassName("product"),
		w = crrItem[0].offsetWidth,
		bullsWrap = document.createElement("div"),
		slideLimit;
		isDesktop ? slideLimit = 3 : slideLimit = 1;

	bullsWrap.className = "bullswrap";
	isDesktop ? bullsWrap.style.width = w*slideLimit+"px":bullsWrap.style.width = "100%";
	console.log(crrItem.length)
	crrBase.appendChild(bullsWrap);
	crrWrap.style.width = crrItem.length * w + "px";

	addBulls();		
	
	
	function addBulls() {
		//ADICIONA OS BULLETS	
		for (var i = 0; i < crrItem.length; i++) {
			if (i%slideLimit == 0){
				var bull = document.createElement("a");			
				bull.setAttribute("data-multiplier", i);
				bull.setAttribute("class", "bull");
				bullsWrap.appendChild(bull);
			};
		};		
		navigation();
	};

	function navigation() {
		//MANIPULA OS BULLETS CRIADOS DINAMICAMENTE
		var bulls = document.querySelectorAll(".bull");
		bulls[0].setAttribute("class", bulls[0].getAttribute("class")+" on");
		for (var i = 0; i < bulls.length; i++) {		
			bulls[i].addEventListener("click", function(event){
				var multiplier = this.getAttribute("data-multiplier");			
				m = parseInt(multiplier);
				crrWrap.style.marginLeft = ""+(w*m)*(-1)+"px";
				var bulls = document.querySelectorAll(".bull");
				[].forEach.call(bulls, function(el) {
				    el.classList.remove("on");
				});
				this.setAttribute("class", this.getAttribute("class") + " on");
				event.preventDefault();
			});
		};		
	};

};
(function(){
	try {
		configRequest();
		xhr.onreadystatechange = processRequest;			
	} catch (e) {
		alert(
			'Arquivo   : ' + e.fileName + ' \n ' +
			'Linha     : ' + e.lineNumber + ' \n ' +
			'Nome      : ' + e.name + ' \n ' +
			'Descrição : ' + e.message
		);
	};	
})();
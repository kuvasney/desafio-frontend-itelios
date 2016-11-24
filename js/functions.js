var xhr = new XMLHttpRequest();

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
			'<div class="recommendation__prod">'+
			'	<div class="recommendation__prod-boxImg">'+
			'		<img src="HTML_PRODIMAGE" alt="HTML_PRODNAME" class="prodImg">'+
			'	</div>'+
			'	<h2 class="prodName">HTML_PRODNAME</h2>'+
			'	<p class="prodPrice">Por: <span class="price">HTML_PRODPRICE</span></p>	'+
			'	<p class="prodPrice"><span class="priceCondition">HTML_PRODPRICONDITION</span> sem juros</p>	'+
			'	<p><a href="HTML_PRODURL" class="Prodbuy">Adicionar ao carrinho</a></p>	'+
			'</div>';			
			if (product.length > 0) {
				for (var i=0;i<prodLimit;i++) {
				var paymentCondition = product[i].productInfo.paymentConditions.replace(".",","); //CORRIGE O "." NO VALOR
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
			} else {
				var paymentCondition = product.productInfo.paymentConditions.replace(".",","); //CORRIGE O "." NO VALOR
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
			};
			
			wr.innerHTML = html;

			// document.querySelectorAll(".prodName")
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
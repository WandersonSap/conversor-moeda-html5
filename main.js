const ovly = {
	conversor: {
		
		_resultado: null,
		
		domain: "https://api.exchangeratesapi.io/",
		
		resultado: null,
		
		chamaAPI: function() {
			const sURL = "https://api.exchangeratesapi.io/latest";
			var oRequest = new XMLHttpRequest()
			oRequest.addEventListener("load", ovly.conversor.carregaListaDeMoedas)
			oRequest.open("GET", sURL)
			oRequest.send()
			console.log("Já passou pelo send")
		},	
		
		carregaListaDeMoedas: function(){
			console.log("caiu aqui")
			var oResponse = this;
			var sResponseBody = oResponse.responseText;
			resultado = JSON.parse(sResponseBody);	
			console.log(resultado);
			console.log(this.domain );
			
		//	function cb(resultado){
				for(moeda in resultado.rates){
					var o = new Option(moeda, moeda);
					/// jquerify the DOM object 'o' so we can use the html method
					$(o).html(moeda);
					$("#moeda_destino").append(o);
				}
		//	}
		//$.get(this.domain + "latest", cb);
		},
		chamarAPI: function (e) {
			console.log(this.domain);
			var dCotacao = $("#data_cotacao").val();
			var endpoint = this.domain + (dCotacao?  dCotacao : "latest");
			var oParametros = {
				base: $("#moeda_origem").val()
			};
			
			console.log("Chamando API...");
			$.get(endpoint, oParametros, $.proxy(this.callback, this));
		},
		
		callback: function (resultado) {
			this._resultado = resultado;
			this._preencheParagrafo();
			this._preencheTabela();
			
		},
		_preencheParagrafo: function(){
			$("#resultado_moeda_base").text(this._resultado.base);
			$("#resultado_data_cotacao").text(this._resultado.date);
		},
		
		_preencheTabela: function(){
			$("#tabela tbody").empty(); // limpa tabela
			var aMoedasSelecionadas = $("#moeda_destino").val();
			$.each(aMoedasSelecionadas, $.proxy(this._criaLinha, this));
		},
		_criaLinha: function(i,moeda){
			
			// parseFloat(oResposta.rates[sMoedaDestino]).toFixed(2);
			var fValor = this._resultado.rates[moeda];
			fValor = parseFloat(fValor).toFixed(2);
			
			$("#tabela").find('tbody')
			    .append($('<tr>')
			        .append(
			        	$('<td>').text(fValor),
			        	$('<td>').text(moeda)
			        )
			    );
			
		}
	}
};

window.onload = function(){
//	ovly.conversor.carregaListaDeMoedas();
	ovly.conversor.chamaAPI();
}
var http=require('http');
var xml2js=require('xml2js');
var parser=xml2js.Parser({explicitArray:false});

var goodReadsService=function(){

	var getBookById=function(id,cb){

		var options={
			host : 'www.goodreads.com',
			path : '/book/show/'+id+'?format=xml&key=WbvapnRMJgIqxdqffAVwPg' 
		};

		var callback=function(response){

			var str='';

			response.on('data',function(dataChunk){
				str+=dataChunk;
			});

			response.on('end',function(){
				
				parser.parseString(str,function(err,data){
					//console.log(data.GoodreadsResponse);
					cb(null,data.GoodreadsResponse.book);
				});
				
			});
		};

		http.request(options,callback).end();
		
	};

	return {
		getBookById:getBookById
	};s
};

module.exports=goodReadsService;
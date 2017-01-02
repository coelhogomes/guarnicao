var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : '179.188.16.83',
    user     : 'mdet_ecco',
    password : 'mdet_ecc@',
    database : 'mdet_ecco',
    debug    :  false
});


/* GET home page. */
router.get('/amp', function(req, res) {
  pool.getConnection(function(err,connection){
	    if (err) {
          connection.release();
            res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
		
		
	  
	    var inicio =  new Date(req.query.inicio).toLocaleDateString(); // Data de Inicio
		var final =  new Date(req.query.fim).toLocaleDateString(); // Data do Final Serie;
		var numero = req.query.campo; // Informa qual a campo da série
		var equip = req.query.equip;
		
		if (equip == "") {
			equip = "mdet13";
		} 
		
		var campo ="";
		
		switch (numero) {
        case '0':
			campo= "amp_FA";
            break;
        case '1':
            campo= "amp_FB";
            break;
        case '2':
            campo= "amp_FC";
            break;
		
		}	
		
		
		
		var sql = "select datahora," + campo.toString() + " from mdet_tbl where nomeNode = '" + equip.toString() + "' and (datahora >= ? and datahora < ?)  order by datahora";
		
		
		
		console.log('Sql ' + sql);
		 
		 
		connection.query(sql,[inicio,final],function(err,rows) {
	    
	     
         connection.release();
		  
		      var series = [];
			
			  var  serie =  [];
			  
			if(!err) {
			   for (var i = 0; i < rows.length; i++) {
               
                 serie.push([]);
			  		   
			     
			     var dados = rows[i]['datahora'].toLocaleString();
                    
				  


                // var dateTime =  dados.split(" ");
				   //var campos = campo.split(",");
				
                 // if(i == 1) {
                     //console.log('DateTime -' + dateTime);
                 //     }
  
                
                 //var date = dateTime[0].split("-");
                 //var time = dateTime[1].split(':');				           
				  
			     serie[i].push( new Array(3));
				 
				 
				   serie[i][0] = Date.parse(dados);
			       serie[i][1]  = rows[i][campo];
				   serie[i][2] = dados;
             				   
				
                
			   }; 
			  
             };
			  
                 			  
			  return res.status(200).json(serie);			
			  //return res.status(200).json(rows);
			
      
        });
  });
});


router.get('/watt', function(req, res) {
  pool.getConnection(function(err,connection){
	    if (err) {
          connection.release();
            res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
		
		
	  
	    var inicio =  new Date(req.query.inicio).toLocaleDateString(); // Data de Inicio
		var final =  new Date(req.query.fim).toLocaleDateString(); // Data do Final Serie;
		var numero = req.query.campo; // Informa qual a campo da série
		var equip = req.query.equip;
		
		var campo ="";
		
		switch (numero) {
		case '0':
        	campo= "watt_FA";
            break;
        case '1':
            campo= "watt_FB";
            break;
        case '2':
            campo= "watt_FC";
            break;
		
       	}
		
		
		var sql = "select datahora," + campo.toString() + " from mdet_tbl where nomeNode = '" + equip.toString() + "' and (datahora >= ? and datahora < ?)  order by datahora";
		
		 

		 connection.query(sql,[inicio,final],function(err,rows) {
	     
         connection.release();
		  
		      var series = [{},{}];
			
			  var  serie =  [];
			
			if(!err) {
			   for (var i = 0; i < rows.length; i++) {
               
                 serie.push([]);
			   			   
			     
			     var dados = rows[i]['datahora'].toLocaleString();
                    
				  


				  
			     serie[i].push( new Array(2));
				 
				 
				   serie[i][0] = Date.parse(dados);
			       serie[i][1]  = rows[i][campo];
				   serie[i][2] = dados;
             	
                       
                 
			   }; 
							
             };
				   
			return res.status(200).json(serie); 		 
		
      
        });
  });
});


router.get('/va', function(req, res) {
  pool.getConnection(function(err,connection){
	    if (err) {
          connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
		
		
	  
	    var inicio =  new Date(req.query.inicio).toLocaleDateString(); // Data de Inicio
		var final =  new Date(req.query.fim).toLocaleDateString(); // Data do Final Serie;
		var numero = req.query.campo; // Informa qual a campo da série
		var equip = req.query.equip;
		
		var campo ="";
		
		switch (numero) {
		case '0':
            campo= "va_FA";
            break;
        case '1':
            campo= "va_FB";
            break;
        case '2':
            campo= "va_FC";
            break;
		
		}
		
		
		var sql = "select datahora," + campo.toString() + " from mdet_tbl where nomeNode = '" + equip.toString() + "' and (datahora >= ? and datahora < ?)  order by datahora";
		
		 
		 connection.query(sql,[inicio,final],function(err,rows) {
	     
         connection.release();
		  
		      var series = [{},{}];
			
			  var  serie =  [];
			
			if(!err) {
			   for (var i = 0; i < rows.length; i++) {
               
                 serie.push([]);
			   			   
			     
			     var dados = rows[i]['datahora'].toLocaleString();
                    
				  
			     serie[i].push( new Array(2));
				 
				 
				   serie[i][0] = Date.parse(dados);
			       serie[i][1]  = rows[i][campo];
				   serie[i][2] = dados;
             	       
                 
			   }; 
							
             };
			 
			
			return res.status(200).json(serie); 		 
		
      
        });
  });
});

router.get('/tot', function(req, res) {
  pool.getConnection(function(err,connection){
	    if (err) {
          connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
		
		
	  
	    var inicio =  new Date(req.query.inicio).toLocaleDateString(); // Data de Inicio
		var final =  new Date(req.query.fim).toLocaleDateString(); // Data do Final Serie;
		var numero = req.query.campo; // Informa qual a campo da série
		var equip = req.query.equip;
		
		var campo ="";
		
		switch (numero) {
		case '0':
            campo= "fpt_Total";
            break;
        case '1':
            campo= "watt_Total";
            break;
        case '2':
            campo= "va_Total";
            break;
		}
		
		
		var sql = "select datahora," + campo.toString() + " from mdet_tbl where nomeNode = '" + equip.toString() + "' and (datahora >= ? and datahora < ?)  order by datahora";
		
		console.log('Sql ' + sql);
		 
		 connection.query(sql,[inicio,final],function(err,rows) {
	     
         connection.release();
		  
		      var series = [{},{}];
			
			  var  serie =  [];
			
			if(!err) {
			   for (var i = 0; i < rows.length; i++) {
               
                 serie.push([]);
			   			   
			     
			     var dados = rows[i]['datahora'].toLocaleString();
                    
				  
			     serie[i].push( new Array(2));
				 
				 
				   serie[i][0] = Date.parse(dados);
			       serie[i][1]  = rows[i][campo];
				   serie[i][2] = dados;
             	       
                 
			   }; 
							
             };
			 
			
			return res.status(200).json(serie); 		 
		
      
        });
  });
});




router.get('/equipamentos', function(req, res) {
  pool.getConnection(function(err,connection){
	  if (err) {
          connection.release();
          //res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
		
        connection.query('select distinct nomeNode from mdet_tbl order by nomeNode',[],function(err,rows){
            if(err) return res.status(400).json(err);

            return res.json(rows);
        });
  });
});



module.exports = router;

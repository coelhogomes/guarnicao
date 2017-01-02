var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool      =    mysql.createPool({
    connectionLimit : 200, //important
    host     : '179.188.16.83',
    user     : 'mdet_ecco',
    password : 'mdet_ecc@',
    database : 'mdet_ecco',
	//multipleStatements: true,
    debug    :  false
});


//pool.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
//});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


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
		case '3':
            campo="amp_FA,amp_FB,amp_FC";
            break;			
		case '5':
            campo="amp_FA,amp_FC";
			break;
		}
		
		
		var sql = "select datahora," + campo.toString() + " from mdet_tbl where nomeNode = '" + equip.toString() + "' and (datahora >= ? and datahora < ?)  order by datahora";
		
		
		
		//console.log('Sql ' + sql);
		 
		 
		connection.query(sql,[inicio,final],function(err,rows) {
	    
	     
         connection.release();
		  
		     // var series = [{},{}];
			
			  var  serie =  [];
			
			if(!err) {
			   for (var i = 0; i < rows.length; i++) {
               
                 serie.push([]);
			   			   
			     
			     var dados = rows[i]['datahora'].toLocaleString();
                    
				  


                // var dateTime =  dados.split(" ");
				
                 // if(i == 1) {
                     //console.log('DateTime -' + dateTime);
                 //     }
  
                
                 //var date = dateTime[0].split("-");
                 //var time = dateTime[1].split(':');				           
				  
			     serie[i].push( new Array(2));
				 
				 
				 for(j=0;j < 2; j++){
	           	   serie[i][0] = Date.parse(dados);
			       serie[i][1]  = rows[i][campo];	
				 };
                       
                 
			   }; 
			  
             };
				   
				 
		   	  return res.status(200).json(rows);			
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
		case '3':
		    campo= "watt_FA,watt_FB,watt_FC";
            break;
        default:
		    campo= "watt_FA,watt_FC";
        		
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
				 
				 
				 for(j=0;j < 2; j++){
	           	   serie[i][0] = Date.parse(dados);
			       serie[i][1]  = rows[i][campo];	
				 };
                       
                 
			   }; 
							
             };
				   
			return res.status(200).json(rows); 		 
		
      
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
        case '3':
		    campo= "va_FA,va_FB,va_FC";
            break;
		default:	
			campo= "va_FA,va_FC";
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
				 
				 
				 for(j=0;j < 2; j++){
	           	   serie[i][0] = Date.parse(dados);
			       serie[i][1]  = rows[i][campo];	
				 };
                       
                 
			   }; 
							
             };
				   
			return res.status(200).json(rows); 		 
		
      
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

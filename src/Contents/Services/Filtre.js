/*
 *
 *    Filtre
 *    v1.00 
 *
 */

Filtre = {
	//------------------------------------------------------
	getAll: function(o, cb) {
		var db=Filtre.using('db');
		console.log(o.year);
		db.model('dashboard', db.sql('filtre_getAll',{AN: o.year}), function(err,result) {
			var dta=result.data;
			var NAT=[];
			db.model('infocentre2015','select ID_nature, libelle_nature from nature',function(err,r2) {
				for (var i=0;i<r2.data.length;i++) {
					NAT[r2.data[i].ID_nature]=r2.data[i].libelle_nature;
				};
				for (var i=0;i<result.data.length;i++) {
					if (NAT[result.data[i].nature]) result.data[i].libelle_nature=NAT[result.data[i].nature];
				};
				result.metaData.fields.push({
					name: "libelle_nature",
					type: "string",
					length: "255",
				});
				cb(err,result);
			});
		});
		//db.model('dashboard', db.sql('filtre_getAll'), cb);		
		//db.model('dashboard','SELECT * FROM filtre',cb);
	},
	//------------------------------------------------------
	/*getAllByCat: function(cb) {
		var db=Filtre.using('db');
		db.model('dashboard', db.sql('filtre_getAll'), function(e,o) 
		{
			if (o) 
			{
				//console.log(o);
				if (o.data) 
				{
					o.metaData.fields[2].type="boolean";
					cb(e,o);
					return;
				};
			};				
			cb({});
		});		
		//db.model('dashboard', db.sql('filtre_getAll'), cb);		
		//db.model('dashboard','SELECT * FROM filtre',cb);
	},*/
	//------------------------------------------------------
	getByCat: function(o, cb) {
		var db=Filtre.using('db');
		db.model('dashboard', db.sql('filtre_getByCat',{ID: o.id}), cb);
		
	},
	//------------------------------------------------------
	update: function(o, cb) {
		var db=Filtre.using('db');
		var tabTrue = [];		
		var tabFalse = [];	
		//console.log(o);
		
		for (var i=0; i<o.tableau.length;i++)
		{
			if (o.tableau[i].coche == true)
			{
				tabTrue.push('(categorie = '+o.tableau[i].categorie+' AND nature = '+o.tableau[i].nature + ' AND annee = '+o.year+')');
			}
			else
			{
				tabFalse.push('(categorie = '+o.tableau[i].categorie+' AND nature = '+o.tableau[i].nature + ' AND annee = '+o.year+')');
			};
		};
		var sql1='UPDATE filtre SET coche = 1 WHERE ('+tabTrue.join(' OR ')+')';
		var sql2='UPDATE filtre SET coche = 0 WHERE ('+tabFalse.join(' OR ')+')';
		//console.log(sql1);
		db.query('dashboard',sql1,function(err,o) {
			db.query('dashboard',sql2,cb);
		});
	},	
	//------------------------------------------------------
	dbpost: function(tab,ndx,cb)
	{
		var db=Filtre.using('db');
		db.query('dashboard',tab[ndx],function(err,o) {
			if (ndx>tab.length) cb(); else Filtre.dbpost(tab,ndx+1,cb);
		});
	},
	//------------------------------------------------------
	insert: function(o,cb) {
		var db=Filtre.using('db');
		//var sql1='DELETE FROM filtre WHERE YEAR like "%'+o.year+'%"''
		var sql2='INSERT INTO filtre (categorie, nature, coche, annee) VALUES ';	
		var longData = o.dataArray.length;
		for (var i=0;i<longData;i++)
		{
			sql2 += '(' + o.dataArray[i].categorie + ',' + o.dataArray[i].nature + ',' + o.dataArray[i].coche + ',' + o.year + ((i==longData-1)?')':'),');
		};
		//console.log(sql2);
		db.query('dashboard',sql2,cb);
		
		/*db.query('dashboard',sql1,function(err,o) {
			db.query('dashboard',sql2,cb);
		});*/
		//var sql='INSERT INTO filtre VALUES '+dataArray[0].categorie+','+tab.join(',')+')';
		//console.log(sql1);
		//console.log(sql2);
		//Filtre.dbpost(sql.split(';'),0,cb);
		//db.query('dashboard',sql ,cb);
	},
};

module.exports = Filtre;
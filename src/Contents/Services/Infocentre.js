Infocentre = {
	getBase: function(o, cb) {
		var db=Infocentre.using('db');		
		console.log(o);
		db.model('dashboard', "select dashboard.filtre.nature from dashboard.filtre where dashboard.filtre.categorie = "+o.CAT+" and coche = 1 and annee= "+o.YEAR+" ",function(err,r) {
			var nature=[];
			for (var i=0;i<r.data.length;i++) nature.push(r.data[i].nature);
			console.log('----NATURE---');
			console.log(nature);
			console.log('infocentre_getBase',{ID: o.ID, NAT: nature.join(',')});
			db.model('infocentre2015',db.sql('infocentre_getBase',{ID: o.ID, NAT: nature.join(',')}), function(err,result) {
				console.log(err);
				console.log(result);
				cb(err,result);
			});
		});
	},
	// --------------------------------------------------------------------
	getBaseFact: function(o, cb) {
		var db=Infocentre.using('db');		
		db.model('infocentre2015', db.sql('infocentre_getBaseFact',{ID: o.ID}), cb);
	},
	// --------------------------------------------------------------------
	setBaseFact: function(data,cb) {
		var db=Infocentre.using('db');	
		//console.log('o.ID_demande:'+o.ID_demande);
		//console.log('o.facture:'+o.facture);
		var tab=[];		
		for (var i=0;i<data.length;i++) tab.push(data[i].ID_demande);	
		var sql='UPDATE base SET facture = "'+data[0].facture+'", livre_valide = 0, base.avancement = "'+data[0].avancement+'" WHERE base.ID_demande in ('+tab.join(',')+')';
		//console.log(sql);
		db.query('infocentre2015',sql ,cb);
	},
	// --------------------------------------------------------------------
	setBaseLivre: function(o,cb) {
		var db=Infocentre.using('db');	
		//console.log('o.ID_demande:'+o.ID_demande);
		//console.log('o.facture:'+o.facture);
		var sql='UPDATE base SET livre_valide = "'+o.coche+'" WHERE base.ID_demande = "'+o.bes+'"';
		//console.log(sql);
		db.query('infocentre2015',sql ,cb);
	},
	// --------------------------------------------------------------------
	setBaseAv: function(o,cb) {
		var db=Infocentre.using('db');	
		//console.log('o.ID_demande:'+o.ID_demande);
		//console.log('o.facture:'+o.facture);
		//var tab=[];		
		//for (var i=0;i<o.data.length;i++) tab.push(data[i].ID_demande);	
		var sql='UPDATE base SET avancement = "'+o.avanc+'" WHERE base.ID_demande in ('+o.data.join(',')+')';
		//console.log(sql);
		db.query('infocentre2015',sql ,cb);
	},
	// --------------------------------------------------------------------
	getNatureAll: function(cb) {
		var db=Infocentre.using('db');		
		db.model('infocentre2015', db.sql('infocentre_getNatureAll'), cb);
	},
}

module.exports = Infocentre;

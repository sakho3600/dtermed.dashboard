profils= {
	get: function(o,cb)
	{
		var db=profils.using('db');
		db.query('dashboard','select * from profils where profil_code='+o,cb);
	}
};

module.exports = profils;
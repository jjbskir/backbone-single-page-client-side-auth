// config.

exports.config = {
	db: {
    	url: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/testdb'
  	}	
};
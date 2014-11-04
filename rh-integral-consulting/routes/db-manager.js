var mongo = require('mongodb');
 
var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

var DB_RH_INTEGRAL_CONSULTING = 'rh-integral-consulting-db';
var COLLECTION_OFFERS = 'offers';
var COLLECTION_JOB_APPLICATIONS = 'job-applications';
var COLLECTION_MESSAGES = 'messages';
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db(DB_RH_INTEGRAL_CONSULTING, server);
 
// connection
db.open(function(err, db) {
	if(!err) {
		console.log('Connected to "' + DB_RH_INTEGRAL_CONSULTING + '" database');
		db.collection(COLLECTION_OFFERS, {strict:true}, function(err, collection) {
			if (err) {
				console.log('The "' + COLLECTION_OFFERS + '" collection does not exist. Creating it with sample data...');
				populateOffers();
			}
			else {
				collection.find().toArray(function(err, items) {
					if(items.length == 0)
					{
						console.log('The "' + COLLECTION_OFFERS + '" collection is empty. Creating it with sample data...');
						populateOffers();
					} 
				});
			}
		});
	}
	else {
		console.log("Error while opening database: " + err);
	}
});

// template methods
var findAll = function(req, res, col) {
	db.collection(col, function(err, collection) {
		console.log('Retrieving all "' + col + "'");
		collection.find().sort( { date: -1 } ).toArray(function(err, items) {
			res.send(items);
		});
	});
}
 
var findById = function(req, res, col) {
	var id = req.params.id;
	console.log('Retrieving "' + col + '": ' + id);
	db.collection(col, function(err, collection) {
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
			res.send(item);
		});
	});
}

var aggregate = function(req, res, col) {
	var reqBody = req.body;
	console.log('Adding "' + col + '": ' + JSON.stringify(reqBody));
	db.collection(col, function(err, collection) {
		collection.insert(reqBody, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
}
 
var update = function(req, res, col) {
	var id = req.params.id;	
	var reqBody = req.body;
	console.log('Updating "' + col + '": ' + id);
	console.log(JSON.stringify(reqBody));
	db.collection(col, function(err, collection) {
		collection.update({'_id':new BSON.ObjectID(id)}, reqBody, {safe:true}, function(err, result) {
			if (err) {
				console.log('Error updating "' + col + '": ' + err);
				res.send({'error':'An error has occurred'});
			} else {
				console.log('' + result + ' document(s) updated');
				res.send(reqBody);
			}
		});
	});
}
 
var erase = function(req, res, col) {
	var id = req.params.id;
	console.log('Deleting "' + col + '": ' + id);
	db.collection(col, function(err, collection) {
		collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred - ' + err});
			} else {
				console.log('' + result + ' document(s) deleted');
				res.send(req.body);
			}
		});
	});
}

// populate database with sample data
var populateOffers = function() {
	var now = null;
	var offers = [
					{
						employerRefCode: "10102014", // Employer reference code of position (Optional)
						position: "Senior Java Developer para importante corporación.",
						date: now,
						reference: "Java",
						jobType: "Efectivo",
						begin: "Inmediato",
						duration: "Permanente",
						location: "Córdoba",
						requestType: "Por e-mail",
						contact: "Selectores",
						telphone: "(+54 9 0351) 15 393-3182",
						email: "atencion@rhintegralconsulting.com.ar",
						description: "<br>Seleccionamos para importante corporación. \n<br>Perfil General: Desarrollador\n<br>\n<br>- 5 años de experiencia demostrable en desarrollo y programación en base a los siguientes\n<br>Lenguajes: \n<br>Java (requerido)\n<br>Jscript (deseable)\n<br>- Conocimiento en protocolo de comunicaciones.\n<br>- Manejos de Tecnologías y herramientas de diagnóstico (UML, POO, Enterprise Architect)\n<br>- Programación bajo Eclipse.\n<br>- Capacidad de trabajar con ambientes integrados (SVN, DOORS, Tracker de bugs, HUDSON)\n<br>- Sistemas operativos: Windows, LINUX (kernel y versiones)\n<br>- Interacción para el trabajo en equipo.\n<br>- Inglés oral y escrito (lectura y escritura de documentos técnicos).\n<br>- Manejo de programación en tiempo real.\n<br>- Disponibilidad para viajar dentro y fuera del país.\n<br>Los interesados deberán enviar cv indicando remuneración pretendida e indicando al puesto que se postula. CV: atencion@rhintegralconsulting.com.ar",
						employer: {
							contact: "Pablo Aguerre",
							company: "Hewlett Packard",
							email: "pablo.aguerre@gmail.com",
							telphone: "(+54 0351) 563-4383"
						}
					},
					{
						employerRefCode: null,
						position: "Analista/Programador C++ para multinacional con experiencia.",
						date: now,
						reference: "C++",
						jobType: "Efectivo",
						begin: "Inmediato",
						duration: "Permanente",
						location: "Córdoba",
						requestType: "Por e-mail",
						contact: "Selectores",
						telphone: "(+54 9 0351) 15 393-3182",
						email: "atencion@rhintegralconsulting.com.ar",
						description: "<br>Seleccionamos para importante multinacional. \n<br>Perfil General: Programador\n<br>\n<br>- 5 años de experiencia demostrable en desarrollo y programación en base a los siguientes\n<br>Lenguajes: \n<br>C++ (requerido)\n<br>C# (deseable)\n<br>- Conocimiento en RPC.\n<br>- Programación bajo VS.\n<br>- Capacidad de trabajar con ambientes integrados (SVN, AccuRev, JIRA, Bamboo)\n<br>- Sistemas operativos: Windows 8.0, 8.1\n<br>- Interacción para el trabajo en equipo.\n<br>- Inglés oral y escrito (lectura y escritura de documentos técnicos).\n<br>- Manejo de programación en tiempo real.\n<br>- Disponibilidad para viajar dentro y fuera del país.\n<br>Los interesados deberán enviar cv indicando remuneración pretendida e indicando al puesto que se postula. CV: atencion@rhintegralconsulting.com.ar",
						employer: {
							contact: "Pablo Aguerre",
							company: "Intel",
							email: "pablo.aguerre@intel.com",
							telphone: "(+54 0351) 422-7700"
						}
					},
					{
						employerRefCode: null,
						position: "Programadores PL-SQL con y sin experiencia.",
						date: now,
						reference: "PL-SQL",
						jobType: "Subcontratado",
						begin: "Inmediato",
						duration: "Temporal",
						location: "Córdoba",
						requestType: "Por e-mail",
						contact: "Selectores",
						telphone: "(+54 9 0351) 15 393-3182",
						email: "atencion@rhintegralconsulting.com.ar",
						description: "<br>Seleccionamos para importante empresa local. \n<br>Perfil General: Programador\n<br>\n<br>- 0-2 años de experiencia en desarrollo y programación en base a los siguientes\n<br>Lenguajes: \n<br>PL-SQL (requerido)\n<br>SQL (deseable)\n<br>- Interacción para el trabajo en equipo.\n<br>- Manejo de programación en tiempo real.\n<br>Los interesados deberán enviar cv indicando remuneración pretendida e indicando al puesto que se postula. CV: atencion@rhintegralconsulting.com.ar",
						employer: {
							contact: "Pablo Aguerre",
							company: "Harriage",
							email: "pablo.aguerre@gmail.com",
							telphone: "(+54 0351) 638-7560"
						}
					},
					{
						employerRefCode: null,
						position: "Administrador de Base de Datos SQL Server Semi Senior.",
						date: now,
						reference: "BD",
						jobType: "Efectivo",
						begin: "Inmediato",
						duration: "Permanente",
						location: "Córdoba",
						requestType: "Por e-mail",
						contact: "Selectores",
						telphone: "(+54 9 0351) 15 393-3182",
						email: "atencion@rhintegralconsulting.com.ar",
						description: "<br>Seleccionamos para importante empresa local. \n<br>Perfil General: Programador BD\n<br>\n<br>- 3-5 años de experiencia en desarrollo y programación en base a los siguientes\n<br>Lenguajes: \n<br>SQL (requerido)\n<br>PL-SQL (deseable)\n<br>- Interacción para el trabajo en equipo.\n<br>- Manejo de programación en tiempo real.\n<br>Los interesados deberán enviar cv indicando remuneración pretendida e indicando al puesto que se postula. CV: atencion@rhintegralconsulting.com.ar",
						employer: {
							contact: "Pablo Aguerre",
							company: "Vates S. A.",
							email: "pablo.aguerre@gmail.com",
							telphone: "(+54 0351) 570-9800"
						}
					},
					{
						employerRefCode: null,
						position: "Vendedor de Software con experiencia para importante empresa.",
						date: now,
						reference: null,
						jobType: "Efectivo",
						begin: "Inmediato",
						duration: "Permanente",
						location: "Córdoba",
						requestType: "Por e-mail",
						contact: "Selectores",
						telphone: "(+54 9 0351) 15 393-3182",
						email: "atencion@rhintegralconsulting.com.ar",
						description: null,
						employer: {
							contact: null,
							company: null,
							email: null,
							telphone: null
						}
					},
					{
						employerRefCode: null,
						position: "Supervisor de Ventas para concesionaria líder nacional de autos y camiones importados.",
						date: now,
						reference: null,
						jobType: "Efectivo",
						begin: "Inmediato",
						duration: "Permanente",
						location: "Córdoba",
						requestType: "Por e-mail",
						contact: "Selectores",
						telphone: "(+54 9 0351) 15 393-3182",
						email: "atencion@rhintegralconsulting.com.ar",
						description: null,
						employer: {
							contact: null,
							company: null,
							email: null,
							telphone: null
						}
					},
					{
						employerRefCode: null,
						position: "Sub Gerente Comercial para industria líder.",
						date: now,
						reference: null,
						jobType: "Efectivo",
						begin: "Inmediato",
						duration: "Permanente",
						location: "Córdoba",
						requestType: "Por e-mail",
						contact: "Selectores",
						telphone: "(+54 9 0351) 15 393-3182",
						email: "atencion@rhintegralconsulting.com.ar",
						description: null,
						employer: {
							contact: null,
							company: null,
							email: null,
							telphone: null
						}
					},
					{
						employerRefCode: null,
						position: "Supervisor de Ventas para importante multinacional.",
						date: now,
						reference: null,
						jobType: "Efectivo",
						begin: "Inmediato",
						duration: "Permanente",
						location: "Córdoba",
						requestType: "Por e-mail",
						contact: "Selectores",
						telphone: "(+54 9 0351) 15 393-3182",
						email: "atencion@rhintegralconsulting.com.ar",
						description: null,
						employer: {
							contact: null,
							company: null,
							email: null,
							telphone: null
						}
					},
					{
						employerRefCode: null,
						position: "Ejecutivo de Cuentas IT.",
						date: now,
						reference: null,
						jobType: "Efectivo",
						begin: "Inmediato",
						duration: "Permanente",
						location: "Córdoba",
						requestType: "Por e-mail",
						contact: "Selectores",
						telphone: "(+54 9 0351) 15 393-3182",
						email: "atencion@rhintegralconsulting.com.ar",
						description: null,
						employer: {
							contact: null,
							company: null,
							email: null,
							telphone: null
						}
					},
					{
						employerRefCode: null,
						position: "Gerente de Taller para importante concesionaria de importados.",
						date: now,
						reference: null,
						jobType: "Efectivo",
						begin: "Inmediato",
						duration: "Permanente",
						location: "Córdoba",
						requestType: "Por e-mail",
						contact: "Selectores",
						telphone: "(+54 9 0351) 15 393-3182",
						email: "atencion@rhintegralconsulting.com.ar",
						description: null,
						employer: {
							contact: null,
							company: null,
							email: null,
							telphone: null
						}
					},
					{
						employerRefCode: null,
						position: "Contador para importante industria.",
						date: now,
						reference: null,
						jobType: "Efectivo",
						begin: "Inmediato",
						duration: "Permanente",
						location: "Córdoba",
						requestType: "Por e-mail",
						contact: "Selectores",
						telphone: "(+54 9 0351) 15 393-3182",
						email: "atencion@rhintegralconsulting.com.ar",
						description: null,
						employer: {
							contact: null,
							company: null,
							email: null,
							telphone: null
						}
					},
					{
						employerRefCode: null,
						position: "Contador para importante PYME.",
						date: now,
						reference: null,
						jobType: "Efectivo",
						begin: "Inmediato",
						duration: "Permanente",
						location: "Córdoba",
						requestType: "Por e-mail",
						contact: "Selectores",
						telphone: "(+54 9 0351) 15 393-3182",
						email: "atencion@rhintegralconsulting.com.ar",
						description: null,
						employer: {
							contact: null,
							company: null,
							email: null,
							telphone: null
						}
					},
					{
						employerRefCode: null,
						position: "Contador Jóven egresado para auditoría interna.",
						date: now,
						reference: null,
						jobType: "Efectivo",
						begin: "Inmediato",
						duration: "Temporal",
						location: "Córdoba",
						requestType: "Por e-mail",
						contact: "Selectores",
						telphone: "(+54 9 0351) 15 393-3182",
						email: "atencion@rhintegralconsulting.com.ar",
						description: null,
						employer: {
							contact: null,
							company: null,
							email: null,
							telphone: null
						}
					},
					{
						employerRefCode: null,
						position: "Coordinador/a de Recursos Humanos.",
						date: now,
						reference: null,
						jobType: "Efectivo",
						begin: "Inmediato",
						duration: "Permanente",
						location: "Córdoba",
						requestType: "Por e-mail",
						contact: "Selectores",
						telphone: "(+54 9 0351) 15 393-3182",
						email: "atencion@rhintegralconsulting.com.ar",
						description: null,
						employer: {
							contact: null,
							company: null,
							email: null,
							telphone: null
						}
					},
					{
						employerRefCode: null,
						position: "Administrativo para importante concesionaria lider de autos importados.",
						date: now,
						reference: null,
						jobType: "Efectivo",
						begin: "Inmediato",
						duration: "Permanente",
						location: "Córdoba",
						requestType: "Por e-mail",
						contact: "Selectores",
						telphone: "(+54 9 0351) 15 393-3182",
						email: "atencion@rhintegralconsulting.com.ar",
						description: null,
						employer: {
							contact: null,
							company: null,
							email: null,
							telphone: null
						}
					}
				 ];
	 
	db.collection(COLLECTION_OFFERS, function(err, collection) {
		collection.insert(offers, {safe:true}, function(err, result) {});
	});
}

// exports - offers
exports.findOffers = function(req, res) {
	findAll(req, res, COLLECTION_OFFERS);
}

exports.findOfferById = function(req, res) {
	findById(req, res, COLLECTION_OFFERS);
}

exports.addOffer = function(req, res) {
	aggregate(req, res, COLLECTION_OFFERS);
}

exports.updateOffer = function(req, res) {
	update(req, res, COLLECTION_OFFERS);
}

exports.removeOffer = function(req, res) {
	erase(req, res, COLLECTION_OFFERS);
}

// exports - job applications
exports.findJobApplications = function(req, res) {
	findAll(req, res, COLLECTION_JOB_APPLICATIONS);
}

exports.findJobApplicationById = function(req, res) {
	findById(req, res, COLLECTION_JOB_APPLICATIONS);
}

exports.addJobApplication = function(req, res) {
	aggregate(req, res, COLLECTION_JOB_APPLICATIONS);
}

exports.updateJobApplication = function(req, res) {
	update(req, res, COLLECTION_JOB_APPLICATIONS);
}

exports.removeJobApplication = function(req, res) {
	erase(req, res, COLLECTION_JOB_APPLICATIONS);
}

// exports - messages
exports.findMessages = function(req, res) {
	findAll(req, res, COLLECTION_MESSAGES);
}

exports.findMessageById = function(req, res) {
	findById(req, res, COLLECTION_MESSAGES);
}

exports.addMessage = function(req, res) {
	aggregate(req, res, COLLECTION_MESSAGES);
}

exports.updateMessage = function(req, res) {
	update(req, res, COLLECTION_MESSAGES);
}

exports.removeMessage = function(req, res) {
	erase(req, res, COLLECTION_MESSAGES);
}
var MESSAGE_FORMAT_LIMIT = 50,
    POSITION_FORMAT_LIMIT = 75,
    DEFAULT_FORMAT_LIMIT = 100,
    DATE_COLUMN_WIDTH = "11%",
    MAIN_COLUMN_WIDTH = "33%",
    OFFERS_SUMMARY_TYPE = 'offers-summary';

function serializeObject(form) {
    var o = {};
    var a = form.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}

function displayStatusEndFlow(form, message) {
    form.empty();
    form.html('<ol><li><label for="status"><h4>' + message + '<h4></label></li></ol>');    
    $('label[for="status"]').addClass("status");
}

function displayStatusMessge(message) {
    var label = $('label[for="status"]'); 
    label.empty();
    label.html('<span class="red">' + message + '</span>');
    label.addClass("status");
}

function displayStatusMessgeRequired(args) {
    if (args.length > 0) {
      var message = '';
      for(var i = 0; i < args.length; i++) {
        if (i > 0) {
            if(i == args.length -1) message += ' y ';
            else message += ', ';
        }
        message += args[i];
      }
      if (args.length == 1) message += ' es un campo requerido.';
      else message += ' son campos requeridos.';
      displayStatusMessge(message);
    }
}

function isValidEmail(formObj) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!formObj || !formObj.email || !re.test( formObj.email )) {
        displayStatusMessge('E-mail es inválido.');
        return false;
    }
    displayStatusMessge('');
    return true;
}

function getTableLanguage() {
    return {
        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":     "Último",
            "sNext":     "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }
    }
}

function translateProperty(propName) {
    var rv = '';
    var langMap = [];
    langMap['_id'] = 'Identificador';
    langMap['employerRefCode'] = 'Código de referencia';
    langMap['employer'] = 'Empleador';
    langMap['contact'] = 'Contacto';
    langMap['company'] = 'Empresa';
    langMap['email'] = 'E-mail';
    langMap['telphone'] = 'Teléfono';
    langMap['position'] = 'Posiciones abiertas';
    langMap['date'] = 'Fecha de ingreso';
    langMap['reference'] = 'Referencia';
    langMap['jobType'] = 'Tipo de trabajo';
    langMap['begin'] = 'Comienzo';
    langMap['duration'] = 'Duración';
    langMap['location'] = 'Lugar';
    langMap['requestType'] = 'Tipo de requerimiento';
    langMap['description'] = 'Descripción';
    langMap['jobSeeker'] = 'Postulante';
    langMap['phone'] = 'Teléfono';
    langMap['cv'] = 'C. V.';
    langMap['positions'] = 'Posiciones a las cuales se postula';
    langMap['subject'] = 'Asunto';
    langMap['message'] = 'Mensaje';
    rv = langMap[propName];
    if(!rv){
        console.error('"' + propName + '" property not found, default value will be displayed.');
        rv = propName;
    }
    return rv;
}

function toggleLoading(val) {
    val ? $('#loading').show() : $('#loading').hide();
}

function formatDate(dateStr) {
    var rv = '';
    if (dateStr) {
        var dt = new Date(dateStr);
        rv = dt.getFullYear() + "/" + dt.getMonth() + "/" + dt.getDate() + " " + dt.toLocaleTimeString();
    }
    return rv;
}

function formatValue(val, flimit) {
    var rv = '';
    var limit;
    flimit ? limit = flimit : DEFAULT_FORMAT_LIMIT;
    if (val) {
        if (val.length > limit) {
            rv = val.slice(0, limit);
            rv += ' ...';
        } else {
            rv = val;
        }
    }
    return rv;
}

function formatPosition(message) {
    return formatValue(message, POSITION_FORMAT_LIMIT);
}

function formatMessage(message) { 
    return formatValue(message, MESSAGE_FORMAT_LIMIT);
}

function getAhref(queryType, item) {
    return '<a id="' + item._id + '" title="Click para ver detalle" href="#" onclick="viewDetails(\'' + queryType + '\',\'' + item._id + '\');return false;">Leer más</a>';
}

function buildDataSet(queryType, data) {
    function getOfferRow(item) {
        return [ 
        formatDate(item.date),
        item.position,
        item.employer ? item.employer.company : '',
        item.employer ? item.employer.contact : '',
        item.employer ? item.employer.email : '',
        getAhref(OFFERS_TYPE, item)
        ];
    }

    function getJobApplicationRow(item) {
        return [ 
        formatDate(item.date),
        item.positions,
        item.jobSeeker,
        item.email,
        item.phone,
        getAhref(JOB_APPLICATIONS_TYPE, item)
        ];
    }

    function getMessageRow(item) {
        return [ 
        formatDate(item.date),
        formatMessage(item.message),
        item.subject,
        item.contact,
        item.email,
        getAhref(MESSAGES_TYPE, item)
        ];
    }

    function getOfferSummaryRow(item) {
        return [ 
        formatDate(item.date),
        formatPosition(item.position),
        item.email,
        getAhref(OFFERS_TYPE, item)
        ];
    }

    var rowsMap = [];
    rowsMap[OFFERS_TYPE] = getOfferRow;
    rowsMap[JOB_APPLICATIONS_TYPE] = getJobApplicationRow;
    rowsMap[MESSAGES_TYPE] = getMessageRow;
    rowsMap[OFFERS_SUMMARY_TYPE] = getOfferSummaryRow;

    var dataSet = [];
    for(var i = 0; i < data.length; i++) {
        var item = data[i];
        dataSet[i] = rowsMap[queryType](item);
    }
    return dataSet;
}

function getColumns(queryType) {
    var columnsOffer = [
    { "title": "Fecha", "width": DATE_COLUMN_WIDTH },
    { "title": "Posiciones abiertas", "width": MAIN_COLUMN_WIDTH },
    { "title": "Empresa" },
    { "title": "Nombre y apellido" },
    { "title": "E-mail" },
    { "title": "" }
    ]

    var columnsJobApplication = [
    { "title": "Fecha", "width": DATE_COLUMN_WIDTH },
    { "title": "Posiciónes a las cuáles se postula", "width": MAIN_COLUMN_WIDTH },
    { "title": "Nombre y apellido" },
    { "title": "E-mail" },
    { "title": "Teléfono" },
    { "title": "" }
    ]

    var columnsMessage = [
    { "title": "Fecha", "width": DATE_COLUMN_WIDTH },
    { "title": "Mensaje", "width": MAIN_COLUMN_WIDTH },
    { "title": "Asunto" },
    { "title": "Nombre y apellido" },
    { "title": "E-mail" },
    { "title": "" }
    ]

    var columnsOfferSummary = [
    { "title": "Fecha", "width": "18%" },
    { "title": "Posiciones abiertas", "width": "52%" },
    { "title": "E-mail", "width": "20%" },
    { "title": "", "width": "10%" }
    ]

    var columnsMap = [];
    columnsMap[OFFERS_TYPE] = columnsOffer;
    columnsMap[JOB_APPLICATIONS_TYPE] = columnsJobApplication;
    columnsMap[MESSAGES_TYPE] = columnsMessage;
    columnsMap[OFFERS_SUMMARY_TYPE] = columnsOfferSummary;

    return columnsMap[queryType];
}

function getQueryMethod(queryType) {
    var methodsMap = [];
    methodsMap[OFFERS_TYPE] = findOffers;
    methodsMap[JOB_APPLICATIONS_TYPE] = findJobApplications;
    methodsMap[MESSAGES_TYPE] = findMessages;
    return methodsMap[queryType];
}

function toggleOffersPanel(val) {
    val ? $("#leftPanel").css("display", "none") : $("#leftPanel").css("display", "inline");
    val ? $("#rightPanel").css("display", "none") : $("#rightPanel").css("display", "inline");
    val ? $("#allOffersPanel").css("display", "inline") : $("#allOffersPanel").css("display", "none");
}
var SERVER_URI = 'http://146.148.76.138:8080/',
OFFERS_TYPE = 'offers',
JOB_APPLICATIONS_TYPE = 'job-applications',
MESSAGES_TYPE = 'messages',
OFFERS_URI = SERVER_URI + OFFERS_TYPE,
MESSAGES_URI = SERVER_URI + MESSAGES_TYPE,
JOB_APPLICATIONS_URI = SERVER_URI + JOB_APPLICATIONS_TYPE;

function getUri(queryType, params) {
  var rv = '';
  var urisMap = [];
  urisMap[OFFERS_TYPE] = OFFERS_URI;
  urisMap[JOB_APPLICATIONS_TYPE] = JOB_APPLICATIONS_URI;
  urisMap[MESSAGES_TYPE] = MESSAGES_URI;
  rv = urisMap[queryType];
  if (params) {
    rv += "/";
    rv += params;
  }
  return rv;
}

function findById(queryType, id) {
  var dfd = new $.Deferred();
  var req = new XMLHttpRequest();
  var uri = getUri(queryType, id);
  req.open('GET', uri, true);
  req.setRequestHeader("Content-Type", "application/json");

  req.onload = function() {
    if (req.status == 200) {
      try {
        var data = JSON.parse(req.responseText);
        dfd.resolve(data);
      }
      catch(e) {
        console.error("findById exception occurred: " + e.message);
        dfd.reject("exception occurred: " + e.message);
      }
    }
    else {
      console.error("findById HTTP GET status != 200");
      dfd.reject("HTTP GET status != 200");
    }
  };

  req.onerror = function(e) {
    console.error("findById onerror occurred: " + e.message);
    dfd.reject("onerror occurred: " + e.message);
  };

  req.send();

  // Return the Promise so caller can't change the Deferred
  return dfd.promise();
}

function updateById(queryType, id, jsonObj) {
  var dfd = new $.Deferred();
  var req = new XMLHttpRequest();
  var uri = getUri(queryType, id);
  req.open('PUT', uri, true);
  req.setRequestHeader("Content-Type", "application/json");

  req.onload = function() {
    if (req.status == 200) {
      try {
        var data = JSON.parse(req.responseText);
        dfd.resolve(data);
      }
      catch(e) {
        console.error("updateById exception occurred: " + e.message);
        dfd.reject("exception occurred: " + e.message);
      }
    }
    else {
      console.error("updateById HTTP GET status != 200");
      dfd.reject("HTTP GET status != 200");
    }
  };

  req.onerror = function(e) {
    console.error("updateById onerror occurred: " + e.message);
    dfd.reject("onerror occurred: " + e.message);
  };

  req.send( JSON.stringify(jsonObj) );
  
  return dfd.promise();
}

function removeById(queryType, id) {
  var dfd = new $.Deferred();
  var req = new XMLHttpRequest();
  var uri = getUri(queryType, id);
  req.open('DELETE', uri, true);
  req.setRequestHeader("Content-Type", "application/json");

  req.onload = function() {
    if (req.status == 200) {
      try {
        var data = JSON.parse(req.responseText);
        dfd.resolve(data);
      }
      catch(e) {
        console.error("deleteById exception occurred: " + e.message);
        dfd.reject("exception occurred: " + e.message);
      }
    }
    else {
      console.error("deleteById HTTP GET status != 200");
      dfd.reject("HTTP GET status != 200");
    }
  };

  req.onerror = function(e) {
    console.error("deleteById onerror occurred: " + e.message);
    dfd.reject("onerror occurred: " + e.message);
  };

  req.send();
  
  return dfd.promise();
}

function findOffers() {
  var dfd = new $.Deferred();
  var req = new XMLHttpRequest();
  req.open('GET', OFFERS_URI, true);
  req.setRequestHeader("Content-Type", "application/json");

  req.onload = function() {
    if (req.status == 200) {
      try {
        var offers = JSON.parse(req.responseText);
        dfd.resolve(offers);
      }
      catch(e) {
        console.error("findOffers exception occurred: " + e.message);
        dfd.reject("exception occurred: " + e.message);
      }
    }
    else {
      console.error("findOffers HTTP GET status != 200");
      dfd.reject("HTTP GET status != 200");
    }
  };

  req.onerror = function(e) {
    console.error("findOffers onerror occurred: " + e.message);
    dfd.reject("onerror occurred: " + e.message);
  };

  req.send();

  return dfd.promise();
}

function addOffer(offer) {
  var dfd = new $.Deferred();
  var req = new XMLHttpRequest();
  req.open('POST', OFFERS_URI, true);
  req.setRequestHeader("Content-Type", "application/json");

  req.onload = function() {
    if (req.status == 200) {
      try {
        var data = JSON.parse(req.responseText);
        dfd.resolve(data);
      }
      catch(e) {
        console.error("addOffer exception occurred: " + e.message);
        dfd.reject("exception occurred: " + e.message);
      }
    }
    else {
      console.error("addOffer HTTP GET status != 200");
      dfd.reject("HTTP GET status != 200");
    }
  };

  req.onerror = function(e) {
    console.error("addOffer onerror occurred: " + e.message);
    dfd.reject("onerror occurred: " + e.message);
  };

  req.send( JSON.stringify(offer) );
  
  return dfd.promise();
}

function addMessage(message) {
  var dfd = new $.Deferred();
  var req = new XMLHttpRequest();
  req.open('POST', MESSAGES_URI, true);
  req.setRequestHeader("Content-Type", "application/json");

  req.onload = function() {
    if (req.status == 200) {
      try {
        var data = JSON.parse(req.responseText);
        dfd.resolve(data);
      }
      catch(e) {
        console.error("addMessage exception occurred: " + e.message);
        dfd.reject("exception occurred: " + e.message);
      }
    }
    else {
      console.error("addMessage HTTP GET status != 200");
      dfd.reject("HTTP GET status != 200");
    }
  };

  req.onerror = function(e) {
    console.error("addMessage onerror occurred: " + e.message);
    dfd.reject("onerror occurred: " + e.message);
  };

  req.send( JSON.stringify(message) );
  
  return dfd.promise();
}

function addJobApplication(jobApplication) {
  var dfd = new $.Deferred();
  var req = new XMLHttpRequest();
  req.open('POST', JOB_APPLICATIONS_URI, true);
  req.setRequestHeader("Content-Type", "application/json");

  req.onload = function() {
    if (req.status == 200) {
      try {
        var data = JSON.parse(req.responseText);
        dfd.resolve(data);
      }
      catch(e) {
        console.error("addJobApplication exception occurred: " + e.message);
        dfd.reject("exception occurred: " + e.message);
      }
    }
    else {
      console.error("addJobApplication HTTP GET status != 200");
      dfd.reject("HTTP GET status != 200");
    }
  };

  req.onerror = function(e) {
    console.error("addJobApplication onerror occurred: " + e.message);
    dfd.reject("onerror occurred: " + e.message);
  };

  req.send( JSON.stringify(jobApplication) );
  
  return dfd.promise();
}

function findJobApplications() {
  var dfd = new $.Deferred();
  var req = new XMLHttpRequest();
  req.open('GET', JOB_APPLICATIONS_URI, true);
  req.setRequestHeader("Content-Type", "application/json");

  req.onload = function() {
    if (req.status == 200) {
      try {
        var jobApplications = JSON.parse(req.responseText);
        dfd.resolve(jobApplications);
      }
      catch(e) {
        console.error("findJobApplications exception occurred: " + e.message);
        dfd.reject("exception occurred: " + e.message);
      }
    }
    else {
      console.error("findJobApplications HTTP GET status != 200");
      dfd.reject("HTTP GET status != 200");
    }
  };

  req.onerror = function(e) {
    console.error("findJobApplications onerror occurred: " + e.message);
    dfd.reject("onerror occurred: " + e.message);
  };

  req.send();

  return dfd.promise();
}

function findMessages() {
  var dfd = new $.Deferred();
  var req = new XMLHttpRequest();
  req.open('GET', MESSAGES_URI, true);
  req.setRequestHeader("Content-Type", "application/json");

  req.onload = function() {
    if (req.status == 200) {
      try {
        var messages = JSON.parse(req.responseText);
        dfd.resolve(messages);
      }
      catch(e) {
        console.error("findMessages exception occurred: " + e.message);
        dfd.reject("exception occurred: " + e.message);
      }
    }
    else {
      console.error("findMessages HTTP GET status != 200");
      dfd.reject("HTTP GET status != 200");
    }
  };

  req.onerror = function(e) {
    console.error("findMessages onerror occurred: " + e.message);
    dfd.reject("onerror occurred: " + e.message);
  };

  req.send();

  return dfd.promise();
}
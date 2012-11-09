onmessage = function (event) {
    
    var currentEvent = event;
    var request = new XMLHttpRequest();
    request.timeout = 3000;    // in milliseconds, but seems NOT working
    request.onload = function(e) {   
        if (request.status == 200) { 
            // return to main 
            postMessage(judge(currentEvent, request));
        } else {
            // don't call back, just debug purpose
            postMessage({'rc': 'No Server: not 200', 'linkAdr': currentEvent.data, 'title': null});
        }
        self.close()
    };  
    request.onerror = function(e) {   
            // don't call back, just debug purpose
            postMessage({'rc': 'No Server: onerror', 'linkAdr': currentEvent.data, 'title': null});
            self.close()
    };  
    request.ontimeout = function(e) {   
            // don't call back, just debug purpose
            postMessage({'rc': 'No Server: ontimeout', 'linkAdr': currentEvent.data, 'title': null});
            self.close()
    };  
    request.open( 'GET', "http://"+event.data, true )
    request.send(null)
}

function judge(currentEvt, request) {
    // Note from IBM site
    // Note that, even though you can use XMLHttpRequest from a Worker, everything 
    // will come back on its responseText property, never its responseXml property. 
    // That is because there is no JavaScript DOM parser in scope within the Worker 
    // script. 
    
    var linkAdr = null;
    var title = null;
    var linkAdr = currentEvt.data;
    //retStr = request.getResponseHeader("SERVER"); // refused
    //title = request.getResponseHeader("Content-Type"); // Okay
    var myResponseText = request.responseText;  // Okay
    //var myResponseXML = request.responseXML;  // null
    //if (myResponseXML != null) {
    //    title = myResponseXML.getElementsByTagName('title')[0];
    //else {
        title = linkAdr;
    //}

    var memo = request.responseText;    
        //memo =  "";
    
    rcDictionary = {'rc': 'Found','linkAdr': linkAdr, 'title': title, 'memo': memo};

    return rcDictionary
}
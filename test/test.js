$(function(){
	$('.select2').select2();
	var pageTitle = location.pathname.replace('/','');
	$('.page-title').html(pageTitle).css('visibility', 'visible');
	$('[rel="tooltip"]').tooltip();
});

/**
statusValue options: error, info, success, warning 
**/
function getNotificationIcon(statusValue)
{
	if(statusValue)
	{
		return "/themes/zuznow/MWSAdmin/images/core/message-" + statusValue + ".png";
	}
	return "";
}

function showNotification(icon,title,message)
{
	// Create a new notification
	if (window.webkitNotifications) {
		notification = window.webkitNotifications.createNotification(icon, title, message);
		notification.show();
	} else if (typeof Notification !== 'undefined') {
		notification = new Notification(title, {
			body: message,
			icon: icon
		});
	}
	// Display the notification, calling close() on notification will dismiss it
	setTimeout(function () {
		if (window.webkitNotifications) {
			notification.cancel();
		}
		else if (typeof Notification !== 'undefined') {
			notification.close();
		}
	}, 3000);
}

function isValidEmail(value){  
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
	if(value.match(mailformat)){ 	
		return true;  
	}
	return false;
}	

function isValidName(value){  
	var pattern = '[~`!#$%\^&*+=\[\]\';,\/{}|":<>\?]' ;  
	if (value.match(pattern)) {			
		return false;
	}
	return true;
}

function isValidString(value){  
	var pattern = /[<>]/ ;  
	if (value.match(pattern)) {			
		return false;
	}
	return true;
}

function getApiError(responseText)
{
	var text;
	responseText = responseText.trim();
	switch(responseText) {
    case "1": //ZUZ_E
        text = "Internal error";
        break; 
    case "2": //ZUZ_E_DB_OPEN
        text = "Internal error, can not open DB";
        break;
    case "3": //ZUZ_E_DB_RES
        text = "Internal DB error";
        break;
	case "4": //ZUZ_E_BAD_DOMAIN
        text = "The domain host is not valid";
        break;
	case "5": //ZUZ_E_DOMAIN_ALREADY_EXIST
        text = "This mobile domain already exist";
        break;
	case "6": //ZUZ_E_RULE_SET_ALREADY_EXIST
        text = "The rule set name already exists";
        break;
	case "7": //ZUZ_E_OLD_RULE
        text = "New version of rules already saved";
        break;
	case "8": //ZUZ_E_USER_NOT_EXIST
        text = "The user account does not exist";
        break;
	case "9": //ZUZ_E_USER_NOT_EXIST
        text = "The user with this name already exists";
        break;	
	case "10": //ZUZ_E_MAIL_ALREADY_EXIST
        text = "The user with this email already exists";
        break;
	case "11": //ZUZ_E_NOT_VALID
        text = "Internal error, parameters are not valid";
        break;
    default:
        text = "Internal error";
	}
	return text;
}

function OpenEditor(domain_id){
	$.cookie("last_edit_id", domain_id);   
    window.location.href = "/editor#domain_id=" + domain_id;
}

function OpenPublishConversational(domain_id,channel){
	if(channel === undefined)	{
		channel = "alexa";
	}
	if(typeof selected_info !== 'undefined' && selected_info.domain_id == domain_id)	{	
		// if domain_id is the production id, and production view is off, 
		// next time the editor will be loaded it will not load the last domain
		$.cookie("last_edit_id", domain_id);   
	}
	if(channel == 'alexa')
    	window.location.href = "/publish-alexa-conversational?domain_id=" + domain_id;
	if(channel == 'google')
    	window.location.href = "/publish-google-conversational?domain_id=" + domain_id;
}

function OpenConfig(domain_prod_id,domain_key){
    window.location.href = "/projects?domain_id=" + domain_prod_id + "&key=" + domain_key;
}

function ZuznowParseURL(url) {
    if (url.indexOf("://")==-1){
        if (url.indexOf("//")==-1 || url.indexOf("//")>0){
            url = "http://"+url;
        }
    }
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}

function AppNameGenerator(host){
	var app_name;
	var hostArr = host.split('.');
	if (hostArr[0].indexOf('www') != -1){
	 	app_name = hostArr[1];
	} else {
		app_name = hostArr[0];
	}

	return app_name;
}

function exportGoogleZip(interaction,baseServer) {
    var customEntities = [];
    var usedEntities = [];
    var customEntitiesExported = [];
    zip = new JSZip();
    intentsFolder = zip.folder("intents");
    entitiesFolder = zip.folder("entities");
    // debugger;
    var intentsData = new Array();
    // var retrieveInteractions = Function(dataModel + "\r\n return interactions");
    // interaction = retrieveInteractions();
    function Intent(name,id) {
        this.name = name;
        this.id = id;
        this.userSays = [];
        this.templates = [];
        this.auto = true;
        this.contexts = [];
        this.responses = [{
            'action':name,
            'resetContexts':false,
            'affectedContexts':[],
            'parameters':[],
            'messages':[],
            'defaultResponsePlatforms':['google']
        }],
        this.priority = 500000,
        this.webhookUsed = true;
        this.webhookForSlotFilling = false;
        this.fallbackIntent = false;
        this.events = [];
    }
    function findAPIentityType(name,entitiesAr) { 
        let entity = entitiesAr.filter(function(item) { 
        return item.name === name; })[0];
        if(entity===undefined) { return "NA";}
        else if(entity.google===undefined)   { return "";}
        else return entity.google;
    }
    function ResponseParam(entity,required,isList)    {
        this.name = entity.name;
        this.value = '$'+entity.name;
        this.required = required || false;
        this.dataType = matchEntityType(entity.type);
        this.isList = isList || false;
    }

    function matchEntityType(origType) {
        if(typeof entitiesOptions === 'undefined')  {
            entitiesOptions = [];
		    $.get( "API/conversation_predefined.php",
		    {
                domain_id: selected_info.domain_id, key: selected_info.key}).done(function( data ) {
			    entitiesOptions = JSON.parse(data);
                });
        }
        let entityAPI = findAPIentityType(origType,entitiesOptions);
        if(entityAPI == "") {   // predefined entity w/ custom slots
            if(customEntities.indexOf(origType)==-1)
                { customEntities.push(origType); }
            return '@'+origType.replace(".","_");
        }
        else if(entityAPI == "NA")  // predefined local entity  
          {  return '@'+origType;}
        else { 
            return entityAPI;
        }
    }

    function DataPart(text,entitiesAR,required)  {
        this.text = text;
        if(entitiesAR)    {
            this.alias = text;
            this.userDefined = true;
            this.required = required;
            var entityType = findEntityType(text,entitiesAR);
            this.meta = matchEntityType(entityType);
        }
    }
    function findEntityType(name, entitiesArray) { 
        for(var t=0; t<entitiesArray.length; t++) {
            if(entitiesArray[t].name == name) {
                return entitiesArray[t].type;
                }
        }
    }
    function userSays(id,data) {
        this.id = id;
        this.data = data;
        this.isTemplate = false;
        }

    for(var i = 0; i<interaction.intents.length; i++)  {
        var intent = interaction.intents[i];
        if(intent.name == 'CON1.SessionEnded' || intent.disabled==true)
            {continue;}
        var myIntent = new Intent(intent.name,i);
        if(myIntent.name == 'CON1.Launch')    {
            myIntent.name = "Default Welcome Intent";
            myIntent.responses[0].action = "input.welcome";
            myIntent.events.push({'name':'WELCOME'});
        }
        if(intent.entities) {
        var entities = intent.entities; 
            for(var j=0; j<entities.length; j++)    {
                var entity = entities[j];
                if(usedEntities.indexOf(entity.type)==-1)
                { usedEntities.push(entity.type); }
                myIntent.responses[0].parameters.push(new ResponseParam(entity));
                entity.newName = matchEntityType(entity.type)+':'+entity.name;
                
            }
        }
        var expandedSamples = [];
        for(var j=0; j<intent.samples.length;j++)   {
            expandedSamples = expandedSamples.concat(intentUtteranceExpander(intent.samples[j]));
        }
        if(intent.name=='CON1.YesIntent')   {
            myIntent.templates.push('yes','yes please', 'sure','Of course','Ok','Correct','Indeed','do it','exactly','confirm','sounds good','I agree');
        }
        else if(intent.name=='CON1.NoIntent')   {
            myIntent.templates.push('no','nope','don\'t','I don\'t think so','no thanks','don\'t do it','definitely not','not really','thanks but no','not interested','I don\'t think so','I disagree','I don\'t want that');
        }
        else if(intent.name=='CON1.HelpIntent')   {
            myIntent.templates.push('help','help me','can you help me');
        }
        else if(intent.name=='CON1.StopIntent')   {
            myIntent.templates.push('stop','off','shut up');
        }
        else if(intent.name=='CON1.CancelIntent')   {
            myIntent.templates.push('cancel','never mind','forget it');
        }
        intent.samples = expandedSamples;
        for(var j=0; j<intent.samples.length; j++) {
            var googleSample = [];
            var sample = intent.samples[j];
            for(var h=0; h<entities.length;h++) {
                sample = sample.replace('{'+entities[h].name+'}',entities[h].newName);
            }
            myIntent.templates.push(sample);
        }
        intentsData.push(myIntent);
        intentsFolder.add(myIntent.name+".json",JSON.stringify(myIntent,null,' '));
    }
    // create default Fallback intent
    var fallbackIntent = new Intent('Default Fallback Intent','con1_fallback_intent');
    fallbackIntent.auto = "false";
    fallbackIntent.responses[0].action = "input.unknown";
    fallbackIntent.responses[0].messages = [
        {
          "type": 0,
          "speech": [
            "I didn\u0027t get that. Can you say it again?",
            "I missed what you said. Say it again?",
            "Sorry, could you say that again?",
            "Sorry, can you say that again?",
            "Can you say that again?",
            "Sorry, I didn\u0027t get that.",
            "Sorry, what was that?",
            "One more time?",
            "What was that?",
            "Say that again?",
            "I didn\u0027t get that.",
            "I missed that."
          ]
        }
      ];
    fallbackIntent.fallbackIntent = true;
    intentsData.push(fallbackIntent);
    intentsFolder.add(fallbackIntent.name+".json",JSON.stringify(fallbackIntent,null,' '));

        for(var i=0; i<interaction.entities.length; i++)  {
            var entity = interaction.entities[i];
            if(usedEntities.indexOf(entity.name)==-1)   {
                continue;
            }
            var newEntity = {
                'id':i,
                'name':entity.name,
                'entries':[]
            }
            for(var j=0; j<entity.values.length;j++)    {
                newEntity.entries.push({'value':entity.values[j]});
            }
            entitiesFolder.add(entity.name+'.json',JSON.stringify(newEntity,null,' '));
            customEntitiesExported.push(entity.name);

    }
        $(customEntities).each(function(i,typeName) {
            if(customEntitiesExported.indexOf(customEntities[i])==-1) {   // custom entities that weren't exported yet
                // $.get("/API/conversation_entities_list.php?key="+selected_info.key+"&domain_id="+selected_info.domain_id+"&list_type="+typeName,function(values) {
                $.ajax({
                    url: "/API/conversation_entities_list.php?key="+selected_info.key+"&domain_id="+selected_info.domain_id+"&list_type="+typeName,
                    type:"get",
                    async:false,
                    success: function(values) {
                    var newEntity = {
                        'id':'con1_custom_entities_'+i,
                        'name':typeName.replace('.','_'),
                        'entries':[]
                    }
                    let valuesArr = values.split('\r\n')
                    for(var j=0; j<valuesArr.length;j++)    {
                       newEntity.entries.push({'value':valuesArr[j]});
                    }
                    entitiesFolder.add(typeName+'.json',JSON.stringify(newEntity,null,' '));
						}
                });
            }
        });
        var agentFile = {
  "description": selected_info.domain,
  "language": "en",
  "googleAssistant": {
    "googleAssistantCompatible": true,
    "welcomeIntentSignInRequired": true,
    "startIntents": [],
    "systemIntents": [],
    "endIntentIds": [],
    "oAuthLinking": {
      "required": false,
      "grantType": "AUTH_CODE_GRANT"
    },
    "voiceType": "MALE_1",
    "capabilities": [],
    "protocolVersion": "V2"
  },
  "defaultTimezone": "America/New_York",
  "webhook": {
    "url": baseServer + "actions/"+selected_info.domain_id,
    "headers": {
      "": ""
    },
    "available": true,
    "useForDomains": false
  },
  "isPrivate": true
};
            zip.add('agent.json',JSON.stringify(agentFile,null,' '));
            content = zip.generate();
            var tempLink = document.createElement("A");
            $(tempLink).attr("href", "data:image/png;base64,"+content).attr("download", "google_interactions_"+selected_info.domain_id+".zip");
            tempLink.click();

}

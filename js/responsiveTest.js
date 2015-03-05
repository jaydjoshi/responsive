 defaultURL = 'wikipedia.com'; //<---- CHANGE TO YOUR WEBSITE URL
 $.support.cors = true;

	//show loading graphic
	function showLoader(id) {
	  $('.imageLoader').fadeIn('slow');
	}

	//hide loading graphic
	function hideLoader(id) {
	  $('.imageLoader').fadeOut('slow');
	}
	

	//load page for a specific URL
	function loadPage(url)
	{
		if ( url != '' && url.substr(0,7) !== 'http://' && url.substr(0,8) !== 'https://' && url.substr(0, 7) !== 'file://' ) {
			url = 'http://'+url;
		 }
		showLoader($(this).parent().attr('id'));
		$('#frameId').attr('src', url);
	}


	
	//load from JSON
	function loadDeviceList()
	{
		
		$.getJSON( "json/devices.json", function( data ) {
			 jsonObject = data;
			 var text = '<ul class="nav nav-justified">';
			  $.each( data.supportedDevices, function( key, val ) {
				if(key != '_id')
					{
						
						  text = text + '<li role="presentation" class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-expanded="false"> ';
						  text = text + '<i class="fa '+val.icon+'"></i> ';
						  text = text + val.title;
						  text = text + ' <span class="caret"></span> </a> <ul class="dropdown-menu" role="menu">';
						  var deviceName = val.title;
						  var key1 = key;
						if(val.brands !== null && typeof val.brands === 'object')
						{
							$.each( val.brands, function( key, val ) {
								text = text + '<li role="presentation" class="dropdown-header"><a class="dropdown-toggle" data-toggle="dropdown" data-target="#device'+key1+key+'" href="#" aria-expanded="false"> ';
								text = text + val.name;
								text = text + ' <span class="caret"></span> </a> <ul id="device'+key1+key+'" class="dropdown-menu" aria-expanded="false"  >';
								
								if(val !== null && typeof val === 'object')
								{
									$.each( val, function( key, val ) {
										
										if(val !== null && typeof val === 'object')
										{
											$.each( val, function( key, val ) {
												var pixelDensity = val.pxd ? val.pxd : 1;
												var width , height;
												width = Math.round(val.w/pixelDensity);
												height = Math.round(val.h/pixelDensity);
												text = text + '<li role="presentation"><a href="javascript:void(0)" onClick="clickOnDevice(this)" data-width="'+width+'" data-height="'+height+'" data-title="'+val.name+'" data-inch="'+val.inch+'" data-device="'+deviceName+'" data-pixelDensity="'+pixelDensity+'" >';
												text = text + val.name;
												text = text + '</a></li>';
										});
										
										}
									});
									
								}text = text + '</ul></li>';
							
							});
							text = text + '</ul></li>';
						}
					}
			  });
			  text = text + '</ul>';
			 

			  $('#deviceNav').html(text);
			
			}).done(function() { //Second success method
				//set i frame properties to the first device from the list
				clickOnDevice($('#deviceNav a[data-device]:first'));
				var textVal = $('#urlText').val();
				if(textVal == '')
				{
					$('#urlText').val(defaultURL);
					loadPage(defaultURL);
				}
				else{
					$('#urlText').val(textVal);
					loadPage(textVal);
				}
				
			  }).error(function() { //call on error
					$('#deviceNav').html('<div class="alert alert-danger" role="alert">Error occured while loading device list, Please reload the screen or try again later</div>');					
				});
	}
	

	/*//load from DB - devices 
	function loadDevicesFromDb()
	{
		var URL= "https://api.mongolab.com/api/1/databases/responsive-web_design-testing-tool-devices/collections/devices?apiKey=AydSMDIMXs1y_5qM8s9H2uaygix11-d9";
		 $.getJSON( URL, function( data ) {
			 jsonObject = data;
			 var text = '<ul class="nav nav-justified">';
			  $.each( data[0].supportedDevices, function( key, val ) {
				if(key != '_id')
					{
						
						  text = text + '<li role="presentation" class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-expanded="false"> ';
						  text = text + '<i class="fa '+val.icon+'"></i> ';
						  text = text + val.title;
						  text = text + ' <span class="caret"></span> </a> <ul class="dropdown-menu" role="menu">';
						  var deviceName = val.title;
						  var key1 = key;
						if(val.brands !== null && typeof val.brands === 'object')
						{
							$.each( val.brands, function( key, val ) {
								text = text + '<li role="presentation" class="dropdown-header"><a class="dropdown-toggle" data-toggle="dropdown" data-target="#device'+key1+key+'" href="#" aria-expanded="false"> ';
								text = text + val.name;
								text = text + ' <span class="caret"></span> </a> <ul id="device'+key1+key+'" class="dropdown-menu" aria-expanded="false"  >';
								
								if(val !== null && typeof val === 'object')
								{
									$.each( val, function( key, val ) {
										
										if(val !== null && typeof val === 'object')
										{
											$.each( val, function( key, val ) {
												var pixelDensity = val.pxd ? val.pxd : 1;
												var width , height;
												width = Math.round(val.w/pixelDensity);
												height = Math.round(val.h/pixelDensity);
												text = text + '<li role="presentation"><a href="javascript:void(0)" onClick="clickOnDevice(this)" data-width="'+width+'" data-height="'+height+'" data-title="'+val.name+'" data-inch="'+val.inch+'" data-device="'+deviceName+'" data-pixelDensity="'+pixelDensity+'" >';
												text = text + val.name;
												text = text + '</a></li>';
										});
										
										}
									});
									
								}text = text + '</ul></li>';
							
							});
							text = text + '</ul></li>';
						}
					}
			  });
			  text = text + '</ul>';
			 

			  $('#deviceNav').html(text);
			
			}).done(function() { //Second success method
				//set i frame properties to the first device from the list
				clickOnDevice($('#deviceNav a[data-device]:first'));
				var textVal = $('#urlText').val();
				if(textVal == '')
				{
					$('#urlText').val(defaultURL);
					loadPage(defaultURL);
				}
				else{
					$('#urlText').val(textVal);
					loadPage(textVal);
				}
				
			  })
			  .error(function() { //call on error
				$('#deviceNav').html('<div class="alert alert-danger" role="alert">Error occured while loading device list from database, <a href="#" class="alert-link" onClick="loadDeviceList()">Click here!</a> to load static list of Devices</div>');					
			});

		
	}*/
	
	//on click of device
	function clickOnDevice(thisVal)
	{
		var width = $(thisVal).attr('data-width');
		var height = $(thisVal).attr('data-height');
		var device = $(thisVal).attr('data-device');
		var pixelDensity = $(thisVal).attr('data-pixelDensity');
		var title = $(thisVal).attr('data-title');
		
		$('#deviceDimention').text(width+' x '+height);
		$('#deviceDescription').text(title);
		
		if(device == "Laptop" || device == "Desktop")
		{
			$('#deviceOrientation').attr('class','hide');
		}
		if(device == "Phone" || device == "Tablet")
		{
			$('#deviceOrientation').attr('class','show');
		}
		
		var newWidth = parseInt(width,10)+17;
		
		$('#frameDiv').attr('class','show text-center');
		$('#frameId').animate({'width': newWidth, 'height': height},1500);
		 
	}
	

	//when document loads
	$(document).ready(function(){

		  //loadDevicesFromDb();
			// load devices when screen is loaded
			loadDeviceList();
		  //query string
		  var qsArray = window.location.href.split('?');
		  var qs = qsArray[qsArray.length-1];

		  if(qs != '' && qsArray.length > 1){
		    $('#urlText').val(qs);
		    loadPage(qs);
		  }

		  //click of go or enter
		  $('form').submit(function(){
			loadPage( $('#urlText').val());
			return false;
		  });
		  
		// once the iframe is loaded
		  $('iframe').on("load", function () {
			  hideLoader($(this).parent().attr('id'));
			});	    
		  
		  // will clear frame
		  $('#urlText').on("input", function () {
			  var src = $('#frameId').attr('src');
				if(src != 'html/blank.html')
				{
					$('#frameId').attr('src','html/blank.html');
				}
			});
		
		  //rotate functionality
		  $('#deviceOrientation').on("click", function () {
			  
			  var width = $('#frameId').css("width");
			  var height = $('#frameId').css("height");
			  
			  var newWidth = parseInt(width,10)-17;
			  var newHeight = parseInt(height,10);
			  
			  $('#deviceDimention').text(newHeight+' x '+newWidth);
			  
			  newHeight = newHeight+17;
			  $('#frameId').animate({'width': newHeight, 'height': newWidth},1500);
			  
			});	 
		  
		

	});

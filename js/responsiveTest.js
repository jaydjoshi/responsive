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


	//load page
	function loadPage(url)
	{
		if ( url.substr(0,7) !== 'http://' && url.substr(0,8) !== 'https://' && url.substr(0, 7) !== 'file://' ) {
			url = 'http://'+url;
		 }
		$('iframe').each(function(){showLoader($(this).parent().attr('id'));})
		$('iframe').data('loaded', false);
		$('iframe').attr('src', url);
	}


	
	//load from JSON
	function loadDeviceList()
	{
		
		$.getJSON( "../json/devices.json", function( data ) {
			 jsonObject = data;
			 var text = '<ul class="nav nav-tabs">';
			  $.each( data.supportedDevices, function( key, val ) {
				if(key != '_id')
					{
						
						  text = text + '<li role="presentation" class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-expanded="false"> ';
						  text = text + val.title;
						  text = text + '<span class="caret"></span> </a> <ul class="dropdown-menu" role="menu">';
						if(val.brands !== null && typeof val.brands === 'object')
						{
							$.each( val.brands, function( key, val ) {
								text = text + '<li role="presentation" class="dropdown-header">'+val.name+'</li>';
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
												text = text + '<li role="presentation"><a href="javascript:void(0)" class="deviceListClass" onClick="clickOnDevice(this)" data-width="'+width+'" data-height="'+height+'" data-title="'+val.name+'" data-inch="'+val.inch+'" data-pixelDensity="'+pixelDensity+'" >';
												text = text + val.name;
												text = text + '</a></li>';
										});
										
										}
									});
									
								}
							
							});
							text = text + '</ul></li>';
						}
					}
			  });
			  text = text + '</ul>';
			 

			  $('#tabPanelId').html(text);
			
			});
	}

	//load from DB - devices working 
	function loadDevicesFromDb()
	{
		var URL= "https://api.mongolab.com/api/1/databases/responsive-web_design-testing-tool-devices/collections/devices?apiKey=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
		 $.getJSON( URL, function( data ) {
			 jsonObject = data;
			 var text = '<ul class="nav nav-tabs">';
			  $.each( data[0].supportedDevices, function( key, val ) {
				if(key != '_id')
					{
						
						  text = text + '<li role="presentation" class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-expanded="false"> ';
						  text = text + val.title;
						  text = text + '<span class="caret"></span> </a> <ul class="dropdown-menu" role="menu">';
						if(val.brands !== null && typeof val.brands === 'object')
						{
							$.each( val.brands, function( key, val ) {
								text = text + '<li role="presentation" class="dropdown-header">'+val.name+'</li>';
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
												text = text + '<li role="presentation"><a href="javascript:void(0)" class="deviceListClass" onClick="clickOnDevice(this)" data-width="'+width+'" data-height="'+height+'" data-title="'+val.name+'" data-inch="'+val.inch+'" data-pixelDensity="'+pixelDensity+'" >';
												text = text + val.name;
												text = text + '</a></li>';
										});
										
										}
									});
									
								}
							
							});
							text = text + '</ul></li>';
						}
					}
			  });
			  text = text + '</ul>';
			 

			  $('#tabPanelId').html(text);
			
			}).error(function() {
				
				$('#tabPanelId').html('<div class="alert alert-danger" role="alert">Error occured while loading device list from database, <a href="#" class="alert-link" onClick="loadDeviceList()">Click here!</a> to load static list of Devices</div>');					
			});

		
	}
	
	
	function clickOnDevice(thisVal)
	{
		var width = $(thisVal).attr('data-width');
		var height = $(thisVal).attr('data-height');
		var pixelDensity = $(thisVal).attr('data-pixelDensity');
		var title = $(thisVal).attr('data-title');
		
		$('#deviceDimention1').text(width+' x '+height);
		$('#deviceDescription1').text(title);
		$('#deviceDimention2').text(height+' x '+width);
		$('#deviceDescription2').text(title);
		
		$('#widthText').val(width);
		$('#widthText').val(height);
		
		var newWidth = parseInt(width,10)+17;

		$('#frame1').animate({'width': newWidth, 'height': height},1500);
		$('#frame2').animate({'width': height, 'height': newWidth},1500);
		 
	}


	//when document loads
	$(document).ready(function(){

		  loadDevicesFromDb();
		  loadPage(defaultURL);
		  
		  //query string
		  var qsArray = window.location.href.split('?');
		  var qs = qsArray[qsArray.length-1];

		  if(qs != '' && qsArray.length > 1){
		    $('#urlText').val(qs);
		    loadPage(qs);
		  }

		  $('form').submit(function(){
			loadPage( $('#urlText').val());
			return false;
		  });
		  
		  $('iframe').on("load", function () {
			    // once the iframe is loaded
			  hideLoader($(this).parent().attr('id'));
			  $(this).data('loaded',true);
			});


	});

/*
	Visualize by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

$(function() {

	// Vars.
		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#wrapper');

	// Breakpoints.
		skel.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Disable animations/transitions until everything's loaded.
		$body.addClass('is-loading');

		$window.on('load', function() {
			$body.removeClass('is-loading');
		});

	// Poptrox.
		$window.on('load', function() {

			$('.thumbnails').poptrox({
				onPopupClose: function() { $body.removeClass('is-covered'); },
				onPopupOpen: function() { $body.addClass('is-covered'); },
				baseZIndex: 10001,
				useBodyOverflow: false,
				usePopupEasyClose: true,
				overlayColor: '#000000',
				overlayOpacity: 0.75,
				popupLoaderText: '',
				fadeSpeed: 500,
				usePopupDefaultStyling: false,
				windowMargin: (skel.breakpoint('small').active ? 5 : 50)
			});

		});

	//get data from server and assign to global var
	var d;

	var request = $.ajax({
		type:'POST',
		url: '/assignment',
		dataType: 'json',
		contentType: 'application/json; charset=UTF-8'
	});

	//receives the statistics for both candidates in terms of number of bills of each topic. numabort1, numabort2 contain number of bills sponsored by each candidate.
	/*request.done(function(d) {
		data = d;
	});

	var addData = function (assignName, data) {
		var modal = $(".assignmentDetails");//$("#modal"+modalIndex);
		assignment = assignName;
		console.log(data[assignment]["Author"]);
		//basic details about each assignment
		modal.append("<h3><b>Author:</b> " + data[assignment]["Author"] + "</h3>");
		modal.append("<h3><b>Date:</b> " + data[assignment]["Date"] + "</h3>");
		modal.append("<h3><b>Version:</b> " + data[assignment]["Version"] + "</h3>");
		//the most recent commit message
		modal.append("<h3><b>Summary: </b>" + data["meta"]["/sanka3/" + data[assignment]["Files"][0]["fileName"]][0]["commitMessage"] + "</h3>")
		var files = data[assignment]["Files"];
		modal.append("<h3 style='text-align:center'>Files:</h3>");
		//details about each file for this assignment
		for (var fileIndex = 0; fileIndex < files.length; fileIndex++) {
			modal.append("<div class='innerBox'>");
			var filename = files[fileIndex]["fileName"];
			modal.append("<h3 class='fileName'>" + filename + "</h3>");
			modal.append("<h3>File Size: " + files[fileIndex]["size"] + "</h3>");
			modal.append("<h5>File Path: " + "/sanka3/" + filename + "</h5>");
			var url = 'https://subversion.ews.illinois.edu/svn/fa16-cs242/sanka3/' + filename;
			modal.append("<a href='"+url+ "' class='click_iframe' target = 'viewFile'>Click To View</a>");
			modal.append("</div>")
			/*	<!--modal.append("<iframe class="viewFile
			 " src='https://subversion.ews.illinois.edu/svn/fa16-cs242/sanka3/" + filename + "'></iframe>"
			 )
			 ; */
		/*	modal.append("<h4>Versions:</h4>");
			var versions = data["meta"]["/sanka3/" + filename];

			//details for each version of each file in this assignment
			for (var versionIndex = 0; versionIndex < versions.length; versionIndex++) {
				modal.append("<h5 class='separator'> Version Number: " + versions[versionIndex]["revision"] + "</h5>");
				modal.append("<h5 class='versionInfo'>Commit Author: " + versions[versionIndex]["author"] + "</h5>");
				modal.append("<h5 class='versionInfo'>Commit Date: " + versions[versionIndex]["date"] + "</h5>");
				modal.append("<h5 class='versionInfo'>Commit Message for Revision: " + versions[versionIndex]["commitMessage"] + "</h5>");
			}

			//add comments section per file
			modal.append("<div class = 'commentInput'><form class='commentForm' name='commentForm'> Name: <input type='text' name='name' id='name' /><br /> Comment:<br/> <textarea name='comment' id='comment'></textarea><br /> <button class = 'submit'> Submit </button></form></div>");


		} */

		//when comment is submitted, send info as JSON to server
		$(".submit").click(submitComment);
		//document.getElementById("submit").addEventListener("click", submitComment)
		function submitComment()
		{
			var form = $(this).parent();

			var commentData= {};
			commentData["author"] = form.children()[0].value;
			commentData["comment"] = form.children()[3].value;
			commentData["fileName"] = form.parent().parent().children()[8];     //TODO:PARSE THIS STILL!!!!
            console.log(commentData);

			$.ajax({
				type:'POST',
				data: JSON.stringify(commentData),
				url: '/insertComment',
				dataType: 'json',
				contentType: 'application/json; charset=UTF-8',
				success:success(data)
			})
		}
		function success(d) {
			console.log('Success: ', d)
		}
	//}


	//orchestrate clicks for each assignment page
/*	$(".btnAssign0").click( function() {
		addData("Assignment0", data);
		window.location.href="#assignment";
	});

	$(".btnAssign10").click(function() {
		addData("Assignment1.0", data);
	});
	$(".btnAssign11").click(function() {
		addData("Assignment1.1", data);
	});
	$(".btnAssign12").click(function() {
		addData("Assignment1.2", data);
	});
	$(".btnAssign20").click(function() {
		addData("Assignment2.0", data);
	});
	$(".btnAssign21").click(function() {
		addData("Assignment2.1", data);
	}); */


	//when comment is submitted, send info as JSON to server
/*	document.getElementById("submit").addEventListener("click", submitComment)
	function submitComment()
	{
		var form = $(".commentForm");
		//var inputs= form.getElementsByTagName('input');
		var commentData= {};
		console.log(form);
		commentData["author"] = $("input")[0].value;
		commentData["comment"] = $("textarea")[0].value;
		$.ajax({
			type:'POST',
			data: JSON.stringify(commentData),
			url: '/insertComment',
			dataType: 'json',
			contentType: 'application/json; charset=UTF-8',
			success:success(data)
		})
	}
	function success(data) {
		console.log('Success: ', data)
	}*/

    request.done(function(data){
        d = data;   //global variable with json
    }

    var addData = function (assignName) {

        var modalIndex = 1;
        //go through all assignments in JSON
        for(assignment in data) {
            if (assignment != "meta") {
                var modal = $("#modal" + modalIndex);
                //basic details about each assignment
                modal.append("<h3><b>Author:</b> " + data[assignment]["Author"] + "</h3>");
                modal.append("<h3><b>Date:</b> " + data[assignment]["Date"] + "</h3>");
                modal.append("<h3><b>Version:</b> " + data[assignment]["Version"] + "</h3>");
                //the most recent commit message
                modal.append("<h3><b>Summary: </b>" + data["meta"]["/sanka3/" + data[assignment]["Files"][0]["fileName"]][0]["commitMessage"] + "</h3>")
                var files = data[assignment]["Files"];
                modal.append("<h3 style='text-align:center'>Files:</h3>");
                //details about each file for this assignment
                for (var fileIndex = 0; fileIndex < files.length; fileIndex++) {
                    modal.append("<div class='innerBox'>");
                    var filename = files[fileIndex]["fileName"];
                    modal.append("<h3>" + filename + "</h3>");
                    modal.append("<h3>File Size: " + files[fileIndex]["size"] + "</h3>");
                    modal.append("<h5>File Path: " + "/sanka3/" + filename + "</h5>");
                    var url = 'https://subversion.ews.illinois.edu/svn/fa16-cs242/sanka3/' + filename;
                    modal.append("<a href='"+url+ "' class='click_iframe' target = 'viewFile'>Click To View</a>");

                    //modal.append("<iframe class="viewFile" style='display:none;' src='https://subversion.ews.illinois.edu/svn/fa16-cs242/sanka3/" +filename+ "'></iframe>");
                    modal.append("<h4>Versions:</h4>");
                    var versions = data["meta"]["/sanka3/" + filename];

                    //details for each version of each file in this assignment
                    for (var versionIndex = 0; versionIndex < versions.length; versionIndex++) {
                        modal.append("<h5 class='separator'> Version Number: " + versions[versionIndex]["revision"] + "</h5>");
                        modal.append("<h5 class='versionInfo'>Commit Author: " + versions[versionIndex]["author"] + "</h5>");
                        modal.append("<h5 class='versionInfo'>Commit Date: " + versions[versionIndex]["date"] + "</h5>");
                        modal.append("<h5 class='versionInfo'>Commit Message for Revision: " + versions[versionIndex]["commitMessage"] + "</h5>");
                    }
                    modal.append("</div>");
                }
                modalIndex += 1
            }
        }
    }

    //orchestrate clicks for modal
    $(".btnAssign0").click( function () {
        document.getElementById("modal1").style.display="block";
    });
    $(".btnAssign10").click(function() {
        document.getElementById("modal2").style.display="block";
    });
    $(".btnAssign11").click(function() {
        document.getElementById("modal3").style.display="block";
    });
    $(".btnAssign12").click(function() {
        document.getElementById("modal3").style.display="block";
    });
    $(".btnAssign20").click(function() {
        document.getElementById("modal3").style.display="block";
    });
    $(".btnAssign21").click(function() {
        document.getElementById("modal3").style.display="block";
    });
    $(".close").click(function() {
        $(".modalContainer").find('.modalWindow').css("display","none");
    });

});
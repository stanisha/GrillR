// Bind categories
var categories = [];
var list = "";
var meat = "";
var header = "";
var splitsubcategory1 = "";
var splitsubcategory2 = "";
var splitsubcategory3 = "";
var milisec = 0;
var seconds = 0;
var minutes = 0;
var minutessplit = "";
$('#startPage').live('pageshow', function() {

    jQuery.getJSON("Js/grilldata.js", function(data) {

        $('#categorieslist li').remove();

        // alert("Enter1");

        $.each(data, function(index, element) {

            // alert(element.category);
            if (element.category != meat) {
                $('#categorieslist').append('<li><span style="font-size:Medium; font-family:Verdana; color:Black;">' + element.category + '</span></li>');
                meat = element.category;
            }
        });
        $('#categorieslist').listview('refresh');
    });
});

$('#categorieslist li').live('vclick', function() {
    //alert("Works"); // id of clicked li by directly accessing DOMElement property
    scategory = $(this).text();

    $.mobile.changePage("#sublistpage", { transition: "slideup" });
    jQuery.getJSON("Js/grilldata.js", function(data) {

        $('#subcategorieslist li').remove();

        // alert("Enter2");

        $.each(data, function(index, element) {

            if (element.category == scategory) {

                $('#subcategorieslist').append('<li><span style="font-size:Medium; font-family:Verdana; color:Black;">' + element.type + '</span></li>');

            }
        });
        $('#subcategorieslist').listview('refresh');
    });
});

$('#subcategorieslist li').live('vclick', function() {
    //alert("Works"); // id of clicked li by directly accessing DOMElement property
    selectedcategory = $(this).text();

    $.mobile.changePage("#categorydetailpage", { transition: "slideup" });
    jQuery.getJSON("Js/grilldata.js", function(data) {

        $('#subcategorieslist li').remove();

        // alert("Enter3");

        $.each(data, function(index, element) {

            if (element.type == selectedcategory) {
                // alert("type" + element.type);

                header =
                               " <table width=\"100%\" border=\"0\"> " +
                " <tr><td width=\"90%\" height=\"87\" align=\"center\" valign=\"top\"> <h1>" + element.category + " : " + element.type + " </h1></td> </tr></table>" +
                " <div id=\"container\"> " +
                       "<div  class=\"element title \" >   <img src=\"./images/timer.png\" border=\"0\" onclick='startcounter()' /> </div> " +
                " <div class=\"element timer \" >   <div id=\"cdown1\" > </div>  </div> " +
                         " </div> ";
                ;
                if (element.type == "Steak") {
                    list = '<li><span style="font-size:Medium; font-family:Verdana; color:Black;">Doneness : Rare. </span><br/>' +
                    '<span style="font-size:Medium; font-family:Verdana; color:Black;">Time : ' + element.ctimerare + '.</span><br/>' +
                '<span style="font-size:Medium; font-family:Verdana; color:Black;">Temp(F) : ' + element.ctemprare + '.</span><br/>' +
                '</li>';
                }
                list = list + '<li><span style="font-size:Medium; font-family:Verdana; color:Black;">Doneness : Medium. </span><br/>' +
                '<span style="font-size:Medium; font-family:Verdana; color:Black;">Time : ' + element.ctime + '.</span><br/>' +
                '<span style="font-size:Medium; font-family:Verdana; color:Black;">Temp(F) : ' + element.ctemp + '.</span><br/>' +
                '</li>';
                if (element.type == "Steak") {
                    list = list + '<li><span style="font-size:Medium; font-family:Verdana; color:Black;">Doneness : Well. </span><br/>' +
                '<span style="font-size:Medium; font-family:Verdana; color:Black;">Time : ' + element.ctimewell + '.</span><br/>' +
                '<span style="font-size:Medium; font-family:Verdana; color:Black;">Temp(F) : ' + element.ctempwell + '.</span><br/>' +
                '</li>';
                }

                list = list + '<li><span style="font-size:Medium; font-family:Verdana; color:Black;">Doneness : USDA Recommended. </span><br/>' +
                '<span style="font-size:Medium; font-family:Verdana; color:Black;">Temp(F) : ' + element.usdatemp + '.</span><br/>' +
                '</li>';

                list = list + '<li><span style="font-size:Medium; font-family:Verdana; color:Black;">Doneness : Health Canada. </span><br/>' +
                '<span style="font-size:Medium; font-family:Verdana; color:Black;">Temp(F) : ' + element.cfiatemp + '.</span><br/>' +
                '</li>';
                if (element.resttime > "") {
                    list = list + '<li><span style="font-size:Medium; font-family:Verdana; color:Black;">Doneness : Rest Time. </span><br/>' +
                '<span style="font-size:Medium; font-family:Verdana; color:Black;">Time : ' + element.resttime + '.</span><br/>' +
                '</li>';
                }
                $('#categorydetaillist').append(list);
            }
        });
        $('#categorydetaillist').listview('refresh');
        document.getElementById("header").innerHTML = header;
        $(function() {
            var $container = $('#container');
            $container.isotope({ itemSelector: '.element' });
        });

        $('#cdown1').countdown({ format: 'MS', layout: '<h1>{mnn}{sep}{snn}</h1> ' });
        // document.getElementById("maindiv").innerHTML = list;
    });
});

$('#categorydetaillist li').live('vclick', function() {
    document.getElementById('d2').value = '';
    milisec = 0;
    seconds = 0;
    minutes = 0;
    splitsubcategory1 = "";
    splitsubcategory2 = "";
    splitsubcategory3 = "";
    //alert("Works"); // id of clicked li by directly accessing DOMElement property
    selectedcategory = $(this).text();
    //alert(selectedcategory);
    splitsubcategory1 = selectedcategory.split(':');
    // alert(splitsubcategory1[1]);
    splitsubcategory2 = splitsubcategory1[1].split('.');
    //alert(splitsubcategory2[1]);
    splitsubcategory2[1] = splitsubcategory2[1].replace(/\s/g, "");

    if (splitsubcategory2[1] == "Time") {
        //alert("hi");
        splitsubcategory3 = splitsubcategory1[2].split('.');
        //alert(splitsubcategory3[0]);
        display();
    }
    else if (splitsubcategory2[1] == "Temp(F)") {
        // alert("enter");
        seconds = 100;
        display();
    }
    else {
        //alert("unknown");

        seconds = 100;
        display();
    }
});


function display() {
    if (splitsubcategory3[0] == null || splitsubcategory3[0] == "") {
        //alert("null");
        if (seconds > 60) {
            minutessplit = seconds / 60;
            //alert(minutes);

            minutes = [(minutessplit > 0) ? Math.floor(minutessplit) : Math.ceil(minutessplit)];

            //            minutessplit = minutes.split('.');
            //alert(minutes);
            seconds = (minutes * 60) - seconds;
        }
        //seconds = 100;
        //minutes = minutessplit[0];
    }
    else {
        //alert("not null");
        //seconds = splitsubcategory3[0]; // document.getElementById('d1').value;
        if (splitsubcategory3[0] > 60) {
            minutes = splitsubcategory3[0] / 60;
        }
        else {
            seconds = splitsubcategory3[0];
        }
    }
    gettime();
}
function gettime() {
    // minutes = 0;

    // alert(seconds);
    if (milisec <= 0) {
        milisec = 9;
        seconds -= 1;
    }
    if (seconds <= -1) {
        seconds = 60;
        milisec = 0;
        minutes -= 1;

    }
    if (minutes <= -1) {
        seconds = 0;
        minutes += 1;
        // seconds += 1
    }
    else

        milisec -= 1
    document.getElementById('d2').value = minutes + ":" + seconds + " : " + milisec;
    if (minutes == 0 && seconds == 0 && milisec == 0) {
        //alert("Time Out");
        playsound();
    }
    else {
        setTimeout("gettime()", 100)
    }
}
function playsound() {
    //alert("play");
    var snd = new Audio("chime.wav"); // buffers automatically when created
    snd.play();

    // Display all supported protocols
    var protocols = blackberry.audio.supportedProtocols(null);

    if (protocols) {
        var printingProtocolsList = "";
        for (i = 0; i < protocols.length; i++) {
            printingProtocolsList += protocols[i] + "\n";
        }
        alert("List of " + protocols.length + " supported protocols:\n" + printingProtocolsList);
    }


};
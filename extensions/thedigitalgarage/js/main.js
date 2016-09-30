'use strict';

/*
  Change Documentation Link
*/
window.OPENSHIFT_CONSTANTS.HELP['cli']                  = "http://docs.thedigitalgarage.io/cli_reference/index.html";
window.OPENSHIFT_CONSTANTS.HELP['basic_cli_operations'] = "http://docs.thedigitalgarage.io/dev_guide/index.html";
window.OPENSHIFT_CONSTANTS.HELP['get_started_cli']      = "http://docs.thedigitalgarage.io/cli_reference/get_started_cli.html";
window.OPENSHIFT_CONSTANTS.HELP['default']              = "http://docs.thedigitalgarage.io";

/*
  Replace 'Openshift' to 'Digital Garage' on projects.html(Projects page)
*/
function changeText() {
  var interval = setInterval(function(){
    if($('.empty-state-message.empty-state-full-page').size() == 1){
      $('h1, p, span').each(function() {
        var text = $(this).html();
        text = text.replace(/OpenShift/g, 'The Digital Garage');
        text = text.replace('to The', 'to the');
        text = text.replace('Create a project for your application.', 'To get started, simply create a project for your application by clicking the orange add project button in the upper right corner of this screen.');
        text = text.replace('visit the The Digital Garage', 'visit our');
        $(this).html(text);
      });
      clearInterval(interval);
    }
  }, 10);
}

/*
    Update AboutUs & Command Line Tools page
*/
function changeAboutusPage() {
  var interval = setTimeout(function(){
    if($('.about').size() == 1){ //For About Us Page
      $('.about-icon').remove();
      $('.about .col-md-9').css('width', '100%');
      $('h1, p, span').each(function() {
        var text = $(this).html();
        text = text.replace('OpenShift by Red Hat', 'The Digital Garage');
        text = text.replace('OpenShift projects from a terminal', 'projects');
        text = text.replace(/OpenShift/g, 'The Digital Garage');
        text = text.replace('https://openshift.com', 'http://www.thedigitalgarage.io');
        $(this).html(text);
      });
      $('#version').prev().html("<a href='http://www.thedigitalgarage.io' target='_blank'>The Digital Garage</a> is a Platform-as-a-Service (PaaS) that is built on Openshift Origin, Red Hat's open source platform. The Digital Garage helps the worldwide community of software developers develop, host and scale the next generation of innovative applications in a cloud environment.");
    }

    if($('.command-line').size() == 1){ //For Command Line Tools Page
      $('h1, p, span').each(function() {
        var text = $(this).html();
        text = text.replace('OpenShift projects from a terminal', 'projects');
        text = text.replace(/OpenShift/g, 'The Digital Garage');
        $(this).html(text);
      });
      $('.cli-download-label').replaceWith('<h2>Download <code>oc</code>:</h2>');
      $('.cli-download-link').html("Releases <i class='fa fa-external-link'></i>");
      $('.cli-download-link').attr("href", "https://github.com/openshift/origin/releases");
    }
  }, 10);
}

$(document).ready(function(){
  //Change Title dynamically
  document.title = "Digital Garage Web Console";

  //Change Favicon dynamically
  $('link[rel*="icon"]').attr("href", "./extensions/images/favicon.ico");
  $('link[type="image/png"]').attr("href", "./extensions/images/favicon.png");

  //Update AboutUs & Command Line Tools page
  changeAboutusPage();

  //Change Text on first view
  changeText();
});

// Append a new primary nav item.  This is a simple direct navigation item
// with no secondary menu.
window.OPENSHIFT_CONSTANTS.PROJECT_NAVIGATION.push({
  label: 'Profile',
  iconClass: 'fa fa-user',
  href: '#'
});

window.OPENSHIFT_CONSTANTS.PROJECT_NAVIGATION.push({
  label: 'Account',
  iconClass: 'fa fa-desktop',
  href: 'http://www.thedigitalgarage.io/#/account/subscription'
});

/*
  Add items to Left Sidebar Menu
*/
angular
  .module('digitalgarageMenuExtension', ['openshiftConsole'])
    .run(function(HawtioExtension) {
      HawtioExtension.add('nav-help-dropdown', function ($scope) {
        var li = $('<li>');
        $('<a href="http://www.thedigitalgarage.io/community/" target="_blank">Community</a>').appendTo(li);
        return li;
      });
    })

    .run(function($rootScope){
      $rootScope.$on('$routeChangeStart', function(event, next, current) {
        changeAboutusPage();
        changeText();
      });
    });

hawtioPluginLoader.addModule('digitalgarageMenuExtension');
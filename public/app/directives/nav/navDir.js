angular.module('blog').directive('navDir', function() {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/nav/nav.html',
    controller: 'navCtrl',
    link: function(scope, element, attribute) {

      // nav dropdown toggle:
      $('nav ul li > a:not(:only-child)').click(function(e) {
        $(this).siblings('.nav-dropdown').toggle();
        // if there is more than one toggle button, this prevents all toggles from opening:
        $('.nav-dropdown').not($(this).siblings()).hide();
        e.stopPropagation();
      });

      // close toggle when you click outside of it:
      $('html').click(function() {
        $('.nav-dropdown').hide();
      });

      // toggle hamburger
      $('#nav-toggle').on('click', function() {
        this.classList.toggle('active');
      });

      $('#nav-toggle').click(function() {
        $('nav ul').toggle();
      });

    }
  };
});

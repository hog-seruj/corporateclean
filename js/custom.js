/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, drupalSettings) {

  'use strict';


  //Initialize slideshow using theme settings
  var $sliderSettigs = drupalSettings.slider;
  var $effect = $sliderSettigs.effect;
  var $effectTime = $sliderSettigs.effectTime;
  var $slideshowRandomize = $sliderSettigs.slideshowRandomize;
  var $slideshowWrap = $sliderSettigs.slideshowWrap;
  var $slideshowPause = $sliderSettigs.slideshowPause;

  $(window).load(function() {
    var $ht = $(".slider-item.current").height();
    $("#slideshow").height($ht);
  });

  $(window).resize(function() {
    var $ht = $(".slider-item.current").height();
    $("#slideshow").height($ht);
  });

  Drupal.behaviors.slideshow = {
    attach: function (context, settings) {
      $("#slideshow img").show();
      $("#slideshow").fadeIn("slow");
      $("#slider-controls-wrapper").fadeIn("slow");

      $("#slideshow").cycle({
        fx:    $effect,
        speed:  "slow",
        timeout: $effectTime,
        random: $slideshowRandomize,
        nowrap: $slideshowWrap,
        pause: $slideshowPause,
        pager:  "#slider-navigation",
        pagerAnchorBuilder: function(idx, slide) {
          return "#slider-navigation li:eq(" + (idx) + ") a";
        },
        slideResize: true,
        containerResize: false,
        height: "auto",
        fit: 1,
        before: function () {
          $(this).parent().find(".slider-item.current").removeClass("current");
        },
        after: function () {
          var $ht = $(this).height();
          $(this).parent().height($ht);
          $(this).addClass("current");
        }
      });
    }
  }

  // We pass the parameters of this anonymous function are the global variables
  // that this script depend on. For example, if the above script requires
  // jQuery, you should change (Drupal) to (Drupal, jQuery) in the line below
  // and, in this file's first line of JS, change function (Drupal) to
  // (Drupal, $)
})(jQuery, Drupal, drupalSettings);

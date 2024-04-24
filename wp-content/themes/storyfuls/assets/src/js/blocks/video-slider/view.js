
(function ($) {
  "use strict";

  const slideWrapper = $(".video-section .wrapper-video-section");

  function postMessageToPlayer(player, command) {
    if (player == null || command == null) return;
    player.contentWindow.postMessage(JSON.stringify(command), "*");
  }

  // When the slide is changing
  function playPauseVideo(slick, control) {
    let currentSlide, player;

    currentSlide = slick.find(".slick-current");
    player = currentSlide.find("iframe").get(0);

    switch (control) {
      case "play":
        postMessageToPlayer(player, {
          event: "command",
          func: "mute",
        });
        postMessageToPlayer(player, {
          event: "command",
          func: "playVideo",
        });
        break;
      case "pause":
        postMessageToPlayer(player, {
          event: "command",
          func: "pauseVideo",
        });
        break;
    }
  }

  
  function videoSlider() {
    
    slideWrapper.on("init", function (slick) {
      slick = $(slick.currentTarget);
      setTimeout(function () {
        playPauseVideo(slick, "play");
      }, 1000);
      const media = $(
        ".video-section .wrapper-video-section .video-wrapped video"
      );
      media.trigger("pause");
      const mediaPlay = $(
        ".video-section .wrapper-video-section .video-wrapped.slick-center video"
      );
      mediaPlay.trigger("play");
    });
    slideWrapper.on("beforeChange", function (event, slick) {
      slick = $(slick.$slider);
      playPauseVideo(slick, "pause");
    });
    slideWrapper.on("afterChange", function (event, slick) {
      slick = $(slick.$slider);
      playPauseVideo(slick, "play");
      const media = $(
        ".video-section .wrapper-video-section .video-wrapped video"
      );
      media.trigger("pause");
      if (
        $(
          ".video-section .wrapper-video-section .video-wrapped.slick-center video"
        ).length !== 0
      ) {
        const mediaPlay = $(
          ".video-section .wrapper-video-section .video-wrapped.slick-center video"
        );
        mediaPlay.trigger("play");
      }
      
    });

    const autoplay = $(".video-section").attr("data-slide-autoplay"),
      arrows = $(".video-section").attr("data-slide-arrows"),
      dots = $(".video-section").attr("data-slide-dots");

    //start the slider
    slideWrapper.not(".slick-initialized").slick({
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      focusOnSelect: true,
      autoplay: "true" == autoplay ? true : false,
      arrows: "true" == arrows ? true : false,
      dots: "true" == dots ? true : false,
      infinite: true,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            centerPadding: "300px",
          },
        },
        {
          breakpoint: 1200,
          settings: {
            centerPadding: "250px",
          },
        },
        {
          breakpoint: 1000,
          settings: {
            centerPadding: "150px",
          },
        },
        {
          breakpoint: 990,
          settings: {
            centerPadding: "50px",
          },
        },
        {
          breakpoint: 767,
          settings: {
            centerPadding: "15px",
          },
        },
      ],
    });
  }

  if ($(".video-section").length !== 0) {
    videoSlider();
    $(window).on("resize", function () {
      videoSlider();
    });
  }
  
})(jQuery);


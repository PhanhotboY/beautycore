import interval from './interval.js';

const setSlider = function (wrapper, slideCount, currentSlide, slideTime) {
  let n = currentSlide;
  const sliderButtonNext = wrapper.closest('div').find('.slider_button_next');
  const sliderButtonBack = wrapper.closest('div').find('.slider_button_back');

  const sliderHandler = { currentSlide: n };

  sliderHandler.handleSlider = () => {
    sliderButtonBack.prop('disabled', true);
    sliderButtonNext.prop('disabled', true);

    wrapper.css(
      'transform',
      `translateX(
            -${n * (100 / slideCount)}%
        ) translateX(0px)`
    );

    if (n > slideCount - 3 || n < 2) {
      n = n > slideCount - 3 ? 2 : slideCount - 3;

      setTimeout(() => {
        wrapper.css({
          'transition-duration': '0ms',
          transform: `translateX(-${n * (100 / slideCount)}%) translateX(0px)`,
        });
      }, 500);
    }
    wrapper.css('transition-duration', '');
    setTimeout(() => {
      sliderButtonBack.removeAttr('disabled');
      sliderButtonNext.removeAttr('disabled');
    }, 500);

    sliderHandler.currentSlide = n;
  };

  const sliderInterval = interval(() => {
    n++;
    sliderHandler.handleSlider();
  }, slideTime);

  sliderHandler.next = () => {
    n++;
    sliderHandler.handleSlider();
    sliderInterval.restart();
  };

  sliderHandler.back = () => {
    n--;
    sliderHandler.handleSlider();
    sliderInterval.restart();
  };

  sliderHandler.moveto = (position) => {
    n = position;
    sliderHandler.handleSlider();

    sliderInterval.restart();
  };

  sliderHandler.stop = () => {
    sliderInterval.stop();
  };

  sliderHandler.restart = () => {
    sliderInterval.restart();
  };

  return sliderHandler;
};

export default setSlider;

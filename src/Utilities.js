const utilities = {
  msToTimer: (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 100);

    return `${utilities.formatNumber(minutes)}:${utilities.formatNumber(seconds)}:${centiseconds}0`;
  },
  formatNumber: (number) => {
    return number = number > 9 ? number : `0${number}`;
  }
}

export default utilities;

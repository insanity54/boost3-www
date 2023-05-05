
export function settings() {
  return {
    auctionDurationHumanReadable: '',
    auctionDuration: 120,
    paypalApiKey: '',
    formatDuration(durationInSeconds) {
      const hours = Math.floor(durationInSeconds / 3600);
      const minutes = Math.floor((durationInSeconds % 3600) / 60);
      const seconds = durationInSeconds % 60;

      const hoursDisplay = hours > 0 ? hours + (hours === 1 ? " hour, " : " hours, ") : "";
      const minutesDisplay = minutes > 0 ? minutes + (minutes === 1 ? " minute, " : " minutes, ") : "";
      const secondsDisplay = seconds > 0 ? seconds + (seconds === 1 ? " second" : " seconds") : "0 seconds";

      return hoursDisplay + minutesDisplay + secondsDisplay;
    }
  }
}
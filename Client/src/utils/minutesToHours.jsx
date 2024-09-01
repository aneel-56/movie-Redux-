function minutesToHoursAndMinutes(minutes) {
    if (minutes < 0) {
      return "Invalid input"; // Handle negative input, if necessary
    }
  
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    if (hours === 0) {
      return `${remainingMinutes} minutes`;
    } else if (remainingMinutes === 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return `${hours} hour${hours > 1 ? 's' : ''} and ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
    }
  }
  
  // Example usagOutputs "2 hours and 15 minutes"

  export default minutesToHoursAndMinutes
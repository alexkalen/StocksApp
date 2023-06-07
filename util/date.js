export function getCurrentDate() {
  //We use this to get a random date from the past 4 days.
  const randomDate = Math.floor(Math.random() * 4) + 2;

  const todaysDate = new Date();
  //For some reason API wont let me get the latest dates. Might be premium feature.
  var day = String(todaysDate.getDate() - randomDate).padStart(2, "0");
  var month = String(todaysDate.getMonth()).padStart(2, "0");
  var year = todaysDate.getFullYear();

  return year + "-" + month + "-" + day;
}

function getToDay() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let day = currentDate.getDate();
  day = day < 10 ? "0" + day : day;

  const startDay = `${year}-${day}-${month}`;
  return startDay;
}

module.exports = getToDay;

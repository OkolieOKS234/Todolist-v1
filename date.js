exports.getDate = function getDate() {
  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  //   format the date of today
  return today.toLocaleDateString("en-US", options);
};

exports.getDay = function getDay() {
  const currentday = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return currentday.toLocaleDateString("es-ES", options).toUpperCase();
};

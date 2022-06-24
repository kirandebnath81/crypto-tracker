const sortPrice = (num) => {
  if (!num) return;

  const number = num.toFixed(2);

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default sortPrice;

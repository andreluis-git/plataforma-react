import format from "date-fns/format";

const convertDate = (data) => {
  let [Y, M, D] = data.split(/[- :]/);
  let date = new Date(Y, M - 1, D);
  let strDate = `${format(date, "dd/MM/yyyy")}`;
  return strDate;
};

const DateFormatUtil = {
  convertDate,
};

export default DateFormatUtil;

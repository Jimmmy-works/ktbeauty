const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
// export const formatPriceVND = (price) => {
//   return VND.format(price);
// };
export const formatPriceVND = (price, symbol = "đ") => {
  var DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1);
  var priceWithCommas = price?.toLocaleString();
  var arParts = String(priceWithCommas).split(DecimalSeparator);
  var intPart = arParts[0]?.replaceAll(",", ".");
  return intPart + symbol;
};

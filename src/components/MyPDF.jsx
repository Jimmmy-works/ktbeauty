import React from "react";
import ReactPDF, {
  Document,
  Text,
  Page,
  StyleSheet,
  View,
  Font,
  Image,
} from "@react-pdf/renderer";
import { formatPriceVND } from "@/utils/formatPrice";
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});
const styles = StyleSheet.create({
  pdf: { "@media (min-width: 768px)": { background: "#f9f9f9" } },
  pdf__heading: {
    color: "#333",
    fontSize: "24px",
    textAlign: "center",
    margin: "10px_0_20px_0",
  },
  pdf__detail: {
    borderBottomWidth: "1px",
    borderStyle: "solid",
    borderColor: "#e2e0e0",
  },
  pdf__product: {
    borderBottomWidth: "1px",
    borderStyle: "solid",
    paddingBottom: "20px",
    borderColor: "#e2e0e0",
  },

  pdf__detail_subtotal: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pdf__detail_subtotal_heading: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  pdf__detail_subtotal_desc: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    letterSpacing: "0.05em",
  },
  pdf__detail_shipping: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  },
  pdf__detail_shipping_heading: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  pdf__detail_shipping_desc: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    textTransform: "capitalize",
  },
  pdf__detail_total: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  pdf__detail_total_heading: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  pdf__detail_total_desc: {
    textTransform: "capitalize",
    letterSpacing: "0.05em",
  },
  pdf__detail_discount: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: "14px",
  },
  pdf__detail_discount_heading: { paddingLeft: "6px", fontSize: "12px" },
  pdf__detail_discount_desc: { letterSpacing: "0.05em", fontSize: "12px" },
  pdf__detail_subdiscount: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: "14px",
  },
  pdf__detail_subdiscount_heading: { paddingLeft: "6px", fontSize: "12px" },
  pdf__detail_subdiscount_desc: { letterSpacing: "0.05em", fontSize: "12px" },
  pdf__footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pdf__footer_heading: {
    fontSize: "18px",
    color: "#000",
  },
  pdf__footer_price: {
    letterSpacing: "0.05em",
    fontSize: "18px",
    color: "#000",
  },
  pdf__product_list: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pdf__product_wrapper: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  pdf__product_img: {
    height: "80px",
    width: "80px",
    position: "relative",
    borderWidth: "1px",
    borderStyle: "solid",
    transitionProperty:
      "color, background-color, border-color, text-decoration-color, fill, stroke",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "300ms",
    borderColor: "#e2e0e0",
    ":hover": {},
  },
  pdf__product_img_img: {
    objectFit: "cover",
  },
  pdf__product_img_quantity: {
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.75rem",
    lineHeight: "1rem",
    color: "#ffffff",
    transitionProperty:
      "color, background-color, border-color, text-decoration-color, fill, stroke",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "300ms",
    background: "#908f8f",
    height: "22px",
    width: "22px",
    right: "-8px",
    top: "2px",
  },
  pdf__product_name: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: ["nowrap", "normal"],
    transitionProperty:
      "color, background-color, border-color, text-decoration-color, fill, stroke",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "300ms",
    ":hover": {},
  },
  pdf__product_price: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    alignItems: "center",
    fontSize: "50px",
    lineHeight: "1.25rem",
    marginTop: "6px",
  },
  pdf__product_price_after: {},

  pdf__product_price_before: { textDecoration: "line-through" },
});
const MyPDF = ({ children, detailOrder }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.pdf} className="pdf w-full ">
          <View style={styles.pdf__heading} className="pdf__heading ">
            Giỏ hàng của bạn
          </View>
          <View style={styles.pdf__product} className="pdf__product">
            {detailOrder?.products?.length &&
              detailOrder?.products?.map((item) => {
                const { image, name, _id, quantity, price, discount } =
                  item || {};
                return (
                  <View
                    key={_id}
                    style={styles.pdf__product_list}
                    className="pdf__product-list "
                  >
                    <View
                      style={styles.pdf__product_wrapper}
                      className="pdf__product-wrapper "
                    >
                      <View
                        style={styles.pdf__product_img}
                        className="pdf__product-img "
                      >
                        <Image
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/img/error.png";
                          }}
                          style={styles.pdf__product_img_img}
                          className="pdf__product-img-img "
                          source={image?.[0]}
                          src={image?.[0]}
                          alt=""
                        />
                        <View
                          style={styles.pdf__product_img_quantity}
                          className="pdf__product-img-quantity  "
                        >
                          {quantity || 0}
                        </View>
                      </View>
                      <View
                        style={styles.pdf__product_name}
                        className="pdf__product-name "
                      >
                        {name}
                      </View>
                    </View>
                    <View
                      style={styles.pdf__product_price}
                      className="pdf__product-price"
                    >
                      <View
                        style={styles.pdf__product_price_after}
                        className="pdf__product-price-after "
                      >
                        {formatPriceVND(price - discount)}
                      </View>
                      {discount ? (
                        <View
                          style={styles.pdf__product_price_before}
                          className="pdf__product-price-before "
                        >
                          {formatPriceVND(price)}
                        </View>
                      ) : (
                        ""
                      )}
                    </View>
                  </View>
                );
              })}
          </View>
          <View style={styles.pdf__detail} className="pdf__detail  ">
            <View
              style={styles.pdf__detail_subtotal}
              className="pdf__detail-subtotal "
            >
              <h4 className="pdf__detail-subtotal-heading ">
                Tổng chưa giảm giá
              </h4>
              <p className="pdf__detail-subtotal-desc ">
                {formatPriceVND(detailOrder?.subTotal)}
              </p>
            </View>
            <View
              style={styles.pdf__detail_shipping}
              className="pdf__detail-shipping "
            >
              <View
                style={styles.pdf__detail_shipping_heading}
                className="pdf__detail-shipping-heading "
              >
                Vận chuyển
              </View>
              {detailOrder?.shipping?.label && (
                <View
                  style={styles.pdf__detail_shipping_desc}
                  className="pdf__detail-shipping-desc "
                >
                  {detailOrder?.shipping?.label}
                </View>
              )}
            </View>
          </View>
          {detailOrder?.discount?.hasOwnProperty("price") && (
            <View style={styles.pdf__detail} className="pdf__detail  ">
              <View
                style={styles.pdf__detail_total}
                className="pdf__detail-total "
              >
                <View
                  style={styles.pdf__detail_total_heading}
                  className="pdf__detail-total-heading"
                >
                  Tổng giảm giá
                </View>
                <View
                  style={styles.pdf__detail_total_desc}
                  className="pdf__detail-total-desc "
                >
                  -
                  {detailOrder?.total >= 3 * 1000000 &&
                  detailOrder?.shipping?.price > 0
                    ? formatPriceVND(
                        detailOrder?.discount?.price +
                          detailOrder?.shipping?.price
                      )
                    : formatPriceVND(detailOrder?.discount?.price)}
                </View>
              </View>
              <View
                style={styles.pdf__detail_discount}
                className="pdf__detail-discount  "
              >
                <View
                  style={styles.pdf__detail_discount_heading}
                  className="pdf__detail-discount-heading "
                >
                  {`1. ` + detailOrder?.discount?.type}
                </View>
                <View
                  style={styles.pdf__detail_discount_desc}
                  className="pdf__detail-discount-desc "
                >
                  {formatPriceVND(detailOrder?.discount?.price)}
                </View>
              </View>
              <View
                style={styles.pdf__detail_subdiscount}
                className="pdf__detail-subdiscount "
              >
                <View
                  style={styles.pdf__detail_subdiscount_heading}
                  className="pdf__detail-subdiscount-heading  "
                >
                  {` ${
                    detailOrder?.subTotal >= 3 * 1000000 &&
                    detailOrder?.shipping?.price > 0
                      ? `2. Miễn phí vận chuyển`
                      : ""
                  } `}
                </View>
                <View
                  style={styles.pdf__detail_subdiscount_desc}
                  className="pdf__detail-subdiscount-desc"
                >
                  {` ${
                    detailOrder?.subTotal >= 3 * 1000000 &&
                    detailOrder?.shipping?.price > 0
                      ? formatPriceVND(detailOrder?.shipping?.price)
                      : ""
                  }`}
                </View>
              </View>
            </View>
          )}
          <View style={styles.pdf__footer} className="pdf__footer ">
            <View
              style={styles.pdf__footer_heading}
              className="pdf__footer-heading"
            >
              Tổng cộng
            </View>
            <View
              style={styles.pdf__footer_price}
              className="pdf__footer-price"
            >
              {formatPriceVND(detailOrder?.total)}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
// const MyPDFHeading = ({ children }) => {};
// const MyPDFBody = ({ children }) => {};
// const MyPDFFooter = ({ children }) => {};
// MyPDF.Heading = MyPDFHeading;
// MyPDF.Body = MyPDFBody;
// MyPDF.Footer = MyPDFFooter;

// ReactPDF.render(<MyPDF/>);
export default MyPDF;

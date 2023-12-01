import Accordion from "@/components/Accordion";

const Address = () => {
  const OPTIONS = [
    {
      title: `order id: 03a23d39d99o12p`,
      id: "1",
      subCate: [
        {
          id: "order-3",
          title: "Order Confirmation",
          subCateChild: [
            {
              id: "order-child-1",
              title: "Confirm at: 9:30 22/9/2023",
            },
          ],
        },
        {
          id: "carrier",
          title: "Confirmed carrier",
          subCateChild: [
            {
              id: "order-child-1",
              title: "Confirmed carrier at: 13:24 24/9/2023",
            },
          ],
        },
        {
          id: "start",
          title: "Start Delivery",
          subCateChild: [
            {
              id: "order-child-1",
              title: "Delivery begins at: 9:30 25/9/2023",
            },
          ],
        },
        {
          id: "completed",
          title: "Completed",
          subCateChild: [
            {
              id: "order-child-1",
              title: "On time: 11:30 27/9/2023",
            },
          ],
        },
      ],
    },
    {
      title: `order id: 099ao1p2391p1dd`,
      id: "1",
      subCate: [
        {
          id: "order-3",
          title: "Order Confirmation",
          subCateChild: [
            {
              id: "order-child-1",
              title: "Confirm at: 9:30 22/9/2023",
            },
          ],
        },
        {
          id: "carrier",
          title: "Confirmed carrier",
          subCateChild: [
            {
              id: "order-child-1",
              title: "Confirmed carrier at: 13:24 24/9/2023",
            },
          ],
        },
        {
          id: "start",
          title: "Start Delivery",
          subCateChild: [
            {
              id: "order-child-1",
              title: "Delivery begins at: 9:30 25/9/2023",
            },
          ],
        },
      ],
    },
    {
      title: `order id: 0123ao1p2391p1e2 - Cancel Order`,
      id: "1",
    },
  ];
  return (
    <div className="address">
      <div className="w-full  flex flex-col">
        <h3 className="text-[24px] font-mab text-black-333 xs:my-[16px]">
          Vận Chuyển
        </h3>
        {OPTIONS?.map((item, index) => {
          return (
            <Accordion
              key={`${item}${index}`}
              item={item}
              index={index}
            ></Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default Address;

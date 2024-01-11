import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

const PrintData = () => {
  let componentRef = useRef();

  return (
    <div>
      {/* button to trigger printing of target component */}
      <ReactToPrint
        trigger={() => <button>Print</button>}
        content={() => componentRef}
      />

      {/* component to be printed */}
      <ComponentToPrint ref={(el) => (componentRef = el)} />
    </div>
  );
};

export default PrintData;

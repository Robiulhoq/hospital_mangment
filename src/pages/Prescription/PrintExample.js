import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import PrintPrescription from './PrintPrescription';
import { GreenButton } from '../../components/Buttons';

const PrintExample = ({userRole}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      
      <PrintPrescription userRole={userRole} ref={componentRef} />
      <GreenButton style={{position: 'relative', left: '83rem', bottom: '18rem'}} onClick={handlePrint}>Print</GreenButton>
      
      
    </div>
  );
};

export default PrintExample;

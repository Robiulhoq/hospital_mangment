import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import ListInvoice from './ListInvoice';
import { GreenButton } from '../../components/Buttons';

const PrintExample = ({userRole}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      
      <ListInvoice userRole={userRole} ref={componentRef} />
      <GreenButton style={{position: 'relative', left: '83rem', bottom: '18rem'}} onClick={handlePrint}>Print</GreenButton>
      
      
    </div>
  );
};

export default PrintExample;

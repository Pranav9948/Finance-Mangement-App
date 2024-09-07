import React from 'react'
import budgetLogo from "../images/budget-buddy-logo.png";

const BasicNavbar = () => {
  return (
    <div className="bg-black text-white ">
      <div className="py-6 flex justify-center items-center gap-1">
        <div>
          <img src={budgetLogo} alt="budgetLogo" className="h-16 smallTablet:h-20 smallDekstop:h-24" />
        </div>
        <div className='font-sans text-2xl font-bold italic font text-yellow-400 smallTablet:text-3xl smallDekstop:text-4xl'>
            Budget Buddy
        </div>
      </div>
    </div>
  );
}

export default BasicNavbar
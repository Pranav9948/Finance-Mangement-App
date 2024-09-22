<div className="grid laptop:grid-cols-8  4  gap-6     my-20 ">
  {/* pots */}

  <div className="laptop:col-start-1 laptop:col-end-6   laptop:row-start-1 laptop:row-end-2 ">
    {" "}
    {/* laptop:row-start-1 laptop:row-end-3 */}
    <div className=" px-6 py-10 gap-7   bg-white rounded-md ">
      {/* 1.1 */}

      <div className="flex justify-between items-center mb-10">
        <h4 className="text-[#201f24] font-sans font-bold text-xl leading-6">
          Pots
        </h4>

        {/* 1.1.2 total saved cards*/}
        <p className="capitalize text-blue-700 underline text-xs font-sans font-normal leading-5">
          see details
        </p>
      </div>

      <div className="flex flex-col  gap-10 smallTablet:grid smallTablet:grid-cols-8">
        <div className="flex flex-col gap-5 w-full mb-6 smallTablet:mb-0  smallTablet:col-span-3">
          {/* 1.1.1 pots and see details button   */}

          <div className="bg-[#F8F4F0] p-4 rounded-md shadow-md flex justify-center items-center gap-4 ">
            {/* icon */}
            <div>
              <GiReceiveMoney className="text-5xl text-yellow-500" />
            </div>

            {/* total saved */}

            <div className="flex flex-col items-center gap-3">
              <p className="capitalize text-[#696868] font-sans font-normal leading-5">
                total saved
              </p>

              <h3 className="text-[#201F24] font-sans font-bold leading-9 text-3xl">
                {formatToKPrice(sumOfSavedPots)}
              </h3>
            </div>
          </div>
        </div>

        {/* 1.2   4 cards*/}

        <div className="grid grid-cols-1  mobile:grid-cols-2 gap-4 smallTablet:w-full smallTablet:col-span-5  ">
          {latestFourPots.map((pots) => {
            return (
              <div
                key={pots?._id}
                style={{ borderColor: `${pots?.color}` }}
                className={`bg-white py-2 px-4 w-full border-l-4 rounded-md flex flex-col items-start gap-2 ${pots.color}`}
              >
                <h6 className="text-[#696868] font-sans text-sm font-normal leading-5 ">
                  {pots?.name}
                </h6>
                <h4 className="text-[#201F24] font-bold text-md leading-5 font-sans ">
                  {formatPrice(pots?.savedAmount)}
                </h4>
              </div>
            );
          })}
        </div>
      </div>

      {/* --1-- */}
    </div>
  </div>

  {/* transaction */}

  <div className="laptop:col-start-1 laptop:col-end-5   bg-white rounded-md shadow-md py-6 px-2 mobile:px-6 ">
    {" "}
    {/* laptop:row-start-3 laptop:row-end-6 */}
    <div className="flex justify-between items-center mb-10">
      <h4 className="text-[#201f24] font-sans font-bold text-xl leading-6">
        Transactions
      </h4>

      {/* 1.1.2 total saved cards*/}
      <p className="capitalize text-blue-700 underline  text-xs font-sans font-normal leading-5">
        see details
      </p>
    </div>
    {/* transaction-card */}
    <div className="flex flex-col gap-5">
      {latestFourTransactions.map((data, idx) => {
        return (
          <div
            className="flex justify-between items-center w-full rounded-md shadow-sm py-4 px-2"
            key={idx}
          >
            <div className="w-12 h-12 rounded-full bg-red-600 flex justify-center items-center overflow-hidden ">
              <img src={data?.image} alt="image" className="w-full " />
            </div>
            <h5 className="font-bold leading-5 text-sm max-w-[80px] text-center  font-sans text-[#201F24] smallTablet:max-w-full ">
              {data?.name}
            </h5>
            <div className="flex flex-col gap-3 ">
              <h4 className="text-[#277C78] font-sans text-sm font-bold leading-5">
                {formatPrice(data?.amount)}
              </h4>
              <p className="text-[#696868] font-sans font-normal text-xs leading-4">
                {formatDate(data?.date)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>

  {/* budgets */}

  {/* bills */}

  <div className="laptop:col-start-5 laptop:col-end-9   bg-white rounded-md shadow-md py-6 px-5">
    {" "}
    {/* laptop:row-start-4 laptop:row-end-6 */}
    <div className="flex justify-between items-center mb-10">
      <h4 className="text-[#201f24] font-sans font-bold text-xl leading-6">
        Recurring Bills
      </h4>

      {/* 1.1.2 total saved cards*/}
      <p className="capitalize text-blue-700 underline  text-xs font-sans font-normal leading-5">
        see details
      </p>
    </div>
    <div className="flex flex-col gap-5">
      {recurringBillsData.map((data) => {
        return (
          <div
            key={data.id}
            className={`flex justify-between px-4 py-6 border-l-8 ${data.borderColor} rounded-lg shadow-sm bg-[#F8F4F0]`}
          >
            <h5 className="text-[#696868] text-sm font-normal leading-5 font-sans">
              {data.title}
            </h5>

            <h4 className="text-[#201F24] font-sans text-sm font-bold leading-5">
              {formatPrice(data.amount)}
            </h4>
          </div>
        );
      })}
    </div>
  </div>

  <div className="laptop:col-start-6 laptop:col-end-9   bg-white rounded-md shadow-md py-6 px-5 ">
    {" "}
    {/* laptop:row-start-1 laptop:row-end-4 */}
    <div className="flex justify-between items-center mb-10">
      <h4 className="text-[#201f24] font-sans font-bold text-xl leading-6">
        Budgets
      </h4>

      <p className="capitalize text-blue-700 underline  text-xs font-sans font-normal leading-5">
        see details
      </p>
    </div>
    <div className="flex flex-col smallTablet:flex-row gap-8 laptop:flex-col ">
      <div className="mx-auto">
        <PieCharts
          width={250}
          height={250}
          outerRadius={100}
          pieData={pieData}
        />
      </div>

      {/* 1.2   4 cards*/}

      <div className="grid grid-cols-1  mobile:grid-cols-2 laptop:row-start-4 laptop:row-end-5  gap-4 smallTablet:w-full smallTablet:col-span-5  ">
        {budgets.map((budget) => {
          return (
            <div
              key={budget?._id}
              style={{ borderColor: `${budget?.color}` }}
              className={`bg-white py-2 px-4 w-full border-l-4 rounded-md flex flex-col items-start gap-2`}
            >
              <h6 className="text-[#696868] font-sans text-sm font-normal leading-5 ">
                {budget?.category}
              </h6>
              <h4 className="text-[#201F24] font-bold text-lg leading-5 font-sans ">
                {formatPrice(budget?.currentAmount)}
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</div>;

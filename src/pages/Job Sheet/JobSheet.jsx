function CustomerDetails({ name, address, city, contact }) {
  return (
    <section className="flex flex-col gap-1 grow self-stretch  capitalize ">
      <h2 className="mt-2.5 text-sm text-slate-700">Customer Details</h2>
      <div className="flex  gap-1 p-1 border  border-neutral-800">
        <span className="text-xs text-neutral-600">Name:</span>
        <span className="flex-1 text-xs text-slate-950">{name}</span>
      </div>
      <div className="flex  gap-1 p-1 border  border-neutral-800">
        <span className="my-auto text-xs text-neutral-600">Address:</span>
        <span className="text-xs text-slate-950">{address}</span>
      </div>
      <div className="flex  gap-1 p-1 border  border-neutral-800">
        <span className="text-xs text-neutral-600">City:</span>
        <span className="flex-1 text-xs text-slate-950">{city}</span>
      </div>
      <div className="flex  gap-1 p-1 border  border-neutral-800">
        <span className="text-xs text-neutral-600">Contact No:</span>
        <span className="flex-1 text-xs text-slate-950">{contact}</span>
      </div>
      <h2 className="mt-2.5 text-sm text-slate-700">Warranty Type</h2>
      <div className="flex h-fit text-xs gap-2 p-1 border  border-neutral-800 max-md:pr-5">
        {["I/W", "O/W", "P", "A/F", "F"].map((type, index) => (
          <div key={index} className="flex gap-0.5 justify-center items-center">
            <input
              type="radio"
              id={`radio-${type}`}
              name="warrantyType"
              className="shrink-0"
              checked={type === "F"}
              readOnly
            />
            <label
              htmlFor={`radio-${type}`}
              className="flex gap-0.5 items-center"
            >
              <span className="my-auto">{type}</span>
            </label>
          </div>
        ))}
      </div>
    </section>
  )
}

function VisitDetailsTable({ visits }) {
  return (
    <section className="flex flex-col pb-2.5 mt-4 w-full text-xs capitalize border-b border-solid border-zinc-200 text-neutral-600 max-md:max-w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-neutral-800">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 border-b border-neutral-800">
                Visit Details
              </th>
              <th className="py-2 border-b border-neutral-800">Visit Date</th>
              <th className="py-2 border-b border-neutral-800">
                Engineer Name
              </th>
              <th className="py-2 border-b border-neutral-800">In Time</th>
              <th className="py-2 border-b border-neutral-800">Out Time</th>
              <th className="py-2 border-b border-neutral-800">
                Technical Remarks
              </th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit, index) => (
              <tr
                key={index}
                className="text-center border-b border-neutral-800"
              >
                <td className="py-1 px-2">{visit.details}</td>
                <td className="py-1 px-2">{visit.date}</td>
                <td className="py-1 px-2">{visit.engineer}</td>
                <td className="py-1 px-2">{visit.inTime}</td>
                <td className="py-1 px-2">{visit.outTime}</td>
                <td className="py-1 px-2">{visit.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function ProductDetails({
  type,
  model,
  purchaseDate,
  serviceRequestedBy,
  serviceType,
  callType,
  amcNumber,
  amcPeriodFrom,
  amcPeriodTo,
}) {
  return (
    <div className="flex gap-1 flex-col grow self-stretch capitalize max-md:mt-4">
      <div className="flex  gap-1 p-1 border  border-neutral-800">
        <span className="text-xs text-neutral-600">Product type:</span>
        <span className="flex-1 text-xs text-slate-950">{type}</span>
      </div>
      <div className="flex  gap-1 p-1 border  border-neutral-800">
        <span className="text-xs text-neutral-600">Model/Suffix:</span>
        <span className="text-xs text-slate-950">{model}</span>
      </div>
      <div className="flex  gap-1 p-1 border  border-neutral-800">
        <span className="text-xs text-neutral-600">Serial No:</span>
        <span className="text-xs text-slate-950"></span>
      </div>
      <div className="flex  gap-1 p-1 border  border-neutral-800">
        <span className="text-xs text-neutral-600">Purchase Date:</span>
        <span className="flex-1 text-xs text-slate-950">{purchaseDate}</span>
      </div>
      <div className="flex  gap-1 p-1 border  border-neutral-800">
        <span className="text-xs text-neutral-600">SVC Requested by:</span>
        <span className="flex-1 text-xs text-slate-950">
          {serviceRequestedBy}
        </span>
      </div>
      <div className="flex  gap-1 p-1 border text-xs  border-neutral-800">
        <span className="my-auto text-neutral-600">Service Type:</span>
        <div className="flex gap-1.5 text-right text-slate-950">
          {["On-site", "Wake In"].map((service, index) => (
            <div
              key={index}
              className="flex gap-0.5 justify-center items-center"
            >
              <input
                type="radio"
                id={`radio-${service}`}
                name="serviceType"
                className="shrink-0"
                checked={serviceType === service}
                readOnly
              />
              <label
                htmlFor={`radio-${service}`}
                className="flex gap-0.5 items-center"
              >
                <span className="my-auto">{service}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex  gap-1 p-1 border  border-neutral-800">
        <span className="text-xs text-neutral-600">Call Type:</span>
        <span className="flex-1 text-xs text-slate-950">{callType}</span>
      </div>
      <div className="flex  gap-1 p-1 border  border-neutral-800">
        <span className="text-xs text-neutral-600">AMC/Ext Wty No:</span>
        <span className="flex-1 text-xs text-slate-950"></span>
      </div>
      <div className="flex  gap-1 p-1 border text-xs  border-neutral-800">
        <span className="text-neutral-600">AMC Period:</span>
        <div className="flex gap-2.5 whitespace-nowrap">
          <span className="flex-1 text-neutral-600">
            From: <span className="text-slate-950">{amcPeriodFrom}</span>
          </span>
          <span className="flex-1 text-neutral-600">
            To: <span className="text-slate-950">{amcPeriodTo}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function PartsTable({ parts }) {
  return (
    <section className="flex flex-col pb-2.5 mt-4 w-full text-xs capitalize border-b border-solid border-zinc-200 text-neutral-600 ">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border ">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 border-b border-neutral-800">S:No</th>
              <th className="py-2 border-b border-neutral-800">Part No</th>
              <th className="py-2 border-b border-neutral-800">Description</th>
              <th className="py-2 border-b border-neutral-800">Quantity</th>
              <th className="py-2 border-b border-neutral-800">Unit Price</th>
              <th className="py-2 border-b border-neutral-800">Parts Cost</th>
              <th className="py-2 border-b border-neutral-800">Verified By</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part, index) => (
              <tr
                key={index}
                className="text-center border-b border-neutral-800"
              >
                <td className="py-1 px-2">{part.sno}</td>
                <td className="py-1 px-2">{part.partNo}</td>
                <td className="py-1 px-2">{part.description}</td>
                <td className="py-1 px-2">{part.quantity}</td>
                <td className="py-1 px-2">{part.unitPrice}</td>
                <td className="py-1 px-2">{part.partsCost}</td>
                <td className="py-1 px-2">{part.verifiedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function JobSheet() {
  const visits = [
    {
      details: "1st Visit",
      date: "14-06-2024",
      engineer: "Sangeeth Ashokan",
      inTime: "01:31 PM",
      outTime: "03:31 PM",
      remarks:
        "Lorem ipsum domlor sit amet, consectetur adipiscing elit, sed do",
    },
  ]

  const parts = [
    {
      sno: "1",
      partNo: "TE74F41",
      description: "Lorem ipsum dolor",
      quantity: "2",
      unitPrice: "₹1000",
      partsCost: "₹500",
      verifiedBy: "Lorem ipsum dolor",
    },
    {
      sno: "2",
      partNo: "TE74F41",
      description: "Lorem ipsum dolor",
      quantity: "2",
      unitPrice: "₹1000",
      partsCost: "₹500",
      verifiedBy: "Na",
    },
    {
      sno: "3",
      partNo: "TE74F41",
      description: "Lorem ipsum dolor",
      quantity: "2",
      unitPrice: "₹1000",
      partsCost: "₹500",
      verifiedBy: "Lorem ipsum dolor",
    },
  ]
  return (
    <main className="flex flex-col p-5">
      <header className="justify-center px-2.5 text-xs font-bold text-center capitalize text-slate-700 max-md:max-w-full">
        Tax Invoice
      </header>
      <section className="flex gap-2 justify-between pb-2.5 mt-2.5 w-full capitalize border-b border-solid border-zinc-200 ">
        <div className="flex gap-2.5 self-start">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed1b1c3465711c771a1bc01f9149a3df8ff13a1b00337d08c4171c4db6487bc4?apiKey=bba37cf791904af7a5bb1426abbd2437&"
            alt="Company Logo"
            className="shrink-0 h-[35px] w-[35px]"
          />
          <div className="flex flex-col justify-center px-5 my-auto">
            <h2 className="text-lg leading-5 bg-clip-text">Ataraxia</h2>
            <p className="mt-1 text-xs leading-5 text-black">
              future care Pvt.Ltd
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1 text-xs">
          <div className="flex  gap-1 p-1 border  border-neutral-800">
            <span className="text-neutral-600">Job No:</span>
            <span className="text-slate-950">JN14752</span>
          </div>
          <div className="flex  gap-1 p-1 border  border-neutral-800">
            <span className="text-neutral-600">Receipt Date:</span>
            <span className="text-slate-950">15-06-2024</span>
          </div>
          <div className="flex  gap-1 p-1 border  border-neutral-800">
            <span className="text-neutral-600">Time:</span>
            <span className="text-slate-950">01:27</span>
          </div>
        </div>
      </section>
      <section className="mt-4 w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <aside className="flex  flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex h-fit text-xs gap-2 p-1 border  border-neutral-800 max-md:pr-5">
              {["Assigned", "Pending", "Cancel", "Close"].map((type, index) => (
                <div
                  key={index}
                  className="flex gap-0.5 justify-center items-center"
                >
                  <input
                    type="radio"
                    id={`radio-${type}`}
                    name="serviceCallType"
                    className="shrink-0"
                    checked={type === "Pending"}
                    readOnly
                  />
                  <label
                    htmlFor={`radio-${type}`}
                    className="flex gap-0.5 items-center"
                  >
                    <span className="my-auto">{type}</span>
                  </label>
                </div>
              ))}
            </div>
            <CustomerDetails
              name="John Doe"
              address="1234 Main St"
              city="Metropolis"
              contact="555-1234"
            />
          </aside>
          <ProductDetails
            type="Printer"
            model="XYZ-123"
            purchaseDate="01-01-2022"
            serviceRequestedBy="Jane Smith"
            serviceType="On-site"
            callType="Repair"
            amcNumber="AMC12345"
            amcPeriodFrom="01-01-2023"
            amcPeriodTo="31-12-2023"
          />
        </div>
        <section className="flex  gap-1 p-1 border  border-neutral-800 mt-2 max-md:flex-wrap max-md:max-w-full">
          <span className="text-xs text-neutral-600">Receipt Remarks:</span>
          <span className="flex-1 text-xs text-slate-950">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          </span>
        </section>
        <section className="flex  gap-1 p-1 border  border-neutral-800 mt-2 max-md:flex-wrap">
          <span className="my-auto text-xs text-neutral-600">
            Defect Reported by Engineer:
          </span>
          <span className="flex-1 text-xs text-slate-950">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </span>
        </section>
        <VisitDetailsTable visits={visits} />
        <PartsTable parts={parts} />
        <section className="flex gap-2.5 justify-between py-1 pr-1 mt-4 w-full text-xs capitalize border border-solid border-neutral-800 text-neutral-600 max-md:flex-wrap max-md:max-w-full">
          <span>Estimate of Repairs:</span>
          <span>Signature</span>
        </section>
        <section className="flex gap-2.5 justify-between py-1 pr-1 mt-1 w-full text-xs capitalize border border-solid border-neutral-800 text-neutral-600 max-md:flex-wrap max-md:max-w-full">
          <span>Customer Approved on Estimation Provided:</span>
          <span>Signature</span>
        </section>
        <section className="flex gap-4 mt-4 text-xs text-neutral-600 max-md:flex-wrap">
          <div className="flex flex-col flex-1">
            <span className="justify-center p-1 capitalize border border-solid border-neutral-800">
              Completion Date:
            </span>
            <div className="flex flex-col p-1 mt-1 border border-solid border-neutral-800">
              <label htmlFor="customer-signature" className="capitalize">
                Customer Name & Sign:
              </label>
              <p id="customer-signature" className="mt-1 text-xs text-black">
                I am satisfied with the repairs carried out on my product & the
                same is working satisfactorily.
              </p>
              <span className="mt-2.5 capitalize">
                Signature: _____________________
              </span>
            </div>
          </div>
          <div className="flex flex-col flex-1 self-start capitalize whitespace-nowrap">
            <span className="justify-center p-1 border border-solid border-neutral-800">
              Engineer:
            </span>
            <span className="justify-center p-1 mt-1 border border-solid border-neutral-800">
              Signature:
            </span>
          </div>
        </section>
      </section>
    </main>
  )
}

export default JobSheet

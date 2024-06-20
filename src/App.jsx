// App.jsx
import React from "react"
import { Routes, Route, Navigate, Link } from "react-router-dom"

// context
import { useAuth } from "@context/AuthContext"

// pages
import Dashboard from "@/pages/Dashboard/Dashboard"
import Ticket from "@/pages/Ticket/TicketAll/TicketAll"
import ManagementStaff from "@pages/Management/StaffManagement/ManagementStaff"
import UIAuth from "@pages/Auth/UIAuth"
import Reports from "@pages/Report/Reports"
import TicketAdd from "@pages/Ticket/TicketAll/TicketAdd"
import TicketView from "@pages/Ticket/TicketAll/TicketView"
import CustomerEdit from "@pages/Ticket/TicketAll/CustomerEdit"
import Layout from "@layouts/layout"
import BlankLayout from "@layouts/blankLayout"
import TicketOpen from "@pages/Ticket/TicketOpen"
import TicketPending from "@pages/Ticket/TicketPending"
import TicketCancelled from "@pages/Ticket/TicketCancelled"
import TicketClosed from "@pages/Ticket/TicketClosed/TicketClosed"
import TicketAssign from "@pages/Ticket/TicketAssign"

function App() {
  const { authToken } = useAuth()

  return (
    <div className="App">
      <Routes>
        {authToken !== null ? (
          <>
            <Route element={<BlankLayout />}>
              <Route
                path="/login"
                element={
                  <UIAuth
                    title="Sign In"
                    desc="Log in to your account to continue"
                  />
                }
              />
              <Route
                path="/forget-password"
                element={
                  <UIAuth
                    title="Reset Password"
                    desc="Please enter your email address to continue"
                  />
                }
              />
              <Route
                path="/new-password"
                element={
                  <UIAuth
                    title="New Password"
                    desc="Please enter your new password to continue"
                  />
                }
              />
              <Route
                path="/confirm-mail"
                element={
                  <UIAuth
                    title="Email Sent"
                    desc=" An email has been sent to your registered email address with instructions on how to reset your password. Please check your inbox, including the spam or junk folder, if you don't see the email within a few minutes."
                  />
                }
              />
            </Route>
            {/* Dashboard */}
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Dashboard />} />

              {/* Tickets */}
              <Route path="/ticket" element={<Ticket title="Open Tickets" />} />
              <Route path="/ticket/add" element={<TicketAdd />} />
              <Route path="/ticket/view/:id" element={<TicketView />} />
              <Route
                path="/customer/edit/customerid/:customerId/ticketid/:ticketId"
                element={<CustomerEdit />}
              />
              <Route path="/ticket/open" element={<TicketOpen />} />
              <Route path="/ticket/assigned" element={<TicketAssign />} />
              <Route path="/ticket/pending" element={<TicketPending />} />
              <Route path="/ticket/cancelled" element={<TicketCancelled />} />
              <Route path="/ticket/closed" element={<TicketClosed />} />

              {/* Management */}
              <Route path="/management/staff" element={<ManagementStaff />} />

              {/* Reports */}
              <Route path="/reports" element={<Reports />} />

              <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
          </>
        ) : (
          <>
            <Route
              path="/login"
              element={
                <UIAuth
                  title="Sign In"
                  desc="Log in to your account to continue"
                />
              }
            />
            <Route path="*" element={<Link to="/login">Login Required</Link>} />
          </>
        )}
      </Routes>
    </div>
  )

  // function CustomerDetails({ name, address, city, contact }) {
  //   return (
  //     <section className="flex flex-col grow self-stretch px-5 capitalize max-md:mt-4">
  //       <h2 className="mt-2.5 text-xs text-slate-700">Customer Details</h2>
  //       <div className="flex gap-2.5 py-1 mt-2 border-0 border-solid border-neutral-800">
  //         <span className="text-xs text-neutral-600">Name:</span>
  //         <span className="flex-1 text-xs text-slate-950">{name}</span>
  //       </div>
  //       <div className="flex gap-2.5 justify-between p-1 mt-1 border-0 border-solid border-neutral-800">
  //         <span className="my-auto text-xs text-neutral-600">Address:</span>
  //         <span className="text-xs text-slate-950">{address}</span>
  //       </div>
  //       <div className="flex gap-2.5 p-1 mt-1 border-0 border-solid border-neutral-800">
  //         <span className="text-xs text-neutral-600">City:</span>
  //         <span className="flex-1 text-xs text-slate-950">{city}</span>
  //       </div>
  //       <div className="flex gap-2.5 p-1 mt-1 border-0 border-solid border-neutral-800">
  //         <span className="text-xs text-neutral-600">Contact No:</span>
  //         <span className="flex-1 text-xs text-slate-950">{contact}</span>
  //       </div>
  //     </section>
  //   )
  // }

  // function VisitDetails({ visits }) {
  //   return (
  //     <section>
  //       <h3 className="flex flex-col justify-center px-1.5 py-1.5 mt-4 w-full text-xs capitalize bg-gray-200 text-neutral-600 max-md:max-w-full">
  //         Visit Details
  //       </h3>
  //       {visits.map((visit, index) => (
  //         <div
  //           key={index}
  //           className="flex flex-col justify-center p-1 mt-2 w-full text-xs capitalize border-0 border-solid border-neutral-800 text-slate-950 max-md:max-w-full"
  //         >
  //           <div className="flex gap-1.5 items-center px-5 max-md:flex-wrap">
  //             <span className="self-stretch my-auto text-neutral-600">
  //               {visit.title}
  //             </span>
  //             <span className="self-stretch my-auto">{visit.date}</span>
  //             <span className="self-stretch my-auto">{visit.engineer}</span>
  //             <span className="self-stretch my-auto">{visit.inTime}</span>
  //             <span className="self-stretch my-auto">{visit.outTime}</span>
  //             <span className="flex-1">{visit.remarks}</span>
  //           </div>
  //         </div>
  //       ))}
  //     </section>
  //   )
  // }

  // function App() {
  //   return (
  //     <main className="flex flex-col max-w-[535px]">
  //       <header className="justify-center px-2.5 text-xs font-bold text-center capitalize text-slate-700 max-md:max-w-full">
  //         Tax Invoice
  //       </header>
  //       <section className="flex gap-2 justify-between pb-2.5 mt-2.5 w-full capitalize border-b border-solid border-zinc-200 max-md:flex-wrap max-md:max-w-full">
  //         <div className="flex gap-2.5 self-start">
  //           <img
  //             loading="lazy"
  //             src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed1b1c3465711c771a1bc01f9149a3df8ff13a1b00337d08c4171c4db6487bc4?apiKey=bba37cf791904af7a5bb1426abbd2437&"
  //             alt="Company Logo"
  //             className="shrink-0 aspect-[1.03] w-[35px]"
  //           />
  //           <div className="flex flex-col justify-center px-5 my-auto">
  //             <h2 className="text-lg leading-5 bg-clip-text">Ataraxia</h2>
  //             <p className="mt-1 text-xs leading-5 text-black">
  //               future care Pvt.Ltd
  //             </p>
  //           </div>
  //         </div>
  //         <div className="flex flex-col justify-center text-xs">
  //           <div className="flex gap-2.5 py-1 pr-1 border-0 border-solid border-neutral-800">
  //             <span className="text-neutral-600">Job No:</span>
  //             <span className="text-slate-950">JN14752</span>
  //           </div>
  //           <div className="flex gap-2.5 py-1 pr-1 mt-1 border-0 border-solid border-neutral-800">
  //             <span className="text-neutral-600">Receipt Date:</span>
  //             <span className="text-slate-950">15-06-2024</span>
  //           </div>
  //           <div className="flex gap-2.5 py-1 pr-1 mt-1 whitespace-nowrap border-0 border-solid border-neutral-800">
  //             <span className="text-neutral-600">Time:</span>
  //             <span className="text-slate-950">01:27</span>
  //           </div>
  //         </div>
  //       </section>
  //       <section className="mt-4 w-full max-md:max-w-full">
  //         <div className="flex gap-5 max-md:flex-col max-md:gap-0">
  //           <aside className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
  //             <div className="flex flex-col grow self-stretch px-5 capitalize max-md:mt-4">
  //               <h2 className="mt-2.5 text-xs text-slate-700">Warranty Type</h2>
  //               <div className="flex flex-col justify-center py-1 mt-2 text-xs font-medium text-right whitespace-nowrap border-0 border-solid border-neutral-800 text-slate-950">
  //                 <div className="flex gap-1.5 pr-20 max-md:pr-5">
  //                   {["I/W", "O/W", "P", "A/F", "F"].map((type, index) => (
  //                     <div
  //                       key={index}
  //                       className="flex gap-0.5 justify-center items-center"
  //                     >
  //                       <img
  //                         loading="lazy"
  //                         src={`http://b.io/ext_${index + 2}-`}
  //                         alt=""
  //                         className="shrink-0 aspect-square w-[18px]"
  //                       />
  //                       <span className="my-auto">{type}</span>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //             </div>
  //             <CustomerDetails
  //               name="Civil Lines"
  //               address="603, B Wing, 6 Th Floor, Dolphin Hertage, Opp Military Camp, Santacruz (e)"
  //               city="Lorem ipsum dolor sit"
  //               contact="Lorem ipsum dolor sit"
  //             />
  //           </aside>
  //           <aside className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
  //             <div className="flex flex-col grow self-stretch capitalize max-md:mt-4">
  //               <div className="flex gap-2.5 p-1 border-0 border-solid border-neutral-800">
  //                 <span className="text-xs text-neutral-600">Product type:</span>
  //                 <span className="flex-1 text-xs text-slate-950">
  //                   Lorem ipsum dolor sit
  //                 </span>
  //               </div>
  //               <div className="flex gap-2.5 justify-between p-1 mt-1 border-0 border-solid border-neutral-800">
  //                 <span className="text-xs text-neutral-600">Model/Suffix:</span>
  //                 <span className="text-xs text-slate-950">
  //                   Lorem ipsum dolor sit
  //                 </span>
  //               </div>
  //               <div className="justify-center p-1 mt-1 text-xs border-solid border-neutral-800 text-neutral-600">
  //                 Serial No:
  //               </div>
  //               <div className="flex gap-2.5 p-1 mt-1 border-0 border-solid border-neutral-800">
  //                 <span className="text-xs text-neutral-600">Purchase Date:</span>
  //                 <span className="flex-1 text-xs text-slate-950">
  //                   Lorem ipsum dolor sit
  //                 </span>
  //               </div>
  //               <div className="flex gap-2.5 p-1 mt-1 border-0 border-solid border-neutral-800">
  //                 <span className="text-xs text-neutral-600">
  //                   SVC Requested by:
  //                 </span>
  //                 <span className="flex-1 text-xs text-slate-950">
  //                   Lorem ipsum dolor sit
  //                 </span>
  //               </div>
  //               <div className="flex gap-2.5 justify-between p-1 mt-1 text-xs border-0 border-solid border-neutral-800">
  //                 <span className="my-auto text-neutral-600">Service Type:</span>
  //                 <div className="flex gap-1.5 text-right text-slate-950">
  //                   {["On-site", "Wake In"].map((service, index) => (
  //                     <div
  //                       key={index}
  //                       className="flex gap-0.5 justify-center items-center"
  //                     >
  //                       <img
  //                         loading="lazy"
  //                         src="https://cdn.builder.io/api/v1/image/assets/TEMP/db716ece652143f68cbc5822ab9d65e3d32d99c7d129a522c8dc07679fd9af5d?apiKey=bba37cf791904af7a5bb1426abbd2437&"
  //                         alt=""
  //                         className="shrink-0 aspect-square w-[18px]"
  //                       />
  //                       <span className="my-auto">{service}</span>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //               <div className="flex gap-2.5 p-1 mt-1 border-0 border-solid border-neutral-800">
  //                 <span className="text-xs text-neutral-600">Call Type:</span>
  //                 <span className="flex-1 text-xs text-slate-950">
  //                   Lorem ipsum dolor sit
  //                 </span>
  //               </div>
  //               <div className="justify-center p-1 mt-1 text-xs border-solid border-neutral-800 text-neutral-600">
  //                 AMC/Ext Wty No:
  //               </div>
  //               <div className="flex gap-2.5 justify-between p-1 mt-1 text-xs border-0 border-solid border-neutral-800 text-neutral-600">
  //                 <span>AMC Period:</span>
  //                 <div className="flex gap-2.5 whitespace-nowrap">
  //                   <span className="flex-1">From:</span>
  //                   <span>To:</span>
  //                 </div>
  //               </div>
  //             </div>
  //           </aside>
  //         </div>
  //       </section>
  //       <section className="flex gap-2.5 p-1 mt-4 w-full capitalize border-0 border-solid border-neutral-800 max-md:flex-wrap max-md:max-w-full">
  //         <span className="text-xs text-neutral-600">Receipt Remarks:</span>
  //         <span className="flex-1 text-xs text-slate-950">
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  //         </span>
  //       </section>
  //       <section className="flex gap-2.5 p-1 mt-1 capitalize border-0 border-solid border-neutral-800 max-md:flex-wrap">
  //         <span className="my-auto text-xs text-neutral-600">
  //           Defect Reported by Engineer:
  //         </span>
  //         <span className="flex-1 text-xs text-slate-950">
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua
  //         </span>
  //       </section>
  //       <VisitDetails
  //         visits={[
  //           {
  //             title: "1st Visit",
  //             date: "14-06-2024",
  //             engineer: "Sangeeth Ashokan",
  //             inTime: "01:31 PM",
  //             outTime: "03:31 PM",
  //             remarks:
  //               "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
  //           },
  //         ]}
  //       />
  //       <section className="flex flex-col pb-2.5 mt-4 w-full text-xs capitalize border-b border-solid border-zinc-200 text-neutral-600 max-md:max-w-full">
  //         <h3 className="flex flex-col justify-center px-1 py-1.5 w-full bg-gray-200 max-md:max-w-full">
  //           Parts
  //         </h3>
  //         {["1", "2", "3"].map((part, index) => (
  //           <div
  //             key={index}
  //             className="justify-center p-1 whitespace-nowrap border-solid border-neutral-800 max-md:max-w-full"
  //           >
  //             {part}
  //           </div>
  //         ))}
  //       </section>
  //       <section className="flex gap-2.5 justify-between py-1 pr-1 mt-4 w-full text-xs capitalize border-0 border-solid border-neutral-800 text-neutral-600 max-md:flex-wrap max-md:max-w-full">
  //         <span>Estimate of Repairs:</span>
  //         <span>Signature</span>
  //       </section>
  //       <section className="flex gap-2.5 justify-between py-1 pr-1 mt-1 w-full text-xs capitalize border-0 border-solid border-neutral-800 text-neutral-600 max-md:flex-wrap max-md:max-w-full">
  //         <span>Customer Approved on Estimation Provided:</span>
  //         <span>Signature</span>
  //       </section>
  //       <section className="flex gap-4 mt-4 text-xs text-neutral-600 max-md:flex-wrap">
  //         <div className="flex flex-col flex-1">
  //           <span className="justify-center p-1 capitalize border-solid border-neutral-800">
  //             Completion Date:
  //           </span>
  //           <div className="flex flex-col p-1 mt-1 border-0 border-solid border-neutral-800">
  //             <label htmlFor="customer-signature" className="capitalize">
  //               Customer Name & Sign:
  //             </label>
  //             <p id="customer-signature" className="mt-1 text-xs text-black">
  //               I am satisfied with the repairs carried out on my product & the
  //               same is working satisfactorily.
  //             </p>
  //             <span className="mt-2.5 capitalize">
  //               Signature: _____________________
  //             </span>
  //           </div>
  //         </div>
  //         <div className="flex flex-col flex-1 self-start capitalize whitespace-nowrap">
  //           <span className="justify-center p-1 border-solid border-neutral-800">
  //             Engineer:
  //           </span>
  //           <span className="justify-center p-1 mt-1 border-solid border-neutral-800">
  //             Signature:
  //           </span>
  //         </div>
  //       </section>
  //     </main>
  //   )
  // }
}
export default App

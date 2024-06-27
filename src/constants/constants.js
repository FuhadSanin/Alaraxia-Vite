const CallType = {
  1: "Installation",
  2: "Repair",
  3: "Inspection",
}

const ServiceType = {
  1: "Walk In",
  2: "On Site",
}

const WarrantyStatus = {
  1: "In warranty",
  2: "Out of warranty",
  3: "AMC",
}

const CustomerDemand = {
  1: "Critical",
  2: "Urgent",
  3: "Normal",
}
const PendingReason = [
  { value: "1", label: "Part Not Available" },
  { value: "2", label: "Awaiting customer approval" },
  { value: "3", label: "No Responsible person" },
  { value: "4", label: "Purchase proof awaited" },
  { value: "5", label: "Replacement approval awaited" },
  { value: "6", label: "To be collected to Workshop" },
  { value: "7", label: "Customer Reappointment" },
  { value: "8", label: "Ready for delivery. Waiting for customer to pick up" },
  { value: "9", label: "Customer refused for repairs" },
  { value: "10", label: "Customer refused to give appointment" },
  { value: "11", label: "Product sent to Company for testing" },
]

const PendingReasonMap = {
  1: "Part Not Available",
  2: "Awaiting customer approval",
  3: "No Responsible person",
  4: "Purchase proof awaited",
  5: "Replacement approval awaited",
  6: "To be collected to Workshop",
  7: "Customer Reappointment",
  8: "Ready for delivery. Waiting for customer to pick up",
  9: "Customer refused for repairs",
  10: "Customer refused to give appointment",
  11: "Product sent to Company for testing",
}

const CancellationReasonMap = {
  1: "Customer refused repairs",
  2: "High repair charges",
  3: "No issues found",
  4: "Appointment cancelled",
  5: "Customer not available",
}

const CancellationReason = [
  { value: "1", label: "Customer refused repairs" },
  { value: "2", label: "High repair charges" },
  { value: "3", label: "No issues found" },
  { value: "4", label: "Appointment cancelled" },
  { value: "5", label: "Customer not available" },
]

const LocationMap = {
  "d5acb7da-108f-463f-8d65-38e5dd1bb059": "Hyderabad",
  "61e68d7f-27ec-4532-84d8-fbb4475188c0": "Kochi",
  "8f7658b8-ddc3-4641-bf5f-3407a9b8ae28": "Bangalore",
  "0480ffe2-1935-42b2-be3d-7a861f3ba62d": "Pune",
  "6673c96b-32b8-4423-ad24-da8716e9df80": "Delhi",
  "c1f7d17e-422d-494e-93cc-06d05b8cb58a": "Mumbai",
}

const TicketStatus = {
  1: "Open",
  2: "Assigned",
  3: "Cancelled",
  4: "Closed",
  5: "Pending",
  6: "Requested for closing",
}

export {
  CallType,
  ServiceType,
  WarrantyStatus,
  TicketStatus,
  CustomerDemand,
  PendingReason,
  PendingReasonMap,
  CancellationReason,
  LocationMap,
  CancellationReasonMap,
}

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

const CancellationReason = [
  { value: "1", label: "Customer refused repairs" },
  { value: "2", label: "High repair charges" },
  { value: "3", label: "No issues found" },
  { value: "4", label: "Appointment cancelled" },
  { value: "5", label: "Customer not available" },
]

const LocationMap = {
  "2741c98b-1313-45f5-aa70-26db4227ccec": "Hyderabad",
  "a9f48006-34b5-463f-a248-c7667ecd5b9f": "Kochi",
  "ecfe9b23-2c68-47e7-958b-3bd41c38ae04": "Bangalore",
  "66b42480-c555-4a83-934b-0a141b293c87": "Pune",
  "535be272-42ba-4872-8387-765b5a48bf2f": "Delhi",
  "4cbe3249-cb95-472f-8006-4ae6ea52953b": "Mumbai",
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
  CancellationReason,
  LocationMap,
}

export const socialOptions = [
  { value: "Facebook", label: "Facebook" },
  { value: "Google", label: "Google" },
  { value: "TripAdvisor", label: "TripAdvisor" },
  { value: "Yelp", label: "Yelp" },
];


export const fieldToStepMap = {
  businessName: 1,
  companyNumber: 1,
  country: 1,
  vatNumber: 1,
  logo: 1,
  address: 1,
  apptNo: 1,
  state: 1,
  city: 1,
  postCode: 1,
  primaryContactName: 2,
  primaryContactEmail: 2,
  contactNumber: 2,
  landline: 2,
  "linkedAccounts.0.profile": 3,
  "linkedAccounts.0.webAddress": 3,
};

export const initialValues = {
  businessName: "",
  companyNumber: "",
  country: "",
  vatNumber: "",
  logo: null,
  address: "",
  apptNo: "",
  state: "",
  city: "",
  postCode: "",
  primaryContactName: "",
  primaryContactEmail: "",
  contactNumber: "",
  landline: "",
  linkedAccounts: [
    {
      profile: "",
      webAddress: "",
    },
  ],
  openingHours: [
    {
      day: "Monday",
      open: false,
      startTime: "",
      endTime: "",
    },
    {
      day: "Tuesday",
      open: false,
      startTime: "",
      endTime: "",
    },
    {
      day: "Wednesday",
      open: false,
      startTime: "",
      endTime: "",
    },
    {
      day: "Thursday",
      open: false,
      startTime: "",
      endTime: "",
    },
    {
      day: "Friday",
      open: false,
      startTime: "",
      endTime: "",
    },
    {
      day: "Saturday",
      open: false,
      startTime: "",
      endTime: "",
    },
    {
      day: "Sunday",
      open: false,
      startTime: "",
      endTime: "",
    },
  ],
  specialHours: [],
};
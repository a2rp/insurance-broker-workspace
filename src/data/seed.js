export const seedData = {
  accounts: [
    { id: 'AC-2048', name: 'Northstar Logistics', contact: 'Priya Desai', email: 'priya@northstarlogistics.com', phone: '(312) 555-0194', industry: 'Transportation', location: 'Chicago, IL', premium: 482600, policies: 4, renewalDate: '2026-10-24', risk: 'Moderate', notes: 'Fleet expansion expected before renewal.' },
    { id: 'AC-2037', name: 'Juniper Hospitality Group', contact: 'Marcus Lee', email: 'marcus@juniperhg.com', phone: '(615) 555-0132', industry: 'Hospitality', location: 'Nashville, TN', premium: 361200, policies: 3, renewalDate: '2026-11-02', risk: 'Low', notes: 'Four properties across Tennessee.' },
    { id: 'AC-2021', name: 'Fieldstone Manufacturing', contact: 'Elena Torres', email: 'elena@fieldstone.co', phone: '(414) 555-0177', industry: 'Manufacturing', location: 'Milwaukee, WI', premium: 728450, policies: 6, renewalDate: '2026-11-15', risk: 'High', notes: 'Workers compensation loss control visit due.' },
    { id: 'AC-1998', name: 'Blue Oak Dental Partners', contact: 'Nina Patel', email: 'nina@blueoakdental.com', phone: '(303) 555-0120', industry: 'Healthcare', location: 'Denver, CO', premium: 194800, policies: 5, renewalDate: '2026-12-01', risk: 'Low', notes: 'New clinic opening in January.' },
    { id: 'AC-1986', name: 'Meridian Property Co.', contact: 'David Kim', email: 'david@meridianprop.com', phone: '(206) 555-0146', industry: 'Real estate', location: 'Seattle, WA', premium: 613900, policies: 7, renewalDate: '2026-12-19', risk: 'Moderate', notes: 'Updated property schedule received.' },
    { id: 'AC-1952', name: 'Solis Outdoor Supply', contact: 'Avery Brooks', email: 'avery@solisoutdoor.com', phone: '(503) 555-0118', industry: 'Retail', location: 'Portland, OR', premium: 248300, policies: 3, renewalDate: '2027-01-08', risk: 'Low', notes: 'Seasonal inventory values fluctuate.' },
  ],
  policies: [
    { id: 'PL-88421', accountId: 'AC-2048', account: 'Northstar Logistics', type: 'Commercial auto', carrier: 'Travelers', premium: 184500, status: 'Active', effective: '2025-10-24', expires: '2026-10-24', limit: '$5,000,000', owner: 'Jordan Lee' },
    { id: 'PL-88396', accountId: 'AC-2037', account: 'Juniper Hospitality Group', type: 'Property', carrier: 'CNA', premium: 216800, status: 'Renewal review', effective: '2025-11-02', expires: '2026-11-02', limit: '$12,500,000', owner: 'Maya Chen' },
    { id: 'PL-88177', accountId: 'AC-2021', account: 'Fieldstone Manufacturing', type: 'Workers compensation', carrier: 'The Hartford', premium: 307200, status: 'Submission', effective: '2025-11-15', expires: '2026-11-15', limit: 'Statutory', owner: 'Jordan Lee' },
    { id: 'PL-87992', accountId: 'AC-1998', account: 'Blue Oak Dental Partners', type: 'Professional liability', carrier: 'CNA', premium: 94600, status: 'Active', effective: '2025-12-01', expires: '2026-12-01', limit: '$2,000,000', owner: 'Sam Rivera' },
    { id: 'PL-87811', accountId: 'AC-1986', account: 'Meridian Property Co.', type: 'Commercial property', carrier: 'Chubb', premium: 392400, status: 'Active', effective: '2025-12-19', expires: '2026-12-19', limit: '$18,000,000', owner: 'Maya Chen' },
    { id: 'PL-87310', accountId: 'AC-1952', account: 'Solis Outdoor Supply', type: 'General liability', carrier: 'Liberty Mutual', premium: 82400, status: 'Active', effective: '2026-01-08', expires: '2027-01-08', limit: '$4,000,000', owner: 'Sam Rivera' },
    { id: 'PL-87125', accountId: 'AC-2048', account: 'Northstar Logistics', type: 'General liability', carrier: 'Liberty Mutual', premium: 129800, status: 'Active', effective: '2025-10-24', expires: '2026-10-24', limit: '$4,000,000', owner: 'Jordan Lee' },
  ],
  renewals: [
    { id: 'RN-1048', account: 'Northstar Logistics', policy: 'Commercial auto', due: '2026-10-24', stage: 'Marketing', owner: 'Jordan Lee', checklist: ['Exposure data', 'Loss runs', 'Carrier submission'], completed: ['Exposure data', 'Loss runs'], premium: 184500 },
    { id: 'RN-1037', account: 'Juniper Hospitality Group', policy: 'Property', due: '2026-11-02', stage: 'Proposal', owner: 'Maya Chen', checklist: ['Exposure data', 'Loss runs', 'Carrier submission'], completed: ['Exposure data', 'Loss runs', 'Carrier submission'], premium: 216800 },
    { id: 'RN-1021', account: 'Fieldstone Manufacturing', policy: 'Workers compensation', due: '2026-11-15', stage: 'Information needed', owner: 'Jordan Lee', checklist: ['Exposure data', 'Loss runs', 'Carrier submission'], completed: ['Exposure data'], premium: 307200 },
    { id: 'RN-0998', account: 'Blue Oak Dental Partners', policy: 'Professional liability', due: '2026-12-01', stage: 'Preparation', owner: 'Sam Rivera', checklist: ['Exposure data', 'Loss runs', 'Carrier submission'], completed: [], premium: 94600 },
  ],
  requests: [
    { id: 'SR-3218', account: 'Meridian Property Co.', subject: 'Add newly acquired property', type: 'Certificate / endorsement', priority: 'High', status: 'In progress', owner: 'Maya Chen', received: '2026-10-09' },
    { id: 'SR-3212', account: 'Northstar Logistics', subject: 'Certificate for warehouse lease', type: 'Certificate of insurance', priority: 'Normal', status: 'Waiting on client', owner: 'Jordan Lee', received: '2026-10-09' },
    { id: 'SR-3207', account: 'Blue Oak Dental Partners', subject: 'Update additional insured', type: 'Policy change', priority: 'Normal', status: 'New', owner: 'Sam Rivera', received: '2026-10-08' },
    { id: 'SR-3194', account: 'Fieldstone Manufacturing', subject: 'Workers comp audit documents', type: 'Document request', priority: 'High', status: 'In progress', owner: 'Jordan Lee', received: '2026-10-07' },
  ],
}

export const renewalStages = ['Preparation', 'Information needed', 'Marketing', 'Proposal', 'Bound']
export const policyStatuses = ['Active', 'Renewal review', 'Submission', 'Quoted', 'Expired']
export const requestStatuses = ['New', 'In progress', 'Waiting on client', 'Completed']
export const brokers = ['Jordan Lee', 'Maya Chen', 'Sam Rivera']

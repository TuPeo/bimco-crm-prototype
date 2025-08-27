// Shared country data that can be used across the application
// This data should ideally come from the Setup > Countries management

export interface Country {
  id: string;
  countryCode: string;
  countryName: string;
  status: 'Active' | 'Inactive';
  lastModified: string;
  modifiedBy: string;
  createdDate: string;
}

// Master list of countries - this would normally come from database/API
export const masterCountries: Country[] = [
  {
    id: '1',
    countryCode: 'DK',
    countryName: 'Denmark',
    status: 'Active',
    lastModified: '2025-08-15',
    modifiedBy: 'John Admin',
    createdDate: '2025-01-15'
  },
  {
    id: '2',
    countryCode: 'NO',
    countryName: 'Norway',
    status: 'Active',
    lastModified: '2025-08-10',
    modifiedBy: 'Jane Manager',
    createdDate: '2025-01-20'
  },
  {
    id: '3',
    countryCode: 'SE',
    countryName: 'Sweden',
    status: 'Active',
    lastModified: '2025-08-05',
    modifiedBy: 'Bob Staff',
    createdDate: '2025-02-01'
  },
  {
    id: '4',
    countryCode: 'DE',
    countryName: 'Germany',
    status: 'Active',
    lastModified: '2025-07-20',
    modifiedBy: 'Alice Admin',
    createdDate: '2025-01-10'
  },
  {
    id: '5',
    countryCode: 'UK',
    countryName: 'United Kingdom',
    status: 'Active',
    lastModified: '2025-08-01',
    modifiedBy: 'Mike Manager',
    createdDate: '2025-01-05'
  },
  {
    id: '6',
    countryCode: 'FR',
    countryName: 'France',
    status: 'Active',
    lastModified: '2025-07-15',
    modifiedBy: 'System Admin',
    createdDate: '2025-01-05'
  },
  {
    id: '7',
    countryCode: 'CH',
    countryName: 'Switzerland',
    status: 'Active',
    lastModified: '2025-07-10',
    modifiedBy: 'System Admin',
    createdDate: '2025-01-05'
  },
  {
    id: '8',
    countryCode: 'ES',
    countryName: 'Spain',
    status: 'Active',
    lastModified: '2025-07-05',
    modifiedBy: 'System Admin',
    createdDate: '2025-01-05'
  },
  {
    id: '9',
    countryCode: 'IT',
    countryName: 'Italy',
    status: 'Active',
    lastModified: '2025-07-01',
    modifiedBy: 'System Admin',
    createdDate: '2025-01-05'
  },
  {
    id: '10',
    countryCode: 'NL',
    countryName: 'Netherlands',
    status: 'Active',
    lastModified: '2025-06-25',
    modifiedBy: 'System Admin',
    createdDate: '2025-01-05'
  },
  {
    id: '11',
    countryCode: 'BE',
    countryName: 'Belgium',
    status: 'Active',
    lastModified: '2025-06-20',
    modifiedBy: 'System Admin',
    createdDate: '2025-01-05'
  },
  {
    id: '12',
    countryCode: 'SG',
    countryName: 'Singapore',
    status: 'Active',
    lastModified: '2025-06-15',
    modifiedBy: 'System Admin',
    createdDate: '2025-01-05'
  },
  {
    id: '13',
    countryCode: 'GR',
    countryName: 'Greece',
    status: 'Active',
    lastModified: '2025-06-10',
    modifiedBy: 'System Admin',
    createdDate: '2025-01-05'
  },
  {
    id: '14',
    countryCode: 'JP',
    countryName: 'Japan',
    status: 'Active',
    lastModified: '2025-06-05',
    modifiedBy: 'System Admin',
    createdDate: '2025-01-05'
  },
  {
    id: '15',
    countryCode: 'KR',
    countryName: 'South Korea',
    status: 'Active',
    lastModified: '2025-06-01',
    modifiedBy: 'System Admin',
    createdDate: '2025-01-05'
  }
];

// Helper functions
export const getCountryByCode = (countryCode: string): Country | undefined => {
  return masterCountries.find(country => 
    country.countryCode === countryCode && country.status === 'Active'
  );
};

export const getCountryName = (countryCode: string): string => {
  const country = getCountryByCode(countryCode);
  return country ? country.countryName : countryCode;
};

export const getActiveCountries = (): Country[] => {
  return masterCountries.filter(country => country.status === 'Active');
};

export const getAllCountries = (): Country[] => {
  return masterCountries;
};

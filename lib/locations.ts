export interface LocationArea {
  [area: string]: string[];
}

export interface LocationCity {
  cities: {
    [city: string]: string[];
  };
}

export interface LocationDistrict {
  districts: {
    [district: string]: LocationCity;
  };
}

export interface LocationTree {
  [division: string]: LocationDistrict;
}

export const locationTree: LocationTree = {
  Dhaka: {
    districts: {
      Dhaka: {
        cities: {
          "Dhaka North": ["Uttara", "Mirpur", "Mohakhali"],
          "Dhaka South": ["Dhanmondi", "Jatrabari", "Old Dhaka"],
        },
      },
      Gazipur: {
        cities: {
          Tongi: ["Station Road", "Cherag Ali"],
          GazipurSadar: ["Chowrasta", "Bason"],
        },
      },
    },
  },
  Chattogram: {
    districts: {
      Chattogram: {
        cities: {
          Pahartali: ["Oxygen", "Bayezid"],
          Kotwali: ["Anderkilla", "Agrabad"],
        },
      },
      CoxsBazar: {
        cities: {
          Sadar: ["Kolatoli", "Jhilongja"],
          Teknaf: ["Shaplapur", "Hnila"],
        },
      },
    },
  },
  Rajshahi: {
    districts: {
      Rajshahi: {
        cities: {
          Boalia: ["Shaheb Bazar", "Laxmipur"],
          Motihar: ["Kazla", "Talaimari"],
        },
      },
    },
  },
};

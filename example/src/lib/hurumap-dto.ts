interface MetaData {
  metadata: {
    table_id: string;
    universe: string;
    release: string;
    year: string;
  };
}

export interface Data {
  [key: string]: {
    name: string;
    numerators: {
      this: number | null;
    };
    values: {
      this: number | null;
    };
    index: {
      this: number | null;
    };
    error: {
      this: number | null;
    };
    error_ratio: {
      this: number | null;
    };
    numerator_errors: {
      this: number | null;
    };
  };
}

export interface GroupedData {
  [key: string]: {
    metadata: {
      name: string;
    };
  } & {
    [key: string]: {
      name: string;
      numerators: {
        this: number | null;
      };
      values: {
        this: number | null;
      };
      index: {
        this: number | null;
      };
      error: {
        this: number | null;
      };
      error_ratio: {
        this: number | null;
      };
      numerator_errors: {
        this: number | null;
      };
    };
  };
}

export type chartType = 'column' | 'grouped_column';

export interface Chart {
  chart: chartType;
  title: string;
  section: string;
  fields: string;
  table_data: any; // (MetaData & Data) | (MetaData & GroupedData);
  table_total_data: {
    name: string;
    numerators: {
      this: number | null;
      country: number | null;
    };
    values: {
      this: number | null;
      country: number | null;
    };
    index: {
      this: number | null;
      country: number | null;
    };
    error: {
      this: number | null;
      country: number | null;
    };
    error_ratio: {
      this: number | null;
      country: number | null;
    };
    numerator_errors: {
      this: number | null;
      country: number | null;
    };
  };
}
export interface Profile {
  primary_release_year: number;
  charts: {
    [key: string]: Chart;
  };
  geography: {
    this: {
      full_geoid: string;
      full_name: string;
      name: string;
      short_name: string;
      geo_level: string;
      geo_code: string;
      child_level: string | null;
      parent_geoid: string;
      square_kms: number;
      version: string;
    };
    parents: {
      country: {
        full_geoid: string;
        full_name: string;
        name: string;
        short_name: string;
        geo_level: string;
        geo_code: string;
        child_level: string;
        parent_geoid: string | null;
        square_kms: number;
        version: string;
      };
    };
    comparatives: string[];
  };
  primary_releases: {
    other: [];
    active: {
      name: string;
      year: string;
      citation: string | null;
    };
  };
}

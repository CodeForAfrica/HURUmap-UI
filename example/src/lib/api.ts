import { Profile } from "./hurumap-dto";

export function getProfile(geoId: string): Profile {
  return {
    primary_release_year: 2009,
    charts: {
      'chart-column-ageincompletedyears_ruralorurban_sex-sex': {
        chart: 'column',
        title: 'Population by sex',
        section: 'Population',
        fields: 'sex',
        table_data: {
          Female: {
            name: 'Female',
            numerators: {
              this: 298175,
              country: 1.941764e7
            },
            values: {
              this: 45.05,
              country: 50.29
            },
            index: {
              this: 100,
              country: 90
            },
            error: {
              this: 0,
              country: 0
            },
            error_ratio: {
              this: null,
              country: null
            },
            numerator_errors: {
              this: 0,
              country: 0
            }
          },
          Male: {
            name: 'Male',
            numerators: {
              this: 363766,
              country: 1.9192458e7
            },
            values: {
              this: 54.95,
              country: 49.71
            },
            index: {
              this: 100,
              country: 111
            },
            error: {
              this: 0,
              country: 0
            },
            error_ratio: {
              this: null,
              country: null
            },
            numerator_errors: {
              this: 0,
              country: 0
            }
          },
          metadata: {
            table_id: 'AGEINCOMPLETEDYEARS_RURALORURBAN_SEX',
            universe: 'Population',
            release: 'Census 2009',
            year: '2009'
          }
        },
        table_total_data: {
          name:
            'name for total data of chart-column-ageincompletedyears_ruralorurban_sex-sex',
          values: {
            this: 661941,
            country: 38610097
          },
          index: {
            this: 100,
            country: 2
          },
          error: {
            this: 0,
            country: 0
          },
          error_ratio: {
            this: null,
            country: null
          },
          numerators: {
            this: 0,
            country: 0
          },
          numerator_errors: {
            this: 0,
            country: 0
          }
        }
      },
      'chart-grouped_column-ageincompletedyears_ruralorurban_sex-rural or urban_sex': {
        chart: 'grouped_column',
        title: 'Population by sex vs rural urban',
        section: 'Population',
        fields: 'rural or urban_sex',
        table_data: {
          Rural: {
            metadata: {
              name: 'Rural'
            },
            Female: {
              name: 'Female',
              numerators: {
                this: 252620,
                country: 1.3209075e7
              },
              values: {
                this: 38.16,
                country: 34.21
              },
              index: {
                this: 100,
                country: 112
              },
              error: {
                this: 0,
                country: 0
              },
              error_ratio: {
                this: null,
                country: null
              },
              numerator_errors: {
                this: 0,
                country: 0
              }
            },
            Male: {
              name: 'Male',
              numerators: {
                this: 312466,
                country: 1.2913647e7
              },
              values: {
                this: 47.2,
                country: 33.45
              },
              index: {
                this: 100,
                country: 141
              },
              error: {
                this: 0,
                country: 0
              },
              error_ratio: {
                this: null,
                country: null
              },
              numerator_errors: {
                this: 0,
                country: 0
              }
            }
          },
          Urban: {
            metadata: {
              name: 'Urban'
            },
            Female: {
              name: 'Female',
              numerators: {
                this: 45555,
                country: 6208564
              },
              values: {
                this: 6.88,
                country: 16.08
              },
              index: {
                this: 100,
                country: 43
              },
              error: {
                this: 0,
                country: 0
              },
              error_ratio: {
                this: null,
                country: null
              },
              numerator_errors: {
                this: 0,
                country: 0
              }
            },
            Male: {
              name: 'Male',
              numerators: {
                this: 51300,
                country: 6278811
              },
              values: {
                this: 7.75,
                country: 16.26
              },
              index: {
                this: 100,
                country: 48
              },
              error: {
                this: 0,
                country: 0
              },
              error_ratio: {
                this: null,
                country: null
              },
              numerator_errors: {
                this: 0,
                country: 0
              }
            }
          },
          metadata: {
            table_id: 'AGEINCOMPLETEDYEARS_RURALORURBAN_SEX',
            universe: 'Population',
            release: 'Census 2009',
            year: '2009'
          }
        },
        table_total_data: {
          name:
            'name for total data of chart-grouped_column-ageincompletedyears_ruralorurban_sex-rural or urban_sex',
          values: {
            this: 661941,
            country: 38610097
          },
          index: {
            this: 100,
            country: 2
          },
          error: {
            this: 0,
            country: 0
          },
          error_ratio: {
            this: null,
            country: null
          },
          numerators: {
            this: 0,
            country: 0
          },
          numerator_errors: {
            this: 0,
            country: 0
          }
        }
      }
    },
    geography: {
      this: {
        full_geoid: 'county-8',
        full_name: 'Wajir',
        name: 'Wajir',
        short_name: 'Wajir',
        geo_level: 'county',
        geo_code: '8',
        child_level: null,
        parent_geoid: 'country-KE',
        square_kms: 55840.6,
        version: '2009'
      },
      parents: {
        country: {
          full_geoid: 'country-KE',
          full_name: 'Kenya',
          name: 'Kenya',
          short_name: 'Kenya',
          geo_level: 'country',
          geo_code: 'KE',
          child_level: 'county',
          parent_geoid: null,
          square_kms: 581309,
          version: '2009'
        }
      },
      comparatives: ['country']
    },
    primary_releases: {
      other: [],
      active: {
        name: 'Census',
        year: '2009',
        citation: null
      }
    }
  };
}

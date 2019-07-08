# HURUmap UI

# Usage

### Mapit

The basic usage for the mapit map is as follows:

Specify countries to show:

```react
    <MapIt loadCountries={['KE','TZ','ZA']} />
```

Show the coutry children i.e. districts, regions and cities:

```react
    <MapIt loadChildren loadCountries={['KE','TZ','ZA']} />
```

Get callback when a country or children are clicked:

```react
    <MapIt zoom={13} loadChildren loadCountries={['KE']} onClickGeoLayer={geoID => {
        // Do something
    }}/>
```

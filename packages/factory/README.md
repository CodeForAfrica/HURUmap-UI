# Component Reference

This packages includes a library of generic HURUmap components to be used for creating common UI elements shared between applications and the HURUmap dashboard.

## Installation

Install the module

```bash
npm install @hurumaptest/components --save
```

## Usage

These components can be accessed by importing from the `components` root directory:

```jsx
/**
 * HURUmap dependencies
 */
import { Card } from '@hurumaptest/components';

export default function MyVisual() {
	return <Card
            id="668"
            type="hurumap"
            geoId="country-KE"
            showInsight
            showStatVisual
            definition={{
                id: 668,
                title: 'Contribution by principal donor',
                subtitle: 'Development Assistance',
                visual: {
                    type: 'column',
                    table: 'allDonors',
                    x: 'donor',
                    y: 'total',
                    typeProps: {
                        horizontal: true
                    },
                    queryAlias: 'v668'
                },
                stat: {
                    type: 'number',
                    subtitle: 'Development Assistance',
                    description: 'Donor Contribution',
                    unique: false,
                    aggregate: 'sum',
                    queryAlias: 'v668'
                },
                source: [],
                description: []
            }}
        />;
}
```

<br/><br/><p align="center"><img src="https://hurumap.org/static/img/logo-white.png" alt="Hurumap" /></p>
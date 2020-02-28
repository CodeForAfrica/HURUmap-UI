# Charts

This packages includes a library of HURUmap charts and a chart factory.

## Installation

Install the module

```bash
npm install @hurumap-ui/charts --save
```

## Usage

These components can be accessed by importing from the `charts` root directory:

```jsx
/**
 * HURUmap dependencies
 */
import { BarChart } from '@hurumap-ui/charts';

export default function Chart() {
	return (
        <BarChart
            horizontal="horizontal"
            width={350}
            height={350}
            domainPadding={{ x: 15 }}
            data={Array(5)
                .fill(null)
                .map((_, index) => ({
                x: `${index} wrap label`,
                y: 10 * index + 1
                }))}
            parts={{
                axis: {
                dependent: {
                    tickValues: [10, 50, 90],
                    tickFormat: ['10%', '50%', '90%']
                }
                }
            }}
        />
    );
}
```

<br/><br/><p align="center"><img src="https://hurumap.org/static/img/logo-white.png" alt="Hurumap" width="200px" style="background-color:#084a49;" /></p>

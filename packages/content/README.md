# Content

Utility to render responsive HURUmap components and/or core elements in place of of html placeholders coming from the Wordpress dashboard using the Gutenberg blocks.

## Installation

Install the module

```bash
npm install @hurumap/content --save
```

## Usage

These functions can be accessed by importing from the `content` root directory:

```jsx
/**
 * HURUmap dependencies
 */
import { renderBlocks } from '@hurumap/content';

export default function MyVisual() {
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: `
                <div 
                    id="indicator-flourish-674" 
                    style="width:100%" 
                    data-post-id="674" 
                    data-title="Nigeria's Progress on Financial Inclusion" 
                    data-description="Nigeria has under-performed on financial inclusion rates versus many African counterparts, largely reflecting regulatory hurdles for mobile money." 
                    data-show-insight="false" 
                    data-insight-title="Summary" 
                    data-data-geo-id="country-NG" 
                    data-data-link-title="View more data by topic" 
                    data-analysis-country="nigeria" 
                    data-analysis-link-title="Read the country analysis" 
                    class="wp-block-hurumap-data-flourish-block"></div>` }}>

            {renderBlocks({
                flourishURL: id =>
                    'https://dashboard.takwimu.africa/wp-json/hurumap-data/flourish/${id}/',
                fetchDefinitionUrl: (type, id) => {
                switch (type) {
                    case 'flourish':
                    case 'hurumap':
                        return `https://dashboard.takwimu.africa/wp-json/hurumap-data/charts/${id}/`;
                    case 'snippet':
                        return `https://dashboard.takwimu.africa/wp-json/wp/v2/${type}/${id}/`
                    default:
                        return '';
                }
                }
            })}
        </div>
    );
}
```

Dashboard functions can be accessed by importing from the `cms` root directory:

```jsx
/**
 * HURUmap dependencies
 */
import { TYPES, deprecatedProps } from '@codeforafrica/hurumap-ui/cms';

const attributes = {
  id: {
    type: 'string'
  },
  postType: {
    type: 'string'
  },
  postId: {
    type: 'string'
  },
  cardWidth: {
    type: 'string'
  }
};

registerBlockType('hurumap/card-block', {
  title: 'HURUmap Card',
  icon: 'index-card', // https://developer.wordpress.org/resource/dashicons
  category: 'widgets',
  supports: {
    align: ['wide', 'full', 'left', 'right', 'center'],
    html: false
  },
  attributes,
  save: ({ attributes: attribs }) => {
    return <div {...dataProps(TYPES.HURUMAP_CARD, attribs)} />;
  },
  deprecated: [
    {
      attributes,
      // eslint-disable-next-line react/prop-types
      save: ({ attributes: attribs }) => {
        return <div {...deprecatedProps(TYPES.HURUMAP_CARD, attribs)} />;
      }
    }
  ]
});

```

<br/><br/><p align="center" style="background-color:#084a49;"><img src="https://hurumap.org/static/img/logo-white.png" alt="Hurumap" /></p>

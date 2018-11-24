import React from 'react';
import ReactDOM from 'react-dom';
import { arrayOf, shape } from 'prop-types';

import BaseAccordion from './BaseAccordion';
import {
  AccordionButton,
  AccordionItem,
  AccordionContents,
  single,
  preventClose,
  combineReducers,
  TabButton,
  TabItem,
  TabItems,
  TabButtons
} from './shared';

const Accordion = ({ items, ...props }) => (
  <BaseAccordion {...props}>
    {({ openedIndexes, handleItemClick }) => (
      <div>
        {items.map((item, index) => (
          <AccordionItem key={item.title} direction="vertical">
            <AccordionButton
              isOpen={openedIndexes.includes(index)}
              onClick={() => handleItemClick(index)}
            >
              {item.title}{' '}
              <span>{openedIndexes.includes(index) ? '👇' : '👈'}</span>
            </AccordionButton>
            <AccordionContents isOpen={openedIndexes.includes(index)}>
              {item.contents}
            </AccordionContents>
          </AccordionItem>
        ))}
      </div>
    )}
  </BaseAccordion>
);

const BaseTabs = ({ stateReducer = (state, changes) => changes, ...props }) => (
  <BaseAccordion
    stateReducer={combineReducers(single, preventClose, stateReducer)}
    {...props}
  />
);

const Tabs = ({ items }) => (
  <BaseTabs>
    {({ openedIndexes, handleItemClick }) => (
      <div>
        <TabItems>
          {items.map((item, index) => (
            <TabItem
              key={index} // eslint-disable-line react/no-array-index-key
              position="above"
              isOpen={openedIndexes.includes(index)}
            >
              {items[index].contents}
            </TabItem>
          ))}
        </TabItems>
        <TabButtons>
          {items.map((item, index) => (
            <TabButton
              key={item.title}
              isOpen={openedIndexes.includes(index)}
              onClick={() => handleItemClick(index)}
            >
              {item.title}
            </TabButton>
          ))}
        </TabButtons>
      </div>
    )}
  </BaseTabs>
);
Tabs.propTypes = {
  items: arrayOf(shape({})).isRequired
};

const items = [
  {
    title: '🐴',
    contents: (
      <div>
        Horses can sleep both lying down and standing up. Domestic horses have a
        lifespan of around 25 years. A 19th century horse named Old Billy is
        said to have lived 62 years.
      </div>
    )
  },
  {
    title: '🦏',
    contents: (
      <div>
        Rhino skin maybe thick but it can be quite sensitive to sunburns and
        insect bites which is why they like wallow so much – when the mud dries
        it acts as protection from the sunburns and insects.
      </div>
    )
  },
  {
    title: '🦄',
    contents: (
      <div>
        If you’re looking to hunt a unicorn, but don’t know where to begin, try
        Lake Superior State University in Sault Ste. Marie, Michigan. Since
        1971, the university has issued permits to unicorn questers.
      </div>
    )
  }
];

const App = () => (
  <div
    style={{
      maxWidth: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 60
    }}
  >
    <div style={{ paddingBottom: '15px' }}>
      <h2>Accordion</h2>
      <Accordion items={items} />
    </div>
    <div style={{ borderTop: '1px solid #ccc', paddingTop: '15px' }}>
      <h2>Tab</h2>
      <Tabs items={items} />
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

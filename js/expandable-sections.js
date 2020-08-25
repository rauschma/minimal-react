import ReactDOM from 'react-dom';
import {html} from 'htm/react';
import {useState} from 'react';

//========== Model

const sections = [
  {
    title: 'Introduction',
    body: 'In this section, we are taking a first look at the ideas are covered by this document.',
  },
  {
    title: 'The details',
    body: 'In this section, we examine the ideas in more details.',
  },
  {
    title: 'Conclusion',
    body: 'In this section, we’ll look at what we have learned and next steps you can take.',
  },
];

function addUiProperties(sections) {
  return sections.map((section) => ({
    ...section,
    expanded: false,
  }));
}

function expandExactlyOneSection(sections, onlyExpandedIndex) {
  return sections.map((section, index) => ({
    ...section,
    expanded: (index === onlyExpandedIndex),
  }));
}

//========== Components

function Sections({sections: initialSections}) {
  const [sections, setSections] = useState(initialSections);
  return sections.map((section, index) => html`
    <${Section} key=${index} sections=${sections} setSections=${setSections} section=${section} sectionIndex=${index} />
  `);
}

function Section({sections, setSections, section, sectionIndex}) {
  return html`
    <div style=${{marginBottom: '1em'}}>
      <h3>
        <a href="" style=${{textDecoration: 'none'}} onClick=${handleClick.bind(undefined, sectionIndex)}>
          ${section.expanded ? '▼ ' : '▶︎ '}
          ${section.title}
        </a>
      </h3>
      ${
        !section.expanded
        ? null
        : html`
          <div>
            ${section.body}
          </div>
        `
      }
    </div>
  `;

  function handleClick(sectionIndex, event) {
    event.preventDefault();
    setSections(expandExactlyOneSection(sections, sectionIndex));
  }
}

//========== Entry point

ReactDOM.render(
  html`<${Sections} sections=${addUiProperties(sections)} />`,
  document.getElementById('root'));

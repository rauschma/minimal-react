import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {html} from 'htm/react';
import produce from 'immer';

//========== Model

const entries = [
  {
    question: 'When was JavaScript created?',
    answers: [
      {text: '1984', correct: false},
      {text: '1995', correct: true},
      {text: '2001', correct: false},
    ],
  },
  {
    question: 'What does “Ecma” mean?',
    answers: [
      {text: 'European Computer Manufacturers Association', correct: false},
      {text: 'Enterprise Content Management Association', correct: false},
      {text: 'Electronic Component Manufacturers Association', correct: false},
      {text: 'It’s a proper name', correct: true},
    ],
  },
  {
    question: 'What does “TC39” mean?',
    answers: [
      {text: 'Ecma Technical Committee 39', correct: true},
      {text: 'Ecma Transactions on Computers 39', correct: false},
      {text: 'Ecma Technical Communications 39', correct: false},
    ],
  },
];

function addUiProperties(entries) {
  return produce(entries, (draftEntries) => {
    for (const entry of draftEntries) {
      entry.open = true;
      for (const answer of entry.answers) {
        answer.checked = false;
      }
    }
  });
}

function areAnswersCorrect(entry) {
  return entry.answers.every((answer) => answer.checked == answer.correct);
}

class RootController {
  constructor(entries, setEntries) {
    this.entries = entries;
    this.setEntries = setEntries;
  }
  setAnswerChecked(entryIndex, answerIndex, checked) {
    const newEntries = produce(this.entries, (draftEntries) => {
      draftEntries[entryIndex].answers[answerIndex].checked = checked;
    });
    this.setEntries(newEntries); // refresh UI
  }
  closeEntry(entryIndex) {
    const newEntries = produce(this.entries, (draftEntries) => {
      draftEntries[entryIndex].open = false;
    });
    this.setEntries(newEntries); // refresh UI
  }
}

//========== Components

function Quiz({entries: initialEntries}) {
  const [entries, setEntries] = useState(initialEntries);
  const root = new RootController(entries, setEntries);
  return html`
    <${React.Fragment}>
      <h1>Quiz</h1>
      <${AllEntries} root=${root} entries=${entries} />
      <hr />
      <${Summary} entries=${entries} />
    <//>
  `;
}

function Summary({entries}) {
  const numberOfClosedEntries = entries.reduce(
    (acc, entry) => acc + (entry.open ? 0 : 1), 0);
  const numberOfCorrectEntries = entries.reduce(
    (acc, entry) => acc + (!entry.open && areAnswersCorrect(entry) ? 1 : 0), 0);
  return html`
    ${numberOfCorrectEntries} of ${numberOfClosedEntries}
    ${numberOfCorrectEntries === 1 ? 'entry is' : 'entries are'} correct.
  `;
}

function AllEntries({root, entries}) {
  return entries.map((entry, index) => {
    const entryKind = entry.open ? OpenEntry : ClosedEntry;
    return html`
      <${entryKind} key=${index} root=${root} entryIndex=${index} entry=${entry} />`
  });
}

//----- OpenEntry

function OpenEntry({root, entryIndex, entry}) {
  return html`
    <div>
      <h2>${entry.question}</h2>
      ${
        entry.answers.map((answer, index) => html`
          <${OpenAnswer} key=${index} root=${root}
            entryIndex=${entryIndex} answerIndex=${index} answer=${answer} />
        `)
      }
      <p><button onClick=${handleClick}>Submit answers</button></p>
    </div>`;

  function handleClick(event) {
    event.preventDefault();
    root.closeEntry(entryIndex);
  }
}

function OpenAnswer({root, entryIndex, answerIndex, answer}) {
  return html`
    <div>
      <label>
        <input type="checkbox" checked=${answer.checked} onChange=${handleChange} />
        ${' ' + answer.text}
      </label>
    </div>
  `;

  function handleChange(_event) {
    // Toggle the checkbox
    root.setAnswerChecked(entryIndex, answerIndex, !answer.checked);
  }
}

//----- ClosedEntry

function ClosedEntry({root, entryIndex, entry}) {
  return html`
    <div>
    <h2>${entry.question}</h2>
    ${
      entry.answers.map((answer, index) => html`
        <${ClosedAnswer} key=${index} root=${root} entryIndex=${entryIndex} answer=${answer} answerIndex=${index} />
      `)
    }
    ${
      areAnswersCorrect(entry)
      ? html`<p><b>Correct!</b></p>`
      : html`<p><b>Wrong!</b></p>`
    }
    </div>`;
}

function ClosedAnswer({root, entryIndex, answerIndex, answer}) {
  const style = answer.correct ? {backgroundColor: 'lightgreen'} : {};
  return html`
    <div>
      <label style=${style}>
        <input type="checkbox" checked=${answer.checked} disabled />
        ${' ' + answer.text}
      </label>
    </div>
  `;
}

//========== Entry point

ReactDOM.render(
  html`<${Quiz} entries=${addUiProperties(entries)} />`,
  document.getElementById('root'));

import u,{useState as l}from"../web_modules/react.js";import d from"../web_modules/react-dom.js";import{html as s}from"../web_modules/htm/react.js";import i from"../web_modules/immer.js";const m=[{question:"When was JavaScript created?",answers:[{text:"1984",correct:!1},{text:"1995",correct:!0},{text:"2001",correct:!1}]},{question:"What does “Ecma” mean?",answers:[{text:"European Computer Manufacturers Association",correct:!1},{text:"Enterprise Content Management Association",correct:!1},{text:"Electronic Component Manufacturers Association",correct:!1},{text:"It’s a proper name",correct:!0}]},{question:"What does “TC39” mean?",answers:[{text:"Ecma Technical Committee 39",correct:!0},{text:"Ecma Transactions on Computers 39",correct:!1},{text:"Ecma Technical Communications 39",correct:!1}]}];function h(t){return i(t,e=>{for(const r of e){r.open=!0;for(const n of r.answers)n.checked=!1}})}function a(t){return t.answers.every(e=>e.checked==e.correct)}class ${constructor(t,e){this.entries=t,this.setEntries=e}setAnswerChecked(t,e,r){const n=i(this.entries,o=>{o[t].answers[e].checked=r});this.setEntries(n)}closeEntry(t){const e=i(this.entries,r=>{r[t].open=!1});this.setEntries(e)}}function f({entries:t}){const[e,r]=l(t),n=new $(e,r);return s`
    <${u.Fragment}>
      <h1>Quiz</h1>
      <${w} root=${n} entries=${e} />
      <hr />
      <${p} entries=${e} />
    <//>
  `}function p({entries:t}){const e=t.reduce((n,o)=>n+(o.open?0:1),0),r=t.reduce((n,o)=>n+(!o.open&&a(o)?1:0),0);return s`
    ${r} of ${e} ${r===1?"entry is":"entries are"} correct.`}function w({root:t,entries:e}){return e.map((r,n)=>{const o=r.open?b:E;return s`
      <${o} key=${n} root=${t} entry=${r} entryIndex=${n} />`})}function b({root:t,entry:e,entryIndex:r}){return s`
    <div>
      <h2>${e.question}</h2>
      ${e.answers.map((o,c)=>s`
          <${C} key=${c} root=${t} entryIndex=${r} answer=${o} answerIndex=${c} />
        `)}
      <p><button onClick=${n}>Submit</button></p>
    </div>`;function n(o){o.preventDefault(),t.closeEntry(r)}}function C({root:t,answer:e,entryIndex:r,answerIndex:n}){return s`
    <div>
      <label>
        <input type="checkbox" checked=${e.checked} onChange=${o} />
        ${" "+e.text}
      </label>
    </div>
  `;function o(c){t.setAnswerChecked(r,n,!e.checked)}}function E({root:t,entry:e,entryIndex:r}){return s`
    <div>
    <h2>${e.question}</h2>
    ${e.answers.map((n,o)=>s`
        <${k} key=${o} root=${t} entryIndex=${r} answer=${n} answerIndex=${o} />
      `)}
    ${a(e)?s`<p><b>Correct!</b></p>`:s`<p><b>Wrong!</b></p>`}
    </div>`}function k({root:t,answer:e,entryIndex:r,answerIndex:n}){const o=e.correct?{backgroundColor:"lightgreen"}:{};return s`
    <div>
      <label style=${o}>
        <input type="checkbox" checked=${e.checked} disabled />
        ${" "+e.text}
      </label>
    </div>
  `}d.render(s`<${f} entries=${h(m)} />`,document.getElementById("root"));

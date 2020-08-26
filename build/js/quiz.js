import u,{useState as l}from"../web_modules/react.js";import d from"../web_modules/react-dom.js";import{html as s}from"../web_modules/htm/react.js";import i from"../web_modules/immer.js";const m=[{question:"When was JavaScript created?",answers:[{text:"1984",correct:!1},{text:"1995",correct:!0},{text:"2001",correct:!1}]},{question:"What does “Ecma” mean?",answers:[{text:"European Computer Manufacturers Association",correct:!1},{text:"Enterprise Content Management Association",correct:!1},{text:"Electronic Component Manufacturers Association",correct:!1},{text:"It’s a proper name",correct:!0}]},{question:"What does “TC39” mean?",answers:[{text:"Ecma Technical Committee 39",correct:!0},{text:"Ecma Transactions on Computers 39",correct:!1},{text:"Ecma Technical Communications 39",correct:!1}]}];function h(t){return i(t,e=>{for(const n of e){n.open=!0;for(const r of n.answers)r.checked=!1}})}function a(t){return t.answers.every(e=>e.checked==e.correct)}class ${constructor(t,e){this.entries=t,this.setEntries=e}setAnswerChecked(t,e,n){const r=i(this.entries,o=>{o[t].answers[e].checked=n});this.setEntries(r)}closeEntry(t){const e=i(this.entries,n=>{n[t].open=!1});this.setEntries(e)}}function p({entries:t}){const[e,n]=l(t),r=new $(e,n);return s`
    <${u.Fragment}>
      <h1>Quiz</h1>
      <${C} root=${r} entries=${e} />
      <hr />
      <${f} entries=${e} />
    <//>
  `}function f({entries:t}){const e=t.reduce((r,o)=>r+(o.open?0:1),0),n=t.reduce((r,o)=>r+(!o.open&&a(o)?1:0),0);return s`
    Correct: ${n} of ${e}
    ${e===1?" entry":" entries"}
  `}function C({root:t,entries:e}){return e.map((n,r)=>{const o=n.open?E:b;return s`
      <${o} key=${r} root=${t} entryIndex=${r} entry=${n} />`})}function E({root:t,entryIndex:e,entry:n}){return s`
    <div>
      <h2>${n.question}</h2>
      ${n.answers.map((o,c)=>s`
          <${w} key=${c} root=${t}
            entryIndex=${e} answerIndex=${c} answer=${o} />
        `)}
      <p><button onClick=${r}>Submit answers</button></p>
    </div>`;function r(o){o.preventDefault(),t.closeEntry(e)}}function w({root:t,entryIndex:e,answerIndex:n,answer:r}){return s`
    <div>
      <label>
        <input type="checkbox" checked=${r.checked} onChange=${o} />
        ${" "+r.text}
      </label>
    </div>
  `;function o(c){t.setAnswerChecked(e,n,!r.checked)}}function b({root:t,entryIndex:e,entry:n}){return s`
    <div>
    <h2>${n.question}</h2>
    ${n.answers.map((r,o)=>s`
        <${k} key=${o} root=${t} entryIndex=${e} answer=${r} answerIndex=${o} />
      `)}
    ${a(n)?s`<p><b>Correct!</b></p>`:s`<p><b>Wrong!</b></p>`}
    </div>`}function k({root:t,entryIndex:e,answerIndex:n,answer:r}){const o=r.correct?{backgroundColor:"lightgreen"}:{};return s`
    <div>
      <label style=${o}>
        <input type="checkbox" checked=${r.checked} disabled />
        ${" "+r.text}
      </label>
    </div>
  `}d.render(s`<${p} entries=${h(m)} />`,document.getElementById("root"));

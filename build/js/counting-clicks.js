import s from"../web_modules/react-dom.js";import{html as r}from"../web_modules/htm/react.js";import{useState as d}from"../web_modules/react.js";const i={numberOfClicks:0};function u({rootModel:l}){const[o,t]=d(l);return r`
    <div>
      <a href="" onClick=${c}>Number of clicks: ${o.numberOfClicks}</a>
      <p />
      <button onClick=${m}>Reset</button>
    </div>
  `;function c(n){n.preventDefault();const e={numberOfClicks:o.numberOfClicks+1};t(e)}function m(n){const e={numberOfClicks:0};t(e)}}s.render(r`<${u} rootModel=${i} />`,document.getElementById("root"));

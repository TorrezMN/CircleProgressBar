// IMPORT TEMPLATES




function getRandomColor() {
  // Creates a random hex color.
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return (color);
}





function create_template(
  _progress_color,
  _text_color, 
  _porcentaje,
  _text,
  _background){
  // Crea el template para la tarjeta.
  let progress_style = `
*{
margin:0;
padding:0;
font-family: 'Roboto', sans-serif;
}


body{
  display:flex;
  justify-content:center;
  align-items:center;
  min-height:100vh;
}


.box{
  position:relative;
  width:300px;
  height:400px;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  background:#fff;
  box-shadow: 0 30px 30px rgba(30,20,50, .2);
  background-color:${_background};
}

.box .percent{
  position:relative;
  width:150px;
  height:150px;
}

.box .percent svg{
  position:relative;
  width:150px;
  height:150px;
}
.box .percent svg circle{
  width:150px;
  height:150px;
  fill:none;
  stroke-width:10;
  stroke: #25F332;
  transform:translate(5px , 5px);
  stroke-linecap:round;


  /* Modificar valores hasta que no se vean en la pantalla. */
  stroke-dasharray:440;
  stroke-dashoffset:440;
}
.box .percent .number{
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  color:${_text_color};
}
.box .percent .number h2{
  font-size:48px;
}
.box .percent .number h2 span{
  font-size:24px;
}
.box .text{
  padding:10px 0 0;
  font-weight:700;
  letter-spacing:1px;
  color:${_text_color};
} 

.box .percent svg circle:nth-child(1){
  stroke-dashoffset:0;
  stroke:#f3f3f3;
}
.box .percent svg circle:nth-child(2){
  stroke-dashoffset:calc(440 - (440 * ${_porcentaje}) / 100);
  /* El porcentaje va aca: */
  /* stroke-dashoffset:calc(440 - (440 * <porcentaje>) / 100); */
  stroke:${_progress_color};
}



  `

  let template_text = `
    <html lang="en">
				  <head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<meta http-equiv="X-UA-Compatible" content="ie=edge">
					<link rel="preconnect" href="https://fonts.googleapis.com">
					<!-- Awesome Fonts -->
						<link
						  href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
						  rel="stylesheet"
						  integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
						  crossorigin="anonymous"
						/>
					<style>
						${progress_style}
					</style>
				  </head>
				  <body>

    <div class="box">
      <div class="percent">
        <svg>
          <circle cx="70" cy="70" r="70"></circle>
          <circle cx="70" cy="70" r="70"></circle>
        </svg>
        <div class="number">
          <h2>${_porcentaje} <span>%</span></h2>
        </div>
      </div>
      <h2 class="text"> ${_text}</h2>
    </div><!-- ENDS box -->




					</div>
				  </body>
				</html>

  ` 
  return(template_text);
};




class CircleProgress extends HTMLElement {
  constructor(props) {
    super();
    this._root = this.attachShadow({ mode: "closed" });
    this.template = document.createElement("template");
    this.extras = props;

  }

  set_template() {
      let prograss_color = this.getAttribute('cp-color');
      let progress_percentage = this.getAttribute('cp-percentaje');
      let progress_skill = this.getAttribute('cp-skill');
      let progress_text_color = this.getAttribute('cp-text-color');
      let progress_background = this.getAttribute('cp-background');

    this.template.innerHTML = create_template(
      prograss_color? prograss_color:getRandomColor(),
      progress_text_color? progress_text_color:getRandomColor(),
      progress_percentage,
      progress_skill,
      progress_background? progress_background:getRandomColor()
    );


    this._root.appendChild(this.template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["update"];
  }

  connectedCallback() {

    this.set_template();

  }
}

// COMPONENTS
customElements.define('cp-card', CircleProgress);

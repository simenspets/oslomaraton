// Dette er Dalai Solutions AS sin eiendom, på leie til Oslo Maraton AS. Bruk utover avtale er ikke tillat.    
let inputPlaceholder = " ";
let widgetDescription = " ";
let widgetStylesheet = "";
let browserUrl = window.location.href;
let browser_url = window.location.href;


 if (browserUrl.includes('/en')) {
widgetDescription = "I'm pretty smart, but I need a couple of seconds to think💡 I'm still learning, so I might make small mistakes.";
inputPlaceholder = "Message...";
widgetStylesheet = "https://kristoman-rikardo.github.io/buttonlabels/en.css";
} else if (browserUrl.includes('/no')) {
widgetDescription = "Jeg er ganske smart, men trenger et par sekunder til å tenke meg om💡 Jeg er fortsatt under opplæring, og kan derfor gjøre små feil.";
inputPlaceholder = "Skriv melding...";
widgetStylesheet = "https://kristoman-rikardo.github.io/buttonlabels/no.css";
} else {
widgetDescription = "Jeg er ganske smart, men trenger et par sekunder til å tenke meg om💡 Jeg er fortsatt under opplæring, og kan derfor gjøre små feil.";
inputPlaceholder = "Skriv melding...";
widgetStylesheet = "https://kristoman-rikardo.github.io/buttonlabels/no.css";
}

// Definer FormExtension
const FormExtension = {
    name: 'Forms',
    type: 'response',
    match: ({ trace }) =>
      trace.type === 'Custom_Form' || trace.payload.name === 'Custom_Form',
    render: ({ trace, element }) => {
      const formContainer = document.createElement('form');
  
      formContainer.innerHTML = `
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
        form {
          font-family: 'Roboto', sans-serif;
          max-width: 85%;
          margin: auto;
          padding: 12px; /* Økt fra 8px */
          background-color: transparent;
          border-radius: 12px; /* Økt fra 8px */
        }
  
        label {
          font-size: 1.05em; /* Økt fra 0.7em */
          color: #333;
          display: block;
          margin: 9px 0 4.5px; /* Økt fra 6px 0 3px */
          font-weight: 500;
        }
  
        input[type="text"], input[type="email"], textarea {
          width: 100%;
          border: 1.5px solid #003677; /* Økt fra 1px */
          background-color: #fff;
          color: #333;
          margin: 9px 0; /* Økt fra 6px 0 */
          padding: 9px; /* Økt fra 6px */
          outline: none;
          font-size: 1.05em; /* Økt fra 0.7em */
          font-family: Arial, sans-serif;
          border-radius: 9px; /* Økt fra 6px */
          box-sizing: border-box;
        }
  
        textarea {
          height: 105px; /* Økt fra 70px */
        }
  
        .invalid {
          border-color: red;
        }
  
        .submit {
          background-color: #003677;
          border: none;
          color: white;
          padding: 12px; /* Økt fra 8px */
          border-radius: 9px; /* Økt fra 6px */
          margin-top: 18px; /* Økt fra 12px */
          width: 100%;
          cursor: pointer;
          font-size: 1.05em; /* Økt fra 0.7em */
          font-weight: 500;
        }
        </style>
  
        <label for="email">Mail</label>
        <input type="email" class="email" name="email" required
               pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
               title="Ugyldig e-post"><br>
  
        <label for="topic">Emne</label>
        <input type="text" class="topic" name="topic" required><br>
  
        <label for="userQuestion">Melding</label>
        <textarea class="userQuestion" name="userQuestion" required></textarea><br>
  
        <input type="submit" class="submit" value="Send">
      `;
  
      // Prefill the form fields with the variables from trace.payload
      const emailInput = formContainer.querySelector('.email');
      const topicInput = formContainer.querySelector('.topic');
      const userQuestionInput = formContainer.querySelector('.userQuestion');
  
      emailInput.value = trace.payload.email || '';
      topicInput.value = trace.payload.topic || '';
      userQuestionInput.value = trace.payload.userQuestion || '';
  
      formContainer.addEventListener('input', function () {
        // Remove 'invalid' class when input becomes valid
        if (emailInput.checkValidity()) emailInput.classList.remove('invalid');
        if (topicInput.checkValidity()) topicInput.classList.remove('invalid');
        if (userQuestionInput.checkValidity()) userQuestionInput.classList.remove('invalid');
      });
  
      formContainer.addEventListener('submit', function (event) {
        event.preventDefault();
  
        if (
          !emailInput.checkValidity() ||
          !topicInput.checkValidity() ||
          !userQuestionInput.checkValidity()
        ) {
          if (!emailInput.checkValidity()) emailInput.classList.add('invalid');
          if (!topicInput.checkValidity()) topicInput.classList.add('invalid');
          if (!userQuestionInput.checkValidity()) userQuestionInput.classList.add('invalid');
          return;
        }
  
        formContainer.querySelector('.submit').remove();
  
        window.voiceflow.chat.interact({
          type: 'complete',
          payload: {
            email: emailInput.value,
            topic: topicInput.value,
            userQuestion: userQuestionInput.value,
          },
        });
      });
  
      element.appendChild(formContainer);
    },
  };


// Last inn Chat-widget
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: '6788e4498be20586cd1419e8' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          assistant: {
             stylesheet: widgetStylesheet,
             extensions: [FormExtension],
             banner: {
               description: widgetDescription,
                     },
             inputPlaceholder: inputPlaceholder
                   },
         launch: {
            event: { type: "launch", payload: { browser_url: window.location.href } }
      }
        });
      };
      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; 
      v.type = "text/javascript"; 
      s.parentNode.insertBefore(v, s);
  })(document, 'script');

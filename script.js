'use strict'
const arrResolved = ['200 OK', '201 Created', '204 No Content'];
const arrRejected = ['301 Moved Permanently', '302 Found', '400 Bad Request', '401 Unauthorized', '403 Forbidden', '404 Not Found', '500 Internal Server Error', '503 Service Unavailable'];
const arrButtons = [
    {
        type : 'button',
        id : 'btn__start',
        textContent : 'Start',
        display : 'inline',
    },
    {
        type : 'button',
        id : 'btn__request',
        textContent : 'Send Request',
        display : 'none',
    },
    {
        type : 'button',
        id : 'btn__object__response',
        textContent : 'Object Response',
        display : 'none',
    },
    {
        type : 'button',
        id : 'btn__get__response',
        textContent : 'Get Response',
        display : 'none',
    },
    {
        type : 'button',
        id : 'btn__parse',
        textContent : 'Parse Response',
        display : 'none',
    },
    {
        type : 'button',
        id : 'btn__resolved',
        textContent : 'Resolved',
        display : 'none',
    },
    {
        type : 'button',
        id : 'btn__rejected',
        textContent : 'Rejected',
        display : 'none',
    },
    {
        type : 'button',
        id : 'btn__new__request',
        textContent : 'New Request',
        display : 'none',
    },
];




// Creation Buttons
    function createButton(buttonInfo) {
        const button = document.createElement(buttonInfo.type);
            button.id = buttonInfo.id;
            button.textContent = buttonInfo.textContent;
            button.style.display = buttonInfo.display;
            document.querySelector('header').appendChild(button);
        return button;
    }

    arrButtons.forEach(buttonInfo => {
        createButton(buttonInfo);
    });




// Text State
    document.getElementById('text__0').style.display = 'block';
    document.getElementById('text__1').style.display = 'none';
    document.getElementById('text__2').style.display = 'none';
    document.getElementById('text__3').style.display = 'none';
    document.getElementById('text__4').style.display = 'none';
    document.getElementById('text__5').style.display = 'none';
    document.getElementById('text__6').style.display = 'none';
    document.getElementById('text__7').style.display = 'none';




// Button Start
document.getElementById('btn__start').addEventListener('click', function() {

    // Creation Client
    const client = document.createElement('div');
        client.id = 'client';
        client.classList.add('fade__in');
        document.getElementById('div__client').appendChild(client);

    const textClient = document.createElement('div');
        textClient.textContent = 'Client';
        textClient.classList.add('text__client');
        client.appendChild(textClient);

    // Creation Server
    const server = document.createElement('div');
        server.id = 'server';
        server.classList.add('fade__in');
        server.textContent = 'Server';
        document.getElementById('div__server').appendChild(server);

    // Buttons State
    document.getElementById('btn__start').disabled = true;
    document.getElementById('btn__request').style.display = 'inline';

    // Text State
    document.getElementById('text__0').style.display = 'none';
    document.getElementById('text__1').style.display = 'block';
});




// Button Send Request
document.getElementById('btn__request').addEventListener('click', function() {

    // Creation Request Line and Arrow
    const lineRequest = document.createElement('div');
        lineRequest.classList.add('line__request');
        document.querySelector('main').appendChild(lineRequest);

    const arrowRequest = document.createElement('div');
        arrowRequest.classList.add('arrow__request');
        document.querySelector('main').appendChild(arrowRequest);

    // Getting Sizes of Client and Server
    const boxClient = document.getElementById('client').getBoundingClientRect();
    const boxServer = document.getElementById('server').getBoundingClientRect();

    // Getting Centers of Client and Server
    const clientCenterX = Math.round(boxClient.left + boxClient.width / 2);
    const centerY = Math.round(boxClient.top + boxClient.height / 2);
    const serverCenterX = Math.round(boxServer.left + boxServer.width / 2);

    // Starting Point
    lineRequest.style.left = clientCenterX + 'px';
    lineRequest.style.top = centerY + 'px';

    arrowRequest.style.left = clientCenterX + 'px';
    arrowRequest.style.top =  (centerY - 3) + 'px';

    let lineRequestLength = 0;
    let posLineRequest = 0;
    const speed = 2;

    // Moving Request Arrow
    function animateLineRequest() {
        
        let posArrowRequest = clientCenterX + posLineRequest;
        arrowRequest.style.left = posArrowRequest + 'px';

        if (lineRequestLength < 96) {
            lineRequestLength += speed;
            posLineRequest += speed;
            lineRequest.style.width = lineRequestLength + 'px';
            requestAnimationFrame(animateLineRequest);

        } else if (posArrowRequest < serverCenterX && lineRequestLength === 96) {
            lineRequest.style.left = parseFloat(lineRequest.style.left) + speed + 'px';
            lineRequest.style.width = 96 + 'px';
            posLineRequest += speed;
            requestAnimationFrame(animateLineRequest);
        } else if (posArrowRequest >= serverCenterX) {
            cancelAnimationFrame(animateLineRequest);
            document.getElementById('btn__object__response').style.display = 'inline';
            document.getElementById('btn__object__response').disabled = false;

            function decreaseLineRequest() {
                if (lineRequestLength > 0) {
                    lineRequestLength -= speed;
                    lineRequest.style.width = lineRequestLength + 'px';
                    lineRequest.style.left = parseFloat(lineRequest.style.left) + speed + 'px';
                    requestAnimationFrame(decreaseLineRequest);
                    arrowRequest.remove();
                } else {
                    cancelAnimationFrame(decreaseLineRequest);
                }
            }
        requestAnimationFrame(decreaseLineRequest);
        }
    }

    animateLineRequest();

    // Creating Element Promise
    const createPromise = document.createElement('div');
        createPromise.id = 'obj__promise';
        createPromise.classList.add('pending');
        createPromise.textContent = 'Pending...';
        document.getElementById('div__promise').appendChild(createPromise);
    
    // Buttons State
    document.getElementById('btn__start').disabled = true;
    document.getElementById('btn__request').disabled = true;

    // Text State
    document.getElementById('text__1').style.display = 'none';
    document.getElementById('text__2').style.display = 'block';
});




// Button Object Response
document.getElementById('btn__object__response').addEventListener('click', function() {

    // Server Is Processing
    document.getElementById('server').classList.add('server__flicker');
    document.getElementById('btn__object__response').disabled = true;

    const divMessageServer = document.createElement('div');
        divMessageServer.id = 'div__message';
        divMessageServer.classList.add('div__message');
        document.getElementById('div__server').appendChild(divMessageServer);

    const textProcessing = document.createElement('div');
        textProcessing.textContent = 'processing...';
        textProcessing.id = 'text__processing';
        textProcessing.classList.add('flicker__text');
        divMessageServer.appendChild(textProcessing);

    // Creating Element Response
    function createResponse() {
        const objResponse = document.createElement('div');
            objResponse.id = 'obj__response';
            objResponse.classList.add('fade__in');
            document.getElementById('div__response').appendChild(objResponse);
            document.getElementById('btn__get__response').style.display = 'inline';
            document.getElementById('btn__get__response').disabled = false
            objResponse.textContent = 'Data';
        }

    setTimeout(createResponse, 2500);

    // Text State
    document.getElementById('text__2').style.display = 'none';
    document.getElementById('text__3').style.display = 'block';
});




// Button Get Response
document.getElementById('btn__get__response').addEventListener('click', function() {

    // Fading Element Response
    document.getElementById('obj__response').classList.remove('fade__in');
    document.getElementById('obj__response').classList.add('fade__out');

    // Creating Response Line and Arrow
    const lineResponse = document.createElement('div');
        lineResponse.classList.add('line__response');
        document.querySelector('main').appendChild(lineResponse);

    const arrowResponse = document.createElement('div');
        arrowResponse.classList.add('arrow__response');
        document.querySelector('main').appendChild(arrowResponse);

    // Getting Sized of Client and Server
    const boxClient = document.getElementById('client').getBoundingClientRect();
    const boxServer = document.getElementById('server').getBoundingClientRect();

    // Getting Centers of Client and Server
    const clientCenterX = Math.round(boxClient.left + boxClient.width / 2);
    const centerY = Math.round(boxClient.top + boxClient.height / 2);
    const serverCenterX = Math.round(boxServer.left + boxServer.width / 2);

    // Starting Point
    lineResponse.style.top = centerY + 'px';
    arrowResponse.style.top =  (centerY - 3) + 'px';

    let lineResponseLength = 0;
    const speed = 2;
    let position = serverCenterX;

    // Moving Response Arrow
    function animateLineResponse() {

        if (position > clientCenterX && lineResponseLength < 96) {
            lineResponseLength += speed;
            position -= speed;
            lineResponse.style.left = position + 'px';
            arrowResponse.style.left = position + 'px';
            lineResponse.style.width = lineResponseLength + 'px';
            requestAnimationFrame(animateLineResponse);

        } else if (position > clientCenterX && lineResponseLength === 96) {
            lineResponse.style.left = position + 'px';
            arrowResponse.style.left = position + 'px';
            lineResponse.style.width = 96 + 'px';
            position -= speed;
            requestAnimationFrame(animateLineResponse);

        } else if (position <= clientCenterX) {
            cancelAnimationFrame(animateLineResponse);
            document.getElementById('btn__parse').style.display = 'inline';
            document.getElementById('btn__parse').disabled = false;
            
            function decreaseLineResponse() {
        
                if (lineResponseLength > 0) {
                    lineResponseLength -= speed;
                    lineResponse.style.width = lineResponseLength + 'px';
                    requestAnimationFrame(decreaseLineResponse);
                } else {
                    cancelAnimationFrame(decreaseLineResponse);
                    lineResponse.remove();
                }
            }
            requestAnimationFrame(decreaseLineResponse);
            arrowResponse.remove();
        }
    }

    animateLineResponse();

    // Buttons State
    document.getElementById('btn__start').disabled = true;
    document.getElementById('btn__request').disabled = true;
    document.getElementById('btn__get__response').disabled = true;

    // Text State
    document.getElementById('text__3').style.display = 'none';
    document.getElementById('text__4').style.display = 'block';
});




// Button Parse Response
document.getElementById('btn__parse').addEventListener('click', function() {

    // Client Is Parsing
    document.getElementById('client').classList.add('client__flicker');

    const divMessageClient = document.createElement('div');
        divMessageClient.id = 'div__message';
        divMessageClient.classList.add('div__message');
        document.getElementById('div__client').appendChild(divMessageClient);

    const textParsing = document.createElement('div');
        textParsing.textContent = 'parsing...';
        textParsing.id = 'text__parsing';
        textParsing.classList.add('flicker__text');
        divMessageClient.appendChild(textParsing);

    // Buttons State
    document.getElementById('btn__start').disabled = true;
    document.getElementById('btn__request').disabled = true;
    document.getElementById('btn__get__response').disabled = true;
    document.getElementById('btn__parse').disabled = true;

    // Text State
    document.getElementById('text__4').style.display = 'none';
    document.getElementById('text__5').style.display = 'block';

    setTimeout(() => {
        document.getElementById('btn__resolved').style.display = 'inline';
        document.getElementById('btn__rejected').style.display = 'inline';
        document.getElementById('btn__resolved').disabled = false;
        document.getElementById('btn__rejected').disabled = false;
    }, 3000);
});




// Button Resolved
document.getElementById('btn__resolved').addEventListener('click', function() {

    // Random Successful Code
    const HTTPStatusCode = arrResolved[Math.floor(Math.random() * arrResolved.length)];
    document.getElementById('div__message').textContent = 'HTTP Status Code: ' + HTTPStatusCode;

    const secondMessageClient = document.createElement('div');
        document.getElementById('div__message').classList.add('fade__in');
        secondMessageClient.textContent = 'response.ok === true';
        secondMessageClient.classList.add('fade__in');
        document.getElementById('div__message').appendChild(secondMessageClient);

    const responseTrue = document.createElement('div');
        responseTrue.textContent = 'True';
        responseTrue.classList.add('fade__in');
        document.getElementById('obj__response').appendChild(responseTrue);
        document.getElementById('obj__promise').classList.remove('pending');

    function promiseResolved() {
        document.getElementById('obj__promise').classList.add('resolved');
        document.getElementById('obj__promise').textContent = 'Resolved';
        document.getElementById('btn__new__request').style.display = 'inline';
        document.getElementById('btn__new__request').disabled = false;
    }

    setTimeout(promiseResolved, 1000);

    // Buttons State
    document.getElementById('btn__start').disabled = true;
    document.getElementById('btn__request').disabled = true;
    document.getElementById('btn__get__response').disabled = true;
    document.getElementById('btn__parse').disabled = true;
    document.getElementById('btn__resolved').disabled = true;
    document.getElementById('btn__rejected').disabled = true;

    // Text State
    document.getElementById('text__5').style.display = 'none';
    document.getElementById('text__6').style.display = 'block';
});




// Button Rejected
document.getElementById('btn__rejected').addEventListener('click', function() {

    // Random Rejected Code
    const HTTPStatusCode = arrRejected[Math.floor(Math.random() * arrRejected.length)];
        document.getElementById('div__message').textContent = 'HTTP Status Code: ' + HTTPStatusCode;
        document.getElementById('div__message').classList.add('fade__in');

    const secondMessageClient = document.createElement('div');
        secondMessageClient.textContent = 'response.ok === false';
        secondMessageClient.classList.add('fade__in');
        document.getElementById('div__message').appendChild(secondMessageClient);

    const responseFalse = document.createElement('div');
        responseFalse.textContent = 'False';
        responseFalse.classList.add('fade__in');
        document.getElementById('obj__response').appendChild(responseFalse);
        document.getElementById('obj__promise').classList.remove('pending');

    function promiseRejected() {
        document.getElementById('obj__promise').classList.add('rejected');
        document.getElementById('obj__promise').textContent = 'Rejected';
        document.getElementById('btn__new__request').style.display = 'inline';
        document.getElementById('btn__new__request').disabled = false;
    }

    setTimeout(promiseRejected, 1000);

    // Buttons State
    document.getElementById('btn__start').disabled = true;
    document.getElementById('btn__request').disabled = true;
    document.getElementById('btn__get__response').disabled = true;
    document.getElementById('btn__parse').disabled = true;
    document.getElementById('btn__resolved').disabled = true;
    document.getElementById('btn__rejected').disabled = true;
    document.getElementById('btn__new__request').style.display = 'inline';

    // Text State
    document.getElementById('text__5').style.display = 'none';
    document.getElementById('text__7').style.display = 'block';
});




// Button New Request
document.getElementById('btn__new__request').addEventListener('click', function() {
    document.getElementById('obj__promise').remove();
    document.getElementById('obj__response').remove();
    document.getElementById('div__message').remove();
    document.getElementById('text__processing').remove();

    document.getElementById('btn__request').disabled = false;
    document.getElementById('btn__new__request').disabled = true;

    document.getElementById('text__2').style.display = 'none';
    document.getElementById('text__3').style.display = 'none';
    document.getElementById('text__4').style.display = 'none';
    document.getElementById('text__5').style.display = 'none';
    document.getElementById('text__6').style.display = 'none';
    document.getElementById('text__7').style.display = 'none';
});
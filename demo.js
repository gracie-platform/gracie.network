const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Calculate the center coordinates
const x = canvas.width / 2;
const y = canvas.height / 2;
const heightThird = canvas.height - (canvas.height / 3.2);




function showText(firstText, secondText) {
    // Set the font properties
    ctx.font = 'bold 25px MagicalNight';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
  
    // Draw the text on the canvas
    ctx.fillText(firstText, x, (y + (y / 2)) - 100);
  
    // Set the font properties
    ctx.font = '25px Lexend';
    ctx.fillStyle = 'rgb(235, 232, 232)';
  
    ctx.fillText(secondText, x, (y + (y / 2)) - 70);
  
}
  
function fadeAwayText(firstText, secondText) {
    // Define the fade duration in milliseconds
    const fadeDuration = 400;
  
    // Calculate the opacity change per frame
    const opacityChange = 1 / (fadeDuration / 16.67); // Assuming 60 FPS (1000ms / 60 = 16.67ms)
  
    // Set the initial opacity
    let opacity = 1;
  
    // Create an interval to update the opacity
    const intervalId = setInterval(() => {
        // Reduce the opacity by the change amount
        opacity -= opacityChange;

        // Set the current opacity
        ctx.globalAlpha = opacity;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.globalAlpha = 1; // Reset the opacity for the emoji

        // Draw the emoji sprite or image here
        drawFrame(frameIndex, recentSelectedSheet);

        // Draw the text on the canvas with the current opacity
        ctx.font = 'bold 25px MagicalNight';
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(firstText, x, (y + (y / 2)) - 100);

        ctx.font = '20px Lexend';
        ctx.fillStyle = `rgba(235, 232, 232, ${opacity})`;
        ctx.fillText(secondText, x, (y + (y / 2)) - 70);

        // Check if the opacity has reached 0 (fully faded away)
        if (opacity <= 0) {
            // Stop the interval
            clearInterval(intervalId);
        }
    }, 16.67); // Update every frame (60 FPS)
}
  
  
  









  
  


// Work for sprite sheet start from here
////////////////////////////////////////
////////////////////////////////////////

// Variables for state positions
const neutralStatePostions = canvas.height - y / 2;


const leftPadding = 105;
const rightPadding = 109;
const topPadding = 138;
const bottomPadding = 143;
const frameIntervals = 3;
const distanceFromLeft = x - 45;
const distanceFromRight = x - 45;

// frame on x-axis 92
// frame on y-axis 87

// Left Diagonal line start and end points
const leftStartX = 0;
const leftStartY = canvas.height / 2;
const leftEndX = canvas.width;
const leftEndY = canvas.height;

// Left Diagonal line start and end points
const rightStartX = canvas.width;
const rightStartY = canvas.height / 2;
const rightEndX = 0;
const rightEndY = canvas.height;

const directionAndIndex = [
    { direction: 'neutral', index: 8 },  // 0 Neutral png
    { direction: 'happy', index: 11 }, // 1 Happy png
    { direction: 'sad', index: 13 }, // 2 Sad png
    { direction: 'scared', index: 15 }, // 3 Scared png
]

// frame dimensions
const frameWidth = 300; // Width of each frame
const frameHeight = 373; // Height of each frame
const emoji = [
    { x: 0, y: 0, index: 0 }, // Frame 1
    { x: frameWidth * 1, y: 0, index: 1 }, // Frame 2
    { x: frameWidth * 2, y: 0, index: 2 }, // Frame 3
    { x: frameWidth * 3, y: 0, index: 3 }, // Frame 4
    { x: frameWidth * 4, y: 0, index: 4 }, // Frame 5
    { x: 0, y: frameHeight, index: 5 }, // Frame 6
    { x: frameWidth * 1, y: frameHeight, index: 6 }, // Frame 7
    { x: frameWidth * 2, y: frameHeight, index: 7 }, // Frame 8
    { x: frameWidth * 3, y: frameHeight, index: 8 }, // Frame 9
    { x: frameWidth * 4, y: frameHeight, index: 9 }, // Frame 10
    { x: 0, y: frameHeight * 2, index: 10 }, // Frame 11
    { x: frameWidth * 1, y: frameHeight * 2, index: 11 }, // Frame 12
    { x: frameWidth * 2, y: frameHeight * 2, index: 12 }, // Frame 13
    { x: frameWidth * 3, y: frameHeight * 2, index: 13 }, // Frame 14
    { x: frameWidth * 4, y: frameHeight * 2, index: 14 }, // Frame 15
];

let emojiPositionX = (x) - 45;
let emojiPositionY = (y + (y / 2)) - 45;
let frameIndex = 0;
let selectedFrame = null;
let isDragging = false;
let prevTouchX = 0;
let prevTouchY = 0;
let gameStart = false;
let previousSelectedSheet = null;
let recentSelectedSheet = null;
let previousFromLeftDigonal = 'right';
let previousFromRightDigonal = 'left';
let directionIndex = 0;
let animationInterval = null;
let draggingStart = false;
let fromLeftDiagonal = null;
let fromRightDiagonal = null;
let changingDirection = false;
let intervalComplete = false;
let startSnapBack = false;
let textShown = true;
let setNeutral = false;
let distanceFromEdge = x;
let sheetChanged = null;
let modalDisplay = false;

let backgroundShow = true;

// Load sptite sheet with happy emojis
const happySheet = new Image();
happySheet.src = 'assets/Sprites/Happy.png';

// Load sptite sheet with sad emojis
const sadSheet = new Image();
sadSheet.src = 'assets/Sprites/Sad.png';

// Load sptite sheet with neutral emojis
const neutralSheet = new Image();
neutralSheet.src = 'assets/Sprites/Neutral.png';

// Load sptite sheet with scared emojis
const scaredSheet = new Image();
scaredSheet.src = 'assets/Sprites/Scared.png';


const shadow = new Image();
shadow.src = 'assets/shadow.png';

recentSelectedSheet = neutralSheet;
directionIndex = 0;

neutralSheet.onload = function () {

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
    showText('TO INTERACT', 'Swipe or Drag the Emoji');

}
// Function to draw the frames on the canvas
function drawFrame(index, spriteSheet) {
    if(!textShown){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    const frameX = emoji[index].x;
    const frameY = emoji[index].y;
    if (startSnapBack) {
        const spring = 18;
        const toleranceDistance = 18;
        const targetX = emojiPositionX; // Start position X
        const targetY = emojiPositionY; // Start position Y
        
        const dx = targetX - selectedFrame.x;
        const dy = targetY - selectedFrame.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if(distance > toleranceDistance){
            const vx = (dx / distance) * spring; // Velocity in X direction
            const vy = (dy / distance) * spring; // Velocity in Y direction
            selectedFrame.x += vx;
            selectedFrame.y += vy;
        }
        else{
            startSnapBack = false;
            selectedFrame.x = emojiPositionX;
            selectedFrame.y = emojiPositionY;
            backgroundShow = true;
            selectedFrame = null;
            timeInterval = 350;
            stopAnimationLoop();
            startAnimationLoop(neutralSheet, 0);
        }
        

    }

    if(backgroundShow){
        ctx.drawImage(shadow, x - 161, emojiPositionY - 195, 320, 450);
    }
    if (index === 0) {
        if (!gameStart) {
            emoji[0].x = emojiPositionX;
            emoji[0].y = emojiPositionY;
            gameStart = true
            if (isDragging) {
                gameStart = true;
            }
        }
        else {
            emoji[0].x = frameX;
            emoji[0].y = frameY;
        }
    }

    ctx.drawImage(spriteSheet, frameX + leftPadding, frameY + topPadding, frameWidth - (leftPadding + rightPadding), frameHeight - (topPadding + bottomPadding), emoji[0].x, emoji[0].y, frameWidth - (leftPadding + rightPadding), frameHeight - (topPadding + bottomPadding));
}

function setFrameIndexForSad(gap) {
    let reached = false;
    const position = selectedFrame.x;
    const frameZero = distanceFromLeft;
    const frameOne = distanceFromLeft - gap;
    const frameTwo = distanceFromLeft - (2 * gap);
    const frameThree = distanceFromLeft - (3 * gap);
    const frameFour = distanceFromLeft - (4 * gap);
    const frameFive = distanceFromLeft - (5 * gap);
    const frameSix = distanceFromLeft - (6 * gap);
    const frameSeven = distanceFromLeft - (7 * gap);
    const frameEight = distanceFromLeft - (8 * gap);
    const frameNine = distanceFromLeft - (9 * gap);
    const frameTen = distanceFromLeft - (10 * gap);
    const frameEleven = distanceFromLeft - (11 * gap);
    const frameTwelve = distanceFromLeft - (12 * gap);
    const frameThirteen = distanceFromLeft - (13 * gap);
    if (position <= frameZero && position >= frameOne) { // Frame Zero
        frameIndex = 1;
    }
    else if (position <= frameOne && position >= frameTwo) { // Frame One
        frameIndex = 1;
    }
    else if (position <= frameTwo && position >= frameThree) { // Frame Two
        frameIndex = 2;
    }
    else if (position <= frameThree && position >= frameFour) { // Frame Three
        frameIndex = 3;
    }
    else if (position <= frameFour && position >= frameFive) { // Frame Four
        frameIndex = 4;
    }
    else if (position <= frameFive && position >= frameSix) { // Frame Five
        frameIndex = 5;
    }
    else if (position <= frameSix && position >= frameSeven) { // Frame Six
        frameIndex = 6;
    }
    else if (position <= frameSeven && position >= frameEight) { // Frame Seven
        frameIndex = 7;
    }
    else if (position <= frameEight && position >= frameNine) { // Frame Eight
        frameIndex = 8;
    }
    else if (position <= frameNine && position >= frameTen) { // Frame Nine
        frameIndex = 9;
    }
    else if (position <= frameTen && position >= frameEleven) { // Frame Ten
        frameIndex = 10;
    }
    else if (position <= frameEleven && position >= frameTwelve) { // Frame Eleven
        frameIndex = 11;
    }
    else if (position <= frameTwelve && position >= frameThirteen) { // Frame Twelve
        frameIndex = 12;
    }
    else if (position <= frameThirteen && position > 0) {  // Frame Thirteen
        frameIndex = 13;
    }
    else {
        reached = true;
    }
    drawFrame(frameIndex, recentSelectedSheet);
    if (reached) {
        showModal();
    }
}

function setFrameIndexForHappy(gap) {
    let reached = false;
    const position = selectedFrame.x;
    const frameZero = distanceFromRight;
    const frameOne = distanceFromRight + gap;
    const frameTwo = distanceFromRight + (2 * gap);
    const frameThree = distanceFromRight + (3 * gap);
    const frameFour = distanceFromRight + (4 * gap);
    const frameFive = distanceFromRight + (5 * gap);
    const frameSix = distanceFromRight + (6 * gap);
    const frameSeven = distanceFromRight + (7 * gap);
    const frameEight = distanceFromRight + (8 * gap);
    const frameNine = distanceFromRight + (9 * gap);
    const frameTen = distanceFromRight + (10 * gap);
    const frameEleven = distanceFromRight + (11 * gap);
    if (position >= frameZero && position <= frameOne) { // Frame Zero
        frameIndex = 1;
    }
    else if (position >= frameOne && position <= frameTwo) { // Frame One
        frameIndex = 1;
    }
    else if (position >= frameTwo && position <= frameThree) { // Frame Two
        frameIndex = 2;
    }
    else if (position >= frameThree && position <= frameFour) { // Frame Three
        frameIndex = 3;
    }
    else if (position >= frameFour && position <= frameFive) { // Frame Four
        frameIndex = 4;
    }
    else if (position >= frameFive && position <= frameSix) { // Frame Five
        frameIndex = 5;
    }
    else if (position >= frameSix && position <= frameSeven) { // Frame Six
        frameIndex = 6;
    }
    else if (position >= frameSeven && position <= frameEight) { // Frame Seven
        frameIndex = 7;
    }
    else if (position >= frameEight && position <= frameNine) { // Frame Eight
        frameIndex = 8;
    }
    else if (position >= frameNine && position <= frameTen) { // Frame Nine
        frameIndex = 9;
    }
    else if (position >= frameTen && position <= frameEleven) { // Frame Ten
        frameIndex = 10;
    }
    else if (position >= frameEleven && position + 90 < canvas.width) { // Frame Eleven
        frameIndex = 11;
    }
    else {
        reached = true;
    }
    drawFrame(frameIndex, recentSelectedSheet);
    if (reached) {
        showModal();
    }

}

function setFrameStats() {

    if (previousFromLeftDigonal != fromLeftDiagonal || previousFromRightDigonal != fromRightDiagonal) {
        changingDirection = true;
    }
    else {
        changingDirection = false;
    }
    if (selectedFrame.y > neutralStatePostions) {// for neutral state
        recentSelectedSheet = neutralSheet;
        directionIndex = 0;
        if (animationInterval === null) {
            startAnimationLoop(recentSelectedSheet, directionIndex)
        }
    }
    else { // for sad, happy, sacred
        const positionToLeftDiagonal = calculateFramePositon(leftStartX, leftStartY, leftEndX, leftEndY, selectedFrame.x + 45, selectedFrame.y + 43);
        const positionToRightDiagonal = (calculateFramePositon(rightStartX, rightStartY, rightEndX, rightEndY, selectedFrame.x + 45, selectedFrame.y + 43) * -1);
        if (positionToLeftDiagonal > 0) {
            fromLeftDiagonal = 'left';
        }
        else {
            fromLeftDiagonal = 'right';
        }

        if (positionToRightDiagonal > 0) {
            fromRightDiagonal = 'left';
        }
        else {
            fromRightDiagonal = 'right';
        }

        if (selectedFrame.x + 45 < x && fromLeftDiagonal === 'left') { // For Sad
            recentSelectedSheet = sadSheet;
            directionIndex = 2;
            stopAnimationLoop();
            let distanceGap = distanceFromLeft / 14;
            setFrameIndexForSad(distanceGap);

        }
        else if (selectedFrame.x + 45 >= x && fromRightDiagonal === 'right') { // For Happy
            recentSelectedSheet = happySheet;
            directionIndex = 1;
            stopAnimationLoop();
            let distanceGap = distanceFromRight / 12;
            setFrameIndexForHappy(distanceGap);
        }
        else { // For Scared
            recentSelectedSheet = scaredSheet;
            directionIndex = 3;
            if (animationInterval === null) {
                startAnimationLoop(recentSelectedSheet, directionIndex)
            }


        }
    }
    if (changingDirection) {
        frameIndex = 1;
        intervalComplete = false;
    }
    previousFromLeftDigonal = fromLeftDiagonal;
    previousFromRightDigonal = fromRightDiagonal;
    previousSelectedSheet = recentSelectedSheet;
}

// Function to handle touchstart event
function handleTouchStart(event) {
    draggingStart = true;
    const touch = event.touches[0];
    const touchX = touch.clientX - canvas.offsetLeft; // Adjust for canvas position
    const touchY = touch.clientY - canvas.offsetTop; // Adjust for canvas position

    selectedFrame = findSelectedFrame(touchX, touchY);

    if (selectedFrame) {
        isDragging = true;
        prevTouchX = touchX;
        prevTouchY = touchY;

    }

}

// Function to handle touchmove event
function handleTouchMove(event) {
    event.preventDefault(); // Prevent default touchmove behavior
    if (isDragging && selectedFrame) {
        if(textShown){
            fadeAwayText('TO INTERACT', 'Swipe or Drag the Emoji');
        }

        textShown = false;
        backgroundShow = false;
        const touch = event.touches[0];
        const touchX = touch.clientX - canvas.offsetLeft; // Adjust for canvas position
        const touchY = touch.clientY - canvas.offsetTop; // Adjust for canvas position

        selectedFrame.x = Math.max(0, Math.min(selectedFrame.x, canvas.width - (frameWidth - (leftPadding + rightPadding))));
        selectedFrame.y = Math.max(0, Math.min(selectedFrame.y, canvas.height - (frameHeight - (topPadding + bottomPadding))));
        const deltaX = touchX - prevTouchX;
        const deltaY = touchY - prevTouchY;

        selectedFrame.x += deltaX;
        selectedFrame.y += deltaY;

        prevTouchX = touchX;
        prevTouchY = touchY;
        setFrameStats();

    } // Main If
}

// Function to handle touchend event
function handleTouchEnd(event) {

    frameIndex = 1;
    prevTouchX = 0;
    prevTouchY = 0;
    gameStart = false;
    recentSelectedSheet = neutralSheet;
    directionIndex = 0;
    draggingStart = false;
    fromLeftDiagonal = null;
    fromRightDiagonal = null;
    changingDirection = false;
    startSnapBack = true;
    setNeutral = false;
    if(!modalDisplay){
        timeInterval = 50;
        stopAnimationLoop();
        startAnimationLoop(neutralSheet, 0);
    }
    isDragging = false;
}

// Function to find the selected frame based on touch coordinates
function findSelectedFrame(touchX, touchY) {

    for (let i = 0; i < emoji.length; i++) {
        const frame = emoji[i];
        if (
            touchX >= frame.x && touchX <= frame.x + frameWidth &&
            touchY >= frame.y && touchY <= frame.y + frameHeight
        ) {
            return frame;
        }
    }
    return null;
}

function calculateFramePositon(startX, startY, endX, endY, frameX, frameY) {
    // Calculate the equation of the diagonal line
    const slope = (endY - startY) / (endX - startX);

    const yIntercept = startY - slope * startX;

    // Evaluate the frame's position in relation to the diagonal line
    const framePosition = frameY - (slope * frameX + yIntercept);
    return framePosition;
}

// Work for sprite sheet ends from here
///////////////////////////////////////
///////////////////////////////////////



// Animate Sprite Sheet start When not Dragging
///////////////////////////////////////////////
///////////////////////////////////////////////

let timeInterval = 350;
function startAnimationLoop(sheet, noFramesIndex) {
    recentSelectedSheet = sheet;
    directionIndex = noFramesIndex;
    animationInterval = setInterval(animateFrame, timeInterval);
}

function animateFrame() {
    if (recentSelectedSheet != sheetChanged) {
        if (recentSelectedSheet === neutralSheet && startSnapBack === false) {
            stopAnimationLoop();
            timeInterval = 350;
            animationInterval = setInterval(animateFrame, timeInterval)
        }
        else {
            stopAnimationLoop();
            timeInterval = 50;
            animationInterval = setInterval(animateFrame, timeInterval)
        }
    }
    sheetChanged = recentSelectedSheet;
    drawFrame(frameIndex, recentSelectedSheet);
    updateFrame();
}

// Function will update the frame
function updateFrame() {

    frameIndex++;
    if (frameIndex >= directionAndIndex[directionIndex].index) {
        frameIndex = 1;
    }
} // Function


function stopAnimationLoop() {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
}

startAnimationLoop(neutralSheet, 0);


// Animate Sprite Sheet ends When not Dragging
//////////////////////////////////////////////
//////////////////////////////////////////////


// Code for Popup start from here
/////////////////////////////////
/////////////////////////////////

const modal = document.getElementById('myModal');
const closeBtn = modal.querySelector(".close");
const undoBtn = modal.querySelector(".undo");

closeBtn.addEventListener("click", closeButtonClick);
undoBtn.addEventListener("click", undoButtonClick);

function showModal() {
    modalDisplay = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stopAnimationLoop();
    modal.style.display = 'flex';
}

// Function to close the modal
function closeButtonClick() {
    stopAnimationLoop();
    modal.style.display = "none";
    window.close();
}

// Function to handle undo button click
function undoButtonClick() {
    emojiPositionX = (x) - 45;
    emojiPositionY = (y + (y / 2)) - 45;
    frameIndex = 1;
    selectedFrame = null;
    isDragging = false;
    prevTouchX = 0;
    prevTouchY = 0;
    gameStart = false;
    recentSelectedSheet = neutralSheet;
    previousFromLeftDigonal = 'right';
    previousFromRightDigonal = 'left';
    directionIndex = 0;
    animationInterval = null;
    draggingStart = false;
    fromLeftDiagonal = null;
    fromRightDiagonal = null;
    sadHappyPostionCalculated = false;
    changingDirection = false;
    intervalComplete = false;
    startSnapBack = false;
    setNeutral = false;
    timeInterval = 350;
    textShown = true;
    modalDisplay = false;
    backgroundShow = true;
    startAnimationLoop(neutralSheet, 0);
    drawFrame(0, recentSelectedSheet);
    modal.style.display = "none";
    showText('TO INTERACT', 'Swipe or Drag the Emoji');

}


// Code for Popup ends from here
////////////////////////////////
////////////////////////////////
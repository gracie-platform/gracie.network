const text1 = 'Tutorial'
const text2 = 'Swipe to share your satisfaction'
const text3 = 'Left'
const text4 = 'Is negative, poor or bad'
const text5 = 'Right'
const text6 = 'Is positive, great or good'
const text7 = 'How are you feeling?'
const openOnDesktop = 'Use a mobile device to visit: gracie.network/demo';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Calculate the center coordinates
const x = canvas.width / 2;
const y = canvas.height / 2;
const heightThird = canvas.height - (canvas.height / 3.2);

// Load sptite sheet with happy emojis
const happySheet = new Image();
happySheet.src = 'assets/Sprites/Happy.png';

// Load sptite sheet with sad emojis
const sadSheet = new Image();
sadSheet.src = 'assets/Sprites/Sad.png';

// Load sptite sheet with neutral emojis
const neutralSheet = new Image();
neutralSheet.src = 'assets/Sprites/Neutral.png'

// Load sptite sheet with scared emojis
const scaredSheet = new Image();
scaredSheet.src = 'assets/Sprites/Scared.png';

// Load sptite sheet with scream emojis
const screamSheet = new Image();
screamSheet.src = 'assets/Sprites/Scream.png';

const shadow = new Image();
shadow.src = 'assets/shadow.png';

const skipTutorialPng = new Image();
skipTutorialPng.src = 'assets/skipPng.png';

const nextButtonPng = new Image();
nextButtonPng.src = 'assets/nextPng.png';

const skipButtonWidth = 30;
const skipButtonHeight = 30;

const fontToLoad = new FontFace('Lexend', 'url(font/Lexend-VariableFont_wght.ttf)');

const config = [
    { xPosition: canvas.width - 20 - 10, yPosition: 10, width: 20, height: 20, }, // For Skip Tutorial button
    { xPosition: canvas.width - 20 - 10, yPosition: canvas.height - 20 - 10, width: 20, height: 20, }, // For Next Button
    { xPosition: -10, yPosition: y + 50, width: 92, height: 87, }, // For Sad Eomji
    { xPosition: canvas.width - 77, yPosition: y + 50, width: 92, height: 87, }, // For Happy Emoji
]

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

const modal = document.getElementById('myModal');
// const closeBtn = modal.querySelector(".close");
const undoBtn = modal.querySelector(".undo");

const directionAndIndex = [
    { direction: 'neutral', index: 8 },  // 0 Neutral png
    { direction: 'happy', index: 11 }, // 1 Happy png
    { direction: 'sad', index: 13 }, // 2 Sad png
    { direction: 'scared', index: 15 }, // 3 Scared png\
    { direction: 'scream', index: 15 }, // 4 Scared png
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
    { x: 0, y: frameHeight * 3, index: 15 }, // Frame 16
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
let fromLeftDiagonal = null;
let fromRightDiagonal = null;
let changingDirection = false;
let intervalComplete = false;
let startSnapBack = false;
let textShown = true;
let distanceFromEdge = x;
let sheetChanged = null;
let modalDisplay = false;
let backgroundShow = true;
let timeInterval = 30;
let neutralFrameCounter = 0;
let textHide = false;
let recentScreen = 0;


function showText(firstText, secondText, screen) {
    // Set the font properties
    if (screen === 0) {
        ctx.font = '500 30px Lexend';
        ctx.lineHeight = 38;
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        // Draw the text on the canvas
        ctx.fillText(firstText, x, (y - 30));
        // Set the font properties
        ctx.font = '400 20px Lexend';
        ctx.lineHeight = 25;

        ctx.fillText(secondText, x, y);
    }
    else if (screen === 1) {
        ctx.font = '500 30px Lexend';
        ctx.lineHeight = 38;
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'left';
        // ctx.textBaseline = 'middle';


        // Draw the text on the canvas
        ctx.fillText(firstText, 57, (y - 30));
        // Set the font properties
        ctx.font = '400 20px Lexend';
        ctx.lineHeight = 25;

        ctx.fillText(secondText, 57, y);
    }
    else if (screen === 2) {
        ctx.font = '500 30px Lexend';
        ctx.lineHeight = 38;
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'right';


        // Draw the text on the canvas
        ctx.fillText(firstText, canvas.width - 57, (y - 30));
        // Set the font properties
        ctx.font = '400 20px Lexend';
        ctx.lineHeight = 25;

        ctx.fillText(secondText, canvas.width - 57, y);
    }
    else if (screen === 3) {
        ctx.font = '500 30px Lexend';
        ctx.lineHeight = 38;
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';


        // Draw the text on the canvas
        ctx.fillText(firstText, x, (y - 10));
    }


}

function fadeAwayText(firstText) {
    // Define the fade duration in milliseconds
    textShown = false;
    const fadeDuration = 600;

    // Calculate the opacity change per frame
    const opacityChange = 1 / (fadeDuration / 16.67); // Assuming 60 FPS (1000ms / 60 = 16.67ms)

    // Set the initial opacity
    let opacity = 1;
    let font = 30;

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

        font = font - .50;

        // ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        // Draw the text on the canvas
        ctx.fillText(firstText, x, (y - 10));
        // Check if the opacity has reached 0 (fully faded away)
        if (opacity <= 0) {
            // Stop the interval
            textHide = true;
            clearInterval(intervalId);
        }
    }, 16.67); // Update every frame (60 FPS)
}

// Work for sprite sheet start from here
////////////////////////////////////////
////////////////////////////////////////
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

window.onload = function () {
    document.fonts.add(fontToLoad);
    fontToLoad.load().then(() => {
        initializeGame();
    }).catch((error) => {
        console.error(`Failed to load the font '${fontToLoad.family}': ${error}`);
    });

}

function initializeGame() {
    if (isMobileDevice()) {
        canvas.addEventListener('touchstart', handleTouchStart);
        canvas.addEventListener('touchmove', handleTouchMove);
        canvas.addEventListener('touchend', handleTouchEnd);
        recentSelectedSheet = neutralSheet;
        directionIndex = 0;
        sheetChanged = neutralSheet;
        startAnimationLoop(neutralSheet, 0);
    } else {
        // User is on a desktop
        ctx.font = '500 30px Lexend';
        ctx.lineHeight = 38;
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        // Draw the text on the canvas
        ctx.fillText(openOnDesktop, x, (y - 30));
        // Set the font properties
        ctx.font = '400 20px Lexend';
        ctx.lineHeight = 25;
    }
}

function handleClick(clickX, clickY) {
    // This will check that click is happend on skip tutorial button or not
    if (
        clickX >= canvas.width / 2 &&
        clickX <= canvas.width &&
        clickY >= 0 &&
        clickY <= 97
    ) {
        // Button clicked! Handle the button click event here
        recentScreen = 3;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        startAnimationLoop(recentSelectedSheet, 0);
    }
    // This will check that click is happend on next button or not
    else if (
        clickX >= canvas.width / 2 &&
        clickX <= canvas.width &&
        clickY >= canvas.height - 97 &&
        clickY <= canvas.height
    ) {
        // Button clicked! Handle the button click event here
        recentScreen++;
        if (recentScreen === 3) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        startAnimationLoop(recentSelectedSheet, 0);
    }
}

// Function to draw the frames on the canvas
function snapBack() {
    const spring = 18;
    const toleranceDistance = 18;
    const targetX = emojiPositionX; // Start position X
    const targetY = emojiPositionY; // Start position Y

    const dx = targetX - selectedFrame.x;
    const dy = targetY - selectedFrame.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > toleranceDistance) {
        const vx = (dx / distance) * spring; // Velocity in X direction
        const vy = (dy / distance) * spring; // Velocity in Y direction
        selectedFrame.x += vx;
        selectedFrame.y += vy;
    }
    else {
        startSnapBack = false;
        selectedFrame.x = emojiPositionX;
        selectedFrame.y = emojiPositionY;
        backgroundShow = true;
        selectedFrame = null;
        timeInterval = 30;
        gameStart = false;
        stopAnimationLoop();
        startAnimationLoop(neutralSheet, 0);
    }
}

function drawSkipTutorialButton() {
    ctx.font = '400 20px Lexend';
    ctx.fillStyle = '#0085FF';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('Skip', config[0].xPosition - 10, config[0].yPosition + 19);
    ctx.drawImage(skipTutorialPng, config[0].xPosition, config[0].yPosition, config[0].width, config[0].height);
}

function drawNextButton() {
    ctx.font = '400 20px Lexend';
    ctx.fillStyle = '#0085FF';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('Next', config[1].xPosition - 10, config[1].yPosition + 19);
    ctx.drawImage(nextButtonPng, config[1].xPosition, config[1].yPosition, config[1].width, config[1].height);
}

function drawSadEmoji() {
    const index = 13;
    const frameX = emoji[index].x;
    const frameY = emoji[index].y;
    const coordinates = [
        { x: 70, y: config[2].yPosition + (config[2].height / 2) - 15 },
        { x: config[2].xPosition + (config[2].width / 2) + 95, y: config[2].yPosition + (config[2].height / 2) + 45 },
        { x: config[2].xPosition + (config[2].width / 2) + 80, y: config[2].yPosition + (config[2].height / 2) + 65 },
        { x: 25, y: config[2].yPosition + config[2].height - 10 },
    ];

    // Find the leftmost and rightmost x-coordinates of the polygon
    let minX = Infinity;
    let maxX = -Infinity;
    coordinates.forEach((point) => {
        minX = Math.min(minX, point.x);
        maxX = Math.max(maxX, point.x);
    });

    // Create a linear gradient from left to right
    const gradient = ctx.createLinearGradient(minX, 0, maxX, 0);
    gradient.addColorStop(0, 'rgb(254, 157, 33)');
    gradient.addColorStop(1, 'rgb(255, 255, 0,0)');

    // Create a clipping path for the polygon shape
    ctx.save();
    // Create a clipping path for the polygon shape
    ctx.beginPath();
    ctx.moveTo(coordinates[0].x, coordinates[0].y);
    ctx.lineTo(coordinates[1].x, coordinates[1].y);
    ctx.lineTo(coordinates[2].x, coordinates[2].y);
    ctx.lineTo(coordinates[3].x, coordinates[3].y);
    ctx.closePath();

    // Fill the polygon with the gradient
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.restore();

    // Draw the image
    ctx.drawImage(sadSheet, frameX + leftPadding, frameY + topPadding, frameWidth - (leftPadding + rightPadding), frameHeight - (topPadding + bottomPadding), config[2].xPosition, config[2].yPosition, frameWidth - (leftPadding + rightPadding), frameHeight - (topPadding + bottomPadding));
}

function drawHappyEmoji() {
    const index = 11;
    const frameX = emoji[index].x;
    const frameY = emoji[index].y;

    const coordinates = [
        { x: config[3].xPosition + 8, y: config[3].yPosition + (config[3].height / 2) - 15 },
        { x: config[3].xPosition - 48, y: config[3].yPosition + (config[3].height / 2) + 45 },
        { x: config[3].xPosition - 33, y: config[3].yPosition + (config[3].height / 2) + 65 },
        { x: config[3].xPosition + 65, y: config[3].yPosition + config[3].height - 10 },
    ];

    // Find the leftmost and rightmost x-coordinates of the polygon
    let minX = Infinity;
    let maxX = -Infinity;
    coordinates.forEach((point) => {
        minX = Math.min(minX, point.x);
        maxX = Math.max(maxX, point.x);
    });

    // Create a linear gradient from left to right
    const gradient = ctx.createLinearGradient(maxX, 0, minX, 0);
    gradient.addColorStop(0, 'rgb(254, 157, 33)');
    gradient.addColorStop(1, 'rgb(255, 255, 0,0)');

    // Create a clipping path for the polygon shape
    ctx.save();
    // Create a clipping path for the polygon shape
    ctx.beginPath();
    ctx.moveTo(coordinates[0].x, coordinates[0].y);
    ctx.lineTo(coordinates[1].x, coordinates[1].y);
    ctx.lineTo(coordinates[2].x, coordinates[2].y);
    ctx.lineTo(coordinates[3].x, coordinates[3].y);
    ctx.closePath();

    // Fill the polygon with the gradient
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.restore();






    ctx.drawImage(happySheet, frameX + leftPadding, frameY + topPadding, frameWidth - (leftPadding + rightPadding), frameHeight - (topPadding + bottomPadding), config[3].xPosition, config[3].yPosition, frameWidth - (leftPadding + rightPadding), frameHeight - (topPadding + bottomPadding));

}

function drawFirstScreen() {
    drawSkipTutorialButton();
    drawNextButton();
    showText(text1, text2, 0);
}

function drawSecondScreen() {
    drawSadEmoji();
    drawNextButton();
    showText(text3, text4, 1);
}

function drawThirdScreen() {
    drawHappyEmoji();
    drawNextButton();
    showText(text5, text6, 2);
}

function drawFrame(index, spriteSheet) {
    if (!textHide && recentScreen === 3) {
        ctx.clearRect(emoji[0].x, emoji[0].y, frameWidth, frameHeight);
    }
    else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (recentScreen === 0) {
        drawFirstScreen();
        let frameX = emoji[index].x;
        let frameY = emoji[index].y;
        if (index === 0) {
            if (!gameStart) {
                emoji[0].x = emojiPositionX;
                emoji[0].y = emojiPositionY;
                if (isDragging) {
                    gameStart = true;
                }
            }
            else {
                emoji[0].x = frameX;
                emoji[0].y = frameY;
            }
        }
        if (!modalDisplay) {
            if (index === 0) {
                frameX = 0;
                frameY = 0;
            }
            ctx.drawImage(spriteSheet, frameX + leftPadding, frameY + topPadding, frameWidth - (leftPadding + rightPadding), frameHeight - (topPadding + bottomPadding), emoji[0].x, emoji[0].y, frameWidth - (leftPadding + rightPadding), frameHeight - (topPadding + bottomPadding));
        }
    }
    else if (recentScreen === 1) {
        drawSecondScreen();
    }
    else if (recentScreen === 2) {
        drawThirdScreen();
    }
    else if (recentScreen === 3) {
        if (textShown) {
            showText(text7, '', 3);
        }
        if (backgroundShow) {
            ctx.drawImage(shadow, x - 161, emojiPositionY - 195, 320, 450);
        }
        let frameX = emoji[index].x;
        let frameY = emoji[index].y;
        if (startSnapBack) {
            snapBack();
        }
        if (index === 0) {
            if (!gameStart) {
                emoji[0].x = emojiPositionX;
                emoji[0].y = emojiPositionY;
                if (isDragging) {
                    gameStart = true;
                }
            }
            else {
                emoji[0].x = frameX;
                emoji[0].y = frameY;
            }
        }
        if (!modalDisplay) {
            if (index === 0) {
                frameX = 0;
                frameY = 0;
            }
            ctx.drawImage(spriteSheet, frameX + leftPadding, frameY + topPadding, frameWidth - (leftPadding + rightPadding), frameHeight - (topPadding + bottomPadding), emoji[0].x, emoji[0].y, frameWidth - (leftPadding + rightPadding), frameHeight - (topPadding + bottomPadding));
        }
    }
    if (recentScreen <= 2) {
        stopAnimationLoop();
    }
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
        frameIndex = 0;
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
    else if (position <= frameThirteen && position >= 0) {  // Frame Thirteen
        frameIndex = 13;
    }
    else if (position <= -10) {
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
        frameIndex = 0;
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
    else if (position + 88 >= canvas.width + 10) {
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
            startAnimationLoop(recentSelectedSheet, directionIndex);
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
            if (animationInterval) {
                stopAnimationLoop();
            }
            let distanceGap = distanceFromLeft / 14;
            setFrameIndexForSad(distanceGap);

        }
        else if (selectedFrame.x + 45 >= x && fromRightDiagonal === 'right') { // For Happy
            recentSelectedSheet = happySheet;
            directionIndex = 1;
            if (animationInterval) {
                stopAnimationLoop();
            }
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
        frameIndex = 0;
        intervalComplete = false;
    }
    previousFromLeftDigonal = fromLeftDiagonal;
    previousFromRightDigonal = fromRightDiagonal;
    previousSelectedSheet = recentSelectedSheet;
}

// Function to handle touchstart event
function handleTouchStart(event) {
    event.preventDefault();
    const touch = event.touches[0];
    const touchX = touch.clientX - canvas.offsetLeft; // Adjust for canvas position
    const touchY = touch.clientY - canvas.offsetTop;
    if (recentScreen <= 2) {
        handleClick(touchX, touchY);
    }

    if (!modalDisplay && recentScreen === 3) {
        // Adjust for canvas position
        selectedFrame = findSelectedFrame(touchX, touchY);
        if (selectedFrame && !modalDisplay) {
            isDragging = true;
            prevTouchX = touchX;
            prevTouchY = touchY;
        }
    }
}

// Function to handle touchmove event
function handleTouchMove(event) {
    event.preventDefault(); // Prevent default touchmove behavior
    if (isDragging && selectedFrame) {
        if (textShown) {
            fadeAwayText(text7);
        }
        backgroundShow = false;
        const touch = event.touches[0];
        const touchX = touch.clientX - canvas.offsetLeft; // Adjust for canvas position
        const touchY = touch.clientY - canvas.offsetTop; // Adjust for canvas position


        selectedFrame.x = Math.max(-10, Math.min(selectedFrame.x, canvas.width - (frameWidth - (leftPadding + rightPadding)) + 10));
        selectedFrame.y = Math.max(-10, Math.min(selectedFrame.y, canvas.height - (frameHeight - (topPadding + bottomPadding)) + 10));
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
    event.preventDefault();
    if (selectedFrame != null) {
        if (recentSelectedSheet === scaredSheet) {
            recentSelectedSheet = screamSheet;
            directionIndex = 4;
        }
        else {
            recentSelectedSheet = neutralSheet;
            directionIndex = 0;
        }
        frameIndex = 0;
        prevTouchX = 0;
        prevTouchY = 0;
        fromLeftDiagonal = null;
        fromRightDiagonal = null;
        changingDirection = false;
        startSnapBack = true;
        isDragging = false;
        if (!modalDisplay) {
            timeInterval = 30;
            stopAnimationLoop();
            startAnimationLoop(recentSelectedSheet, directionIndex);
        }
    }

}

// Function to find the selected frame based on touch coordinates
function findSelectedFrame(touchX, touchY) {

    const frame = emoji[0];
    if (
        touchX >= frame.x && touchX <= frame.x + frameWidth &&
        touchY >= frame.y && touchY <= frame.y + frameHeight
    ) {
        return frame;
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


function startAnimationLoop(sheet, noFramesIndex) {
    recentSelectedSheet = sheet;
    directionIndex = noFramesIndex;
    animationInterval = setInterval(animateFrame, timeInterval);
}

function animateFrame() {
    if (recentSelectedSheet != sheetChanged) {
        if (recentSelectedSheet === neutralSheet && startSnapBack === false) {
            stopAnimationLoop();
            timeInterval = 30;
            animationInterval = setInterval(animateFrame, timeInterval)
        }
        else {
            stopAnimationLoop();
            timeInterval = 30;
            animationInterval = setInterval(animateFrame, timeInterval)
        }
    }
    sheetChanged = recentSelectedSheet;
    drawFrame(frameIndex, recentSelectedSheet);
    updateFrame();
}

// Function will update the frame
function updateFrame() {
    if (recentSelectedSheet != neutralSheet) {
        neutralFrameCounter++;
        if (neutralFrameCounter >= 2) {
            neutralFrameCounter = 0;
            frameIndex++;
        }
        if (frameIndex >= directionAndIndex[directionIndex].index) {
            frameIndex = 0;
        }
    }
    else {
        if (frameIndex === 3 || frameIndex === 4 || frameIndex === 5) {
            neutralFrameCounter++;
            if (neutralFrameCounter >= 3) {
                neutralFrameCounter = 0;
                frameIndex++;
            }
        }
        else {
            neutralFrameCounter++;
            if (neutralFrameCounter >= 7) {
                neutralFrameCounter = 0;
                frameIndex++;
            }
        }

        if (frameIndex >= directionAndIndex[directionIndex].index) {
            frameIndex = 0;
        }

    }

} // Function

function stopAnimationLoop() {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
}

// Animate Sprite Sheet ends When not Dragging
//////////////////////////////////////////////
//////////////////////////////////////////////


// Code for Popup start from here
/////////////////////////////////
/////////////////////////////////

// closeBtn.addEventListener("click", closeButtonClick);
undoBtn.addEventListener("click", undoButtonClick);

function showModal() {
    // stopAnimationLoop();
    modalDisplay = true;
    isDragging = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    modal.style.display = 'flex';
}

// Function to close the modal
// function closeButtonClick() {
//     stopAnimationLoop();
//     modal.style.display = "none";
//     window.close();
// }

// Function to handle undo button click
function undoButtonClick() {
    emojiPositionX = (x) - 45;
    emojiPositionY = (y + (y / 2)) - 45;
    frameIndex = 0;
    selectedFrame = null;
    isDragging = false;
    prevTouchX = 0;
    prevTouchY = 0;
    gameStart = false;
    previousSelectedSheet = null;
    recentSelectedSheet = neutralSheet;
    previousFromLeftDigonal = 'right';
    previousFromRightDigonal = 'left';
    directionIndex = 0;
    animationInterval = null;
    fromLeftDiagonal = null;
    fromRightDiagonal = null;
    changingDirection = false;
    intervalComplete = false;
    startSnapBack = false;
    textShown = true;
    distanceFromEdge = x;
    sheetChanged = neutralSheet;
    modalDisplay = false;
    backgroundShow = true;
    timeInterval = 30;
    neutralFrameCounter = 0;
    textHide = false;
    recentScreen = 3;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    startAnimationLoop(recentSelectedSheet, directionIndex);
    modal.style.display = "none";

}

// Code for Popup ends from here
////////////////////////////////
////////////////////////////////
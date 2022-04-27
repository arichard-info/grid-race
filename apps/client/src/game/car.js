import { useTransition } from './utils/transition';
import { getPositionFromVectors } from './utils/vector';

const MAX_ANIMATION_DURATION = 300;

export class Car {
    constructor(player) {
        this.playerName = player.name;
        this.vectors = player.vectors;
        this.startPosition = player.startPosition;
        this.position = getPositionFromVectors(this.startPosition, this.vectors);
    }

    setAnimation = (vector, index) => {
        const vectorSize = Math.ceil(vector[0]) + Math.ceil(vector[1]);
        const duration = vectorSize * 50;
        this.lineAnimation = {
            getProgress: useTransition({ duration: duration < MAX_ANIMATION_DURATION ? duration : MAX_ANIMATION_DURATION }),
            vectorIndex: index,
        };
    };

    pushVector = (vector, animate) => {
        this.vectors.push(vector);
        if (animate) this.setAnimation(vector, this.vectors.length - 1);
    };

    setPosition = (newPosition, animate) => {
        const [pX, pY] = getPositionFromVectors(this.startPosition, this.vectors);
        const [newpX, newpY] = newPosition;
        const newVector = [newpX - pX, newpY - pY];
        this.vectors.push(newVector);
        this.position = newPosition;
        if (animate) this.setAnimation(newVector, this.vectors.length - 1);
    };

    render = ({ canvasCtx, pixelRatio, scaledCaseSize, animate, track }) => {
        let position = this.startPosition;

        canvasCtx.beginPath();
        canvasCtx.moveTo(position[0] * scaledCaseSize + track.offsetWidth, position[1] * scaledCaseSize + track.offsetHeight);
        this.vectors.forEach(([x, y], index) => {
            const newPos = [position[0] + x, position[1] + y];
            let drawPos;
            if (this.lineAnimation && index === this.vectors.length - 1 && index === this.lineAnimation.vectorIndex) {
                const progress = this.lineAnimation.getProgress();
                drawPos = [position[0] + x * progress, position[1] + y * progress];
                if (progress === 1) this.lineAnimation = null;
                animate();
            } else {
                drawPos = newPos;
                position = newPos;
            }

            canvasCtx.lineTo((drawPos[0]) * scaledCaseSize  + track.offsetWidth, (drawPos[1]) * scaledCaseSize + track.offsetHeight);
        });

        canvasCtx.strokeStyle = '#FF0000';
        canvasCtx.lineWidth = 2 * pixelRatio;
        canvasCtx.stroke();
    };
}

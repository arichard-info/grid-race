import { useTransition } from './utils/transition';
import { getPositionFromVectors } from 'geometry/lib/vector';

const MAX_ANIMATION_DURATION = 300;

export class Car {
    constructor(player) {
        this.playerName = player.name;
        this.color = player.color || 'red';
        this.vectors = player.vectors;
        this.startPosition = player.startPosition;
        this.position = getPositionFromVectors(this.startPosition, this.vectors);
    }

    setAnimation = (vector, index) => {
        const vectorSize = Math.abs(vector[0]) + Math.abs(vector[1]);
        const duration = vectorSize * 50;
        this.lineAnimation = {
            getProgress: useTransition({
                duration: duration < MAX_ANIMATION_DURATION ? duration : MAX_ANIMATION_DURATION,
            }),
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

    render = ({ canvasCtx, pixelRatio, scaledCaseSize, animate, offsetX, offsetY }) => {
        let position = this.startPosition;

        canvasCtx.beginPath();
        const positionPx = [position[0] * scaledCaseSize + offsetX, position[1] * scaledCaseSize + offsetY];
        canvasCtx.moveTo(...positionPx);
        canvasCtx.arc(...positionPx, pixelRatio * 2, 0, Math.PI * 2);
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

            const drawPosPx = [drawPos[0] * scaledCaseSize + offsetX, drawPos[1] * scaledCaseSize + offsetY];
            canvasCtx.lineTo(...drawPosPx);
            canvasCtx.arc(...drawPosPx, pixelRatio * 2, 0, Math.PI * 2);
        });

        canvasCtx.strokeStyle = this.color;
        canvasCtx.lineWidth = 2 * pixelRatio;
        canvasCtx.stroke();
    };
}

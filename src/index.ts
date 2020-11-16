import { Color3, Color4, Engine, FreeCamera, Mesh, RayHelper, Scene, Vector3, Vector4} from '@babylonjs/core';
import '@babylonjs/inspector';
declare global {
    interface Document {
        mozCancelFullScreen?: () => Promise<void>;
        msExitFullscreen?: () => Promise<void>;
        webkitExitFullscreen?: () => Promise<void>;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
        mozPointerLockElement?: Element;
        mozpointerlockchange?: Element;
        msPointerLockElement?: Element;
        webkitPointerLockElement?: Element;
        webkitFullscreenElement?: Element;
    }

    interface HTMLElement {
        msRequestFullscreen?: () => Promise<void>;
        mozRequestFullscreen?: () => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
    }
}
window.addEventListener('DOMContentLoaded', function() {
    create();
});
let create = function(){
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const engine = new Engine(canvas);
    let scene = new Scene(engine);
    //scene.clearColor = new Color4(0,0.1,0,1);

    //scene.createDefaultEnvironment();

    //scene.createDefaultSkybox();
    scene.createDefaultLight();
    const camera = new FreeCamera("camera1", new Vector3(0,0,-30), scene);
    camera.attachControl(canvas, true);
    RayHelper.CreateAndShow(camera.getForwardRay(), scene, new Color3(1,1,3));

    const ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);

    const ball = Mesh.CreateSphere("ball", 20, 6, scene);
    let isLocked = false;
    scene.onPointerDown = function(evt, pickInfo, type) {
        if (!isLocked) {
            canvas.requestPointerLock.prototype = canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock || false;
            isLocked = true;
        }
        if (evt.button == 1) {
            alert("left");
        }
    }
    var pointerlockchange = function () {
        var controlEnabled = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || false;

        // If the user is already locked
        if (!controlEnabled) {
            camera.detachControl(canvas);
            isLocked = false;
        } else {
            camera.attachControl(canvas);
            isLocked = true;
        }
    };
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
    //ground.position = new Vector3(0,0,10);
    //scene.debugLayer.show();


    engine.runRenderLoop(function() {
        scene.render();
    });

};

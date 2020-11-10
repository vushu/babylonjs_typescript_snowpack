import { Color4, Engine, FreeCamera, Mesh, Scene, Vector3, Vector4} from '@babylonjs/core';
import '@babylonjs/inspector';

(function(){
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const engine = new Engine(canvas);
    let scene = new Scene(engine);
    //scene.clearColor = new Color4(0,0.1,0,1);

    scene.createDefaultEnvironment();

    scene.createDefaultSkybox();
    scene.createDefaultLight();
    const camera = new FreeCamera("camera1", new Vector3(0,0,-30), scene);
    camera.attachControl(canvas, true);

    const ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);

    const ball = Mesh.CreateSphere("ball", 20, 10, scene);
    //ground.position = new Vector3(0,0,10);
    //scene.debugLayer.show();


    engine.runRenderLoop(function() {
        scene.render();
    });

})();

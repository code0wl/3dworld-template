export class WorldTexture {

    public applyTexture(texture): THREE.MeshPhongMaterial {
        return new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture(texture),
        } as THREE.MeshBasicMaterialParameters);
    }

}
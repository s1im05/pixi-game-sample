interface AppSettings {
    width: number;
    height: number;
    resolution: number;
    antialias: boolean;
    transparent: boolean;
}

interface SceneReference {
    id: number;
    class: any;
    default: boolean;
}

interface LoadingScene {
    progress: number;
}

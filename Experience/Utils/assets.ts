export type Asset =
    | { name: "room"; type: "glbModel"; path: string }
    | { name: "screen"; type: "videoTexture"; path: string };

export default [
    {
        name: "room",
        type: "glbModel",
        path: "/models/room.glb",
    },
    {
        name: "screen",
        type: "videoTexture",
        path: "/textures/video.mp4",
    },
] satisfies Asset[];

export const CustomPaths = {
    LOCK: "LOCK",
    LOCK_BOTH: "LOCK_BOTH",
    LOCK_WIDTH: "LOCK_WIDTH",
    LOCK_HEIGHT: "LOCK_HEIGHT"
}
export function getCustomPath(p, path) {
    const types = {
        [CustomPaths.LOCK]: `M${p.x-5} ${p.y}l0.58 0 0 -1.78c0,-0.91 0.37,-1.74 0.97,-2.34 0.6,-0.6 1.43,-0.97 2.34,-0.97 0.92,0 1.74,0.37 2.34,0.97 0.6,0.6 0.97,1.43 0.97,2.34l0 1.78 0.28 0c0.3,0 0.58,0.13 0.78,0.33 0.2,0.2 0.32,0.47 0.32,0.77l0 6.42c0,0.3 -0.12,0.58 -0.32,0.78 -0.2,0.2 -0.48,0.32 -0.78,0.32l-7.48 0c-0.3,0 -0.58,-0.12 -0.78,-0.32 -0.2,-0.2 -0.32,-0.48 -0.32,-0.78l0 -6.42c0,-0.3 0.12,-0.57 0.32,-0.77 0.2,-0.2 0.48,-0.33 0.78,-0.33zm3.85 2.11c0.59,0 1.07,0.48 1.07,1.06 0,0.48 -0.32,0.89 -0.76,1.02l0.76 2.47 -2.13 0 0.75 -2.47c-0.43,-0.13 -0.75,-0.54 -0.75,-1.02 0,-0.58 0.48,-1.06 1.06,-1.06zm-2.05 -2.11l4.19 0 0 -1.78c0,-0.58 -0.24,-1.1 -0.62,-1.48 -0.37,-0.38 -0.9,-0.62 -1.48,-0.62 -0.58,0 -1.1,0.24 -1.48,0.62 -0.38,0.38 -0.61,0.9 -0.61,1.48l0 1.78zm5.68 0.58l-7.48 0c-0.14,0 -0.28,0.06 -0.37,0.15 -0.1,0.1 -0.16,0.23 -0.16,0.37l0 6.42c0,0.15 0.06,0.28 0.16,0.37 0.09,0.1 0.23,0.16 0.37,0.16l7.48 0c0.15,0 0.28,-0.06 0.37,-0.16 0.1,-0.09 0.16,-0.22 0.16,-0.37l0 -6.42c0,-0.14 -0.06,-0.27 -0.16,-0.37 -0.09,-0.09 -0.22,-0.15 -0.37,-0.15z`,
        [CustomPaths.LOCK_BOTH]: `M${p.x-5} ${p.y}l0.98 0 0 -3.57c0,-1.83 0.75,-3.48 1.94,-4.68 1.21,-1.2 2.86,-1.94 4.69,-1.94 1.82,0 3.48,0.74 4.68,1.94 1.2,1.2 1.94,2.85 1.94,4.68l0 3.57 0.74 0c0.6,0 1.15,0.25 1.55,0.65 0.41,0.4 0.65,0.95 0.65,1.55l0 12.84c0,0.61 -0.24,1.16 -0.64,1.56 -0.41,0.4 -0.96,0.65 -1.56,0.65l-14.97 0c-0.6,0 -1.15,-0.25 -1.55,-0.65 -0.4,-0.4 -0.65,-0.95 -0.65,-1.56l0 -12.84c0,-0.6 0.25,-1.15 0.65,-1.55 0.4,-0.4 0.95,-0.65 1.55,-0.65zm4.27 6.57l-5.01 2.14 5.01 2.14 0 -1.52 2.59 0 0 1.34 -1.52 0 2.14 5 2.14 -5 -1.52 0 0 -1.34 2.49 0 0 1.52 5 -2.14 -5 -2.14 0 1.52 -2.49 0 0 -1.34 1.52 0 -2.14 -5 -2.14 5 1.52 0 0 1.34 -2.59 0 0 -1.52zm-0.86 -6.57l8.39 0 0 -3.57c0,-1.16 -0.47,-2.2 -1.23,-2.96 -0.76,-0.76 -1.81,-1.23 -2.96,-1.23 -1.16,0 -2.21,0.47 -2.97,1.22 -0.76,0.77 -1.23,1.81 -1.23,2.97l0 3.57zm11.56 1.15l-14.97 0c-0.29,0 -0.55,0.12 -0.74,0.31 -0.19,0.19 -0.31,0.45 -0.31,0.74l0 12.84c0,0.3 0.12,0.56 0.31,0.75 0.19,0.19 0.45,0.31 0.74,0.31l14.97 0c0.29,0 0.56,-0.12 0.74,-0.31 0.2,-0.19 0.31,-0.45 0.31,-0.75l0 -12.84c0,-0.29 -0.11,-0.55 -0.3,-0.74 -0.19,-0.19 -0.46,-0.31 -0.75,-0.31z`,
        [CustomPaths.LOCK_WIDTH]: `M${p.x-5} ${p.y}l0.98 0 0 -3.57c0,-1.83 0.75,-3.48 1.94,-4.68 1.21,-1.2 2.86,-1.94 4.69,-1.94 1.82,0 3.48,0.74 4.68,1.94 1.2,1.2 1.94,2.85 1.94,4.68l0 3.57 0.74 0c0.6,0 1.16,0.25 1.55,0.65 0.41,0.4 0.65,0.95 0.65,1.56l0 12.83c0,0.61 -0.24,1.16 -0.64,1.56 -0.4,0.4 -0.96,0.65 -1.56,0.65l-14.97 0c-0.6,0 -1.15,-0.25 -1.55,-0.65 -0.4,-0.4 -0.65,-0.95 -0.65,-1.56l0 -12.83c0,-0.61 0.25,-1.16 0.65,-1.56 0.4,-0.4 0.95,-0.65 1.55,-0.65zm3.41 0l8.39 0 0 -3.57c0,-1.16 -0.47,-2.2 -1.23,-2.96 -0.76,-0.76 -1.81,-1.23 -2.96,-1.23 -1.16,0 -2.21,0.47 -2.97,1.22 -0.76,0.77 -1.23,1.81 -1.23,2.97l0 3.57zm11.56 1.15l-14.97 0c-0.29,0 -0.55,0.12 -0.74,0.31 -0.19,0.19 -0.31,0.45 -0.31,0.75l0 12.83c0,0.3 0.12,0.56 0.31,0.75 0.19,0.19 0.45,0.31 0.74,0.31l14.97 0c0.29,0 0.56,-0.12 0.75,-0.31 0.19,-0.19 0.31,-0.45 0.31,-0.75l0 -12.83c0,-0.3 -0.12,-0.56 -0.31,-0.75 -0.19,-0.19 -0.46,-0.31 -0.75,-0.31zm-4.62 9.87l5 -2.14 -5 -2.14 0 1.52 -5.74 0 0 -1.52 -5 2.14 5 2.14 0 -1.52 5.74 0 0 1.52z`,
        [CustomPaths.LOCK_HEIGHT]: `M${p.x-5} ${p.y}l0.98 0 0 -3.57c0,-1.83 0.75,-3.48 1.94,-4.68 1.21,-1.2 2.86,-1.94 4.69,-1.94 1.82,0 3.48,0.74 4.68,1.94 1.2,1.2 1.94,2.85 1.94,4.68l0 3.57 0.74 0c0.6,0 1.16,0.25 1.55,0.65 0.41,0.4 0.65,0.95 0.65,1.56l0 12.83c0,0.61 -0.24,1.16 -0.64,1.56 -0.4,0.4 -0.96,0.65 -1.56,0.65l-14.97 0c-0.6,0 -1.15,-0.25 -1.55,-0.65 -0.4,-0.4 -0.65,-0.95 -0.65,-1.56l0 -12.83c0,-0.61 0.25,-1.16 0.65,-1.56 0.4,-0.4 0.95,-0.65 1.55,-0.65zm3.41 0l8.39 0 0 -3.57c0,-1.16 -0.47,-2.2 -1.23,-2.96 -0.76,-0.76 -1.81,-1.23 -2.96,-1.23 -1.16,0 -2.21,0.47 -2.97,1.22 -0.76,0.77 -1.23,1.81 -1.23,2.97l0 3.57zm11.56 1.15l-14.97 0c-0.29,0 -0.55,0.12 -0.74,0.31 -0.19,0.19 -0.31,0.45 -0.31,0.75l0 12.83c0,0.3 0.12,0.56 0.31,0.75 0.19,0.19 0.45,0.31 0.74,0.31l14.97 0c0.29,0 0.56,-0.12 0.75,-0.31 0.19,-0.19 0.31,-0.45 0.31,-0.75l0 -12.83c0,-0.3 -0.12,-0.56 -0.31,-0.75 -0.19,-0.19 -0.46,-0.31 -0.75,-0.31zm-5.35 5.6l-2.14 -5 -2.14 5 1.52 0 0 3.83 -1.52 0 2.14 5 2.14 -5 -1.52 0 0 -3.83 1.52 0z`,
    }
    return types[path]
}
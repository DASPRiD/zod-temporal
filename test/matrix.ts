import { describe } from "node:test";
import { z as zFull } from "zod/v4";
import { z as zMini } from "zod/v4/mini";
import { zt as ztFull } from "../src/index.js";
import { zt as ztMini } from "../src/mini.js";

const matrix = [
    ["zod", ztFull, zFull],
    ["@zod/mini", ztMini, zMini],
] as const;

export const describeMatrix = (
    name: string,
    runner: (zt: typeof ztFull | typeof ztMini, z: typeof zFull | typeof zMini) => void,
) => {
    describe(name, () => {
        for (const [subName, zt, z] of matrix) {
            describe(subName, () => {
                runner(zt, z);
            });
        }
    });
};

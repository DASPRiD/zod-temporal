import assert from "node:assert/strict";
import { it } from "node:test";
import { toJSONSchema } from "zod/v4/core";
import { describeMatrix } from "./matrix.js";

describeMatrix("PlainTime", (zt, z) => {
    it("should allow ISO time value", () => {
        const schema = zt.plainTime();
        const localTime = Temporal.PlainTime.from({ hour: 20, minute: 0, second: 0 });
        const result = schema.parse("20:00:00");
        assert(result.equals(localTime));
    });

    it("should report invalid time", () => {
        const schema = zt.plainTime();
        assert.throws(() => schema.parse("foo"));
    });

    it("should report invalid type", () => {
        const schema = zt.plainTime();
        assert.throws(() => schema.parse(1));
    });

    it("should allow error override", () => {
        const schema = zt.plainTime({ error: "whoops" });
        const result = schema.safeParse("a");
        assert(!result.success);
        assert.deepEqual(result.error.issues[0].message, "whoops");
    });

    it("should create a standard JSON schema", () => {
        const schema = zt.plainTime();
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "time",
            example: "14:00:00",
        });
    });

    it("should encode to ISO time", () => {
        const schema = zt.plainTime();
        const result = z.encode(
            schema,
            Temporal.PlainTime.from({ hour: 20, minute: 0, second: 0 }),
        );
        assert.equal(result, "20:00:00");
    });

    it("should preserve JSON schema over refine", () => {
        const schema = zt.plainTime().check(z.refine(() => true));
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "time",
            example: "14:00:00",
        });
    });
});

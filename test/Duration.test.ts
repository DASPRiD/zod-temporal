import assert from "node:assert/strict";
import { it } from "node:test";
import { toJSONSchema } from "zod/v4/core";
import { describeMatrix } from "./matrix.js";

describeMatrix("Duration", (zt, z) => {
    it("should parse ISO duration value", () => {
        const schema = zt.duration();
        const result = schema.parse("PT10M");
        assert.equal(result.total({ unit: "seconds" }), 600);
    });

    it("should report invalid duration", () => {
        const schema = zt.duration();
        assert.throws(() => schema.parse("foo"));
    });

    it("should report invalid type", () => {
        const schema = zt.duration();
        assert.throws(() => schema.parse(1));
    });

    it("should allow error override", () => {
        const schema = zt.duration({ error: "whoops" });
        const result = schema.safeParse("a");
        assert(!result.success);
        assert.partialDeepStrictEqual(result.error.issues[0].message, "whoops");
    });

    it("should create a standard JSON schema", () => {
        const schema = zt.duration();
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "duration",
            example: "PT1H",
        });
    });

    it("should encode to ISO duration", () => {
        const schema = zt.duration();
        const result = z.encode(schema, Temporal.Duration.from("PT1H"));
        assert.equal(result, "PT1H");
    });

    it("should preserve JSON schema over refine", () => {
        const schema = zt.duration().check(z.refine(() => true));
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "duration",
            example: "PT1H",
        });
    });
});

import assert from "node:assert/strict";
import { it } from "node:test";
import { toJSONSchema } from "zod/v4/core";
import { describeMatrix } from "./matrix.js";

describeMatrix("OffsetDateTime", (zt, z) => {
    it("should allow ISO offset date time value", () => {
        const schema = zt.instant();
        const instant = Temporal.Instant.from("2021-01-01T20:00:00Z");
        const result = schema.parse("2021-01-01T20:00:00Z");
        assert(result.equals(instant));
    });

    it("should report invalid date", () => {
        const schema = zt.instant();
        assert.throws(() => schema.parse("foo"));
    });

    it("should report invalid type", () => {
        const schema = zt.instant();
        assert.throws(() => schema.parse(1));
    });

    it("should allow error override", () => {
        const schema = zt.instant({ error: "whoops" });
        const result = schema.safeParse("a");
        assert(!result.success);
        assert.deepEqual(result.error.issues[0].message, "whoops");
    });

    it("should create a standard JSON schema", () => {
        const schema = zt.instant();
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "date-time",
            example: "2020-01-01T14:00:00Z",
        });
    });

    it("should encode to ISO offset date time", () => {
        const schema = zt.instant();
        const result = z.encode(schema, Temporal.Instant.from("2021-01-01T20:00:00Z"));
        assert.equal(result, "2021-01-01T20:00:00Z");
    });

    it("should preserve JSON schema over refine", () => {
        const schema = zt.instant().check(z.refine(() => true));
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "date-time",
            example: "2020-01-01T14:00:00Z",
        });
    });
});

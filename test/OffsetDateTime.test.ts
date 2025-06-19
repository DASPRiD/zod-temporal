import assert from "node:assert/strict";
import { it } from "node:test";
import { toJSONSchema } from "zod/v4/core";
import { describeMatrix } from "./matrix.js";

if (typeof Temporal === "undefined") {
    await import("temporal-polyfill/global");
}

describeMatrix("OffsetDateTime", (zj, z) => {
    it("should allow ISO offset date time value", () => {
        const schema = zj.offsetDateTime();
        const zonedDateTime = Temporal.ZonedDateTime.from({
            year: 2021,
            month: 1,
            day: 1,
            hour: 20,
            minute: 0,
            second: 0,
            timeZone: "UTC",
        });
        const result = schema.parse("2021-01-01T20:00:00Z");
        assert(result.equals(zonedDateTime));
    });

    it("should report invalid date", () => {
        const schema = zj.offsetDateTime();
        assert.throws(() => schema.parse("foo"));
    });

    it("should report invalid type", () => {
        const schema = zj.offsetDateTime();
        assert.throws(() => schema.parse(1));
    });

    it("should allow error override", () => {
        const schema = zj.offsetDateTime({ error: "whoops" });
        const result = schema.safeParse("a");
        assert(!result.success);
        assert.deepEqual(result.error.issues[0].message, "whoops");
    });

    it("should create a standard JSON schema", () => {
        const schema = zj.offsetDateTime();
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "date-time",
            example: "2020-01-01T14:00:00Z",
        });
    });

    it("should preserve JSON schema over refine", () => {
        const schema = zj.offsetDateTime().check(z.refine(() => true));
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "date-time",
            example: "2020-01-01T14:00:00Z",
        });
    });
});

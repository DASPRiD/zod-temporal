import assert from "node:assert/strict";
import { it } from "node:test";
import { toJSONSchema } from "zod/v4/core";
import { describeMatrix } from "./matrix.js";

describeMatrix("PlainDateTime", (zt, z) => {
    it("should allow ISO date time value", () => {
        const schema = zt.plainDateTime();
        const localDateTime = Temporal.PlainDateTime.from({
            year: 2021,
            month: 1,
            day: 1,
            hour: 20,
            minute: 0,
            second: 0,
        });
        const result = schema.parse("2021-01-01T20:00:00");
        assert(result.equals(localDateTime));
    });

    it("should report invalid date", () => {
        const schema = zt.plainDateTime();
        assert.throws(() => schema.parse("foo"));
    });

    it("should report invalid type", () => {
        const schema = zt.plainDateTime();
        assert.throws(() => schema.parse(1));
    });

    it("should allow error override", () => {
        const schema = zt.plainDateTime({ error: "whoops" });
        const result = schema.safeParse("a");
        assert(!result.success);
        assert.deepEqual(result.error.issues[0].message, "whoops");
    });

    it("should create a standard JSON schema", () => {
        const schema = zt.plainDateTime();
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "plain-date-time",
            example: "2020-01-01T14:00:00",
        });
    });

    it("should encode to ISO date time", () => {
        const schema = zt.plainDateTime();
        const result = z.encode(
            schema,
            Temporal.PlainDateTime.from({
                year: 2021,
                month: 1,
                day: 1,
                hour: 20,
                minute: 0,
                second: 0,
            }),
        );
        assert.equal(result, "2021-01-01T20:00:00");
    });

    it("should preserve JSON schema over refine", () => {
        const schema = zt.plainDateTime().check(z.refine(() => true));
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "plain-date-time",
            example: "2020-01-01T14:00:00",
        });
    });
});

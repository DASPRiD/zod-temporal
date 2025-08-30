import assert from "node:assert/strict";
import { it } from "node:test";
import { toJSONSchema } from "zod/v4/core";
import { describeMatrix } from "./matrix.js";

describeMatrix("ZonedDateTime", (zt, z) => {
    it("should allow ISO zoned date time value", () => {
        const schema = zt.zonedDateTime();
        const zonedDateTime = Temporal.ZonedDateTime.from({
            year: 2021,
            month: 1,
            day: 1,
            hour: 20,
            minute: 0,
            second: 0,
            timeZone: "Europe/Berlin",
        });
        const result = schema.parse("2021-01-01T20:00:00+01:00[Europe/Berlin]");
        assert(result.equals(zonedDateTime));
    });

    it("should report invalid date", () => {
        const schema = zt.zonedDateTime();
        assert.throws(() => schema.parse("foo"));
    });

    it("should report invalid type", () => {
        const schema = zt.zonedDateTime();
        assert.throws(() => schema.parse(1));
    });

    it("should allow error override", () => {
        const schema = zt.zonedDateTime({ error: "whoops" });
        const result = schema.safeParse("a");
        assert(!result.success);
        assert.deepEqual(result.error.issues[0].message, "whoops");
    });

    it("should create a standard JSON schema", () => {
        const schema = zt.zonedDateTime();
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "zoned-date-time",
            example: "2020-01-01T14:00:00+01:00[Europe/Berlin]",
        });
    });

    it("should encode to ISO zoned date time", () => {
        const schema = zt.zonedDateTime();
        const result = z.encode(
            schema,
            Temporal.ZonedDateTime.from({
                year: 2021,
                month: 1,
                day: 1,
                hour: 20,
                minute: 0,
                second: 0,
                timeZone: "Europe/Berlin",
            }),
        );
        assert.equal(result, "2021-01-01T20:00:00+01:00[Europe/Berlin]");
    });

    it("should preserve JSON schema over refine", () => {
        const schema = zt.zonedDateTime().check(z.refine(() => true));
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "zoned-date-time",
            example: "2020-01-01T14:00:00+01:00[Europe/Berlin]",
        });
    });
});

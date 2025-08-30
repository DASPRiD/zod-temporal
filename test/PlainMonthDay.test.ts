import assert from "node:assert/strict";
import { it } from "node:test";
import { toJSONSchema } from "zod/v4/core";
import { describeMatrix } from "./matrix.js";

describeMatrix("PlainMonthDay", (zt, z) => {
    it("should parse ISO month day value", () => {
        const schema = zt.plainMonthDay();
        const plainMonthDay = Temporal.PlainMonthDay.from({ month: 12, day: 30 });
        const result = schema.parse("12-30");
        assert(result.equals(plainMonthDay));
    });

    it("should report invalid month day", () => {
        const schema = zt.plainMonthDay();
        assert.throws(() => schema.parse("foo"));
    });

    it("should report invalid type", () => {
        const schema = zt.plainMonthDay();
        assert.throws(() => schema.parse(1));
    });

    it("should allow error override", () => {
        const schema = zt.plainMonthDay({ error: "whoops" });
        const result = schema.safeParse("a");
        assert(!result.success);
        assert.deepEqual(result.error.issues[0].message, "whoops");
    });

    it("should create a standard JSON schema", () => {
        const schema = zt.plainMonthDay();
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "plain-month-day",
            example: "12-30",
        });
    });

    it("should encode to ISO month day", () => {
        const schema = zt.plainMonthDay();
        const result = z.encode(
            schema,
            Temporal.PlainMonthDay.from({
                month: 12,
                day: 30,
            }),
        );
        assert.equal(result, "12-30");
    });

    it("should preserve JSON schema over refine", () => {
        const schema = zt.plainMonthDay().check(z.refine(() => true));
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "plain-month-day",
            example: "12-30",
        });
    });
});

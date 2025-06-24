import assert from "node:assert/strict";
import { it } from "node:test";
import { toJSONSchema } from "zod/v4/core";
import { describeMatrix } from "./matrix.js";

if (typeof Temporal === "undefined") {
    await import("temporal-polyfill/global");
}

describeMatrix("PlainYearMonth", (zt, z) => {
    it("should parse ISO date value", () => {
        const schema = zt.plainYearMonth();
        const plainYearMonth = Temporal.PlainYearMonth.from({ year: 2020, month: 1 });
        const result = schema.parse("2020-01");
        assert(result.equals(plainYearMonth));
    });

    it("should report invalid month day", () => {
        const schema = zt.plainYearMonth();
        assert.throws(() => schema.parse("foo"));
    });

    it("should report invalid type", () => {
        const schema = zt.plainYearMonth();
        assert.throws(() => schema.parse(1));
    });

    it("should allow error override", () => {
        const schema = zt.plainYearMonth({ error: "whoops" });
        const result = schema.safeParse("a");
        assert(!result.success);
        assert.deepEqual(result.error.issues[0].message, "whoops");
    });

    it("should create a standard JSON schema", () => {
        const schema = zt.plainYearMonth();
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "plain-year-month",
            example: "2020-01",
        });
    });

    it("should preserve JSON schema over refine", () => {
        const schema = zt.plainYearMonth().check(z.refine(() => true));
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "plain-year-month",
            example: "2020-01",
        });
    });
});

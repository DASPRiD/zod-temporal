import assert from "node:assert/strict";
import { it } from "node:test";
import { toJSONSchema } from "zod/v4/core";
import { describeMatrix } from "./matrix.js";

describeMatrix("PlainDate", (zt, z) => {
    it("should parse ISO date value", () => {
        const schema = zt.plainDate();
        const plainDate = Temporal.PlainDate.from({ year: 2021, month: 1, day: 1 });
        const result = schema.parse("2021-01-01");
        assert(result.equals(plainDate));
    });

    it("should report invalid date", () => {
        const schema = zt.plainDate();
        assert.throws(() => schema.parse("foo"));
    });

    it("should report invalid type", () => {
        const schema = zt.plainDate();
        assert.throws(() => schema.parse(1));
    });

    it("should allow error override", () => {
        const schema = zt.plainDate({ error: "whoops" });
        const result = schema.safeParse("a");
        assert(!result.success);
        assert.deepEqual(result.error.issues[0].message, "whoops");
    });

    it("should create a standard JSON schema", () => {
        const schema = zt.plainDate();
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "date",
            example: "2020-01-01",
        });
    });

    it("should encode to ISO date", () => {
        const schema = zt.plainDate();
        const result = z.encode(schema, Temporal.PlainDate.from({ year: 2021, month: 1, day: 1 }));
        assert.equal(result, "2021-01-01");
    });

    it("should preserve JSON schema over refine", () => {
        const schema = zt.plainDate().check(z.refine(() => true));
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "date",
            example: "2020-01-01",
        });
    });
});

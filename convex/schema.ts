import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  workflows: defineTable({
    name: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    ownerId: v.optional(v.string()),
    createdBy: v.optional(v.string()),
    draft: v.optional(v.boolean()),
    template: v.optional(v.string()),
  })
    .index("byOwner", ["ownerId"])
    .index("byCreatedBy", ["createdBy"]),
});

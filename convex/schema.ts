import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  workflows: defineTable({
    name: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    userId: v.optional(v.string()),
    organizationId: v.optional(v.string()),
    draft: v.optional(v.boolean()),
  })
    .index("by_organization", ["organizationId"])
    .index("by_user", ["userId"])
});

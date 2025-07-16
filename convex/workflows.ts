import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getWorkflows = query({
  args: {
    organizationId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (user == null) {
      throw new ConvexError("User not authenticated");
    }

    let query = ctx.db.query("workflows").withIndex("byOwner", (q) => {
      return q.eq("ownerId", args.organizationId ?? user.subject);
    });

    const results = await query.collect();
    return results;
  },
});

export const createWorkflow = mutation({
  args: {
    draft: v.boolean(),
    name: v.optional(v.string()),
    organizationId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (user == null) {
      throw new ConvexError("User not authenticated");
    }

    const workflow = await ctx.db.insert("workflows", {
      name: args.name ?? "Untitled Workflow",
      draft: args.draft,
      ownerId: args.organizationId != null ? args.organizationId : user.subject,
      createdBy: user.subject,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return workflow;
  },
});

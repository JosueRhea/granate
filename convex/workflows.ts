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

    let query = ctx.db.query("workflows");

    const organizationId = args.organizationId;
    console.log("organizationId", organizationId);
    if (organizationId != null) {
      // @ts-ignore
      query = query.withIndex("by_organization", (q) => {
        return q.eq("organizationId", organizationId);
      });
    } else {
      // @ts-ignore
      query = query.withIndex("by_user", (q) => {
        return q.eq("userId", user.subject);
      });
    }
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
      userId: args.organizationId != null ? undefined : user.subject,
      organizationId: args.organizationId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return workflow;
  },
});

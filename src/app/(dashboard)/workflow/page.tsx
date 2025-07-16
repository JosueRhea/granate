"use client";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery } from "convex/react";
import { PlusIcon, SortAscIcon, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";

export default function WorkflowPage() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { organization } = useOrganization();
  const workflows = useQuery(api.workflows.getWorkflows, {
    organizationId: organization?.id,
  });
  const createWorflow = useMutation(api.workflows.createWorkflow);
  console.log("organization", organization);
  console.log("workflows", workflows);

  const handleCreateWorkflow = async () => {
    const workflow = await createWorflow({
      draft: true,
      name: "Untitled Workflow",
      organizationId: organization?.id,
    });
    router.push(`/workflow/${workflow}`);
  };

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Focus input on "/" key, ignore if typing in an input/textarea already
      if (
        e.key === "/" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      // Create workflow on "n" key, ignore if typing in an input/textarea already
      if (
        e.key === "n" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        handleCreateWorkflow();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div>
      <PageHeader title="Workflows" />
      <Separator />
      <div className="w-full gap-x-2 px-4 py-2 flex justify-between">
        <div className="flex items-center gap-x-2">
          <div className="relative flex items-center">
            <Search className="absolute left-2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              ref={inputRef}
              placeholder="Search workflows"
              className="pl-8"
            />
            <kbd className="absolute right-2 text-muted-foreground pointer-events-none bg-muted px-1.5 py-0.5 text-xs">
              /
            </kbd>
          </div>
          <Button variant="outline">
            <SortAscIcon className="mr-2 h-4 w-4" />
            Sort by <strong>Created at</strong>
          </Button>
        </div>
        <Button onClick={handleCreateWorkflow}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create workflow
          <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-white/20 rounded-xs">
            n
          </kbd>
        </Button>
      </div>
      <div className="flex flex-col gap-y-2">
        {workflows?.map((workflow) => (
          <Link key={workflow._id} href={`/workflow/${workflow._id}`}>
            {workflow.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

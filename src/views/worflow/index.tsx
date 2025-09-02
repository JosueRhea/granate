"use client";

import { Builder } from "@/builder/views";
// import { Builder, BuilderProvider } from "@/builder/views";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ReactFlowProvider } from "@xyflow/react";
import React from "react";

interface WorkflowMainProps {
  id: string;
}

export const WorkflowMain = ({ id }: WorkflowMainProps) => {
  return <WorkflwoContent />;
};

export const WorkflwoContent = () => {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col">
        <PageHeader title="Untitled workflow" />
        <Separator />
        <div className="w-full grid grid-cols-[1fr_350px] min-h-[calc(100vh-48px)]">
          <Builder className="bg-zinc-50" />
          <div>
            <h1>Properties</h1>
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

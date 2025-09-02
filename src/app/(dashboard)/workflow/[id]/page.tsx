import { WorkflowMain } from "@/views/worflow";

const WorflowPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <WorkflowMain id={id} />;
};

export default WorflowPage;

import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema, type CreateTaskFormType } from "../schemas";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskHttp } from "@/api/http";
import { QUERY_KEYS } from "@/utils/constants/query-keys";
import { toast } from "sonner";
import { FormLabel } from "@/components/ui/labels";
import { XCircleIcon } from "lucide-react";
import { FormButton } from "@/components/ui/buttons";
import { convertTypeTP, convertTypeTS } from "@/utils/enum-convetor";
import type { TaskViewResponse } from "@/types/models/response/task-view.response";

interface Props {
  onCreated: () => void;
  projectId: string;
  columnId: string;
  taskInfo?: TaskViewResponse;
}

export function CreateTaskForm({projectId, onCreated, columnId, taskInfo}: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskFormType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { 
      priority: taskInfo?.priority ? convertTypeTP(taskInfo.priority) : 0,
      status: taskInfo?.status ? convertTypeTS(taskInfo.status) : 0,
      name: taskInfo?.name,
      description: taskInfo?.description,
      text: taskInfo?.text,
    }
  });


  const columnMutation = useMutation({
    mutationFn: async (data: CreateTaskFormType) => {
      if(taskInfo) {
        await taskHttp.edit(projectId, columnId, taskInfo.id, {
          ...data,
          priority: data.priority ?? 0,
          status: data.status ?? 0,
        })
      } else {
        await taskHttp.create(projectId, columnId, {
          ...data,
          priority: data.priority ?? 0,
          status: data.status ?? 0,
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TASK_COLUMN, columnId]});
      toast.success("Task created");
      onCreated();
    },
    onError: () => {
      toast.error("Error creating task");
    }
  })

  return <form onSubmit={handleSubmit((data) => columnMutation.mutate(data))} className="space-y-4">
    <div>
      <FormLabel title="Name" />
      <input
        {...register("name")}
        className="w-full border-4 border-primary p-2 focus:border-color-info"
      />
      {
        errors.name && (
          <div className="border-4 border-color-danger p-2 flex items-center gap-2 text-color-danger">
            <XCircleIcon/>
            {errors.name.message}
          </div>
        )
      }
    </div>
    <div>
      <FormLabel title="Description" />
      <textarea
        {...register("description")}
        className="w-full border-4 border-primary p-2 focus:border-color-info h-20"
      />
      {
        errors.description && (
          <div className="border-4 border-color-danger p-2 flex items-center gap-2 text-color-danger">
            <XCircleIcon/>
            {errors.description.message}
          </div>
        )
      }
    </div>
    <div>
      <FormLabel title="Text" />
      <textarea
        {...register("text")}
        className="w-full border-4 border-primary p-2 focus:border-color-info h-40"
      />
      {
        errors.text && (
          <div className="border-4 border-color-danger p-2 flex items-center gap-2 text-color-danger">
            <XCircleIcon/>
            {errors.text.message}
          </div>
        )
      }
    </div>
    {
      !taskInfo && (
        <>
          <div>
            <FormLabel title="Priority" />
            <select
              {...register("priority", { valueAsNumber: true })}
              className="w-full border-4 border-primary p-2 focus:border-color-info"
            >
              <option value={0}>Low</option>
              <option value={1}>Medium</option>
              <option value={2}>High</option>
              <option value={3}>Urgent</option>
            </select>
          </div>
          <div>
            <FormLabel title="Status" />
            <select
              {...register("status", { valueAsNumber: true })}
              className="w-full border-4 border-primary p-2 focus:border-color-info"
            >
              <option value={0}>Not started</option>
              <option value={1}>In Progress</option>
              <option value={2}>Completed</option>
              <option value={3}>On hold</option>
            </select>
          </div>
        </>
      )
    }
    {
      columnMutation.isError && (
        <div className="border-4 border-color-danger p-2 flex items-center gap-2 text-color-danger">
          <XCircleIcon/>
          Error to send data
        </div>
      )
    }
    <FormButton text={columnMutation.isPending ? "Creating..." : "Create"} disabled={columnMutation.isPending} />
  </form>
}
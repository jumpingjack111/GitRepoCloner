import { Checkbox } from "@/components/ui/checkbox";

interface TaskItemProps {
  taskKey: string;
  task: string;
  isChecked: boolean;
  onToggle: () => void;
}

export default function TaskItem({ taskKey, task, isChecked, onToggle }: TaskItemProps) {
  return (
    <li className="px-4 py-4 sm:px-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Checkbox
            id={taskKey}
            checked={isChecked}
            onCheckedChange={onToggle}
            className="w-5 h-5"
          />
        </div>
        <div className="ml-3">
          <label 
            htmlFor={taskKey}
            className="text-sm font-medium text-foreground cursor-pointer"
          >
            {task}
          </label>
        </div>
      </div>
    </li>
  );
}

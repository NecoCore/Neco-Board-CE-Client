import { PlusIcon } from "lucide-react";
import { SecondaryIconButton } from "../buttons/SecondaryIconButton";
import { ProjectLists } from "../lists";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { CreateEditProjectModal } from "../modals/CreateEditProjectModal";

export function ProjectsSidebar() {
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);

  const { isAdmin } = useAuthStore();

  const switchModal = () => {
    setIsModalOpen(!isModalOpen);
  }


  return <div className="sidebar project w-60">
    <div className="flex border-b-4 border-primary">
      <h3 className="m-2 mr-auto border-primary">Projects</h3>
      { isAdmin() && <SecondaryIconButton icon={<PlusIcon />} className="border-r-0 border-b-0 border-t-0" onClick={switchModal}/> }
    </div>
    <div className="p-2 overflow-y-auto w-full max-h-full">
      <ProjectLists />
    </div>
    {
      isModalOpen && <CreateEditProjectModal onClose={switchModal} />
    }
  </div>
}

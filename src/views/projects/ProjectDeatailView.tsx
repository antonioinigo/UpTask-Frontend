import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getFullProject } from "@/api/ProjectAPI"

import AddTaskModal from "@/components/task/AddTaskModal"
import TaskList from "@/components/task/TaskList"
import EditTaskData from "@/components/task/EditTaskData"
import TaskModalDetails from "@/components/task/TaskModalDetails"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/policies"
import { useMemo } from "react"

function ProjectDetailView() {

    const {data: user, isLoading: authLoading} =useAuth()

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId! 

    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', projectId],
        queryFn: ()=>getFullProject(projectId),
        retry: false
    })


    const canEdit = useMemo(()=>
        data?.manager === user?._id
      , [data, user])

    if(isLoading && authLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404' />


    if(data && user) return(
      <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>


            {isManager(data.manager, user._id) && (
              <nav className="my-5 flex gap-3">
                <button
                    type="button"
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    onClick={()=>navigate(location.pathname + `?newTask=true`)}
                >
                  Agregar Tarea</button>

                  <Link
                    to={`team`}
                    className="bg-fuchsia-700 hover:bg-fuchsia-900 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                  >
                    Colaboradores
                  </Link>
              </nav>
            )}
           

            <TaskList
              tasks={data.tasks}
              canEdit={canEdit}
            />

            <AddTaskModal/>
            <EditTaskData/>
            <TaskModalDetails />
      </>
    )
}

export default ProjectDetailView

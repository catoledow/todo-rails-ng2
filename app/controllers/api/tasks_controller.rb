class Api::TasksController < ApplicationController
    before_action :authenticate_with_token!, only: [:create, :update, :destroy]
    respond_to :json

    def create
        task = current_user.tasks.build(task_params)

        if task.save
            event = ToDoEvent.new
            event.type = "created"
            event.details = task.to_json
            event.save

            render json: task, status: 201, location: [:api, task]
        else
            render json: { errors: task.errors }, status: 422
        end
    end

    def update

        begin
            task = current_user.tasks.find(params[:id])
        rescue
            render json: { errors: "Not Found" }, status: 404 and return
        end

        task_params

        event = ToDoEvent.new
        if params[:task][:completed] == 'true' and !task.completed
            event.type = "completed"
        else
            event.type = "updated"
        end

        if task.update(task_params)

            if event.type == "completed"
                picked_message = get_random_message
                picked_color = get_random_color
                event.details = { task: task, email: { message: picked_message , color: picked_color } }.to_json
                TaskMailer.completion_email(task, picked_color, picked_message).deliver_later
            else
                event.details = task.to_json
            end

            event.save

            render json: task, status: 200, location: [:api, task]
        else
            render json: { errors: task.errors }, status: 422
        end
    end

    def destroy

        begin
            task = current_user.tasks.find(params[:id])
        rescue
            render json: { errors: "Not Found" }, status: 404 and return
        end

        task.destroy

        event = ToDoEvent.new
        event.type = "deleted"
        event.details = task.to_json
        event.save

        head 204
    end

    private

        def get_random_color
            colors = ['#123123', '#aabbcc', '#112233', '#a1a1a1', '#992255']
            return colors[Random.rand(5)]
        end

        def get_random_message
            messages = [
                'Parabéns, você completou sua tarefa!',
                'Uau, esta tarefa foi suada!',
                'Muito bom! :)',
                'Esta foi bem fácil',
                'Achei que nunca iria terminar! Que alívio!'
            ]

            return messages[Random.rand(5)]
        end

        def task_params
            params.require(:task).permit(:content, :completed)
        end
end

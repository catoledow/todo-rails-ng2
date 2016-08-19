class TaskMailer < ApplicationMailer
    default from: 'carlos.toledo@nightpay.com.br'

    def completion_email(task, color, message)
        @task = task;
        @color = color;
        @message = message;
        # mail(to: @task.user.email, subject: "Tarefa completada")
        mail(to: task.user.email, subject: "Tarefa completada")
    end

end

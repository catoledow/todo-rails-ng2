require 'csv'
namespace :utils do
    desc "Extracts completed events from todoapp database"

    task(:extract => :environment) do
        header = ["usuario","cor","frase","hora"]
        file = "events_extract.csv"

        CSV.open(file, "w") do |csv|
            csv << header

            for ev in ToDoEvent.where("type = ?", "completed")
                json = ActiveSupport::JSON.decode(ev.details)
                csv << [
                    json['task']['user_id'],
                    json['email']['color'],
                    json['email']['message'],
                    json['task']['updated_at']
                ]
            end
        end
    end
end

import { Page, Schedule, ScheduleResponse } from "../../../core/types/types";

export class WeekUtils{

    schedulesOnDay(response: Page<ScheduleResponse>){ 
        
        let monday: ScheduleResponse[] = [];
        let tuesday: ScheduleResponse[] = [];
        let wednesday: ScheduleResponse[] = [];
        let thursday: ScheduleResponse[] = [];
        let friday: ScheduleResponse[] = [];
        let saturday: ScheduleResponse[] = [];
        let week: ScheduleResponse[][] = [monday, tuesday, wednesday, thursday, friday, saturday];
        
        response.content.forEach(schedule => {
            let dayOfWeek = schedule.dayOfWeek;
            switch (dayOfWeek) {
                case 'SEGUNDA':
                    monday.push(schedule);
                    break;
                case 'TERCA':
                    tuesday.push(schedule);
                    break;
                case 'QUARTA':
                    wednesday.push(schedule);
                    break;
                case 'QUINTA':
                    thursday.push(schedule);
                    break;
                case 'SEXTA':
                    friday.push(schedule);
                    break;
                case 'SABADO':
                    saturday.push(schedule);
                    break;
            }
        }); 

        console.log(week);
        return week;
    }
}